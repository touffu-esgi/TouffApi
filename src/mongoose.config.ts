import { MongooseModuleOptions } from '@nestjs/mongoose';

const mongooseConfig: MongooseModuleOptions = {
  useFactory: () => ({
    uri: 'mongodb+srv://Touffu:AMGlXSwUGe4tdusb@touffu.qii9p.mongodb.net/Touffu?retryWrites=true&w=majority',
  }),
};

export = mongooseConfig;
