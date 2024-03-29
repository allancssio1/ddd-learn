import { AnswerRepository } from '@/domain/forum/application/repositories/answer-repository'
import { Answer } from '../domain/forum/enterprise/entities/Answer'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswerAttachmentsRepositoryInMemory } from './answers-attachments-repository-in-memory'

export class AnswersRepositoryInMemory implements AnswerRepository {
  constructor(
    private answerAttachmentRepository: AnswerAttachmentsRepositoryInMemory,
  ) {}

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

    await this.answerAttachmentRepository.deleteByAnswerId(answer.id.toString())

    await this.items.splice(itemIndex, 1)
  }

  async save(answer: Answer) {
    const itemIndex = this.items.findIndex((item) => item.id === answer.id)

    this.items[itemIndex] = answer
  }

  async findManyByQuestionId(questionId: string, { page }: PaginationParams) {
    const ansewrs = await this.items
      .filter((item) => item.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20)

    return ansewrs
  }
}
