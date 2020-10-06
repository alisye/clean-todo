import { Todo } from "core/entities";
import { GetTodosInvalidRequest } from "core/usecases/todo/getTodos/errors";
import { Either } from "purify-ts/Either";

type GetTodosResponseDTO = Either<GetTodosInvalidRequest, Todo[]>;

export default GetTodosResponseDTO;
