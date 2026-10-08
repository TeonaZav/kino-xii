import type { ReactNode } from "react";
import { Checkbox } from "@material-tailwind/react";
import { Icon } from "@/src/components/ui";

interface IFilterCheckboxProps {
  children: ReactNode;
  checked: boolean;
  onChange: () => void;
}

const FilterCheckbox = ({
  children,
  checked,
  onChange,
}: IFilterCheckboxProps) => {
  return (
    <Checkbox
      color="red"
      checked={checked}
      label={children}
      ripple={false}
      icon={<Icon type="Check" className="size-2" />}
      crossOrigin={undefined}
      onChange={onChange}
      {...({} as any)}
      containerProps={{
        className: "py-0 px-0 ",
      }}
      labelProps={{ className: "py-0 px-0 text-red ml-2.5 leading-none" }}
      className="w-4.5 h-4.5 border-disabled checked:bg-red p-0! rounded-[5px]! leading-[100%] "
    />
  );
};

export default FilterCheckbox;
