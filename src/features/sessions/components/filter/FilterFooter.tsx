import { Button } from "@/src/components/ui";

interface IFilterFooterProps {
  activeFilterCount: number;
  onClear: () => void;
}

const FilterFooter = ({ activeFilterCount, onClear }: IFilterFooterProps) => {
  return (
    <div className="mt-auto flex flex-col items-center gap-3 pt-6">
      {activeFilterCount > 0 && (
        <Button
          variant="outline"
          onClick={onClear}
          className="w-full py-2 text-xs"
        >
          Clear filters
        </Button>
      )}

      <p className="text-xs text-secondary">
        {activeFilterCount} {activeFilterCount === 1 ? "filter" : "filters"}{" "}
        active
      </p>
    </div>
  );
};

export default FilterFooter;
