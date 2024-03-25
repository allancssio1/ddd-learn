import { beforeEach, describe, expect, test } from 'vitest'
import { QuestionCommentsRepositoryInMemory } from '#/repositories/questions-comments-repository-in-memory'
import { makeQuestion } from '#/factories/make-question-comment'
import { DeleteQuestionCommentUseCase } from './delete-question-comment'
import { QuestionComment } from '../../enterprise/entities/QuestionComment'

describe('Delete Question Comment', () => {
  let questioncommentsRepository: QuestionCommentsRepositoryInMemory
  let sut: DeleteQuestionCommentUseCase
  let newQuestionComment: QuestionComment

  beforeEach(() => {
    questioncommentsRepository = new QuestionCommentsRepositoryInMemory()
    sut = new DeleteQuestionCommentUseCase(questioncommentsRepository)

    newQuestionComment = makeQuestion()
    questioncommentsRepository.create(newQuestionComment)
  })
  test('Should be able delete a question comment', async () => {
    await sut.execute({
      authorId: newQuestionComment.authorId.toString(),
      questionCommentId: newQuestionComment.id.toString(),
    })

    expect(questioncommentsRepository.items).toHaveLength(0)
  })
  test('Should not be  able delete a question comment from another user', async () => {
    expect(
      async () =>
        await sut.execute({
          authorId: 'Wrong author',
          questionCommentId: newQuestionComment.id.toString(),
        }),
    ).rejects.toBeInstanceOf(Error)
  })
})
