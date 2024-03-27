import { test, expect, describe, beforeEach } from 'vitest'
import { AnswersRepositoryInMemory } from '#/repositories/answers-repository-in-memory'
import { AnswerQuestionUseCase } from './answer-question'

describe('Create a Answer Question', () => {
  let answersRepository: AnswersRepositoryInMemory
  let sut: AnswerQuestionUseCase

  beforeEach(() => {
    answersRepository = new AnswersRepositoryInMemory()
    sut = new AnswerQuestionUseCase(answersRepository)
  })
  test('Should be able create an answer', async () => {
    const res = await sut.execute({
      instructorId: '1',
      questionId: '1',
      content: 'Nova resposta',
    })
    expect(res.isRight()).toBe(true)
  })
})
