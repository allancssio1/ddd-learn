import { Answer } from '../../enterprise/entities/Answer'

export interface AnswerRepository {
  create(answer: Answer): Promise<void>
}
