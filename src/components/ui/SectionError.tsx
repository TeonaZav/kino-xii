import Badge from "./Badge";
import Button from "./Button";
import Card from "./Card";

interface ISectionErrorProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

const SectionError = ({
  title = "Something went wrong",
  description = "We couldn't load this content. Please try again.",
  onRetry,
}: ISectionErrorProps) => {
  return (
    <Card className="flex min-h-40 flex-col items-center justify-center gap-3 rounded-[20px] border border-primary/10 p-6 text-center bg-page">
      <Badge variant="danger">!</Badge>

      <div>
        <p className="font-bold text-primary">{title}</p>

        <p className="mt-1 text-sm text-secondary">{description}</p>
      </div>

      {onRetry && (
        <Button variant="outline" className="px-5 py-2!" onClick={onRetry}>
          Try again
        </Button>
      )}
    </Card>
  );
};

export default SectionError;
