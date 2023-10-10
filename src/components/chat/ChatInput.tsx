"use client";

import { SendHorizonal } from "lucide-react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useState } from "react";

interface ChatInputProps {
  isDisable?: boolean;
}

const ChatInput = ({ isDisable }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  if (isDisable === true) {
    return null;
  }

  return (
    <div className="flex mx-4 rounded-md mb-6 relative ">
      <Textarea
        rows={1}
        maxRows={4}
        className="resize-none text-base scrollbar-track-blue-lighter scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-w-2"
        autoFocus={true}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button
        className="absolute right-[8px] bottom-1.5"
        size={"sm"}
        variant={message.length === 0 ? "ghost" : "default"}
        disabled={message.length === 0}
      >
        <SendHorizonal className="w-4 h-4 " />
      </Button>
    </div>
  );
};

export default ChatInput;
