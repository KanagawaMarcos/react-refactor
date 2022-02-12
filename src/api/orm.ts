import { NewToDoItem, ToDoItem } from "../types/ToDoItem";
import { User } from "../types/User";

const ToDoItems: Record<number, ToDoItem> = {
  1: { id: 1, description: "Buy milk", completed: true },
  2: { id: 2, description: "Pick up dog from daycare", completed: true },
  3: {
    id: 3,
    description: `Make playlist for mom's birthday party`,
    completed: false,
  },
  4: { id: 4, description: "Sign up for gym", completed: true },
  5: {
    id: 5,
    description: "Watch the season finale of Silicon Valley",
    completed: false,
  },
  6: {
    id: 6,
    description: `Book flights for cousin's wedding`,
    completed: false,
  },
};

const users: User[] = [
  {
    id: 327,
    email: "lisa@blackpink.co.kr",
    avatarUrl: "/lisa.jfif",
    username: "lisa",
    followers: [
      { id: 1, followerSince: '2019-02-05T19:30:33.421Z' },
      { id: 2, followerSince: '2019-07-17T05:20:33.955Z' },
      { id: 5, followerSince: '2016-11-06T04:53:09.854Z' },
    ]
  },
  {
    id: 103,
    email: "jisoo@blackpink.co.kr",
    avatarUrl: "/jisoo.jfif",
    username: "jisoo",
    followers: [
      { id: 4, followerSince: '2016-09-10T18:59:51.642Z' },
      { id: 2, followerSince: '2018-11-07T02:37:54.006Z' },
    ]
  },
  {
    id: 211,
    email: "rose@blackpink.co.kr",
    avatarUrl: "/rose.jfif",
    username: "rose",
    followers: [
      { id: 1, followerSince: '2016-05-26T10:45:57.310Z' },
      { id: 2, followerSince: '2016-08-29T04:48:36.084Z' },
      { id: 6, followerSince: '2016-06-24T03:44:25.504Z' },
      { id: 13, followerSince: '2015-03-08T07:12:35.869Z' },
      { id: 25, followerSince: '2018-03-13T09:17:54.236Z' },
      { id: 3, followerSince: '2019-12-01T05:32:21.689Z' },
    ]
  },
  {
    id: 116,
    email: "jennie@blackpink.co.kr",
    avatarUrl: "/jennie.jfif",
    username: "jennie",
    followers: []
  },
];

export default {
  getList: (): ToDoItem[] => {
    return Object.values(ToDoItems);
  },
  deleteItem: (id: number): null => {
    if (!ToDoItems[id]) throw new Error("Not found");
    delete ToDoItems[id];
    return null;
  },
  addItem: (item: NewToDoItem): ToDoItem => {
    const id = Math.max(...Object.keys(ToDoItems).map(Number)) + 1;
    if (typeof item.description !== "string") {
      throw new Error("Unprocessable entity");
    }
    const newItem = { id, ...item, completed: false };
    ToDoItems[id] = newItem;
    return newItem;
  },
  toggleItem: (id: number): null => {
    const item = ToDoItems[id];
    if (!item) throw new Error("Not found");
    item.completed = !item.completed;
    return null;
  },
  getUsers: (): User[] => {
    return users;
  },
};
