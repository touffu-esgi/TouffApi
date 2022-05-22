import { AddProviderDto } from '../dto/add-provider.dto';
import { ProviderResponse } from '../domain/provider.response';

export class ProviderAdapter {
  public static fromDto(dto: AddProviderDto) {
    const props = {
      name: dto.name,
      surname: dto.surname,
      email: dto.email,
      password: dto.password,
      phone: dto.phone,
      addr1: dto.addr1,
      addr2: dto.addr2,
      cp: dto.cp,
      city: dto.city,
      country: dto.country,
      services: dto.services,
      radius: dto.radius,
    };
    return new ProviderResponse(props);
  }
}
