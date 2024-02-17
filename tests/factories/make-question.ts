import { UniqueEntityId } from '@/core/entities/uniqueEntityId'
import {
  Question,
  QuestionProps,
} from '@/domain/forum/enterprise/entities/Question'
import { Slug } from '@/domain/forum/enterprise/entities/valueObjects/Slug'

export function makeQuestion(override: Partial<QuestionProps> = {}) {
  const question = Question.create({
    authorId: new UniqueEntityId('id-1'),
    title: 'new Question',
    content: 'Nova resposta',
    slug: Slug.create('new-question'),
    ...override,
  })

  return question
}
