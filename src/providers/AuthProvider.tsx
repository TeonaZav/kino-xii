"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import axios from "axios";

import {
  getAuthToken,
  getAuthUser,
  removeAuthToken,
  removeAuthUser,
  setAuthToken,
  setAuthUser,
} from "@/src/lib/utils/auth";

import { getMe } from "@/src/lib/api/auth";

import type {
  AuthData,
  AuthModalMode,
  AuthUser,
  PendingAuthAction,
} from "@/src/types/auth.types";

import type { AuthTransitionState } from "@/src/types/feedback.types";

import { AuthAction } from "@/src/lib/constants/messages";
import { AUTH_SUCCESS_DURATION } from "@/src/lib/constants/auth";

import AuthModalRoot from "@/src/features/auth/components/AuthModalRoot";
import AuthTransitionOverlay from "@/src/features/auth/components/AuthTransitionOverlay";

interface IAuthContext {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isAuthLoading: boolean;

  authMode: AuthModalMode;
  openLogin: () => void;
  openSignUp: () => void;
  closeAuthModal: () => void;

  requireAuth: (action: () => void) => void;
  handleAuthSuccess: (data: AuthData) => void;
  updateUser: (user: AuthUser) => void;
  refreshUser: () => Promise<AuthUser>;
  clearAuth: () => void;

  authTransition: AuthTransitionState | null;
  startAuthTransition: (action: AuthAction) => void;
  failAuthTransition: () => void;
  completeAuthTransition: (onComplete?: () => void) => void;
}

