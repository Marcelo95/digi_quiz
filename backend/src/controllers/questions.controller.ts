import { Controller, Get } from '@nestjs/common';
import { IQuestions } from 'src/interfaces';
import { QuestionsService } from 'src/services/questionsService';

@Controller()
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Get("/api/questions/:quizId")
  getAllQuestions(): Array<IQuestions> {
    return this.questionsService.getAllQuestions();
  }

  
}
