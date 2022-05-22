import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnimalsModule } from './Animals/animal.module';
import { APP_FILTER } from '@nestjs/core';
import { AnimalExceptionFilter } from './Animals/exposition/filters/animal-exception.filter';
import { ConfigModule } from '@nestjs/config';
import { RecipientsModule } from './recipients/recipient.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AnimalsModule,
    RecipientsModule,
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
