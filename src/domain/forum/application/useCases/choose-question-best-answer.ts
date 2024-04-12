import { AnswerRepository } from '../repositories/answer-repository'
import { Question } from '../../enterprise/entities/Question'
import { QuestionsRepsitory } from '../repositories/questions-repository'
import { Either, left, right } from '@/core/Either'
import { UnauthorazedError } from '@/core/errors/errors/unauthorazed'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found'

interface ChooseQuestionBestAnswerUseCaseRequest {
  answerId: string
  authorId: string
}
type ChooseQuestionBestAnswerUseCaseResponse = Either<
  ResourceNotFoundError | UnauthorazedError,
  {
    question: Question
  }
>

export class ChooseQuestionBestAnswerUseCase {
  constructor(
    private answerRepository: AnswerRepository,
    private questionRepository: QuestionsRepsitory,
  ) {}

  async execute({
    answerId,
    authorId,
  }: ChooseQuestionBestAnswerUseCaseRequest): Promise<ChooseQuestionBestAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) return left(new ResourceNotFoundError())

    const question = await this.questionRepository.findById(
      answer.questionId.toString(),
    )

    if (!question) return left(new ResourceNotFoundError())

    if (authorId !== question.authorId.toString())
      return left(new UnauthorazedError())

    question.bestAnswerId = answer.id

    await this.questionRepository.save(question)

    return right({ question })
  }
}
