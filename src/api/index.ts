export interface NewToDoItem {
  description: string,
}

export interface ToDoItem extends NewToDoItem {
  id: number,
  completed: boolean,
}

interface FakeResponse<T extends unknown> {
  status: number,
  message: string,
  data?: T,
  ok: boolean,
}

const ToDoItems: Record<number, ToDoItem> = {
  1: { id: 1, description: 'Buy milk', completed: true },
  2: { id: 2, description: 'Pick up dog from daycare', completed: true },
  3: { id: 3, description: `Make playlist for mom's birthday party`, completed: false },
  4: { id: 4, description: 'Sign up for gym', completed: true },
  5: { id: 5, description: 'Watch the season finale of Silicon Valley', completed: false },
  6: { id: 6, description: `Book flights for cousin's wedding`, completed: false },
}

function copy<T extends unknown>(data: T): T {
  return JSON.parse(JSON.stringify(data))
}

function wait(timeout: number): Promise<any> {
  return new Promise(resolve => setTimeout(resolve, timeout))
}

export default {
  getList: async (): Promise<FakeResponse<ToDoItem[]>> => {
    await wait(Math.floor(Math.random() * 500 + 50))
    return Promise.resolve(copy({ status: 200, message: 'Ok', data: Object.values(ToDoItems), ok: true }))
  },
  deleteItem: async (id: number): Promise<FakeResponse<void>> => {
    await wait(Math.floor(Math.random() * 500 + 50))
    if (!ToDoItems[id]) return Promise.reject(({ status: 400, message: 'Not found', ok: false }))
    delete ToDoItems[id]
    return Promise.resolve({ status: 204, message: 'No content', ok: true })
  },
  addItem: async (item: NewToDoItem): Promise<FakeResponse<ToDoItem>> => {
    await wait(Math.floor(Math.random() * 500 + 50))
    const id = Math.max(...Object.keys(ToDoItems).map(Number)) + 1
    if (typeof item.description !== 'string') {
      return Promise.reject({ status: 422, message: 'Unprocessable entity' })
    }
    const newItem = { id, ...item, completed: false }
    ToDoItems[id] = newItem
    return Promise.resolve(copy({ status: 200, message: 'Ok', data: newItem, ok: true }))
  },
  toggleItem: async (id: number): Promise<FakeResponse<void>> => {
    await wait(Math.floor(Math.random() * 500 + 50))
    const item = ToDoItems[id]
    if (!item) return Promise.reject({ status: 400, message: 'Not found', ok: false })
    item.completed = !item.completed
    return Promise.resolve({ status: 200, message: 'No content', ok: true })
  },
}
