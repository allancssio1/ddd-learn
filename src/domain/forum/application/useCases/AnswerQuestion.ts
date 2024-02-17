import { UniqueEntityId } from '@/core/entities/uniqueEntityId'
import { Answer } from '../../enterprise/entities/Answer'
import { AnswerRepository } from '../repositories/answer-repository'

interface AnswerQuestionUseCaseRequest {
  instructorId: string
  questionId: string
  content: string
}

export class AnswerQuestionUseCase {
  constructor(private answerRepository: AnswerRepository) {}

  execute({ instructorId, questionId, content }: AnswerQuestionUseCaseRequest) {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityId(instructorId),
      questionId: new UniqueEntityId(questionId),
    })

    this.answerRepository.create(answer)

    return answer
  }
}
