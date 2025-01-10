"use client"

import { Card, CardContent, CardFooter, CardHeader } from "@repo/ui/components/ui/card";
import Header from "@/components/auth/header";
import Socials from "./socials";
import BackButton from "../common/back-button";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  subHeaderLabel?: string;
  backButtonLabel: React.ReactNode;
  backButtonHref: string;
  showSocials?: boolean;
}

const CardWrapper: React.FC<CardWrapperProps> = (props) => {
  const { children, headerLabel, subHeaderLabel, backButtonLabel, backButtonHref, showSocials } = props;
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header heading={headerLabel} subHeading={subHeaderLabel} />
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
      {showSocials && (
        <CardFooter>
          <Socials />
        </CardFooter>
      )}
      <CardFooter>
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  )
}

export default CardWrapper