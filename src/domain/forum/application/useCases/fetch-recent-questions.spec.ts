import { test, expect, describe, beforeEach } from 'vitest'
import { QuestionsRepositoryInMemory } from '#/repositories/questions-repository-in-memory'
import { makeQuestion } from '#/factories/make-question'
import { FetchRecentQuestionsUseCase } from './fetch-recent-questions'

describe('Fetch Questions Recents', () => {
  let questionsRepository: QuestionsRepositoryInMemory
  let sut: FetchRecentQuestionsUseCase

  beforeEach(async () => {
    questionsRepository = new QuestionsRepositoryInMemory()
    sut = new FetchRecentQuestionsUseCase(questionsRepository)
  })
  test('Should be able fetch question recents ordenate by createdAt', async () => {
    await questionsRepository.create(
      makeQuestion({ createdAt: new Date(2024, 0, 2) }),
    )
    await questionsRepository.create(
      makeQuestion({ createdAt: new Date(2024, 0, 1) }),
    )
    await questionsRepository.create(
      makeQuestion({ createdAt: new Date(2024, 0, 4) }),
    )
    const { questions } = await sut.execute({ page: 1 })

    expect(questions).toEqual([
      expect.objectContaining({ createdAt: new Date(2024, 0, 4) }),
      expect.objectContaining({ createdAt: new Date(2024, 0, 2) }),
      expect.objectContaining({ createdAt: new Date(2024, 0, 1) }),
    ])
  })
  test('Should be able fetch questions recents by pages', async () => {
    for (let i = 0; i < 22; i++) {
      await questionsRepository.create(makeQuestion())
    }
    const { questions } = await sut.execute({ page: 2 })

    expect(questions).toHaveLength(2)
  })
})
