"use client"

import { useState } from "react"
import Link from "next/link"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/components/ui/avatar"
import { Button } from "@repo/ui/components/ui/button"
import { BiUser } from "react-icons/bi"
import { User } from "next-auth"
import { signOut } from "next-auth/react"
import { CgProfile } from "react-icons/cg";
import { MdDashboard } from "react-icons/md";
import { FaSignOutAlt } from "react-icons/fa";
import { Skeleton } from "@repo/ui/components/ui/skeleton";
import { PageRoutes } from "@/constants/page-routes";
import { useCurrentUser } from "@/hooks/user"

const dropdownItems = [
  {
    label: "Dashboard",
    icon: MdDashboard,
    href: PageRoutes.PROTECTED.DASHBOARD
  },
  {
    label: "Profile",
    icon: CgProfile,
    href: PageRoutes.PROTECTED.DASHBOARD
  },
]

export function UserButton() {
  const data = useCurrentUser();

  const [open, setOpen] = useState(false);
  const user = data?.user as User | undefined;
  const isLoading = data?.isLoading;

  if (!user && !isLoading) {
    return (
      <Button variant="secondary" asChild>
        <Link href={PageRoutes.AUTH.LOGIN}>
          Sign In
        </Link>
      </Button>
    )
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        {isLoading ? (
          <Skeleton className="h-8 w-8 rounded-full bg-neutral-700" />
        ) : (
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user?.image || ""} alt={user?.name || ""} />
              <AvatarFallback>
                <BiUser className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
          </Button>
        )}

      </DropdownMenuTrigger>
      <DropdownMenuContent darkMode align="end" forceMount>
        <DropdownMenuItem className="flex flex-col items-start gap-0 px-3 py-2.5 focus:bg-neutral-800 focus:text-white rounded-md">
          <span className="text-sm font-medium capitalize">{user?.name}</span>
          <span className="text-xs text-muted-foreground">{user?.email}</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator darkMode />
        {dropdownItems?.map((item) => {
          return (
            <DropdownMenuItem key={item.label} className="gap-3 px-3 py-2 text-[13px]" darkMode asChild>
              <Link href="/dashboard" className="space-x-2">
                <item.icon className="text-neutral-400 group-hover:text-neutral-100" />
                <span>{item.label}</span>
              </Link>
            </DropdownMenuItem>
          )
        })}
        <DropdownMenuSeparator darkMode />
        <DropdownMenuItem onClick={() => signOut()} className="gap-3 px-3 py-2 text-[13px]" darkMode asChild>
          <div className="space-x-2">
            <FaSignOutAlt className="text-neutral-400 group-hover:text-neutral-100" />
            <span>
              Sign Out
            </span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

