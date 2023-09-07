import Logo from '@/components/layouts/logo';

function NavBar() {
  return (
    <nav className="flex w-full items-center justify-between p-4 px-8 h-[60px]">
      <Logo />
      <div className="flex gap-4 items-center">สวัสดีน้องๆ</div>
    </nav>
  );
}

export default NavBar;
