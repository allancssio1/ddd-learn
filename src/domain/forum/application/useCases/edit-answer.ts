import { Answer } from '../../enterprise/entities/Answer'
import { AnswerRepository } from '../repositories/answer-repository'

interface EditAnswerUseCaseProps {
  authorId: string
  answerId: string
  content: string
}

interface EditAnswerUseCaseResponse {
  answer: Answer
}
export class EditAnswerUseCase {
  constructor(private answerRepository: AnswerRepository) {}

  async execute({
    authorId,
    content,
    answerId,
  }: EditAnswerUseCaseProps): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) throw new Error('answer not found')

    if (answer.authorId.toString() !== authorId) throw new Error('Not allowed')

    answer.content = content

    await this.answerRepository.save(answer)

    return { answer }
  }
}
