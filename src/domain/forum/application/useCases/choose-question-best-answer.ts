import { AnswerRepository } from '../repositories/answer-repository'
import { Question } from '../../enterprise/entities/Question'
import { QuestionsRepsitory } from '../repositories/questions-repository'

interface ChooseQuestionBestAnswerUseCaseRequest {
  answerId: string
  authorId: string
}
interface ChooseQuestionBestAnswerUseCaseResponse {
  question: Question
}

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

    if (!answer) throw new Error('Answer not found')

    const question = await this.questionRepository.findById(
      answer.questionId.toString(),
    )

    if (!question) throw new Error('Question not found')

    if (authorId !== question.authorId.toString())
      throw new Error('Not allowed')

    question.bestAnswerId = answer.id

    await this.questionRepository.save(question)

    return { question }
  }
}
