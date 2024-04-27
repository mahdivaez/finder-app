"use client"
import { ModeToggle } from "@/components/mode-toggle";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Image from "next/image";

import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

function AccountDropdown() {
  const session = useSession();
  const isLoggedIn = session?.status === "authenticated";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="flex justify-between">
        <Button variant="outline">
          <Avatar className="mr-5">
            <AvatarImage src={session.data?.user?.image ?? ""} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          {session?.data?.user?.name || "Sign In"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {isLoggedIn && (
          <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>
            <LogoutIcon className="mr-2" /> Sign Out
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const Header = () => {
  const session = useSession();

  return (
    <header className="bg-gray-100 py-4 dark:bg-gray-900 container mx-auto">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center text-xl ">
          <Link
            href="/"
            className="flex gap-2 items-center text-xl hover:underline"
          >
            <Image
              className="rounded"
              src="/icon.png"
              width="60"
              height="60"
              alt="the application icon of a magnifying glass"
            />
            DevFinder
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {session.data ? <AccountDropdown /> : (
            <Button onClick={() => signIn()}>
              <LoginIcon className="mr-2" /> Sign In
            </Button>
          )}
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
