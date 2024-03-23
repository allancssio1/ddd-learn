import { test, expect, describe, beforeEach } from 'vitest'
import { CommentOnAnswerUseCase } from '@/domain/forum/application/useCases/comment-on-answer'
import { AnswersRepositoryInMemory } from '#/repositories/answers-repository-in-memory'
import { AnswerCommentsRepositoryInMemory } from '#/repositories/answer-comments-repository-in-memory'
import { makeAnswer } from '#/factories/make-answer'
import { Answer } from '../../enterprise/entities/Answer'

describe('Create Answer', () => {
  let answersRepository: AnswersRepositoryInMemory
  let answerCommentsRepository: AnswerCommentsRepositoryInMemory
  let sut: CommentOnAnswerUseCase
  let answer: Answer

  beforeEach(() => {
    answersRepository = new AnswersRepositoryInMemory()
    answerCommentsRepository = new AnswerCommentsRepositoryInMemory()
    sut = new CommentOnAnswerUseCase(
      answersRepository,
      answerCommentsRepository,
    )
    answer = makeAnswer()

    answersRepository.create(answer)
  })
  test('Should be able create an answer comment', async () => {
    const { answerComment } = await sut.execute({
      authorId: 'author-1',
      answerId: answer.id.toString(),
      content: 'Novo comentário',
    })

    expect(answerComment.id).toBeTruthy()
    expect(answerComment.content).toEqual('Novo comentário')
  })
})
