import { ProviderResponse } from '../domain/provider.response';
import { GetProviderDto } from '../dto/get-provider.dto';

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
}
