import { beforeEach, describe, expect, test } from 'vitest'
import { AnswerCommentsRepositoryInMemory } from '#/repositories/answer-comments-repository-in-memory'
import { makeAnswer } from '#/factories/make-answer-comment'
import { DeleteAnswerCommentUseCase } from './delete-answer-comment'
import { AnswerComment } from '../../enterprise/entities/AnswerComment'

describe('Delete Answer Comment', () => {
  let answercommentsRepository: AnswerCommentsRepositoryInMemory
  let sut: DeleteAnswerCommentUseCase
  let newAnswerComment: AnswerComment

  beforeEach(() => {
    answercommentsRepository = new AnswerCommentsRepositoryInMemory()
    sut = new DeleteAnswerCommentUseCase(answercommentsRepository)

    newAnswerComment = makeAnswer()
    answercommentsRepository.create(newAnswerComment)
  })
  test('Should be able delete a answer comment', async () => {
    await sut.execute({
      authorId: newAnswerComment.authorId.toString(),
      answerCommentId: newAnswerComment.id.toString(),
    })

    expect(answercommentsRepository.items).toHaveLength(0)
  })
  test('Should not be  able delete a answer comment from another user', async () => {
    expect(
      async () =>
        await sut.execute({
          authorId: 'Wrong author',
          answerCommentId: newAnswerComment.id.toString(),
        }),
    ).rejects.toBeInstanceOf(Error)
  })
})
