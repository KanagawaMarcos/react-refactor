export interface NewToDoItem {
  description: string,
}

export interface ToDoItem extends NewToDoItem {
  id: number,
  completed: boolean,
}

const ToDoItems: Record<number, ToDoItem> = {
  1: { id: 1, description: 'Buy milk', completed: true },
  2: { id: 2, description: 'Pick up dog from daycare', completed: true },
  3: { id: 3, description: `Make playlist for mom's birthday party`, completed: false },
  4: { id: 4, description: 'Sign up for gym', completed: true },
  5: { id: 5, description: 'Watch the season finale of Silicon Valley', completed: false },
  6: { id: 6, description: `Book flights for cousin's wedding`, completed: false },
}


export default {
  getList: (): ToDoItem[] => {
    return Object.values(ToDoItems)
  },
  deleteItem: (id: number): null => {
    if (!ToDoItems[id]) throw new Error('Not found')
    delete ToDoItems[id]
    return null
  },
  addItem: (item: NewToDoItem): ToDoItem => {
    const id = Math.max(...Object.keys(ToDoItems).map(Number)) + 1
    if (typeof item.description !== 'string') {
      throw new Error('Unprocessable entity')
    }
    const newItem = { id, ...item, completed: false }
    ToDoItems[id] = newItem
    return newItem
  },
  toggleItem: (id: number): null => {
    const item = ToDoItems[id]
    if (!item) throw new Error('Not found')
    item.completed = !item.completed
    return null
  },
}
