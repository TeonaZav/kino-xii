"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, FormProvider, useForm } from "react-hook-form";

import useAuth from "../../hooks/useAuth";
import useAuthMutations from "../../hooks/useAuthMutations";

import { AlertMessage, Button, Input } from "@/src/components/ui";
import AuthSwitch from "../AuthSwitch";
import AvatarUpload from "./AvatarUpload";

import {
  signUpSchema,
  type SignUpFormValues,
} from "../../schemas/signUpSchema";

import { handleAuthFormError } from "@/src/lib/utils/auth";
import { FEEDBACK_MESSAGES } from "@/src/lib/constants/messages";

const SignUpForm = () => {
  const { openLogin } = useAuth();
  const { mutations, loading, success } = useAuthMutations();

  const methods = useForm<SignUpFormValues>({
    resolver: yupResolver(signUpSchema),
    mode: "onChange",
    defaultValues: {
      username: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      avatar: null,
    },
  });

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isValid },
  } = methods;

  const isProcessing = isSubmitting || loading.signUp || success.signUp;

  const onSubmit = async (values: SignUpFormValues) => {
    try {
      await mutations.signUp(values);
    } catch (error) {
      handleAuthFormError({
        error,
        setError,
        fallbackMessage: "Unable to create account.",
      });
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
        noValidate
      >
        {errors.root?.message && !success.signUp && (
          <AlertMessage variant="error">{errors.root.message}</AlertMessage>
        )}

        {success.signUp && (
          <AlertMessage variant="success">
            {FEEDBACK_MESSAGES.auth.signup}
          </AlertMessage>
        )}

        <fieldset disabled={isProcessing} className="flex flex-col gap-6">
          <Controller
            name="avatar"
            control={control}
            render={({ field }) => (
              <AvatarUpload
                value={field.value ?? null}
                onChange={field.onChange}
                error={errors.avatar?.message}
              />
            )}
          />

          <Input
            name="username"
            id="signup-username"
            label="Username"
            placeholder="User"
            autoComplete="username"
          />

          <Input
            name="email"
            id="signup-email"
            type="email"
            label="Email"
            placeholder="example@gmail.com"
            autoComplete="email"
          />

          <div className="grid grid-cols-1 items-start gap-3 sm:grid-cols-2">
            <Input
              name="password"
              id="signup-password"
              type="password"
              label="Password"
              placeholder="••••••••"
              autoComplete="new-password"
            />

            <Input
              name="passwordConfirmation"
              id="signup-confirm-password"
              type="password"
              label="Confirm password"
              placeholder="••••••••"
              autoComplete="new-password"
            />
          </div>
        </fieldset>

        <Button
          type="submit"
          variant="primary"
          disabled={!isValid || isProcessing}
          isLoading={isSubmitting || loading.signUp}
          loadingText="Creating account..."
          className="mt-2 w-full"
        >
          {success.signUp ? "Account created" : "Sign up"}
        </Button>

        <AuthSwitch
          text="Already have an account?"
          actionText="Log in"
          onClick={openLogin}
        />
      </form>
    </FormProvider>
  );
};

export default SignUpForm;
