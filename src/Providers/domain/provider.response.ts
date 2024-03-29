import { ProviderProps } from './provider.props';

export class ProviderResponse {
  id: string;
  userId: string;
  name: string;
  surname: string;
  email: string;
  password: string;
  phone?: string;
  address: string;
  animalType: string[];
  base_tariff: number;
  radius: number;
  profile_title: string;
  profile_desc: string;
  profile_pic: string;

  constructor(providerProps: ProviderProps) {
    this.id = providerProps.id;
    this.userId = providerProps.userId;
    this.name = providerProps.name;
    this.surname = providerProps.surname;
    this.email = providerProps.email;
    this.password = providerProps.password;
    this.phone = providerProps.phone;
    this.address = providerProps.address;
    this.animalType = providerProps.animalType;
    this.base_tariff = providerProps.base_tariff;
    this.radius = providerProps.radius;
    this.profile_title = providerProps.profile_title;
    this.profile_desc = providerProps.profile_desc;
    this.profile_pic = providerProps.profile_pic;
  }
}
