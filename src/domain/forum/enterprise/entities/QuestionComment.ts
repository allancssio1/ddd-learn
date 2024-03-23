import { UniqueEntityId } from '@/core/entities/uniqueEntityId'
import { Optional } from '@/core/types/optional'
import { Comment, CommentProps } from './Comment'

export interface QeuestionCommentProps extends CommentProps {
  questionId: UniqueEntityId
}

export class QuestionComment extends Comment<QeuestionCommentProps> {
  get questionId() {
    return this.props.questionId
  }

  static create(
    props: Optional<QeuestionCommentProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const qeuestionComment = new QuestionComment(
      { ...props, createdAt: props.createdAt ?? new Date() },
      id,
    )

    return qeuestionComment
  }
}
