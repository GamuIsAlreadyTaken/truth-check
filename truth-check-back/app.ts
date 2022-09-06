import { Application } from "./deps.ts";
import { errorHandler } from "./middlewares/errorHandler.middleware.ts";
import { atp } from "./middlewares/atp.middleware.ts";
import configs from "./config/config.ts";
import router from "./routers/index.ts";

const { env, port} = configs;

const app: Application = new Application();

app.use(errorHandler)
app.use(atp)
router.init(app)

// app.addEventListener("listen", () => {
//   log.info(`Current Environment: ${env}`);
//   log.info(`Server listening at ${url}`);
// });

if (import.meta.main) {
  await app.listen({ port });
}
export { app };
