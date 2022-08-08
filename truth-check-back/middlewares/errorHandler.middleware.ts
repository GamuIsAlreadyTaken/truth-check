import { Context, State, Status } from "../deps.ts";
import type { Err } from "../types/types.ts";

/**
 * Throws Error with provided params
 * @param options
 * @throws Error Throws Error
 */
export const throwError = (options: Err) => {
  throw options;
};

/**
 * Error Handler Middleware function
 * @param ctx
 * @param next
 * @returns Promise<void>
 */
export const errorHandler = async (
  ctx: Context<State, Record<string, unknown>>,
  next: () => Promise<unknown>,
): Promise<void> => {
  try {
    await next();
  } catch (err) {
    const { message, name, path, type } = err;
    const status = err.status || err.statusCode || Status.InternalServerError;

    ctx.response.status = status;
    ctx.response.body = { message, name, path, type, status };
  }
};
