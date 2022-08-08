import { yup } from "../deps.ts";

export const createResourceValidation = {
  body: yup.object({
    name: yup.string(),
    description: yup.string(),
    imageURI: yup.string(),
    data: yup.object(),
    isPublic: yup.boolean()
  })
}

export const getResourcesValidation = {
  queries: yup.object({
    lastDate: yup.date().optional()
  })
};

export const getResourceValidation = {
  params: yup.object({
    id: idValidation(),
    version: yup.number().optional()
  }),
};

export const deleteResourceValidation = {
  params: yup.object({
    id: idValidation(),
  }),
};

export const updateResourceValidation = {
  params: yup.object({
    id: idValidation()
  }),
  body: yup.object({
    name: yup.string().optional(),
    description: yup.string().optional(),
    imageURI: yup.string().optional(),
    data: yup.object().optional(),
    isPublic: yup.boolean().optional()
  })
}

export function idValidation() {
  return yup.string().trim().length(24).required();
}
