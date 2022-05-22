import { Provider } from './provider';

export interface ProviderRepository {
  save(provider: Provider): Provider;
  getAll(): Promise<Provider[]>;
}
