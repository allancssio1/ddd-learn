import { test, expect, describe, beforeEach } from 'vitest'
import { QuestionCommentsRepositoryInMemory } from '#/repositories/questions-comments-repository-in-memory'
import { UniqueEntityId } from '@/core/entities/uniqueEntityId'
import { FetchQuestionCommentsUseCase } from './fetch-question-comments'
import { makeQuestionComment } from '#/factories/make-question-comment'

describe('Fetch Question Answers', () => {
  let questionCommentsRepository: QuestionCommentsRepositoryInMemory
  let sut: FetchQuestionCommentsUseCase

  beforeEach(async () => {
    questionCommentsRepository = new QuestionCommentsRepositoryInMemory()
    sut = new FetchQuestionCommentsUseCase(questionCommentsRepository)
  })
  test('Should be able fetch question question comments', async () => {
    await questionCommentsRepository.create(
      makeQuestionComment({
        questionId: new UniqueEntityId('question-1'),
      }),
    )
    await questionCommentsRepository.create(
      makeQuestionComment({
        questionId: new UniqueEntityId('question-1'),
      }),
    )
    await questionCommentsRepository.create(
      makeQuestionComment({
        questionId: new UniqueEntityId('question-1'),
      }),
    )

    const { questionComments } = await sut.execute({
      page: 1,
      questionId: 'question-1',
    })

    expect(questionComments).toHaveLength(3)
    expect(questionComments[0].questionId.toString()).toEqual('question-1')
  })
  test('Should be able fetch paginated question question comments', async () => {
    for (let i = 0; i < 22; i++) {
      await questionCommentsRepository.create(
        makeQuestionComment({
          questionId: new UniqueEntityId('question-1'),
        }),
      )
    }
    const { questionComments } = await sut.execute({
      page: 2,
      questionId: 'question-1',
    })

    expect(questionComments).toHaveLength(2)
  })
})
