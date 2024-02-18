import { QuestionsRepsitory } from '../repositories/questions-repository'

interface DeleteQuestionUseCaseProps {
  questionId: string
  authorId: string
}
export class DeleteQuestionUseCase {
  constructor(private questionRepository: QuestionsRepsitory) {}

  async execute({
    questionId,
    authorId,
  }: DeleteQuestionUseCaseProps): Promise<void> {
    const questionFound = await this.questionRepository.findById(questionId)

    if (!questionFound) throw new Error('question not found')

    if (questionFound.authorId.toString() !== authorId)
      throw new Error('Unauthorazed')

    await this.questionRepository.delete(questionFound)
  }
}
