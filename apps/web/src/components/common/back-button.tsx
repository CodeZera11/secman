import { Button } from "@repo/ui/components/ui/button";
import Link from "next/link";

interface BackButtonProps {
  href: string;
  label: React.ReactNode;
}

const BackButton: React.FC<BackButtonProps> = ({ label, href }) => {
  return (
    <Button
      variant="link"
      className="font-normal w-full"
      size="sm"
      asChild
    >
      <Link href={href}>
        {label}
      </Link>
    </Button>
  )
}

export default BackButton