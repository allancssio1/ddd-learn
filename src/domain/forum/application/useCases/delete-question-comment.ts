import { Either, left, right } from '@/core/Either'
import { QuestionCommentsRepsitory } from '../repositories/question-comments-repository'
import { ResourceNotFoundError } from './errors/resource-not-found'
import { UnauthorazedError } from './errors/unauthorazed'

interface DeleteQuestionCommentUseCaseRequest {
  authorId: string
  questionCommentId: string
}

type DeleteQuestionCommentUseCaseResponse = Either<
  ResourceNotFoundError | UnauthorazedError,
  null
>

export class DeleteQuestionCommentUseCase {
  constructor(private questionCommentRepository: QuestionCommentsRepsitory) {}

  async execute({
    authorId,
    questionCommentId,
  }: DeleteQuestionCommentUseCaseRequest): Promise<DeleteQuestionCommentUseCaseResponse> {
    const questionComment =
      await this.questionCommentRepository.findById(questionCommentId)

    if (!questionComment) return left(new ResourceNotFoundError())

    if (questionComment.authorId.toString() !== authorId)
      return left(new UnauthorazedError())

    await this.questionCommentRepository.delete(questionComment)
    return right(null)
  }
}
