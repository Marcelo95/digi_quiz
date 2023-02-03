import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestionsController } from './controllers/questions.controller';
import { QuestionsService } from './services/questionsService';

@Module({
  imports: [],
  controllers: [AppController, QuestionsController],
  providers: [AppService, QuestionsService],
})
export class AppModule {}
