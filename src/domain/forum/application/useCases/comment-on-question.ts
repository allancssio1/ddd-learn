import { UniqueEntityId } from '@/core/entities/uniqueEntityId'
import { QuestionComment } from '../../enterprise/entities/QuestionComment'
import { QuestionCommentsRepsitory } from '../repositories/question-comments-repository'
import { QuestionsRepsitory } from '../repositories/questions-repository'

interface CommentOnQuestionUseCaseRequest {
  authorId: string
  questionId: string
  content: string
}
interface CommentOnQuestionUseCaseResponse {
  questionComment: QuestionComment
}

export class CommentOnQuestionUseCase {
  constructor(
    private questionRepository: QuestionsRepsitory,
    private questionCommentRepository: QuestionCommentsRepsitory,
  ) {}

  async execute({
    authorId,
    questionId,
    content,
  }: CommentOnQuestionUseCaseRequest): Promise<CommentOnQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId)

    if (!question) throw new Error('question not found')

    const questionComment = await this.questionCommentRepository.create(
      QuestionComment.create({
        authorId: new UniqueEntityId(authorId),
        content,
        questionId: question.id,
      }),
    )

    return { questionComment }
  }
}
