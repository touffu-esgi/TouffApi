import { ProviderProps } from './provider.props';

export class ProviderResponse {
  name: string;
  surname: string;
  email: string;
  password: string;
  phone?: string;
  addr1: string;
  addr2?: string;
  cp: string;
  city: string;
  country: string;
  services: string[];
  radius: number;

  constructor(providerProps: ProviderProps) {
    this.name = providerProps.name;
    this.surname = providerProps.surname;
    this.email = providerProps.email;
    this.password = providerProps.password;
    this.phone = providerProps.phone;
    this.addr1 = providerProps.addr1;
    this.addr2 = providerProps.addr2;
    this.cp = providerProps.cp;
    this.city = providerProps.city;
    this.country = providerProps.country;
    this.services = providerProps.services;
    this.radius = providerProps.radius;
  }
}
