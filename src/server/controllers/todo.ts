/* eslint-disable no-console */
import { Request, Response } from 'express';
import { Document } from 'mongoose';
import { DEFAULT_LIST_SIZE } from '../constants';
import Todo, { TodoInterface } from '../models/todo';

export const getTodos = async (req: Request, res: Response) => {
  // eslint-disable-next-line array-callback-return
  try {
    let page = Number(req.query.page);
    page = Number.isNaN(page) ? 0 : page;
    let size = Number(req.query.size);
    size = Number.isNaN(size) ? DEFAULT_LIST_SIZE : size;
    const sortingType: string = req.query.sortingType as string;

    const totalCount = await Todo.countDocuments();
    if (sortingType === 'complete') {
      const todos = await Todo.find({})
        .populate('related', {
          _id: 1,
          isComplete: 1,
          content: 1,
          createdAt: 1,
        })
        .sort({ isComplete: -1 })
        .skip(page * size)
        .limit(size);
      res.send({ list: todos, totalCount, page, size });
    } else {
      const todos = await Todo.find({})
        .populate('related', {
          _id: 1,
          isComplete: 1,
          content: 1,
          createdAt: 1,
        })
        .sort(sortingType ? { [sortingType]: -1 } : {})
        .skip(page * size)
        .limit(size);
      res.send({ list: todos, totalCount, page, size });
    }
  } catch (err) {
    res.sendStatus(500);
    console.error(err);
  }
};

export const getTodo = (req: Request, res: Response) => {
  Todo.findById(req.params.id, (err: any, todo: TodoInterface) => {
    if (err) {
      res.sendStatus(500);
      console.log(err);
    } else {
      res.send(todo);
    }
  });
};

export const addTodo = async (req: Request, res: Response) => {
  const todo = new Todo({ content: req.body.content });
  try {
    todo.save((err: any, t: Document) => {
      if (err) {
        res.sendStatus(500);
        console.log(err);
      } else {
        res.status(201).send(t);
      }
    });
  } catch (e) {
    res.sendStatus(500);
    console.log(e);
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  const { isComplete } = req.body;

  try {
    if (isComplete !== undefined) {
      const todo: any = await Todo.findById(req.params.id)
        .populate('related', {
          isComplete: 1,
        })
        .lean();

      if (isComplete) {
        if (todo.related.some((t: TodoInterface) => !t.isComplete)) {
          res.status(400).send('연관된 TODO 중 마무리되지 않은 TODO가 있습니다.');
        } else {
          Todo.findByIdAndUpdate(req.params.id, req.body, (err: any) => {
            if (err) {
              res.sendStatus(500);
            } else {
              res.sendStatus(200);
            }
          });
        }
      } else {
        await Todo.findByIdAndUpdate(req.params.id, { $set: { isComplete: false } });
        await Todo.updateMany({ related: { $elemMatch: { $eq: req.params.id } } }, { $set: { isComplete: false } });
        res.sendStatus(200);
      }
    } else {
      Todo.findByIdAndUpdate(req.params.id, req.body, (err: any, todo: any) => {
        if (err) {
          res.sendStatus(500);
          console.log(err);
        } else {
          res.send(todo);
        }
      });
    }
  } catch (err) {
    res.sendStatus(500);
    console.error(err);
  }
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
