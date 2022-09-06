import { Router, RouterMiddleware } from "../deps.ts";
import { ResourceController } from "../controllers/resource.controller.ts";
import { auth } from "../middlewares/auth.middleware.ts";
import { validate } from "../middlewares/validate.middleware.ts";
import {
  createResourceValidation,
  getResourcesValidation,
  getResourceValidation,
  updateResourceValidation,
  deleteResourceValidation,
} from "../validations/resource.validation.ts";
import loggerMiddleware from "../middlewares/logger.middleware.ts";


const router = new Router();

router.post(
  "/api/resources",
  auth(['manageResources']),
  validate(createResourceValidation),
  ResourceController.create,
);

router.get(
  "/api/resources/:id/:version",
  auth([]),
  validate(getResourceValidation),
  ResourceController.fetchOne,
);
router.get(
  "/api/resources/:id",
  auth([]),
  validate(getResourceValidation),
  ResourceController.fetchOne,
);

router.get(
  '/api/resources/bulk/:id/:version',
  auth([]),
  validate(getResourceValidation),
  ResourceController.fetchChain
)

router.get(
  '/api/resources/bulk/:id',
  auth([]),
  validate(getResourceValidation),
  ResourceController.fetchChain
)

router.get(
  "/api/resources",
  auth([]),
  validate(getResourcesValidation),
  ResourceController.fetchAll,
);

router.put(
  "/api/resources/:id",
  auth(['manageResources']),
  validate(updateResourceValidation),
  ResourceController.update,
);

router.delete(
  "/api/resources/:id",
  auth(['manageResources']),
  validate(deleteResourceValidation),
  ResourceController.delete,
);

export default router;