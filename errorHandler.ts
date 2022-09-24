import { Application, isHttpError, Status } from "./deps.ts";

function errorHandler(app: Application<Record<string, unknown>>) {
  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      if (isHttpError(err)) {
        switch (err.status) {
          case Status.BadRequest:
            ctx.response.status = 400;
            ctx.response.body = err.message;
            break;
          case Status.NotFound:
            ctx.response.status = 404;
            ctx.response.body = "Not Found";
            break;
          case Status.InternalServerError:
            ctx.response.status = 500;
            ctx.response.body = "Internal Server Error";
            break;
          default:
            // handle other statuses
        }
      } else {
        // rethrow if you can't handle the error
        throw err;
      }
    }
  });
}

export default errorHandler;
