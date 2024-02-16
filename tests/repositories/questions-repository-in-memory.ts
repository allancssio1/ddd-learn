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
}
