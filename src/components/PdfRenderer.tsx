"use client";

import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Loader2,
  RotateCw,
  SearchIcon,
} from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { useToast } from "./ui/use-toast";
import { useResizeDetector } from "react-resize-detector";
import { Button } from "./ui/button";
import { useState } from "react";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";
import SimpleBar from "simplebar-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import PdfFullScreen from "./PdfFullScreen";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfRenderer = ({ url }: { url: string }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [renderScale, setRenderScale] = useState<number | null>(null);

  const isLoading = renderScale !== zoom;

  const CustomPageValidator = z.object({
    page: z
      .string()
      .refine((num) => Number(num) > 0 && Number(num) <= numPages!),
  });

  type TCustomPageValidator = z.infer<typeof CustomPageValidator>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TCustomPageValidator>({
    defaultValues: {
      page: "1",
    },
    resolver: zodResolver(CustomPageValidator),
  });

  const handlePageSubmit = ({ page }: TCustomPageValidator) => {
    setCurrentPage(Number(page));
    setValue("page", String(page));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
    setValue("page", String(currentPage + 1));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => prev - 1);
    setValue("page", String(currentPage - 1));
  };

  const { toast } = useToast();
  const { ref, width } = useResizeDetector();

  return (
    <div className="w-full rounded-md shadow flex flex-col items-center dark:bg-blue-950/40 bg-white">
      <div className="h-14 w-full border-b border-zinc-200 flex items-center justify-between px-2">
        <div className="flex items-center gap-1.5 ">
          <Button
            variant={"ghost"}
            aria-label="previous-page"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            <ChevronLeftIcon className="w-4 h-4" />
          </Button>

          <Input
            {...register("page")}
            className={cn(
              "w-[34px] h-8 text-center",
              errors.page &&
                errors.page?.ref?.value &&
                "focus-visible:ring-red-500"
            )}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit(handlePageSubmit)();
              }
            }}
          />

          <Button
            variant={"ghost"}
            aria-label="next-page"
            onClick={handleNextPage}
            disabled={currentPage === numPages}
          >
            <ChevronRightIcon className="w-4 h-4" />
          </Button>
        </div>
        <div className="space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="gap-1.5" aria-label="zoom" variant={"ghost"}>
                <SearchIcon className="w-4 h-4" />
                {zoom * 100}%<ChevronDownIcon className="w-3 h-3 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onSelect={() => setZoom(1)}>
                100%
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setZoom(1.25)}>
                125%
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setZoom(1.5)}>
                150%
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setZoom(2)}>
                200%
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant={"ghost"}
            aria-label="rotate"
            onClick={() => setRotation((prev) => prev + 90)}
          >
            <RotateCw className="w-4 h-4" />
          </Button>
          <PdfFullScreen fileUrl={url} />
        </div>
        <span className=" font-semibold mr-8 items-center">
          total pages: {numPages}
        </span>
      </div>

      <div className="flex-1 w-full max-h-screen">
        <SimpleBar autoHide={false} className="max-h-[calc(100vh-10rem)]">
          <div ref={ref}>
            <Document
              loading={
                <div className="flex justify-center items-center h-[100px]">
                  <Loader2 className="w-10 h-10 animate-spin " />
                </div>
              }
              onLoadSuccess={({ numPages }) => {
                setNumPages(numPages);
              }}
              onLoadError={() => {
                toast({
                  title: "Error",
                  description: "Error loading pdf",
                  variant: "destructive",
                });
              }}
              file={url}
              className="max-h-full"
            >
              {isLoading && renderScale ? (
                <Page
                  width={width ? width : 1}
                  pageNumber={currentPage}
                  scale={zoom}
                  key={"@" + renderScale}
                  rotate={rotation}
                />
              ) : null}
              <Page
                className={cn(isLoading && "hidden")}
                width={width ? width : 1}
                pageNumber={currentPage}
                scale={zoom}
                rotate={rotation}
                key={"@" + zoom}
                loading={
                  <div className="flex justify-center">
                    <Loader2 className="my-24 w-6 h-6 animate-spin " />
                  </div>
                }
                onRenderSuccess={() => {
                  setRenderScale(zoom);
                }}
              />
            </Document>
          </div>
        </SimpleBar>
      </div>
    </div>
  );
};

export default PdfRenderer;
