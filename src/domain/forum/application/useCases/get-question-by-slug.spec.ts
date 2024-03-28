import { test, expect, describe, beforeEach } from 'vitest'
import { QuestionsRepositoryInMemory } from '#/repositories/questions-repository-in-memory'
import { makeQuestion } from '#/factories/make-question'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { QuestionAttachmentsRepositoryInMemory } from '#/repositories/questions-attachments-repository-in-memory'

describe('Get Question By Slug', () => {
  let questionsRepository: QuestionsRepositoryInMemory
  let questionAttachmentsRepository: QuestionAttachmentsRepositoryInMemory
  let sut: GetQuestionBySlugUseCase

  beforeEach(() => {
    questionAttachmentsRepository = new QuestionAttachmentsRepositoryInMemory()
    questionsRepository = new QuestionsRepositoryInMemory(
      questionAttachmentsRepository,
    )
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
