interface IAuthSwitchProps {
  text: string;
  actionText: string;
  onClick: () => void;
}

const AuthSwitch = ({ text, actionText, onClick }: IAuthSwitchProps) => {
  return (
    <p className="text-center text-sm text-secondary font-normal">
      {text}{" "}
      <button
        type="button"
        onClick={onClick}
        className="cursor-pointer font-semibold text-red transition-opacity hover:opacity-80"
      >
        {actionText}
      </button>
    </p>
  );
};

export default AuthSwitch;
