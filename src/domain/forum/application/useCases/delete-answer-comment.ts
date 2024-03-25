import { AnswerCommentsRepsitory } from '../repositories/answer-comments-repository'

interface DeleteAnswerCommentUseCaseRequest {
  authorId: string
  answerCommentId: string
}

export class DeleteAnswerCommentUseCase {
  constructor(private answerCommentRepository: AnswerCommentsRepsitory) {}

  async execute({
    authorId,
    answerCommentId,
  }: DeleteAnswerCommentUseCaseRequest): Promise<void> {
    const answerComment =
      await this.answerCommentRepository.findById(answerCommentId)

    if (!answerComment) throw new Error('answer comment not found')

    if (answerComment.authorId.toString() !== authorId)
      throw new Error('Unauthorazed')

    await this.answerCommentRepository.delete(answerComment)
  }
}
