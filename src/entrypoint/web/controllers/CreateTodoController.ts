import { Response } from "express";
import BaseController from "entrypoint/web/definitions/Controller";
import { DecodedExpressRequest } from "entrypoint/web/util/DecodedExpressRequest";
import {
  CreateTodoResponseDTO,
  CreateTodoInvalidRequest,
  CreateTodoUseCase,
} from "core/usecases/todo";
import { assertUnreachable } from "core/helpers";

class CreateTodoController extends BaseController<CreateTodoUseCase> {
  protected async processRequst(
    req: DecodedExpressRequest,
    res: Response
  ): Promise<void> {
    const errorOrTodo: CreateTodoResponseDTO = await this.usecase.execute(
      req.body
    );

    return errorOrTodo.caseOf({
      Left: (error) => {
        if (error instanceof CreateTodoInvalidRequest) {
          this.badRequest(res, error.message);
          return;
        }

        assertUnreachable(error);
      },
      Right: (todo) => this.ok(res, todo),
    });
  }
}

export default CreateTodoController;
