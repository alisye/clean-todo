import UseCase from "core/definition/UseCase";
import TodoEntityGateway from "core/usecases/todo/TodoEntityGateway";
import CreateTodoRequestDTO from "core/usecases/todo/createTodo/CreateTodoRequestDTO";
import CreateTodoResponseDTO from "core/usecases/todo/createTodo/CreateTodoResponseDTO";
import { CreateTodoInvalidRequest } from "core/usecases/todo/createTodo/errors";
import { Right, Left } from "purify-ts/Either";

class CreateTodoUseCase
  implements UseCase<CreateTodoRequestDTO, CreateTodoResponseDTO> {
  private todosEntityGateway: TodoEntityGateway;

  constructor(todosEntityGateway: TodoEntityGateway) {
    this.todosEntityGateway = todosEntityGateway;
  }

  async execute(request: CreateTodoRequestDTO): Promise<CreateTodoResponseDTO> {
    if (!request.title) {
      return Left(new CreateTodoInvalidRequest(request));
    }

    const todo = await this.todosEntityGateway.createTodo(request);

    return Right(todo);
  }
}

export default CreateTodoUseCase;
