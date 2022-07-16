import { ProviderProps } from './provider.props';

export class Provider implements ProviderProps {
  public id: string;
  public userId?: string;
  public name: string;
  public surname: string;
  public email: string;
  public password: string;
  public phone?: string;
  public address: string;
  public base_tariff: number;
  public radius: number;
  public profile_title: string;
  public profile_desc: string;
  public animalType: string[];

  constructor(providerProps: ProviderProps) {
    this.id = providerProps.id;
    this.name = providerProps.name;
    this.surname = providerProps.surname;
    this.email = providerProps.email;
    this.password = providerProps.password;
    this.phone = providerProps.phone ? providerProps.phone : '';
    this.address = providerProps.address;
    this.animalType = providerProps.animalType;
    this.base_tariff = providerProps.base_tariff;
    this.radius = providerProps.radius;
    this.profile_title = providerProps.profile_title;
    this.profile_desc = providerProps.profile_desc;
  }
}
