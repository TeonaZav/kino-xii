import { Input } from "@/src/components/ui";

interface ICheckoutCardFieldsProps {
  disabled?: boolean;
}

const CheckoutCardFields = ({ disabled = false }: ICheckoutCardFieldsProps) => {
  return (
    <div className="flex flex-col gap-4.5">
      <Input
        name="cardNumber"
        label="Card number"
        placeholder="4242 4242 4242 4242"
        inputMode="numeric"
        autoComplete="cc-number"
        maxLength={19}
        disabled={disabled}
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          name="expiry"
          label="Expiry"
          placeholder="MM/YY"
          inputMode="numeric"
          autoComplete="cc-exp"
          maxLength={5}
          disabled={disabled}
        />

        <Input
          name="cvv"
          label="CVV"
          placeholder="123"
          inputMode="numeric"
          autoComplete="cc-csc"
          maxLength={3}
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default CheckoutCardFields;
