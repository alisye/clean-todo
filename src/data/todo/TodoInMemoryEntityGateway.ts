import { TodoEntityGateway, CreateTodoPayload } from "core/usecases/todo";
import { Todo } from "core/entities";
import { EitherAsync } from "purify-ts";

class TodoInMemoryEntityGateway implements TodoEntityGateway {
  #todos: Todo[];

  constructor() {
    this.#todos = [];
  }

  getTodo(todoId: string): EitherAsync<undefined, Todo> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return EitherAsync(async ({ liftEither, fromPromise, throwE }) => {
      const result = this.#todos.find((t) => t.todoId === todoId);
      return result || throwE(undefined);
    });
  }

  updateTodo(todo: Todo): EitherAsync<undefined, Todo> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return EitherAsync(async ({ liftEither, fromPromise, throwE }) => {
      const index = this.#todos.findIndex(
        (t: Todo) => t.todoId === todo.todoId
      );
      this.#todos[index] = todo;
      return todo || throwE(undefined);
    });
  }

  async createTodo(payload: CreateTodoPayload): Promise<Todo> {
    const todo: Todo = {
      ...payload,
      isArchived: false,
      isDone: false,
      todoId: Date.now.toString(),
    };

    this.#todos.push(todo);

    return todo;
  }

  async getTodos(tag?: string | undefined): Promise<Todo[]> {
    if (tag) {
      return this.#todos.filter((t) => t.tags.includes(tag));
    }
    return this.#todos;
  }
}

export default TodoInMemoryEntityGateway;
