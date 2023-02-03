import { Injectable } from '@nestjs/common';
import { IQuestions } from 'src/interfaces';
import { questions } from '../data';

@Injectable()
export class QuestionsService {
  getAllQuestions(): Array<IQuestions> {
    return questions;
  }
}
