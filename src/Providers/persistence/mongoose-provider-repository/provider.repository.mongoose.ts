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

  async getAll(): Promise<Provider[]> {
    const providers: ProviderDocument[] = await this.providerModel
      .find()
      .exec();
    return providers.map(
      (provider) =>
        new Provider({
          address: provider.address,
          base_tariff: provider.base_tariff,
          email: provider.email,
          _id: provider.id,
          name: provider.name,
          password: '',
          phone: provider.phone,
          profile_desc: provider.profile_desc,
          profile_title: provider.profile_title,
          radius: provider.radius,
          surname: provider.surname,
        }),
    );
  }

  async getOne(providerId: string): Promise<Provider> {
    const provider: ProviderDocument = await this.providerModel
      .findById(providerId)
      .exec();
    return new Provider({
      address: provider.address,
      base_tariff: provider.base_tariff,
      email: provider.email,
      _id: provider.id,
      name: provider.name,
      password: provider.password,
      phone: provider.phone,
      profile_desc: provider.profile_desc,
      profile_title: provider.profile_title,
      radius: provider.radius,
      surname: provider.surname,
    });
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
