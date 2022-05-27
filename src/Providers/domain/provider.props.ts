export interface ProviderProps {
  readonly name: string;
  readonly surname: string;
  readonly email: string;
  readonly password: string;
  readonly phone?: string;
  readonly address: string;
  readonly base_tariff: number;
  readonly radius: number;
}
