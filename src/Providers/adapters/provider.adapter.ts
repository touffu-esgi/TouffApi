import { ProviderResponse } from '../domain/provider.response';
import { HttpUtils } from '../../shared/http/http.utils';
import { Request } from 'express';
import { GetProviderDto } from '../dto/get-provider.dto';

export class ProviderAdapter {
  public static fromProviderToProviderResponse(
    dto: GetProviderDto,
    request: Request,
  ) {
    const props = {
      id: dto.id,
      name: dto.name,
      surname: dto.surname,
      email: dto.email,
      password: dto.password,
      phone: dto.phone,
      address: HttpUtils.getBaseUrlOf(request) + '/address/' + dto.address,
      base_tariff: dto.base_tariff,
      radius: dto.radius,
    };
    return new ProviderResponse(props);
  }
}
