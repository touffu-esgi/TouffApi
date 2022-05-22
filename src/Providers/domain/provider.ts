import { ProviderProps } from './provider.props';

export class Provider implements ProviderProps {
  private readonly _name: string;
  private readonly _surname: string;
  private readonly _email: string;
  private readonly _password: string;
  private readonly _phone?: string;
  private readonly _addr1: string;
  private readonly _addr2?: string;
  private readonly _cp: string;
  private readonly _city: string;
  private readonly _country: string;
  private readonly _services: string[];
  private readonly _radius: number;

  constructor(providerProps: ProviderProps) {
    this._name = providerProps.name;
    this._surname = providerProps.surname;
    this._email = providerProps.email;
    this._password = providerProps.password;
    this._phone = providerProps.phone;
    this._addr1 = providerProps.addr1;
    this._addr2 = providerProps.addr2;
    this._cp = providerProps.cp;
    this._city = providerProps.city;
    this._country = providerProps.country;
    this._services = providerProps.services;
    this._radius = providerProps.radius;
  }

  get name(): string {
    return this._name;
  }
  get surname(): string {
    return this._surname;
  }
  get email(): string {
    return this._email;
  }
  get password(): string {
    return this._password;
  }

  get phone(): string {
    return this._phone;
  }

  get addr1(): string {
    return this._addr1;
  }

  get addr2(): string {
    return this._addr2;
  }

  get cp(): string {
    return this._cp;
  }

  get city(): string {
    return this._city;
  }

  get country(): string {
    return this._country;
  }

  get services(): string[] {
    return this._services;
  }

  get radius(): number {
    return this._radius;
  }
}
