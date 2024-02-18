import { test, expect, describe, beforeEach } from 'vitest'
import { AnswersRepositoryInMemory } from '#/repositories/answers-repository-in-memory'
import { DeleteAnswerUseCase } from './delete-answer'
import { Answer } from '../../enterprise/entities/Answer'
import { UniqueEntityId } from '@/core/entities/uniqueEntityId'
import { makeAnswer } from '#/factories/make-answer'

describe('Delete Answer', () => {
  let answersRepository: AnswersRepositoryInMemory
  let sut: DeleteAnswerUseCase
  let newAnswer: Answer

  beforeEach(() => {
    answersRepository = new AnswersRepositoryInMemory()
    sut = new DeleteAnswerUseCase(answersRepository)
    newAnswer = makeAnswer(
      { authorId: new UniqueEntityId('author-1') },
      new UniqueEntityId('answer-1'),
    )
    answersRepository.create(newAnswer)
    newAnswer = makeAnswer(
      { authorId: new UniqueEntityId('author-2') },
      new UniqueEntityId('answer-2'),
    )
    answersRepository.create(newAnswer)
  })
  test('Should be able delete a answer', async () => {
    await sut.execute({ answerId: 'answer-2', authorId: 'author-2' })

    expect(answersRepository.items).toHaveLength(1)
    expect(answersRepository.items[0].id.toValue()).toEqual('answer-1')
  })
  test('Should not be  able delete a answer from another user', async () => {
    expect(
      async () =>
        await sut.execute({ answerId: 'answer-2', authorId: 'author-1' }),
    ).rejects.toThrow('Unauthorazed')
  })
})
