import { Todo } from "core/entities";
import { CreateTodoInvalidRequest } from "core/usecases/todo/createTodo/errors";
import { Either } from "purify-ts/Either";

type CreateTodoResponseDTO = Either<CreateTodoInvalidRequest, Todo>;

export default CreateTodoResponseDTO;
