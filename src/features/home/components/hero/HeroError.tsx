import Container from "@/src/components/layout/Container";
import { SectionError } from "@/src/components/ui";

import HeroSection from "./HeroSection";

interface IHeroErrorProps {
  onRetry: () => void;
}

const HeroError = ({ onRetry }: IHeroErrorProps) => {
  return (
    <HeroSection className="flex items-center">
      <Container className="w-full h-full">
        <SectionError
          title="Couldn't load featured movies"
          description="Something went wrong while loading featured movies."
          onRetry={onRetry}
          className="h-full"
        />
      </Container>
    </HeroSection>
  );
};

export default HeroError;
