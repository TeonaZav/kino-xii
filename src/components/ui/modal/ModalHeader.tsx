import { MdClose } from "react-icons/md";

interface IModalHeaderProps {
  title: string;
  subtitle?: string;
  onClose: () => void;
}

const ModalHeader = ({ title, subtitle, onClose }: IModalHeaderProps) => {
  return (
    <div className="flex items-start justify-between gap-6">
      <div className="min-w-0">
        <h2 className="text-xl font-bold text-primary">{title}</h2>

        {subtitle && (
          <p className="text-xs text-secondary leading-[130%]">{subtitle}</p>
        )}
      </div>

      <button
        type="button"
        aria-label="Close modal"
        onClick={onClose}
        className="flex shrink-0 cursor-pointer items-center justify-center text-primary transition-opacity hover:opacity-70"
      >
        <MdClose className="size-6" />
      </button>
    </div>
  );
};

export default ModalHeader;
