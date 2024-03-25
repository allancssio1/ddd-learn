import { test, expect, describe, beforeEach } from 'vitest'
import { AnswerCommentsRepositoryInMemory } from '#/repositories/answer-comments-repository-in-memory'
import { UniqueEntityId } from '@/core/entities/uniqueEntityId'
import { FetchAnswerCommentsUseCase } from './fetch-answer-comments'
import { makeAnswerComment } from '#/factories/make-answer-comment'

describe('Fetch Question Answers', () => {
  let answerCommentsRepositoryInMemory: AnswerCommentsRepositoryInMemory
  let sut: FetchAnswerCommentsUseCase

  beforeEach(async () => {
    answerCommentsRepositoryInMemory = new AnswerCommentsRepositoryInMemory()
    sut = new FetchAnswerCommentsUseCase(answerCommentsRepositoryInMemory)
  })
  test('Should be able fetch answer comments', async () => {
    await answerCommentsRepositoryInMemory.create(
      makeAnswerComment({
        answerId: new UniqueEntityId('answer-1'),
      }),
    )
    await answerCommentsRepositoryInMemory.create(
      makeAnswerComment({
        answerId: new UniqueEntityId('answer-1'),
      }),
    )
    await answerCommentsRepositoryInMemory.create(
      makeAnswerComment({
        answerId: new UniqueEntityId('answer-1'),
      }),
    )

    const { answerComments } = await sut.execute({
      page: 1,
      answerId: 'answer-1',
    })

    expect(answerComments).toHaveLength(3)
    expect(answerComments[0].answerId.toString()).toEqual('answer-1')
  })
  test('Should be able fetch paginated answer comments', async () => {
    for (let i = 0; i < 22; i++) {
      await answerCommentsRepositoryInMemory.create(
        makeAnswerComment({
          answerId: new UniqueEntityId('answer-1'),
        }),
      )
    }
    const { answerComments } = await sut.execute({
      page: 2,
      answerId: 'answer-1',
    })

    expect(answerComments).toHaveLength(2)
  })
})
