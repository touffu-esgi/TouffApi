import { ProviderProps } from './provider.props';

export class ProviderResponse {
  name: string;
  surname: string;
  email: string;
  password: string;
  phone?: string;
  address: string;
  base_tariff: number;
  radius: number;

  constructor(providerProps: ProviderProps) {
    this.name = providerProps.name;
    this.surname = providerProps.surname;
    this.email = providerProps.email;
    this.password = providerProps.password;
    this.phone = providerProps.phone;
    this.address = providerProps.address;
    this.base_tariff = providerProps.base_tariff;
    this.radius = providerProps.radius;
  }
}
