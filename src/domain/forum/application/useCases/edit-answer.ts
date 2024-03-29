import { Either, left, right } from '@/core/Either'
import { Answer } from '../../enterprise/entities/Answer'
import { AnswerRepository } from '../repositories/answer-repository'
import { ResourceNotFoundError } from './errors/resource-not-found'
import { UnauthorazedError } from './errors/unauthorazed'
import { AnswerAttachmentRepository } from '../repositories/answer-attachments-repository'
import { AnswerAttachmentList } from '../../enterprise/entities/AnswerAttachmentList'
import { UniqueEntityId } from '@/core/entities/uniqueEntityId'
import { AnswerAttachment } from '../../enterprise/entities/AnswerAttachment'

interface EditAnswerUseCaseProps {
  authorId: string
  answerId: string
  content: string
  attachmentsIds: string[]
}

type EditAnswerUseCaseResponse = Either<
  ResourceNotFoundError | UnauthorazedError,
  {
    answer: Answer
  }
>
export class EditAnswerUseCase {
  constructor(
    private answerRepository: AnswerRepository,
    private answerAttachmentsRepository: AnswerAttachmentRepository,
  ) {}

  async execute({
    authorId,
    content,
    answerId,
    attachmentsIds,
  }: EditAnswerUseCaseProps): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) return left(new ResourceNotFoundError())

    if (answer.authorId.toString() !== authorId)
      return left(new UnauthorazedError())

    const currentAnswerAttachments =
      await this.answerAttachmentsRepository.findManyByAnswerId(answerId)
    const answerAttachmentList = new AnswerAttachmentList(
      currentAnswerAttachments,
    )

    const answerAttachmens = attachmentsIds.map((attachmentId) => {
      return AnswerAttachment.create({
        attachmentId: new UniqueEntityId(attachmentId),
        answerId: answer.id,
      })
    })

    answerAttachmentList.update(answerAttachmens)

    answer.content = content
    answer.attachments = answerAttachmens

    await this.answerRepository.save(answer)

    return right({ answer })
  }
}
