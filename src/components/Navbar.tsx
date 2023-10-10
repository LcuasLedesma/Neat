import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import ThemeSwitcher from "./themeSwitcher";
import { buttonVariants } from "./ui/button";
import {
  LoginLink,
  RegisterLink,
  getKindeServerSession,
} from "@kinde-oss/kinde-auth-nextjs/server";
import { ArrowRight } from "lucide-react";

const Navbar = async () => {
  const { getUser } = getKindeServerSession();

  const user = getUser();

  return (
    <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 dark:border-gray-800 dark:bg-blue-950/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b">
          <Link href="/" className="flex z-40 font-semibold">
            <span>quill.</span>
          </Link>
          <div className="hidden items-center space-x-4 sm:flex">
            <ThemeSwitcher />
            <>
              <Link
                href="/pricing"
                className={buttonVariants({ variant: "ghost", size: "sm" })}
              >
                Pricing
              </Link>
              {!user && (
                <>
                  <LoginLink
                    className={buttonVariants({ variant: "ghost", size: "sm" })}
                  >
                    Sign in
                  </LoginLink>
                  <RegisterLink className={buttonVariants({ size: "sm" })}>
                    Get Started <ArrowRight className="ml-1.5 h-5 w-5" />
                  </RegisterLink>
                </>
              )}
            </>
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
