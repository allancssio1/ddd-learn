import { QuestionsRepsitory } from '../repositories/questions-repository'

interface EditQuestionUseCaseProps {
  authorId: string
  questionId: string
  title: string
  content: string
}
export class EditQuestionUseCase {
  constructor(private questionRepository: QuestionsRepsitory) {}

  async execute({
    authorId,
    title,
    content,
    questionId,
  }: EditQuestionUseCaseProps): Promise<void> {
    const quesiton = await this.questionRepository.findById(questionId)

    if (!quesiton) throw new Error('question not found')

    if (quesiton.authorId.toString() !== authorId)
      throw new Error('Not allowed')

    quesiton.title = title
    quesiton.content = content

    await this.questionRepository.save(quesiton)
  }
}
