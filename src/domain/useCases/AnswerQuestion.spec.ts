import { test, expect } from 'vitest'
import { AnswerQuestionUseCase } from './AnswerQuestion'
import { AnswerRepository } from '../repositories/answerRepository'
import { Answer } from '../entities/Answer'

const fakeAnswerRepository: AnswerRepository = {
  create: async (answer: Answer) => {
    return
  },
}

test('Should be able create an answer', () => {
  const answerQuestionUseCase = new AnswerQuestionUseCase(fakeAnswerRepository)

  const answer = answerQuestionUseCase.execute({
    instructorId: '1',
    questionId: '1',
    content: 'Nova resposta',
  })
  expect(answer.content).toEqual('Nova resposta')
})
