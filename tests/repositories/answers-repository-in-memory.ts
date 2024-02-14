import { AnswerRepository } from '../domain/forum/aplplication/repositories/answer-repository'
import { Answer } from '../domain/forum/enterprise/entities/Answer'

export class AnswersRepositoryInMemory implements AnswerRepository {
  items: Answer[] = []
  async create(answer: Answer): Promise<Answer> {
    await this.items.push(answer)
    return answer
  }
}
