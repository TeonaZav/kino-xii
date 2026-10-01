import Logo from "../ui/Logo";

export default function Footer() {
  return (
    <footer className="w-full px-9 max-w-480">
      <div className="pb-9 pt-5 mx-auto flex items-center justify-between  border-t border-raised">
        <Logo size="sm" />

        <p className="text-xs text-secondary">
          © {new Date().getFullYear()} Kino XII. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
