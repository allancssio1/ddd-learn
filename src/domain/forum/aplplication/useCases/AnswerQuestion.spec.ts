import { test, expect } from 'vitest'
import { AnswerRepository } from '../repositories/answerRepository'
import { Answer } from '../../enterprise/entities/Answer'
import { AnswerQuestionUseCase } from './AnswerQuestion'

const fakeAnswerRepository: AnswerRepository = {
  create: async (answer: Answer) => {},
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
