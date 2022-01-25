import { NewToDoItem, ToDoItem } from '../types/ToDoItem';
import { User } from '../types/User';

const ToDoItems: Record<number, ToDoItem> = {
  1: { id: 1, description: 'Buy milk', completed: true },
  2: { id: 2, description: 'Pick up dog from daycare', completed: true },
  3: { id: 3, description: `Make playlist for mom's birthday party`, completed: false },
  4: { id: 4, description: 'Sign up for gym', completed: true },
  5: { id: 5, description: 'Watch the season finale of Silicon Valley', completed: false },
  6: { id: 6, description: `Book flights for cousin's wedding`, completed: false },
}

const users: User[] = [
  { id: 327, email: 'lisa@blackpink.co.kr', avatarUrl: '/lisa.jfif', username: 'lisa' },
  { id: 103, email: 'jisoo@blackpink.co.kr', avatarUrl: '/jisoo.jfif', username: 'jisoo' },
  { id: 211, email: 'rose@blackpink.co.kr', avatarUrl: '/rose.jfif', username: 'rose' },
  { id: 116, email: 'jennie@blackpink.co.kr', avatarUrl: '/jennie.jfif', username: 'jennie' },
]


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
  getUsers: (): User[] => {
    return users
  },
}
