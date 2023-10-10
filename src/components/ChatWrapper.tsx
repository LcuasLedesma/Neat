"use client";

import { trpc } from "@/app/_trpc/client";
import ChatInput from "./chat/ChatInput";
import Message from "./chat/message";
import { ChevronLeftIcon, Loader2, XCircle } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

const ChatWrapper = ({ fileId }: { fileId: string }) => {
  const { data, isLoading } = trpc.getFileStatus.useQuery(
    { fileId },
    {
      refetchInterval: (data) =>
        data?.status === "SUCCESS" || data?.status === "FAILED" ? false : 1000,
    }
  );

  if (isLoading) {
    return (
      <div className="min-w-full min-h-full flex ">
        <div className="flex flex-1 mb-28 justify-center items-center mt-28">
          <div className="flex flex-col justify-center items-center gap-2">
            <Loader2 className="animate-spin text-blue-700 w-8 h-8" />
            <h3 className="pl-2 font-semibold text-xl">Loading...</h3>
            <p className="text-sm text-zinc-600">
              we&apos;re preparing your PDF.
            </p>
          </div>
        </div>

        <ChatInput isDisable={true} />
      </div>
    );
  }

  if (data?.status === "PROCESSING") {
    return (
      <div className="min-w-full min-h-full flex ">
        <div className="flex flex-1 mb-28 justify-center items-center mt-28">
          <div className="flex flex-col justify-center items-center gap-2">
            <Loader2 className="animate-spin text-blue-700 w-8 h-8" />
            <h3 className="font-semibold text-xl">Processing PDF...</h3>
            <p className="text-sm text-zinc-600">
              This won&apos;t take too long.
            </p>
          </div>
        </div>

        <ChatInput isDisable={true} />
      </div>
    );
  }

  if (data?.status === "FAILED") {
    return (
      <div className="min-w-full min-h-full flex ">
        <div className="flex flex-1 mb-28 justify-center items-center mt-28">
          <div className="flex flex-col justify-center items-center gap-2">
            <XCircle className=" text-red-700 w-8 h-8" />
            <h3 className="font-semibold text-xl">Too many pages in PDF</h3>
            <p className="text-sm text-zinc-600">
              yout <span className="font-bold">Free</span> plan supports up to 5
              pages
            </p>
            <Link
              href={"/dashboard"}
              className={buttonVariants({
                variant: "ghost",
                className:
                  "mt-4 dark:hover:bg-slate-700 hover:bg-zinc-300/40 transition-all duration-500",
              })}
            >
              <div className="flex justify-center items-center gap-1.5">
                <ChevronLeftIcon className="w-3 h-3" />
                <span className="pr-3">Back</span>
              </div>
            </Link>
          </div>
        </div>

        <ChatInput isDisable={true} />
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-between h-full w-full">
      <div>
        <Message />
      </div>
      <ChatInput />
    </div>
  );
};

export default ChatWrapper;
