interface IModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ open, onClose, children }: IModalProps) {
  if (!open) return null;

  return (
    <div>
      <div onClick={onClose} />

      <div>{children}</div>
    </div>
  );
}
