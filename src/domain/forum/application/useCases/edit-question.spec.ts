import { beforeEach, describe, expect, test } from 'vitest'
import { QuestionsRepositoryInMemory } from '#/repositories/questions-repository-in-memory'
import { makeQuestion } from '#/factories/make-question'
import { EditQuestionUseCase } from './edit-question'
import { Question } from '../../enterprise/entities/Question'
import { UniqueEntityId } from '@/core/entities/uniqueEntityId'

describe('Edit Question', () => {
  let questionsRepository: QuestionsRepositoryInMemory
  let sut: EditQuestionUseCase
  let newQuestion: Question

  beforeEach(() => {
    questionsRepository = new QuestionsRepositoryInMemory()
    sut = new EditQuestionUseCase(questionsRepository)

    newQuestion = makeQuestion({ authorId: new UniqueEntityId('author-2') })
    questionsRepository.create(newQuestion)
  })
  test('Should be able edit a question', async () => {
    await sut.execute({
      questionId: newQuestion.id.toString(),
      authorId: 'author-2',
      content: 'new Content',
      title: 'new title',
    })

    expect(questionsRepository.items[0]).toMatchObject({
      content: 'new Content',
      title: 'new title',
    })
  })
  test('Should not be  able edit a question from another user', async () => {
    expect(
      async () =>
        await sut.execute({
          questionId: 'question-2',
          authorId: 'author-1',
          content: 'new Content',
          title: 'new title',
        }),
    ).rejects.toBeInstanceOf(Error)
  })
})
