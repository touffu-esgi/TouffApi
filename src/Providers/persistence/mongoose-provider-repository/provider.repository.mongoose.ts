import { ProviderRepository } from '../../domain/provider.repository';
import { ProviderProps } from '../../domain/provider.props';
import { Provider } from '../../domain/provider';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProviderDocument } from './provider.schema';

export class ProviderRepositoryMongoose implements ProviderRepository {
  constructor(
    @InjectModel('Providers') private providerModel: Model<ProviderDocument>,
  ) {}
  getAll(): Promise<Provider[]> {
    return Promise.resolve([]);
  }

  getOne(providerId: string): Promise<Provider> {
    return Promise.resolve(undefined);
  }

  async save(provider: ProviderProps): Promise<Provider> {
    const newProvider: ProviderDocument = await this.providerModel.create(
      provider,
    );
    return new Provider({
      address: newProvider.address,
      base_tariff: newProvider.base_tariff,
      email: newProvider.email,
      _id: newProvider.id,
      name: newProvider.name,
      password: newProvider.password,
      phone: newProvider.phone,
      profile_desc: newProvider.profile_desc,
      profile_title: newProvider.profile_title,
      radius: newProvider.radius,
      surname: newProvider.surname,
    });
  }
}
