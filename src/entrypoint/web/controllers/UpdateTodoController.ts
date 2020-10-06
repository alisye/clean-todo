import { Response } from "express";

import BaseController from "entrypoint/web/definitions/Controller";
import { DecodedExpressRequest } from "entrypoint/web/util/DecodedExpressRequest";
import {
  UpdateTodoUseCase,
  UpdateTodoRequestDTO,
  UpdateTodoInvalidRequest,
  TodoNotFound,
} from "core/usecases/todo";
import UpdateTodoResponseDTO from "core/usecases/todo/updateTodo/UpdateTodoResponseDTO";
import { assertUnreachable } from "core/helpers";

class UpdateTodoController extends BaseController<UpdateTodoUseCase> {
  protected async processRequst(
    req: DecodedExpressRequest,
    res: Response
  ): Promise<void> {
    const errorOrTodo: UpdateTodoResponseDTO = await this.usecase.execute(
      req.body as UpdateTodoRequestDTO
    );

    return errorOrTodo.caseOf({
      Left: (error) => {
        if (error instanceof UpdateTodoInvalidRequest) {
          this.badRequest(res, error.message);
          return;
        } else if (error instanceof TodoNotFound) {
          this.notFound(res, error.message);
          return;
        }

        assertUnreachable(error);
      },
      Right: (todo) => this.ok(res, todo),
    });
  }
}

export default UpdateTodoController;
