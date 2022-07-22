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

export const getResourcesValidation = {};

export const getResourceValidation = {
  query: yup.object({
    id: idValidation(),
  }),
};

export const deleteResourceValidation = {
  query: yup.object({
    id: idValidation(),
  }),
};

export const updateResourceValidation = {
  query: yup.object({
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

export const getResourcesInBulkValidation = { // TODO: continue with this
  body: yup.object({
    bulk: yup.lazy((val: any) => {
      const obj: any = {};
      for (const key in val) {
        obj[key] = yup.array(idValidation());
      }
      return yup.object(obj);
    }),
  }),
};

export function idValidation() {
  return yup.string().trim().length(24).required();
}
