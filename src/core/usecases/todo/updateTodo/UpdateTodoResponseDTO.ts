import { Todo } from "core/entities";
import {
  TodoNotFound,
  UpdateTodoInvalidRequest,
} from "core/usecases/todo/updateTodo/errors";
import { Either } from "purify-ts/Either";

type UpdateTodoResponseDTO = Either<
  TodoNotFound | UpdateTodoInvalidRequest,
  Todo
>;

export default UpdateTodoResponseDTO;
