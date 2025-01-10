import { cn } from "@repo/ui/lib/utils";
import { Poppins } from "next/font/google"

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"]
})

interface HeaderProps {
  heading: string;
  subHeading?: string;
}

const Header: React.FC<HeaderProps> = ({ heading, subHeading }) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <h1 className={cn("text-3xl font-semibold", font.className)}>
        {heading}
      </h1>
      <p className="text-muted-foreground">
        {subHeading}
      </p>
    </div>
  )
}

export default Header