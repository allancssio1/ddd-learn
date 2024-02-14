import { Question } from '../../enterprise/entities/Question'

export interface QuestionsRepsitory {
  create(question: Question): Promise<Question>
}
