/* eslint-disable @typescript-eslint/no-unused-vars */
interface ITodoItem {
  _id: string;
  isComplete: boolean;
  content: string;
  related: ITodoItem[];
  createdAt: number;
}

interface ITodoItemWithPage extends ITodoItem {
  page: number;
}
