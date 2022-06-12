import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnimalsModule } from './Animals/animal.module';
import { APP_FILTER } from '@nestjs/core';
import { AnimalExceptionFilter } from './Animals/exposition/filters/animal-exception.filter';
import { ConfigModule } from '@nestjs/config';
import { ProviderModule } from './Providers/provider.module';
import { AddressModule } from './Address/address.module';
import { RecipientsModule } from './Recipients/recipient.module';
import { UserModule } from './Users/user.module';
import { MessageModule } from './Message/message.module';
import { AgreementModule } from './Agreement/agreement.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AnimalsModule,
    ProviderModule,
    AddressModule,
    RecipientsModule,
    UserModule,
    AgreementModule,
    MessageModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AnimalExceptionFilter,
    },
  ],
})
export class AppModule {}
