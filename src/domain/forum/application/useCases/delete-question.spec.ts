import { test, expect, describe, beforeEach } from 'vitest'
import { QuestionsRepositoryInMemory } from '#/repositories/questions-repository-in-memory'
import { makeQuestion } from '#/factories/make-question'
import { DeleteQuestionUseCase } from './delete-question'
import { Question } from '../../enterprise/entities/Question'
import { UniqueEntityId } from '@/core/entities/uniqueEntityId'

describe('Delete Question', () => {
  let questionsRepository: QuestionsRepositoryInMemory
  let sut: DeleteQuestionUseCase
  let newQuestion: Question

  beforeEach(() => {
    questionsRepository = new QuestionsRepositoryInMemory()
    sut = new DeleteQuestionUseCase(questionsRepository)
    newQuestion = makeQuestion(
      { authorId: new UniqueEntityId('author-1') },
      new UniqueEntityId('question-1'),
    )
    questionsRepository.create(newQuestion)
    newQuestion = makeQuestion(
      { authorId: new UniqueEntityId('author-2') },
      new UniqueEntityId('question-2'),
    )
    questionsRepository.create(newQuestion)
  })
  test('Should be able delete a question', async () => {
    const res = await sut.execute({
      questionId: 'question-2',
      authorId: 'author-2',
    })

    expect(res.isRight()).toBe(true)
    expect(res.isLeft()).toBe(false)
    expect(questionsRepository.items).toHaveLength(1)
  })
  test('Should not be  able delete a question from another user', async () => {
    const res = await sut.execute({
      questionId: 'question-2',
      authorId: 'author-1',
    })

    expect(res.isRight()).toBe(false)
    expect(res.isLeft()).toBe(true)
  })
})
