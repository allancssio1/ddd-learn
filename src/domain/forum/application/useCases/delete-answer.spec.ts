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
    const res = await sut.execute({
      answerId: 'answer-2',
      authorId: 'author-2',
    })

    expect(res.isRight()).toBe(true)
    expect(res.isLeft()).toBe(false)
    expect(answersRepository.items[0].id.toValue()).toEqual('answer-1')
  })
  test('Should not be  able delete a answer from another user', async () => {
    const res = await sut.execute({
      answerId: 'answer-2',
      authorId: 'author-1',
    })

    expect(res.isRight()).toBe(false)
    expect(res.isLeft()).toBe(true)
  })
})
