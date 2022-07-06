import AuthController from "../controllers/auth.controller.ts";
import UserController from "../controllers/user.controller.ts";
import { Router } from "../deps.ts";
import { auth } from "../middlewares/auth.middleware.ts";
import { validate } from "../middlewares/validate.middleware.ts";
import {
  loginValidation,
  refreshTokenValidation,
} from "../validations/auth.validation.ts";
import {
  createUserValidation,
  deleteMeValidation,
  meValidation,
  updateMeValidation,
} from "../validations/user.validation.ts";

// deno-lint-ignore no-explicit-any
const router: any = new Router();

router.post(
  "/api/auth/login",
  validate(loginValidation),
  AuthController.login,
);

router.post(
  "/api/auth/refresh",
  validate(refreshTokenValidation),
  AuthController.refreshTokens,
);

router.post(
  "/api/auth/me",
  validate(createUserValidation),
  UserController.create,
);

router.get(
  "/api/auth/me",
  auth(["manageMe"]),
  validate(meValidation),
  UserController.me,
);

router.put(
  "/api/auth/me",
  auth(["manageMe"]),
  validate(updateMeValidation),
  UserController.updateMe,
);

router.delete(
  "/api/auth/me",
  auth(["manageMe"]),
  validate(deleteMeValidation),
  UserController.removeMe,
);

export default router;
