if [ $# -lt 1 ]
then
	echo "Missing parameter"
	exit
fi
echo "Creating component $1"
cName=$1
cNameLC=$(tr '[A-Z]' '[a-z]' <<< $cName)

cd src
mkdir $cName
cd $cName

mkdir -p adapters application application/exceptions domain dto exposition/controller exposition/filters persistence
touch "adapters/$cNameLC.adapter.ts" "application/$cNameLC.service.ts"
touch "domain/$cNameLC.props.ts" "domain/$cNameLC.repository.ts" "domain/$cNameLC.response.ts" "domain/$cNameLC.ts"
touch "dto/add-$cNameLC.dto.ts"
touch "exposition/controller/$cNameLC.controller.ts" "exposition/filters/$cNameLC.exception.filter.ts"
touch "persistence/$cNameLC.repository.in-memory.ts"
touch "$cNameLC.module.ts"

echo "export interface ${cName}Props {}" >> "domain/$cNameLC.props.ts"

echo "import { ${cName}Props } from './${cNameLC}.props';
export class ${cName} implements ${cName}Props {}" >> "domain/$cNameLC.ts"

echo "import { ${cName}Props } from './${cNameLC}.props';
export class ${cName}Response implements ${cName}Props {}" >> "domain/$cNameLC.response.ts"

echo "import { ${cName} } from './${cNameLC}';
export interface ${cName}Repository {}" >> "domain/$cNameLC.repository.ts"

echo "import { ${cName} } from '../domain/${cNameLC}';
import { ${cName}Response } from '../domain/${cNameLC}.response';

export class ${cName}Adapter {
  public static to${cName}Response(dto: ${cName}): ${cName}Response {
    throw new Error('Not implemented');
  }
}" >> "adapters/$cNameLC.adapter.ts"

echo "import { Injectable } from '@nestjs/common';
import { ${cName}RepositoryInMemory } from '../persistence/${cNameLC}.repository.in-memory';
import { ${cName} } from '../domain/${cNameLC}';
@Injectable()
export class ${cName}Service {
  constructor(private ${cNameLC}Repository: ${cName}RepositoryInMemory) {}
}" >> "application/$cNameLC.service.ts"

echo "import { ${cName}Service } from '../../application/${cNameLC}.service';
import { Request } from 'express';
import { ${cName}Response } from '../../domain/${cNameLC}.response';
import { ${cName}Adapter } from '../../adapters/${cNameLC}.adapter';
import { HttpUtils } from '../../../shared/http/http.utils';
import { ${cName}ExceptionFilter } from '../filters/${cNameLC}.exception.filter';
import { Controller, Get, Param, Query, Req, UseFilters } from '@nestjs/common';

@Controller('${cNameLC}')
@UseFilters(new ${cName}ExceptionFilter())
export class ${cName}Controller {
  constructor(private ${cNameLC}Service: ${cName}Service) {}
}" >> "exposition/controller/$cNameLC.controller.ts"

echo "import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class ${cName}ExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const body = {
      statusCode:
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR,
      timestamp: new Date().toISOString(),
      message: exception.message,
      path: request.url,
    };

    switch (exception.name) {
      default:
        body.statusCode = 500;
        break;
    }

    response.status(body.statusCode).json(body);
  }
}" >> "exposition/filters/$cNameLC.exception.filter.ts"

echo "import { ${cName} } from '../domain/${cNameLC}';
import { ${cName}Repository } from '../domain/${cNameLC}.repository';

export class ${cName}RepositoryInMemory implements ${cName}Repository {
  private ${cNameLC}s: ${cName}[] = [];
}" >> "persistence/$cNameLC.repository.in-memory.ts"

echo "import { Module } from '@nestjs/common';
import { ${cName}RepositoryInMemory } from './persistence/${cNameLC}.repository.in-memory';
import { ${cName}Service } from './application/${cNameLC}.service';
import { ${cName}Controller } from './exposition/controller/${cNameLC}.controller';
@Module({
	controllers: [${cName}Controller],
	providers: [${cName}Service, ${cName}RepositoryInMemory]
})
export class ${cName}Module {}" >> "$cNameLC.module.ts"


echo "Component created"
