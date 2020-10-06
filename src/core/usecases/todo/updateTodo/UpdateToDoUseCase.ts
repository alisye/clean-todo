import UpdateTodoRequestDTO from "core/usecases/todo/updateTodo/UpdateTodoRequestDTO";
import UpdateTodoResponseDTO from "core/usecases/todo/updateTodo/UpdateTodoResponseDTO";
import UseCase from "core/definition/UseCase";
import TodoEntityGateway from "core/usecases/todo/TodoEntityGateway";
import {
  TodoNotFound,
  UpdateTodoInvalidRequest,
} from "core/usecases/todo/updateTodo/errors";
import { Todo } from "core/entities";
import { Left, Right } from "purify-ts/Either";

class UpdateTodoUseCase
  implements UseCase<UpdateTodoRequestDTO, UpdateTodoResponseDTO> {
  private todosEntityGateway: TodoEntityGateway;

  constructor(todosEntityGateway: TodoEntityGateway) {
    this.todosEntityGateway = todosEntityGateway;
  }

  async execute(request: UpdateTodoRequestDTO): Promise<UpdateTodoResponseDTO> {
    if (!request.todoId) {
      return Left(new UpdateTodoInvalidRequest(request));
    }

    const { todoId } = request;

    const todo = await this.todosEntityGateway.getTodo(todoId);

    if (!todo) {
      return Left(new TodoNotFound(todoId));
    } else {
      const payload: Todo = { ...todo, ...request };
      const result = await this.todosEntityGateway.updateTodo(payload);
      return !result ? Left(new TodoNotFound(todoId)) : Right(result);
    }
  }
}

export default UpdateTodoUseCase;
