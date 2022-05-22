export interface ProviderProps {
  readonly name: string;
  readonly surname: string;
  readonly email: string;
  readonly password: string;
  readonly phone?: string;
  readonly addr1: string;
  readonly addr2?: string;
  readonly cp: string;
  readonly city: string;
  readonly country: string;
  readonly services: string[];
  readonly radius: number;
}
