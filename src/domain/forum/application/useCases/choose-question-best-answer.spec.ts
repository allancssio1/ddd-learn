import { test, expect, describe, beforeEach } from 'vitest'
import { AnswersRepositoryInMemory } from '#/repositories/answers-repository-in-memory'
import { ChooseQuestionBestAnswerUseCase } from './choose-question-best-answer'
import { QuestionsRepositoryInMemory } from '#/repositories/questions-repository-in-memory'
import { makeQuestion } from '#/factories/make-question'
import { makeAnswer } from '#/factories/make-answer'
import { Question } from '../../enterprise/entities/Question'
import { Answer } from '../../enterprise/entities/Answer'
import { QuestionAttachmentsRepositoryInMemory } from '#/repositories/questions-attachments-repository-in-memory'

describe('Choose Question Best Answer', () => {
  let answersRepository: AnswersRepositoryInMemory
  let questionAttachmentRepository: QuestionAttachmentsRepositoryInMemory
  let questionRepository: QuestionsRepositoryInMemory
  let sut: ChooseQuestionBestAnswerUseCase
  let question: Question
  let answer: Answer

  beforeEach(() => {
    answersRepository = new AnswersRepositoryInMemory()
    questionAttachmentRepository = new QuestionAttachmentsRepositoryInMemory()
    questionRepository = new QuestionsRepositoryInMemory(
      questionAttachmentRepository,
    )
    sut = new ChooseQuestionBestAnswerUseCase(
      answersRepository,
      questionRepository,
    )
    question = makeQuestion()
    questionRepository.create(question)
    answer = makeAnswer({ questionId: question.id })
    answersRepository.create(answer)
  })
  test('Should be able mark an answer with best', async () => {
    const response = await sut.execute({
      answerId: answer.id.toString(),
      authorId: question.authorId.toString(),
    })
    expect(response.isRight()).toBe(true)
    expect(response.isLeft()).toBe(false)
  })

  test('Should net be able mark an answer with best of another author', async () => {
    const res = await sut.execute({
      answerId: answer.id.toString(),
      authorId: 'author-2',
    })

    expect(res.isRight()).toBe(false)
    expect(res.isLeft()).toBe(true)
  })
})
