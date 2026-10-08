"use client";

import useAuth from "../hooks/useAuth";
import { Modal, ModalHeader } from "@/src/components/ui";
import LoginForm from "./login/LoginForm";
import SignUpForm from "./signUp/SignUpForm";

const AuthModalRoot = () => {
  const { authMode, closeAuthModal, authTransition } = useAuth();

  if (!authMode) return null;

  const isLogin = authMode === "login";
  const isProcessing = authTransition !== null;

  return (
    <Modal
      open
      onClose={() => {
        if (!isProcessing) closeAuthModal();
      }}
      contentClassName={isLogin ? "max-w-[403px]" : "max-w-[475px]"}
    >
      <ModalHeader
        title={isLogin ? "Log in" : "Sign up"}
        subtitle={isLogin ? "Welcome back to Kino XII" : "Welcome to Kino XII"}
        onClose={closeAuthModal}
      />

      <div className="mt-6">{isLogin ? <LoginForm /> : <SignUpForm />}</div>
    </Modal>
  );
};

export default AuthModalRoot;
