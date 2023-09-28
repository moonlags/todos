import { api } from "~/utils/api";
import { ScrollArea } from "../ui/scroll-area";
import NewTodo from "./NewTodo";
import SingleTodoView from "./SingleTodoView";

const TodosView = () => {
  const { data } = api.todos.getAll.useQuery();

  if (!data)
    return (
      <div className="text-5xl font-semibold text-gray-800">
        Something went wrong
      </div>
    );

  return (
    <>
      <ScrollArea className="mb-5 h-[580px] w-[550px] rounded-lg border border-gray-200 p-4">
        <div className="flex w-full flex-col justify-center gap-3">
          {data.map((todo) => (
            <SingleTodoView key={todo.id} {...todo} />
          ))}
        </div>
      </ScrollArea>
      <NewTodo />
    </>
  );
};

export default TodosView;
