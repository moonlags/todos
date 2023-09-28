import { Plus } from "lucide-react";
import React from "react";
import { api } from "~/utils/api";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";

const NewTodo = () => {
  const [content, setContent] = React.useState("");

  const { toast } = useToast();

  const ctx = api.useContext();

  const { mutate, isLoading } = api.todos.create.useMutation({
    onSuccess: () => {
      setContent("");
      void ctx.todos.getAll.invalidate();
    },
    onError: (e) => {
      toast({ variant: "destructive", description: e.message });
    },
  });

  return (
    <div className="flex flex-row gap-5">
      <Input
        placeholder="Play games"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        disabled={isLoading}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            if (content !== "") {
              mutate({ content: content });
            }
          }
        }}
      />
      {content !== "" && !isLoading && (
        <Button
          className="flex flex-row gap-2"
          onClick={() => mutate({ content: content })}
        >
          <Plus />
          <p className="font-semibold text-gray-200">Create</p>
        </Button>
      )}
    </div>
  );
};

export default NewTodo;
