export interface NewToDoItem {
  description: string;
}

export interface ToDoItem extends NewToDoItem {
  id: number;
  completed: boolean;
}
