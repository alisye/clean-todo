import UseCase from "core/definition/UseCase";
import { Right } from "purify-ts/Either";
import { TodoEntityGateway } from "..";
import GetTodosRequestDTO from "./GetTodosRequestDTO";
import GetTodosResponseDTO from "./GetTodosResponseDTO";

class GetTodosUseCase
  implements UseCase<GetTodosRequestDTO, GetTodosResponseDTO> {
  private todosEntityGateway: TodoEntityGateway;

  constructor(todosEntityGateway: TodoEntityGateway) {
    this.todosEntityGateway = todosEntityGateway;
  }

  async execute(request: GetTodosRequestDTO): Promise<GetTodosResponseDTO> {
    const { filterByTag } = request;
    const todos = await this.todosEntityGateway.getTodos(filterByTag);

    return Right(todos);
  }
}

export default GetTodosUseCase;
