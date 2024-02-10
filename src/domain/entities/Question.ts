import { Slug } from './valueObjects/Slug'
import { Entity } from '../../core/entities/entity'
import { UniqueEntityId } from '../../core/entities/uniqueEntityId'
import { Optional } from '../../core/types/optional'

interface QuestionProps {
  authorId: UniqueEntityId
  bestAnswerId?: UniqueEntityId
  title: string
  content: string
  slug: Slug
  createdAt: Date
  updatedAt?: Date
}

export class Question extends Entity<QuestionProps> {
  get title() {
    return this.props.title
  }
  get content() {
    return this.props.content
  }
  get authorId() {
    return this.props.authorId
  }
  get slug() {
    return this.props.slug
  }
  get createdAt() {
    return this.props.slug
  }
  get updatedAt() {
    return this.props.slug
  }

  static create(
    props: Optional<QuestionProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const question = new Question({ ...props, createdAt: new Date() }, id)

    return question
  }
}
