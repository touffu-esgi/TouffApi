import { AddProviderDto } from '../dto/add-provider.dto';
import { ProviderResponse } from '../domain/provider.response';
import { HttpUtils } from '../../shared/http/http.utils';
import { Request } from 'express';

export class ProviderAdapter {
  public static fromDto(dto: AddProviderDto, request: Request) {
    const props = {
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
