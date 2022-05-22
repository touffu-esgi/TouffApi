import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnimalsModule } from './Animals/animal.module';
import { APP_FILTER } from "@nestjs/core";
import { AnimalExceptionFilter } from "./Animals/exposition/filters/animal-exception.filter";

@Module({
  imports: [AnimalsModule],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_FILTER,
      useClass: AnimalExceptionFilter,
    }],
})
export class AppModule {}
