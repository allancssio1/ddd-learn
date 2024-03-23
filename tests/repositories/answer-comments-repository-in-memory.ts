// import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswerCommentRepository } from '../domain/forum/application/repositories/answer-comments-repository'
import { AnswerComment } from '../domain/forum/enterprise/entities/AnswerComment'

export class AnswerCommentsRepositoryInMemory
  implements AnswerCommentRepository
{
  items: AnswerComment[] = []
  async create(answerComment: AnswerComment) {
    await this.items.push(answerComment)
    return answerComment
  }

  // async findBySlug(slug: string) {
  //   const answer = await this.items.find((item) => item.slug.value === slug)

  //   if (!answer) return null

  //   return answer
  // }

  // async delete(answer: Answer) {
  //   const itemIndex = this.items.findIndex((item) => item.id === answer.id)

  //   await this.items.splice(itemIndex, 1)
  // }

  // async findById(answerId: string) {
  //   const answer = await this.items.find(
  //     (item) => item.id.toValue() === answerId,
  //   )
  //   return answer ?? null
  // }

  // async findManyRecents({ page }: PaginationParams) {
  //   const answers = await this.items
  //     .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
  //     .slice((page - 1) * 20, page * 20)
  //   return answers
  // }

  // async save(answer: Answer) {
  //   const itemIndex = this.items.findIndex((item) => item.id === answer.id)

  //   this.items[itemIndex] = answer
  // }
}
