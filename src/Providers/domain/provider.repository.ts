import { Provider } from './provider';
import { ProviderProps } from './provider.props';

export interface ProviderRepository {
  save(provider: ProviderProps): Promise<Provider>;
  getAll(): Promise<Provider[]>;
  getOne(providerId: string): Promise<Provider>;
}
