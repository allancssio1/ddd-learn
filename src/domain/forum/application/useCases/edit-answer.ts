import { AnswerRepository } from '../repositories/answer-repository'

interface EditAnswerUseCaseProps {
  authorId: string
  answerId: string
  content: string
}
export class EditAnswerUseCase {
  constructor(private answerRepository: AnswerRepository) {}

  async execute({
    authorId,
    content,
    answerId,
  }: EditAnswerUseCaseProps): Promise<void> {
    const quesiton = await this.answerRepository.findById(answerId)

    if (!quesiton) throw new Error('answer not found')

    if (quesiton.authorId.toString() !== authorId)
      throw new Error('Not allowed')

    quesiton.content = content

    await this.answerRepository.save(quesiton)
  }
}
