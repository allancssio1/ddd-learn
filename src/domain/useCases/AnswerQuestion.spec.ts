import { expect, test } from 'vitest'
import { AnswerQuestionUseCase } from './AnswerQuestion'

test('Should be able create an answer', () => {
  const answerQuestionUseCase = new AnswerQuestionUseCase()

  const answer = answerQuestionUseCase.execute({
    instructorId: '1',
    questionId: '1',
    content: 'Nova resposta',
  })
  expect(answer.content).toEqual('Nova resposta')
})
