import { Answer } from '../entities/Answer'
import { AnswerRepository } from '../repositories/answerRepository'

interface AnswerQuestionUseCaseRequest {
  instructorId: string
  questionId: string
  content: string
}

export class AnswerQuestionUseCase {
  constructor(private answerRepository: AnswerRepository) {}

  execute({ instructorId, questionId, content }: AnswerQuestionUseCaseRequest) {
    const answer = new Answer({ content, authorId: instructorId, questionId })

    this.answerRepository.create(answer)

    return answer
  }
}
