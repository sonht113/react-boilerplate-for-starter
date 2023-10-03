import { FC, useMemo, useState } from 'react';

import { FiTrash2 } from 'react-icons/fi';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Checkbox,
  Label,
} from '@/components';
import {
  TodoDataMutation,
  TodoForm,
  useAddTodoMutation,
  useDeleteTodoMutation,
  useTodoListQuery,
  useUpdateTodoMutation,
} from '@/features/todo';

const Todos: FC = () => {
  const [openForm, setOpenForm] = useState(false);

  const { data: todos, refetch } = useTodoListQuery();
  const { mutate: addTodo } = useAddTodoMutation();
  const { mutate: updateTodo } = useUpdateTodoMutation();
  const { mutate: deleteTodo } = useDeleteTodoMutation();

  const todoList = useMemo(() => {
    return todos?.data.sort((a, b) => {
      if (a.isComplete && !b.isComplete) {
        return 1; // Move 'a' to the end
      } else if (!a.isComplete && b.isComplete) {
        return -1; // Keep 'a' before 'b'
      } else {
        return 0; // Maintain the order of other elements
      }
    });
  }, [todos]);

  const handleCreateTodo = (body: TodoDataMutation) => {
    return addTodo(body, {
      onSuccess: () => {
        setOpenForm(false);
        void refetch();
      },
    });
  };

  const handleUpdateTodo = (body: { id: string; data: TodoDataMutation }) => {
    return updateTodo(body, {
      onSuccess: () => {
        void refetch();
      },
    });
  };

  const handleDeleteTodo = (id: string) => {
    return deleteTodo(id, {
      onSuccess: () => {
        void refetch();
      },
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Todo</CardTitle>
        <CardDescription>
          <TodoForm
            onCreate={handleCreateTodo}
            open={openForm}
            setOpen={setOpenForm}
          />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-3/4 flex flex-col gap-5 mx-auto">
          {todoList?.map((todo) => (
            <div
              key={todo._id}
              className="w-full flex items-center justify-between"
            >
              <div className="space-x-2">
                <Checkbox
                  id={todo._id}
                  color="success"
                  checked={todo.isComplete}
                  onCheckedChange={(c) => {
                    handleUpdateTodo({
                      id: todo._id,
                      data: { isComplete: c as boolean },
                    });
                  }}
                />
                <Label
                  htmlFor={todo._id}
                  className={todo.isComplete ? 'line-through' : ''}
                >
                  {todo.todoName}
                </Label>
              </div>
              <FiTrash2
                className="cursor-pointer"
                onClick={() => handleDeleteTodo(todo._id)}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Todos;
