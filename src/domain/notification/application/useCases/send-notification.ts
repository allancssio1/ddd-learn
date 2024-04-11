import { UniqueEntityId } from '@/core/entities/uniqueEntityId'
import { Either, right } from '@/core/Either'
import { Notification } from '../../enterprise/entities/notification'
import { NotificationsRepository } from '../repositories/notirications-repository'

interface SendNotificationUseCaseRequest {
  recipientId: string
  title: string
  content: string
}
type SendNotificationUseCaseResponse = Either<
  null,
  {
    notification: Notification
  }
>

export class SendNotificationUseCase {
  constructor(private notificationRepository: NotificationsRepository) {}

  async execute({
    recipientId,
    content,
    title,
  }: SendNotificationUseCaseRequest): Promise<SendNotificationUseCaseResponse> {
    const notification = Notification.create({
      recipientId: new UniqueEntityId(recipientId),
      title,
      content,
    })

    this.notificationRepository.create(notification)

    return right({ notification })
  }
}
