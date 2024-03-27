import { Either, left, right } from '@/core/Either'
import { Question } from '../../enterprise/entities/Question'
import { QuestionsRepsitory } from '../repositories/questions-repository'
import { ResourceNotFoundError } from './errors/resource-not-found'
import { UnauthorazedError } from './errors/unauthorazed'

interface EditQuestionUseCaseProps {
  authorId: string
  questionId: string
  title: string
  content: string
}

type EditQuestionUseCaseResponse = Either<
  ResourceNotFoundError | UnauthorazedError,
  {
    question: Question
  }
>
export class EditQuestionUseCase {
  constructor(private questionRepository: QuestionsRepsitory) {}

  async execute({
    authorId,
    title,
    content,
    questionId,
  }: EditQuestionUseCaseProps): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId)

    if (!question) return left(new ResourceNotFoundError())

    if (question.authorId.toString() !== authorId)
      return left(new UnauthorazedError())

    question.title = title
    question.content = content

    await this.questionRepository.save(question)

    return right({ question })
  }
}
