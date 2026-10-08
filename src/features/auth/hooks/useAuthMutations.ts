"use client";

import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import useAuth from "./useAuth";

import {
  login as loginRequest,
  register as registerRequest,
  logout as logoutRequest,
} from "@/src/lib/api/auth";

import { QUERY_KEYS } from "@/src/lib/constants/queryKeys";

const useAuthMutations = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    handleAuthSuccess,
    clearAuth,
    startAuthTransition,
    failAuthTransition,
    completeAuthTransition,
  } = useAuth();

  const loginMutation = useMutation({
    mutationFn: loginRequest,

    onMutate: () => {
      startAuthTransition("login");
    },

    onSuccess: (response) => {
      handleAuthSuccess(response.data);
      completeAuthTransition();
    },

    onError: () => {
      failAuthTransition();
    },
  });

  const signUpMutation = useMutation({
    mutationFn: registerRequest,

    onMutate: () => {
      startAuthTransition("signup");
    },

    onSuccess: (response) => {
      handleAuthSuccess(response.data);
      completeAuthTransition();
    },

    onError: () => {
      failAuthTransition();
    },
  });

  const logoutMutation = useMutation({
    mutationFn: logoutRequest,

    onMutate: () => {
      startAuthTransition("logout");
    },

    onSuccess: () => {
      completeAuthTransition(() => {
        clearAuth();

        queryClient.removeQueries({
          queryKey: QUERY_KEYS.auth.all,
        });

        router.replace("/");
      });
    },

    onError: () => {
      failAuthTransition();
    },
  });

  return {
    mutations: {
      login: loginMutation.mutateAsync,
      signUp: signUpMutation.mutateAsync,
      logout: logoutMutation.mutateAsync,
    },

    loading: {
      login: loginMutation.isPending,
      signUp: signUpMutation.isPending,
      logout: logoutMutation.isPending,
    },

    success: {
      login: loginMutation.isSuccess,
      signUp: signUpMutation.isSuccess,
      logout: logoutMutation.isSuccess,
    },
  };
};

export default useAuthMutations;
