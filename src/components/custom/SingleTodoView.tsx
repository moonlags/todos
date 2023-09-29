import { Check, CheckCircle, Edit, Trash, X } from "lucide-react";
import React from "react";
import { api } from "~/utils/api";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";

const SingleTodoView = (todo: {
  id: string;
  content: string;
  createdAt: Date;
  completed: boolean;
  userId: string;
}) => {
  const [content, setContent] = React.useState(todo.content);
  const [editMode, setEditMode] = React.useState(false);

  const ctx = api.useContext();

  const { mutate: deleteTodo, isLoading: deleteLoading } =
    api.todos.delete.useMutation({
      onSuccess: () => {
        void ctx.todos.getAll.invalidate();
      },
      onError: (e) => {
        toast({ variant: "destructive", description: e.message });
      },
    });

  const { mutate: changeMutate, isLoading: contentChangeLoading } =
    api.todos.changeContent.useMutation({
      onSuccess: () => {
        void ctx.todos.getAll.invalidate();
      },
      onError: (e) => {
        toast({ variant: "destructive", description: e.message });
      },
    });

  const { mutate: completeTodo, isLoading: completeLoading } =
    api.todos.complete.useMutation({
      onSuccess: () => {
        void ctx.todos.getAll.invalidate();
      },
      onError: (e) => {
        toast({ variant: "destructive", description: e.message });
      },
    });

  const { toast } = useToast();

  const handleTodoChange = () => {
    if (editMode) {
      changeMutate({ content: content, todoid: todo.id });
    }
    setEditMode(!editMode);
  };

  return (
    <div className="flex flex-row items-center gap-2">
      <div
        className={`${
          todo.completed && "bg-green-100 line-through"
        } flex w-full flex-row items-center gap-3 rounded-lg border border-gray-300 px-3 py-2`}
      >
        {todo.completed ? (
          <CheckCircle className="text-green-400" />
        ) : (
          <X className="text-gray-400" />
        )}
        {editMode ? (
          <Input
            className="text-md break-words font-semibold text-gray-700"
            value={content}
            placeholder="Your todo content"
            onChange={(e) => setContent(e.target.value)}
            autoFocus
          />
        ) : (
          <p className="text-md max-w-[300px] break-words font-semibold text-gray-700">
            {todo.content}
          </p>
        )}
      </div>
      <Button
        className="bg-green-200 p-2"
        onClick={() => completeTodo({ todoid: todo.id })}
        disabled={completeLoading}
      >
        <Check className="text-green-400" />
      </Button>
      <Button
        className="bg-yellow-100 p-2"
        disabled={content === "" || contentChangeLoading}
        onClick={handleTodoChange}
      >
        <Edit className="text-yellow-400" />
      </Button>
      <Button
        className="bg-red-200 p-2"
        onClick={() => deleteTodo({ todoid: todo.id })}
        disabled={deleteLoading}
      >
        <Trash className="text-red-400" />
      </Button>
    </div>
  );
};

export default SingleTodoView;
