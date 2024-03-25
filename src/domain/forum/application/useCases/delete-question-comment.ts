import { QuestionCommentsRepsitory } from '../repositories/question-comments-repository'

interface DeleteQuestionCommentUseCaseRequest {
  authorId: string
  questionCommentId: string
}

export class DeleteQuestionCommentUseCase {
  constructor(private questionCommentRepository: QuestionCommentsRepsitory) {}

  async execute({
    authorId,
    questionCommentId,
  }: DeleteQuestionCommentUseCaseRequest): Promise<void> {
    const questionComment =
      await this.questionCommentRepository.findById(questionCommentId)

    if (!questionComment) throw new Error('question comment not found')

    if (questionComment.authorId.toString() !== authorId)
      throw new Error('Unauthorazed')

    await this.questionCommentRepository.delete(questionComment)
  }
}
