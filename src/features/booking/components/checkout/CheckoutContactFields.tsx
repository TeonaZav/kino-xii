import { Input } from "@/src/components/ui";

interface ICheckoutContactFieldsProps {
  disabled?: boolean;
}

const CheckoutContactFields = ({
  disabled = false,
}: ICheckoutContactFieldsProps) => {
  return (
    <div className="flex flex-col gap-4.5">
      <Input
        name="fullName"
        label="Full name"
        placeholder="Enter your full name"
        autoComplete="name"
        disabled={disabled}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          name="email"
          label="Email"
          type="email"
          placeholder="Enter your email"
          autoComplete="email"
          disabled={disabled}
        />

        <Input
          name="mobileNumber"
          label="Mobile number"
          type="tel"
          placeholder="555 123 456"
          autoComplete="tel"
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default CheckoutContactFields;
