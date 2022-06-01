import { Provider } from './provider';

export interface ProviderRepository {
  save(provider: Provider): Promise<Provider>;
  getAll(): Promise<Provider[]>;
  getOne(providerId: string): Promise<Provider>;
}
