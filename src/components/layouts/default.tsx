import NavBar from '@/components/layouts/navbar';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { Separator } from '@radix-ui/react-context-menu';
import { HTMLAttributes } from 'react';

const Layout = ({ ...props }: HTMLAttributes<HTMLElement>) => {
  return (
    <div className={cn('flex min-h-screen w-full flex-col items-center dark:bg-black', props.className)}>
      <NavBar />
      <Separator />
      <main className="flex flex-grow w-full dark:bg-neutral-950 lg:px-20 lg:py-5 px-5 py-2">
        {props.children}
        <Toaster />
      </main>
    </div>
  );
};

export default Layout;
