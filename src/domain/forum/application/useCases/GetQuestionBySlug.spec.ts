import { test, expect, describe, beforeEach } from 'vitest'
import { GetQuestionBySlugUseCase } from '@/domain/forum/application/useCases/GetQuestionBySlug'
import { QuestionsRepositoryInMemory } from '#/repositories/questions-repository-in-memory'
import { makeQuestion } from '#/factories/make-question'

describe('Get Question By Slug', () => {
  let questionsRepository: QuestionsRepositoryInMemory
  let sut: GetQuestionBySlugUseCase

  beforeEach(() => {
    questionsRepository = new QuestionsRepositoryInMemory()
    sut = new GetQuestionBySlugUseCase(questionsRepository)
    const newQuestion = makeQuestion({ title: 'New Question' })

    questionsRepository.create(newQuestion)
  })
  test('Should be able create an answer', async () => {
    const { question } = await sut.execute({ slug: 'new-question' })

    expect(question.id).toBeTruthy()
    expect(question.title).toEqual('New Question')
  })
})
