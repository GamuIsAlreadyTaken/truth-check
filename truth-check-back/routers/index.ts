import type { Application } from "../deps.ts";
import userRouter from "./user.router.ts";
import authRouter from "./auth.router.ts";
import resourceRouter from "./resource.router.ts";

const init = (app: Application) => {
  app.use(authRouter.routes());
  app.use(userRouter.routes());
  app.use(resourceRouter.routes());

  app.use(authRouter.allowedMethods());
  app.use(userRouter.allowedMethods());
  app.use(resourceRouter.allowedMethods());
};

export default {
  init,
};
