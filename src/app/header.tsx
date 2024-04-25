"use client"
import { ModeToggle } from '@/components/mode-toggle';
import { Button } from '@/components/ui/button';
import { signIn, signOut, useSession } from 'next-auth/react';

const Header = () => {
  const { data: session } = useSession();

  return (
    <div>
      {session ? <Button 
      onClick={()=> signOut()}
      >Sign out</Button> : <Button
      onClick={()=> signIn("google")}>Sign up</Button>}
      
      {session ?.user?.name  }
      <ModeToggle />
    </div>
  );
};

export default Header;
