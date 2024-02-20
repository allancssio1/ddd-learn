import { Question } from '../../enterprise/entities/Question'
import { QuestionsRepsitory } from '../repositories/questions-repository'

interface EditQuestionUseCaseProps {
  authorId: string
  questionId: string
  title: string
  content: string
}

interface EditQuestionUseCaseResponse {
  question: Question
}
export class EditQuestionUseCase {
  constructor(private questionRepository: QuestionsRepsitory) {}

  async execute({
    authorId,
    title,
    content,
    questionId,
  }: EditQuestionUseCaseProps): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId)

    if (!question) throw new Error('question not found')

    if (question.authorId.toString() !== authorId)
      throw new Error('Not allowed')

    question.title = title
    question.content = content

    await this.questionRepository.save(question)

    return { question }
  }
}
