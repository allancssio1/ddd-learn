// import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswerComment } from '../../enterprise/entities/AnswerComment'

export interface AnswerCommentRepository {
  create(answercomment: AnswerComment): Promise<AnswerComment>
  // delete(answercomment: AnswerComment): Promise<void>
  // save(answercomment: AnswerComment): Promise<void>
  // findById(answercommentId: string): Promise<AnswerComment | null>
  // findManyByQuestionId(
  //   questionId: string,
  //   params: PaginationParams,
  // ): Promise<AnswerComment[] | []>
}
