import { DomainEvents } from '@/core/events/domain-events'
import { EventHandler } from '@/core/events/event-handler'
import { AnsewrCreatedEvent } from '@/domain/forum/enterprise/events/answer-created-event'

export class OnAnswerCreated implements EventHandler {
  constructor() {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendNewAnswerNotification.bind(this),
      AnsewrCreatedEvent.name,
    )
  }

  private async sendNewAnswerNotification({ answer }: AnsewrCreatedEvent) {
    console.log('chamou')
  }
}
