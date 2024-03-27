import { test, expect, describe, beforeEach } from 'vitest'
import { QuestionsRepositoryInMemory } from '#/repositories/questions-repository-in-memory'
import { makeQuestion } from '#/factories/make-question'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'

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
    const res = await sut.execute({ slug: 'new-question' })

    expect(res.isRight()).toBe(true)
    expect(res.isLeft()).toBe(false)
  })
})
