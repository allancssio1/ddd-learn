import { QuestionAttachment } from '../../enterprise/entities/QuestionAttachment'

export interface QuestionAttachmentRepository {
  findManyByQuestionId(questionId: string): Promise<QuestionAttachment[]>
}
