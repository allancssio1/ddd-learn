import { Question } from '../../enterprise/entities/Question'
import { QuestionsRepsitory } from '../repositories/questions-repository'

export class DeleteQuestionUseCase {
  constructor(private questionRepository: QuestionsRepsitory) {}

  async execute(question: Question): Promise<void> {
    const questionFound = await this.questionRepository.findById(
      question.id.toValue(),
    )
    if (!questionFound) {
      throw new Error('question not found')
    }
    await this.questionRepository.delete(questionFound)
  }
}
