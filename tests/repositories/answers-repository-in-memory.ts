import { AnswerRepository } from '@/domain/forum/application/repositories/answer-repository'
import { Answer } from '../domain/forum/enterprise/entities/Answer'

export class AnswersRepositoryInMemory implements AnswerRepository {
  items: Answer[] = []
  async create(answer: Answer): Promise<Answer> {
    await this.items.push(answer)
    return answer
  }

  async findById(id: string) {
    const answer = await this.items.find((item) => item.id.toValue() === id)

    if (!answer) return null

    return answer
  }

  async delete(answer: Answer) {
    const itemIndex = this.items.findIndex((item) => item.id === answer.id)

    await this.items.splice(itemIndex, 1)
  }
}
