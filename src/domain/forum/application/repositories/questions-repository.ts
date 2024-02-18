import { Question } from '../../enterprise/entities/Question'

export interface QuestionsRepsitory {
  create(question: Question): Promise<Question>
  delete(question: Question): Promise<void>
  findBySlug(slug: string): Promise<Question | null>
  findById(id: string): Promise<Question | null>
}
