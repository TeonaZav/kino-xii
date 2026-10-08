import type { FieldValues, Path, UseFormSetError } from "react-hook-form";

const API_FIELD_MAP: Record<string, string> = {
  password_confirmation: "passwordConfirmation",
};

export const applyApiValidationErrors = <T extends FieldValues>(
  errors: Record<string, string[]>,
  setError: UseFormSetError<T>,
) => {
  Object.entries(errors).forEach(([apiField, messages]) => {
    const message = messages[0];

    if (!message) {
      return;
    }

    const formField = API_FIELD_MAP[apiField] ?? apiField;

    setError(formField as Path<T>, {
      type: "server",
      message,
    });
  });
};
