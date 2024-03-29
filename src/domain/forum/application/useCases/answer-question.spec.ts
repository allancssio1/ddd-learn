import { test, expect, describe, beforeEach } from 'vitest'
import { AnswersRepositoryInMemory } from '#/repositories/answers-repository-in-memory'
import { AnswerQuestionUseCase } from './answer-question'
import { UniqueEntityId } from '@/core/entities/uniqueEntityId'

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
      attachmentsIds: ['1', '2'],
    })
    expect(res.isRight()).toBe(true)
    expect(answersRepository.items[0].attachments.currentItems).toHaveLength(2)
    expect(answersRepository.items[0].attachments.currentItems).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityId('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityId('2') }),
    ])
  })
})
