import { Answer } from '../entities/Answer'

export interface AnswerRepository {
  create(answer: Answer): Promise<void>
}
