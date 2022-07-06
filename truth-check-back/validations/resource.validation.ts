import { yup } from "../deps.ts";

export const getResourcesValidation = {};

export const getResourceValidation = {
  params: yup.object({
    id: idValidation(),
  }),
};

export const deleteResourceValidation = {
  params: yup.object({
    id: idValidation(),
  }),
};

export const fetchResourcesValidation = {
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

export function foreignKeyValidation(collection: string[]) {
  return yup.object({
    referencedCollection: yup.string().required().oneOf(
      collection,
      `foreign key must reference one of ${collection}`,
    ),
    referencedResource: idValidation(),
  });
}

export function idValidation() {
  return yup.string().trim().length(24).required();
}
