import { Entity } from '../../core/entities/entity'
import { UniqueEntityId } from '../../core/entities/uniqueEntityId'
import { Optional } from '../../core/types/optional'

interface AnswerProps {
  authorId: UniqueEntityId
  questionId: UniqueEntityId
  content: string
  createdAt: Date
  updatedAt?: Date
}

export class Answer extends Entity<AnswerProps> {
  get content() {
    return this.props.content
  }
  get authorId() {
    return this.props.authorId
  }
  get questionId() {
    return this.props.questionId
  }

  static create(
    props: Optional<AnswerProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const answer = new Answer({ ...props, createdAt: new Date() }, id)

    return answer
  }
}
