import { test, expect, describe, beforeEach } from 'vitest'
import { CreateQuestionUseCase } from '@/domain/forum/application/useCases/create-question'
import { QuestionsRepositoryInMemory } from '#/repositories/questions-repository-in-memory'

describe('Create Question', () => {
  let questionsRepository: QuestionsRepositoryInMemory
  let sut: CreateQuestionUseCase

  beforeEach(() => {
    questionsRepository = new QuestionsRepositoryInMemory()
    sut = new CreateQuestionUseCase(questionsRepository)
  })
  test('Should be able create an question', async () => {
    const { question } = await sut.execute({
      authorId: '1',
      title: 'new Question',
      content: 'Nova resposta',
    })

    expect(question.id).toBeTruthy()
    expect(question.content).toEqual('Nova resposta')
  })
})
