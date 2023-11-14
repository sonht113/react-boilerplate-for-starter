import React, { FC, useMemo } from 'react';

import AddIcon from '@mui/icons-material/Add';
import {
  Backdrop,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { FiTrash2 } from 'react-icons/fi';

import {
  TodoDataMutation,
  useAddTodoMutation,
  useDeleteTodoMutation,
  useTodoListQuery,
  useUpdateTodoMutation,
} from '@/features/todo';
import { useModalStore } from '@/hooks';

type Input = {
  todoName: string;
};

const Todos: FC = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Input>();

  const isOpen = useModalStore((state) => state.isOpen);
  const open = useModalStore((state) => state.open);
  const close = useModalStore((state) => state.close);

  const { data: todos, refetch, isLoading: loadingFetch } = useTodoListQuery();
  const { mutate: addTodo, isLoading: loadingCreate } = useAddTodoMutation();
  const { mutate: updateTodo, isLoading: loadingUpdate } =
    useUpdateTodoMutation();
  const { mutate: deleteTodo, isLoading: loadingDelete } =
    useDeleteTodoMutation();

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
        void refetch();
        void reset({ todoName: '' });
        void close();
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
    <React.Fragment>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loadingDelete || loadingUpdate}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Modal
        open={isOpen}
        onClose={close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex justify-center items-center"
      >
        <>
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loadingCreate}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
          <Box
            component="form"
            className="w-3/5 py-10 px-5 bg-white dark:bg-slate-700 rounded-xl"
            onSubmit={handleSubmit(handleCreateTodo)}
          >
            <Controller
              rules={{ required: true }}
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <TextField
                    {...field}
                    error={errors.todoName ? true : false}
                    name="todoName"
                    label="Todo Name"
                  />
                  {errors.todoName && (
                    <FormHelperText error>
                      {errors.todoName.message}
                    </FormHelperText>
                  )}
                </FormControl>
              )}
              name="todoName"
            />
            <div className="mt-5 flex justify-end">
              <Button type="submit" size="small" variant="contained">
                Submit
              </Button>
            </div>
          </Box>
        </>
      </Modal>
      <Card>
        <CardHeader
          title="Todo"
          action={
            <IconButton onClick={open}>
              <AddIcon />
            </IconButton>
          }
        />
        <CardContent>
          {loadingFetch && (
            <div className="flex justify-center">
              <CircularProgress />
            </div>
          )}
          {todoList &&
            todoList.map((todo) => (
              <div key={todo._id} className="flex justify-between items-center">
                <FormControlLabel
                  label={
                    <Typography
                      className={
                        todo.isComplete ? 'line-through text-green-500' : ''
                      }
                    >
                      {todo.todoName}
                    </Typography>
                  }
                  control={
                    <Checkbox
                      disabled={todo.isComplete}
                      checked={todo.isComplete}
                      onChange={() =>
                        handleUpdateTodo({
                          id: todo._id,
                          data: { isComplete: true },
                        })
                      }
                    />
                  }
                />
                <IconButton onClick={() => handleDeleteTodo(todo._id)}>
                  <FiTrash2 />
                </IconButton>
              </div>
            ))}
        </CardContent>
      </Card>
    </React.Fragment>
  );
};

export default Todos;
