"use client";

import { trpc } from "@/app/_trpc/client";
import UploadButton from "./ui/upload-button";
import {
  Calendar,
  File,
  Ghost,
  Loader2,
  MessageSquare,
  Plus,
  Trash,
} from "lucide-react";
import Skeleton from "react-loading-skeleton";
import Link from "next/link";
import { format, set } from "date-fns";
import { Button } from "./ui/button";
import { useState } from "react";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

import { Document, Page, pdfjs } from "react-pdf";

const Dashboard = () => {
  const [currentlyDletingFile, setCurrentlyDeletingFile] = useState<
    string | null
  >(null);

  const utils = trpc.useContext();

  const { data: files, isLoading } = trpc.getUserFiles.useQuery();

  const { mutate: deleteFile } = trpc.deleteFile.useMutation({
    onSuccess: () => {
      utils.getUserFiles.invalidate();
    },
    onMutate: ({ id }) => {
      setCurrentlyDeletingFile(id);
    },
    onSettled: () => {
      setCurrentlyDeletingFile(null);
    },
  });

  const sortedFiles = files?.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <main className="max-w-7xl mx-auto md:p-10">
      <div className="flex justify-between items-center border-b pb-10">
        <h1 className="font-bold text-5xl">My files</h1>
        <UploadButton />
      </div>

      {files && files.length > 0 ? (
        <ul className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-14 justify-center items-center gap-8">
          {sortedFiles?.map((file) => (
            <li
              key={file.id}
              className="flex flex-col gap-4 dark:bg-blue-900/20 bg-white rounded-md shadow-xl"
            >
              <div className="flex items-center gap-2 h-1/2 p-2 text-zinc-700 dark:text-zinc-300">
                <Document
                  file={file.url}
                  className={
                    " overflow-hidden max-h-[100px] w-[30%] rounded-xl border"
                  }
                >
                  <Page pageNumber={1} height={200} width={200} />
                </Document>
                <Link
                  href={`/dashboard/${file.id}`}
                  className="flex flex-col gap-4  p-2 rounded-md w-[70%]"
                >
                  <div>
                    <h3 className="text-2xl">{file.name}</h3>
                  </div>
                </Link>
              </div>
              <div className="flex justify-between items-center gap-4 dark:bg-blue-900/20 border-t dark:border-none bg-zinc-100 p-2 rounded-md">
                <div className="flex gap-2 text-zinc-500 items-center">
                  <Calendar className="h-4 w-4" />
                  {format(new Date(file.createdAt), "MMM yyyy")}
                </div>
                <div className="flex gap-2 text-zinc-500 items-center">
                  <MessageSquare className="h-4 w-4" />
                  12
                </div>
                <button onClick={() => deleteFile({ id: file.id })}>
                  {currentlyDletingFile === file.id ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <Trash
                      color="red"
                      className="opacity-50 hover:scale-125 transition-all duration-700"
                    />
                  )}
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : isLoading ? (
        <div className="mt-10 flex mx-auto justify-center items-center text-center">
          <Loader2 className="my-2 animate-spin h-20 w-20" />
        </div>
      ) : (
        <div className="flex flex-col mt-14 justify-center text-center items-center">
          <Ghost className="h-10 w-10" />
          <h3 className="font-bold text-xl text-zinc-600">
            Pretty empty around here
          </h3>
          <p className="font-bold text-2xl">
            let&apos;s{" "}
            <span className="text-blue-500 text-[1.9rem]">upload</span> your
            frist PDF.
          </p>
        </div>
      )}
    </main>
  );
};

export default Dashboard;
