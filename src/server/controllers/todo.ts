/* eslint-disable no-console */
import { Request, Response } from 'express';
import Todo from '../models/todo';

export const allTodos = (_req: Request, res: Response) => {
  // eslint-disable-next-line array-callback-return
  Todo.find((err: any, todos: any) => {
    if (err) {
      res.sendStatus(500);
      console.log(err);
    } else {
      res.send(todos);
    }
  });
};

export const getTodo = (req: Request, res: Response) => {
  Todo.findById(req.params.id, (err: any, todo: any) => {
    if (err) {
      res.sendStatus(500);
      console.log(err);
    } else {
      res.send(todo);
    }
  });
};

export const addTodo = (req: Request, res: Response) => {
  const todo = new Todo({ content: req.body.content });
  try {
    todo.save((err: any, t: any) => {
      if (err) {
        res.sendStatus(500);
        console.log(err);
      } else {
        res.send(t);
      }
    });
  } catch (e) {
    res.sendStatus(500);
    console.log(e);
  }
};

export const updateTodo = (req: Request, res: Response) => {
  Todo.findByIdAndUpdate(req.params.id, req.body, (err: any, todo: any) => {
    if (err) {
      res.sendStatus(500);
      console.log(err);
    } else {
      res.send(todo);
    }
  });
};

export const deleteTodo = (req: Request, res: Response) => {
  Todo.deleteOne({ _id: req.params.id }, (err: any) => {
    if (err) {
      res.sendStatus(500);
      console.log(err);
    } else {
      res.sendStatus(200);
    }
  });
};
