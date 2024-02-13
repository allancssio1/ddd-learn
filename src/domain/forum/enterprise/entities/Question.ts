import { UniqueEntityId } from '../../../../core/entities/uniqueEntityId'
import { Slug } from './valueObjects/Slug'

import dayjs from 'dayjs'
import { Entity } from '../../../../core/entities/entity'
import { Optional } from '../../../../core/types/optional'

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

  set title(title: string) {
    this.props.title = title
    this.props.slug = Slug.createFromText(title)
    this.touch()
  }

  get content() {
    return this.props.content
  }

  set content(content: string) {
    this.content = content
    this.touch()
  }

  get bestAnswerId() {
    return this.props.bestAnswerId
  }

  set bestAnswerId(bestAnswerId: UniqueEntityId | undefined) {
    this.props.bestAnswerId = bestAnswerId
    this.touch()
  }

  get authorId() {
    return this.props.authorId
  }

  get slug() {
    return this.props.slug
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.slug
  }

  get isNew(): boolean {
    return dayjs().diff(this.createdAt, 'days') <= 3
  }

  get except() {
    return this.content.substring(0, 120).trimEnd().concat('...')
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(
    props: Optional<QuestionProps, 'createdAt' | 'slug'>,
    id?: UniqueEntityId,
  ) {
    const question = new Question(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.title),
        createdAt: new Date(),
      },
      id,
    )

    return question
  }
}
