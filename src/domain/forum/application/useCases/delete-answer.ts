import { AnswerRepository } from '../repositories/answer-repository'

interface DeleteAnswerUseCaseProps {
  answerId: string
  authorId: string
}
export class DeleteAnswerUseCase {
  constructor(private answerRepository: AnswerRepository) {}

  async execute({
    answerId,
    authorId,
  }: DeleteAnswerUseCaseProps): Promise<void> {
    const answerFound = await this.answerRepository.findById(answerId)

    if (!answerFound) throw new Error('answer not found')

    if (answerFound.authorId.toString() !== authorId)
      throw new Error('Unauthorazed')

    await this.answerRepository.delete(answerFound)
  }
}
