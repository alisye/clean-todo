import { Todo } from "core/entities";
import { EitherAsync } from "purify-ts";

export interface CreateTodoPayload {
  title: string;
  tags: string[];
}

interface TodoEntityGateway {
  getTodo(todoId: string): EitherAsync<undefined, Todo>;

  updateTodo(todo: Todo): EitherAsync<undefined, Todo>;

  createTodo(payload: CreateTodoPayload): Promise<Todo>;

  getTodos(tag?: string): Promise<Todo[]>;
}

export default TodoEntityGateway;
