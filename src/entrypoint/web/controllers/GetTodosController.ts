import { Response } from "express";
import BaseController from "entrypoint/web/definitions/Controller";
import { DecodedExpressRequest } from "entrypoint/web/util/DecodedExpressRequest";
import GetTodosUseCase from "core/usecases/todo/getTodos/GetTodosUseCase";
import GetTodosRequestDTO from "core/usecases/todo/getTodos/GetTodosRequestDTO";
import GetTodosResponseDTO from "core/usecases/todo/getTodos/GetTodosResponseDTO";
import { GetTodosInvalidRequest } from "core/usecases/todo/getTodos";
import { assertUnreachable } from "core/helpers";

class GetTodosController extends BaseController<GetTodosUseCase> {
  protected async processRequst(
    req: DecodedExpressRequest,
    res: Response
  ): Promise<void> {
    const { filterByTag } = req.params;
    const requst: GetTodosRequestDTO = { filterByTag };

    const errorOrTodo: GetTodosResponseDTO = await this.usecase.execute(requst);

    return errorOrTodo.caseOf({
      Left: (error) => {
        if (error instanceof GetTodosInvalidRequest) {
          this.badRequest(res, error.message);
          return;
        }

        assertUnreachable(error);
      },
      Right: (todoList) => this.ok(res, todoList),
    });
  }
}

export default GetTodosController;
