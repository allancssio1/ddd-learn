import { QuestionsRepsitory } from '../domain/forum/aplplication/repositories/questions-repository'
import { Question } from '../domain/forum/enterprise/entities/Question'

export class QuestionsRepositoryInMemory implements QuestionsRepsitory {
  items: Question[] = []
  async create(question: Question): Promise<Question> {
    await this.items.push(question)
    return question
  }
}