export const AuthContext = createContext<IAuthContext | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const [authMode, setAuthMode] = useState<AuthModalMode>(null);

  const [authTransition, setAuthTransition] =
    useState<AuthTransitionState | null>(null);

  const pendingActionRef = useRef<PendingAuthAction>(null);

  const transitionRef = useRef<AuthTransitionState | null>(null);

  const transitionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  const authVersionRef = useRef(0);

  const clearTransitionTimeout = useCallback(() => {
    if (transitionTimeoutRef.current !== null) {
      clearTimeout(transitionTimeoutRef.current);
      transitionTimeoutRef.current = null;
    }
  }, []);

  const updateUser = useCallback((updatedUser: AuthUser) => {
    setAuthUser(updatedUser);
    setUser(updatedUser);
  }, []);

  const clearAuth = useCallback(() => {
    authVersionRef.current += 1;

    removeAuthToken();
    removeAuthUser();

    setToken(null);
    setUser(null);
    setAuthMode(null);

    pendingActionRef.current = null;
  }, []);

  const refreshUser = useCallback(async (): Promise<AuthUser> => {
    const currentToken = getAuthToken();

    if (!currentToken) {
      throw new Error("Authentication is required.");
    }

    const requestVersion = authVersionRef.current;

    try {
      const currentUser = await getMe();

      if (
        requestVersion !== authVersionRef.current ||
        getAuthToken() !== currentToken
      ) {
        throw new Error("Authentication session changed.");
      }

      updateUser(currentUser);

      return currentUser;
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response?.status === 401 &&
        requestVersion === authVersionRef.current &&
        getAuthToken() === currentToken
      ) {
        clearAuth();
      }

      throw error;
    }
  }, [updateUser, clearAuth]);

  useEffect(() => {
    let cancelled = false;

    const initializeAuth = async () => {
      const storedToken = getAuthToken();

      if (!storedToken) {
        removeAuthUser();

        setToken(null);
        setUser(null);
        setIsAuthLoading(false);

        return;
      }

      setToken(storedToken);

      const requestVersion = authVersionRef.current;

      try {
        const currentUser = await getMe();

        if (
          cancelled ||
          requestVersion !== authVersionRef.current ||
          getAuthToken() !== storedToken
        ) {
          return;
        }

        updateUser(currentUser);
      } catch (error) {
        if (
          cancelled ||
          requestVersion !== authVersionRef.current ||
          getAuthToken() !== storedToken
        ) {
          return;
        }

        if (axios.isAxiosError(error) && error.response?.status === 401) {
          clearAuth();
        } else {
          console.error("Unable to restore user session:", error);

          // Preserve the cached user during temporary network errors.
          setUser(getAuthUser());
        }
      } finally {
        if (!cancelled) {
          setIsAuthLoading(false);
        }
      }
    };

    void initializeAuth();

    return () => {
      cancelled = true;
    };
  }, [updateUser, clearAuth]);

  useEffect(() => {
    return () => {
      clearTransitionTimeout();
    };
  }, [clearTransitionTimeout]);

  const openLogin = useCallback(() => {
    if (transitionRef.current) return;

    setAuthMode("login");
  }, []);

  const openSignUp = useCallback(() => {
    if (transitionRef.current) return;

    setAuthMode("signup");
  }, []);

  const closeAuthModal = useCallback(() => {
    if (transitionRef.current) return;

    setAuthMode(null);
    pendingActionRef.current = null;
  }, []);

  const requireAuth = useCallback(
    (action: () => void) => {
      if (token) {
        action();
        return;
      }

      pendingActionRef.current = action;
      setAuthMode("login");
    },
    [token],
  );

  const handleAuthSuccess = useCallback((data: AuthData) => {
    authVersionRef.current += 1;

    setAuthToken(data.token);
    setAuthUser(data.user);

    setToken(data.token);
    setUser(data.user);

    setIsAuthLoading(false);
  }, []);

  const startAuthTransition = useCallback(
    (action: AuthAction) => {
      clearTransitionTimeout();

      const transition: AuthTransitionState = {
        action,
        status: "loading",
      };

      transitionRef.current = transition;
      setAuthTransition(transition);
    },
    [clearTransitionTimeout],
  );

  const failAuthTransition = useCallback(() => {
    clearTransitionTimeout();

    transitionRef.current = null;
    setAuthTransition(null);
  }, [clearTransitionTimeout]);

  const completeAuthTransition = useCallback(
    (onComplete?: () => void) => {
      const current = transitionRef.current;

      if (!current) return;

      const successTransition: AuthTransitionState = {
        ...current,
        status: "success",
      };

      transitionRef.current = successTransition;
      setAuthTransition(successTransition);

      clearTransitionTimeout();

      transitionTimeoutRef.current = setTimeout(() => {
        const shouldResumeAction =
          current.action === "login" || current.action === "signup";

        const pendingAction = shouldResumeAction
          ? pendingActionRef.current
          : null;

        pendingActionRef.current = null;

        if (shouldResumeAction) {
          setAuthMode(null);
        }

        transitionRef.current = null;
        setAuthTransition(null);
        transitionTimeoutRef.current = null;

        onComplete?.();
        pendingAction?.();
      }, AUTH_SUCCESS_DURATION);
    },
    [clearTransitionTimeout],
  );

  const value = useMemo<IAuthContext>(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token),
      isAuthLoading,

      authMode,
      openLogin,
      openSignUp,
      closeAuthModal,

      requireAuth,
      handleAuthSuccess,
      updateUser,
      refreshUser,
      clearAuth,

      authTransition,
      startAuthTransition,
      failAuthTransition,
      completeAuthTransition,
    }),
    [
      user,
      token,
      isAuthLoading,
      authMode,
      openLogin,
      openSignUp,
      closeAuthModal,
      requireAuth,
      handleAuthSuccess,
      updateUser,
      refreshUser,
      clearAuth,
      authTransition,
      startAuthTransition,
      failAuthTransition,
      completeAuthTransition,
    ],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}

      <AuthModalRoot />

      <AuthTransitionOverlay
        transition={authTransition?.action === "logout" ? authTransition : null}
      />
    </AuthContext.Provider>
  );
};

export default AuthProvider;
