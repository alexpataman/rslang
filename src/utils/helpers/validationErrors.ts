import { ValidationErrors } from '../../types/common';

export const isValid = (validationErrors: ValidationErrors, key: string) =>
  !!validationErrors[key];

export const getValidationErrorText = (
  validationErrors: ValidationErrors,
  key: string
) => validationErrors[key] || '';

export const resetFieldValidation = (
  validationErrors: ValidationErrors,
  key: string
) => {
  const result = { ...validationErrors };
  if (result[key]) {
    delete result[key];
  }
  return result;
};
