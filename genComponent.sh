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
touch "dto/get-$cNameLC.dto.ts"
touch "exposition/controller/$cNameLC.controller.ts" "exposition/filters/$cNameLC.exception.filter.ts"
touch "persistence/$cNameLC.repository.in-memory.ts"
touch "$cNameLC.module.ts"

echo "import { Module } from '@nestjs/common';
@Module({
	controllers: [],
	providers: []
})
export class ${cName}Module {}" >> "$cNameLC.module.ts"

echo "Component created"
