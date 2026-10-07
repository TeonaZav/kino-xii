import Link from "next/link";

interface ISeeAllLinkProps {
  href: string;
}

const SeeAllLink = ({ href }: ISeeAllLinkProps) => {
  return (
    <Link
      href={href}
      className="text-sm font-semibold text-red transition-opacity hover:opacity-80"
    >
      See all
    </Link>
  );
};

export default SeeAllLink;
