import { test, expect, describe, beforeEach } from 'vitest'
import { QuestionsRepositoryInMemory } from '#/repositories/questions-repository-in-memory'
import { makeQuestion } from '#/factories/make-question'
import { DeleteQuestionUseCase } from './delete-question'
import { Question } from '../../enterprise/entities/Question'

describe('Get Question By Slug', () => {
  let questionsRepository: QuestionsRepositoryInMemory
  let sut: DeleteQuestionUseCase
  let newQuestion: Question

  beforeEach(() => {
    questionsRepository = new QuestionsRepositoryInMemory()
    sut = new DeleteQuestionUseCase(questionsRepository)
    newQuestion = makeQuestion()
    questionsRepository.create(newQuestion)
    newQuestion = makeQuestion()
    questionsRepository.create(newQuestion)
  })
  test('Should be able create an answer', async () => {
    await sut.execute(newQuestion)

    expect(questionsRepository.items).toHaveLength(1)
  })
})
