import { Answer } from '../../enterprise/entities/Answer'

export interface AnswerRepository {
  create(answer: Answer): Promise<Answer>
  delete(answer: Answer): Promise<void>
  save(answer: Answer): Promise<void>
  findById(answerId: string): Promise<Answer | null>
}
