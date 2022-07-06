import { Router } from "../deps.ts";
import UserController from "../controllers/user.controller.ts";
import { auth } from "../middlewares/auth.middleware.ts";
import { validate } from "../middlewares/validate.middleware.ts";
import {
  deleteUserValidation,
  getUsersValidation,
  getUserValidation,
  updateUserValidation,
} from "../validations/user.validation.ts";

// deno-lint-ignore no-explicit-any
const router: any = new Router();

router.get(
  "/api/users",
  auth(["getUsers"]),
  validate(getUsersValidation),
  UserController.fetch,
);

router.get(
  "/api/users/:id",
  auth(["seeUsers"]),
  validate(getUserValidation),
  UserController.show,
);

router.put(
  "/api/users/:id",
  auth(["manageUsers"]),
  validate(updateUserValidation),
  UserController.update,
);

router.delete(
  "/api/users/:id",
  auth(["manageUsers"]),
  validate(deleteUserValidation),
  UserController.remove,
);

export default router;
