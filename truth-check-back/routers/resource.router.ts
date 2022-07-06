import { Router, RouterContext } from "../deps.ts";
import { ResourceController } from "../controllers/resource.controller.ts";
import { auth } from "../middlewares/auth.middleware.ts";
import { validate } from "../middlewares/validate.middleware.ts";
// import { preUploadValidate, upload } from "../deps.ts";
import {
  deleteResourceValidation,
  fetchResourcesValidation,
  getResourcesValidation,
  getResourceValidation,
} from "../validations/resource.validation.ts";

// deno-lint-ignore no-explicit-any
const router: any = new Router();

router.post(
  "/api/resources",
  validate(fetchResourcesValidation),
  ResourceController.fetch,
);

export default router;
