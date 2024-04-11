import { Notification } from '@/domain/notification/enterprise/entities/notification'
import { NotificationsRepository } from '../domain/notification/application/repositories/notirications-repository'

export class NotificationsRepositoryInMemory
  implements NotificationsRepository
{
  items: Notification[] = []

  async create(notification: Notification) {
    await this.items.push(notification)
  }
}
