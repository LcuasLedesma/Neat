import Link from "next/link";
import MaxWidthWrapper from "../components/MaxWidthWrapper";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import dashboardPrewiew from "../../public/dashboard-preview.jpg";
import uploadPrewiew from "../../public/file-upload-preview.jpg";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <MaxWidthWrapper className="mb-12 mt-28 sm:mt-40 flex flex-col items-center justify-center text-center">
        <h1 className="max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl">
          Chat with your <span className="text-blue-600">documents</span> in
          seconds.
        </h1>
        <p className="mt-5 max-w-prose text-zinc-700 sm:text-lg">
          Quill allows you to have conversations with any PDF document. Simply
          upload your file and start asking questions right away.
        </p>
        <Link
          className={buttonVariants({ size: "lg", className: "mt-5" })}
          href="/dashboard"
          target="_blank"
        >
          Get started <ArrowRight />
        </Link>
      </MaxWidthWrapper>
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mt-16 flow-root sm:mt-24 mb-8">
          <div className="-m-2 bg-gray-600/50 p-2 rounded-xl  ring-1 ring-inset ring-gray-200/10">
            <Image
              className="rounded-md bg-white p-2 sm:p-8 md:p-20 shadow-2xl ring-1 ring-gray-900/10 object-contain "
              src={dashboardPrewiew}
              alt="product-prewiew.jpg"
              width={1364}
              height={866}
              quality={100}
            />
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-6xl p-6 flex flex-col gap-10">
        <h1 className="font-semibold text-4xl md:text-6xl">
          Start chatting in minutes
        </h1>
        <ol className="flex flex-col gap-8 md:flex-row">
          <li className="flex-1">
            <div className="flex flex-col space-y-2 border-l-4 md:border-l-0 md:border-t-4 border-zinc-400/50 py-2 pl-4">
              <span className="text-blue-600 text-xl font-medium">Step 1</span>
              <span className="text-2xl font-semibold">
                Sing Up for an account
              </span>
              <span className="text-zinc-700">
                Either starting out with a free plan or choose our{" "}
                <Link
                  href={"/pricing"}
                  className="text-blue-700 underline underline-offset-2"
                >
                  por plan
                </Link>
              </span>
            </div>
          </li>
          <li className="flex-1">
            <div className="flex flex-col space-y-2 border-l-4 md:border-l-0 md:border-t-4 border-zinc-400/50 py-2 pl-4">
              <span className="text-blue-600 text-xl font-medium">Step 2</span>
              <span className="text-2xl font-semibold">
                Upload your PDF file
              </span>
              <span className="text-zinc-700">
                We&apos;ll process your file and make it ready for you to chat
                with.
              </span>
            </div>
          </li>
          <li className="flex-1">
            <div className="flex flex-col space-y-2 border-l-4 md:border-l-0 md:border-t-4 border-zinc-400/50 py-2 pl-4">
              <span className="text-blue-600 text-xl font-medium">Step 3</span>
              <span className="text-2xl font-semibold">
                Start asking questions.
              </span>
              <span className="text-zinc-700">
                It&apos;s that simple. Try out now
              </span>
            </div>
          </li>
        </ol>
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mt-16 flow-root sm:mt-24 mb-8">
            <div className="-m-2 bg-gray-600/50 p-2 rounded-xl  ring-1 ring-inset ring-gray-200/10">
              <Image
                className="rounded-md bg-white p-2 sm:p-8 md:p-20 shadow-2xl ring-1 ring-gray-900/10 object-contain "
                src={uploadPrewiew}
                alt="product-prewiew.jpg"
                width={1419}
                height={732}
                quality={100}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
