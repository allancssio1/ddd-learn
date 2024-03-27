import { beforeEach, describe, expect, test } from 'vitest'
import { AnswersRepositoryInMemory } from '#/repositories/answers-repository-in-memory'
import { makeAnswer } from '#/factories/make-answer'
import { EditAnswerUseCase } from './edit-answer'
import { Answer } from '../../enterprise/entities/Answer'
import { UniqueEntityId } from '@/core/entities/uniqueEntityId'

describe('Edit Answer', () => {
  let answersRepository: AnswersRepositoryInMemory
  let sut: EditAnswerUseCase
  let newAnswer: Answer

  beforeEach(() => {
    answersRepository = new AnswersRepositoryInMemory()
    sut = new EditAnswerUseCase(answersRepository)

    newAnswer = makeAnswer({ authorId: new UniqueEntityId('author-2') })
    answersRepository.create(newAnswer)
  })
  test('Should be able edit a answer', async () => {
    const res = await sut.execute({
      answerId: newAnswer.id.toString(),
      authorId: 'author-2',
      content: 'new Content',
    })

    expect(res.isRight()).toBe(true)
    expect(res.isLeft()).toBe(false)
    expect(answersRepository.items[0]).toMatchObject({
      content: 'new Content',
    })
  })
  test('Should not be  able edit a answer from another user', async () => {
    const res = await sut.execute({
      answerId: newAnswer.id.toString(),
      authorId: 'author-1',
      content: 'new Content',
    })

    expect(res.isRight()).toBe(false)
    expect(res.isLeft()).toBe(true)
  })
})
