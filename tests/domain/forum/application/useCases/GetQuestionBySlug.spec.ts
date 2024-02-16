import { test, expect, describe, beforeEach } from 'vitest'
import { GetQuestionBySlugUseCase } from '../../../../../src/domain/forum/application/useCases/GetQuestionBySlug'
import { QuestionsRepositoryInMemory } from '../../../../repositories/questions-repository-in-memory'
import { UniqueEntityId } from '../../../../../src/core/entities/uniqueEntityId'
import { Question } from '../../../../../src/domain/forum/enterprise/entities/Question'
import { Slug } from '../../../../../src/domain/forum/enterprise/entities/valueObjects/Slug'

describe('Get Question By Slug', () => {
  let questionsRepository: QuestionsRepositoryInMemory
  let sut: GetQuestionBySlugUseCase

  beforeEach(() => {
    questionsRepository = new QuestionsRepositoryInMemory()
    sut = new GetQuestionBySlugUseCase(questionsRepository)
    const newQuestion = Question.create({
      authorId: new UniqueEntityId('id-1'),
      title: 'new Question',
      content: 'Nova resposta',
      slug: Slug.create('new-question'),
    })

    questionsRepository.create(newQuestion)
  })
  test('Should be able create an answer', async () => {
    const { question } = await sut.execute({ slug: 'new-question' })

    expect(question.id).toBeTruthy()
    expect(question.title).toEqual('new Question')
  })
})
