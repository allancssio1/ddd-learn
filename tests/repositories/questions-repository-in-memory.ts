import { QuestionsRepsitory } from '../domain/forum/application/repositories/questions-repository'
import { Question } from '../domain/forum/enterprise/entities/Question'

export class QuestionsRepositoryInMemory implements QuestionsRepsitory {
  items: Question[] = []
  async create(question: Question) {
    await this.items.push(question)
    return question
  }

  async findBySlug(slug: string) {
    const question = await this.items.find((item) => item.slug.value === slug)

    if (!question) return null

    return question
  }

  async delete(question: Question) {
    const itemIndex = this.items.findIndex((item) => item.id === question.id)

    await this.items.splice(itemIndex, 1)
  }

  async findById(questionId: string) {
    const question = await this.items.find(
      (item) => item.id.toValue() === questionId,
    )
    return question ?? null
  }

  async save(question: Question) {
    const itemIndex = this.items.findIndex((item) => item.id === question.id)

    this.items[itemIndex] = question
  }
}
