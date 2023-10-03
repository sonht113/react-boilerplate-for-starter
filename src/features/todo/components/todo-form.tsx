import { FC } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { TodoDataMutation } from '../services/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Button,
  Form,
  FormField,
  FormLabel,
  FormItem,
  FormControl,
} from '@/components';

type Props = {
  onCreate: (body: TodoDataMutation) => void;
  open: boolean;
  setOpen: (_v: boolean) => void;
};

const formSchema = z.object({
  todoName: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
});

export const TodoForm: FC<Props> = ({ onCreate, setOpen, open }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      todoName: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onCreate({ ...values, isComplete: false });
    form.reset();
  }
  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogTrigger asChild>
        <Button variant="outline">Add todo</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add new todo</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="todoName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Todo name</FormLabel>
                  <FormControl>
                    <Input placeholder="Todo name" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
