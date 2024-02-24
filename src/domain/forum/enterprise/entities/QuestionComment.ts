import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/uniqueEntityId'
import { Optional } from '@/core/types/optional'

export interface QeuestionCommentProps {
  authorId: UniqueEntityId
  qeuestionId: UniqueEntityId
  content: string
  createdAt: Date
  updatedAt?: Date
}

export class QeuestionComment extends Entity<QeuestionCommentProps> {
  get content() {
    return this.props.content
  }

  set content(content: string) {
    this.props.content = content
    this.touch()
  }

  get authorId() {
    return this.props.authorId
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(
    props: Optional<QeuestionCommentProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const qeuestionComment = new QeuestionComment(
      { ...props, createdAt: props.createdAt ?? new Date() },
      id,
    )

    return qeuestionComment
  }
}
