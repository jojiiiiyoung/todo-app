interface ITodoItem {
  _id: string;
  isComplete: boolean;
  content: string;
  related: ITodoItem[];
  createdAt: number;
}
