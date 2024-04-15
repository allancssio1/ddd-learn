import { OnAnswerCreated } from './on-answer-created'
import { it } from 'vitest'
import { makeAnswer } from '#/factories/make-answer'
import { AnswersRepositoryInMemory } from '#/repositories/answers-repository-in-memory'
import { AnswerAttachmentsRepositoryInMemory } from '#/repositories/answers-attachments-repository-in-memory'

let answersRepositoryInMemory: AnswersRepositoryInMemory
let answerAttachmentsRepositoryInMemory: AnswerAttachmentsRepositoryInMemory

describe('On Answer Created', () => {
  beforeEach(() => {
    answerAttachmentsRepositoryInMemory =
      new AnswerAttachmentsRepositoryInMemory()
    answersRepositoryInMemory = new AnswersRepositoryInMemory(
      answerAttachmentsRepositoryInMemory,
    )
  })
  it('should send a notification when an answer is created', async () => {
    const onAnswerCreated = new OnAnswerCreated()

    const answer = makeAnswer()
    console.log('🚀 ~ it ~ answer:', answer)

    await answersRepositoryInMemory.create(answer)
  })
})
