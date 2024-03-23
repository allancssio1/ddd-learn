// import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionCommentsRepsitory } from '../domain/forum/application/repositories/question-comments-repository'
import { QuestionComment } from '../domain/forum/enterprise/entities/QuestionComment'

export class QuestionCommentsRepositoryInMemory
  implements QuestionCommentsRepsitory
{
  items: QuestionComment[] = []
  async create(questionComment: QuestionComment) {
    await this.items.push(questionComment)
    return questionComment
  }

  // async findBySlug(slug: string) {
  //   const question = await this.items.find((item) => item.slug.value === slug)

  //   if (!question) return null

  //   return question
  // }

  // async delete(question: Question) {
  //   const itemIndex = this.items.findIndex((item) => item.id === question.id)

  //   await this.items.splice(itemIndex, 1)
  // }

  // async findById(questionId: string) {
  //   const question = await this.items.find(
  //     (item) => item.id.toValue() === questionId,
  //   )
  //   return question ?? null
  // }

  // async findManyRecents({ page }: PaginationParams) {
  //   const questions = await this.items
  //     .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
  //     .slice((page - 1) * 20, page * 20)
  //   return questions
  // }

  // async save(question: Question) {
  //   const itemIndex = this.items.findIndex((item) => item.id === question.id)

  //   this.items[itemIndex] = question
  // }
}