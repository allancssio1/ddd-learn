import { randomUUID } from 'node:crypto'
import { Slug } from './valueObjects/Slug'

interface QuestionProps {
  title: string
  content: string
  authorId: string
  slug: Slug
}

export class Question {
  public id: string
  public title: string
  public content: string
  public authorId: string
  public slug: Slug

  constructor(props: QuestionProps, id?: string) {
    this.content = props.content
    this.title = props.title
    this.authorId = props.authorId
    this.slug = props.slug
    this.id = id ?? randomUUID()
  }
}
