import { MongooseModuleOptions } from '@nestjs/mongoose';

const mongooseConfig: MongooseModuleOptions = {
  useFactory: () => ({
    uri: 'mongodb+srv:// ...',
  }),
};

export = mongooseConfig;
