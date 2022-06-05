import { ProviderResponse } from '../domain/provider.response';
import { GetProviderDto } from '../dto/get-provider.dto';
import { AddProviderDto } from '../dto/add-provider.dto';
import { Provider } from '../domain/provider';

export class ProviderAdapter {
  public static fromProviderToProviderResponse(
    provider: GetProviderDto,
    baseUrl: string,
  ) {
    const props = {
      id: provider.id,
      name: provider.name,
      surname: provider.surname,
      email: provider.email,
      password: provider.password,
      phone: provider.phone,
      address: baseUrl + '/address/' + provider.address,
      base_tariff: provider.base_tariff,
      radius: provider.radius,
    };
    return new ProviderResponse(props);
  }

  public static fromDtoToProvider(
    dto: AddProviderDto | GetProviderDto,
  ): Provider {
    return new Provider({
      id: dto['id'] ? dto['id'] : '',
      name: dto.name,
      surname: dto.surname,
      email: dto.email,
      password: dto.password,
      phone: dto.phone,
      address: dto.address,
      base_tariff: dto.base_tariff,
      radius: dto.radius,
    });
  }
}
