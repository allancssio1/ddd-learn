import { UniqueEntityId } from '@/core/entities/uniqueEntityId'
import { AnswerComment } from '../../enterprise/entities/AnswerComment'
import { AnswerCommentRepository } from '../repositories/answer-comments-repository'
import { AnswerRepository } from '../repositories/answer-repository'

interface CommentOnAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
}
interface CommentOnAnswerUseCaseResponse {
  answerComment: AnswerComment
}

export class CommentOnAnswerUseCase {
  constructor(
    private answerRepository: AnswerRepository,
    private answerCommentRepository: AnswerCommentRepository,
  ) {}

  async execute({
    authorId,
    answerId,
    content,
  }: CommentOnAnswerUseCaseRequest): Promise<CommentOnAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) throw new Error('answer not found')

    const answerComment = await this.answerCommentRepository.create(
      AnswerComment.create({
        authorId: new UniqueEntityId(authorId),
        content,
        answerId: answer.id,
      }),
    )

    return { answerComment }
  }
}
