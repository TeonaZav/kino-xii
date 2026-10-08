"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";

import useAuth from "../../hooks/useAuth";
import useAuthMutations from "../../hooks/useAuthMutations";

import { AlertMessage, Button, Input } from "@/src/components/ui";
import AuthSwitch from "../AuthSwitch";

import { loginSchema, type LoginFormValues } from "../../schemas/loginSchema";

import { handleAuthFormError } from "@/src/lib/utils/auth";
import { FEEDBACK_MESSAGES } from "@/src/lib/constants/messages";

const LoginForm = () => {
  const { openSignUp } = useAuth();

  const { mutations, loading, success } = useAuthMutations();

  const methods = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isValid },
  } = methods;

  const isProcessing = isSubmitting || loading.login || success.login;

  const onSubmit = async (values: LoginFormValues) => {
    try {
      await mutations.login(values);
    } catch (error) {
      handleAuthFormError({
        error,
        setError,
        fallbackMessage: "Unable to log in.",
        unauthorizedMessage: "Invalid email or password.",
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
        {errors.root?.message && !success.login && (
          <AlertMessage variant="error">{errors.root.message}</AlertMessage>
        )}

        {success.login && (
          <AlertMessage variant="success">
            {FEEDBACK_MESSAGES.auth.login}
          </AlertMessage>
        )}

        <fieldset disabled={isProcessing} className="flex flex-col gap-6">
          <Input
            name="email"
            id="login-email"
            type="email"
            label="Email"
            placeholder="example@gmail.com"
            autoComplete="email"
          />

          <Input
            name="password"
            id="login-password"
            type="password"
            label="Password"
            placeholder="••••••••"
            autoComplete="current-password"
          />
        </fieldset>

        <Button
          type="submit"
          variant="primary"
          disabled={!isValid || isProcessing}
          isLoading={isSubmitting || loading.login}
          loadingText="Logging in..."
          className="w-full"
        >
          {success.login ? "Logged in" : "Log in"}
        </Button>

        <AuthSwitch
          text="Don't have an account?"
          actionText="Sign up"
          onClick={openSignUp}
        />
      </form>
    </FormProvider>
  );
};

export default LoginForm;
