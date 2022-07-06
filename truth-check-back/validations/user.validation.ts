import { yup } from "../deps.ts";
import { foreignKeyValidation, idValidation } from "./resource.validation.ts";

export const createUserValidation = {
  body: yup.object({
    email: yup
      .string()
      .email()
      .trim()
      .required(`email is required`),
    password: yup
      .string()
      .required(`password is required`)
      .max(255),
    name: yup
      .string()
      .min(1)
      .max(255)
      .trim()
      .required(`name is required`),
  }),
};

export const meValidation = {};

export const getUserValidation = {
  params: yup.object({
    id: yup
      .string()
      .required()
      .trim(),
  }),
};

/* Strict Validation
* This will validate any invalid query params
* e.g. /users?some-invalid-query=shouldnt_allow
* */
export const getUsersValidation = {};
export const updateMeValidation = {
  body: yup.object({
    name: yup
      .string()
      .min(1)
      .max(255)
      .trim(),
    isDisabled: yup
      .bool(),
    likedResources: yup
      .object({
        add: yup
          .array(
            foreignKeyValidation(["actors", "effects", "items", "stages"]),
          ),
        remove: yup
          .array(
            foreignKeyValidation(["actors", "effects", "items", "stages"]),
          ),
      }),
  }),
};
export const updateUserValidation = {
  params: yup.object({
    id: idValidation(),
  }),
  body: yup.object({
    name: yup
      .string()
      .min(1)
      .max(255)
      .trim(),
    isDisabled: yup
      .bool(),
    likedResources: yup
      .object({
        add: yup
          .array(
            foreignKeyValidation(["actors", "effects", "items", "stages"]),
          ),
        remove: yup
          .array(
            foreignKeyValidation(["actors", "effects", "items", "stages"]),
          ),
      }),
  }),
};
export const deleteMeValidation = {};
export const deleteUserValidation = {
  params: yup.object({
    id: yup
      .string()
      .required()
      .trim(),
  }),
};
