import { Either, left, right } from '@/core/Either'
import { QuestionsRepsitory } from '../repositories/questions-repository'
import { ResourceNotFoundError } from './errors/resource-not-found'
import { UnauthorazedError } from './errors/unauthorazed'

interface DeleteQuestionUseCaseProps {
  questionId: string
  authorId: string
}

type DeleteQuestionUseCaseResponse = Either<
  ResourceNotFoundError | UnauthorazedError,
  null
>
export class DeleteQuestionUseCase {
  constructor(private questionRepository: QuestionsRepsitory) {}

  async execute({
    questionId,
    authorId,
  }: DeleteQuestionUseCaseProps): Promise<DeleteQuestionUseCaseResponse> {
    const questionFound = await this.questionRepository.findById(questionId)

    if (!questionFound) return left(new ResourceNotFoundError())

    if (questionFound.authorId.toString() !== authorId)
      return left(new UnauthorazedError())

    await this.questionRepository.delete(questionFound)
    return right(null)
  }
}
