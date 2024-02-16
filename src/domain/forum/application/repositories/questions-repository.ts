import { Question } from '../../enterprise/entities/Question'

export interface QuestionsRepsitory {
  create(question: Question): Promise<Question>
  findBySlug(slug: string): Promise<Question | null>
}
