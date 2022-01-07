import express from "express";
import cors from 'cors';
import bodyParser from 'body-parser'

import api from "./index";

import { ToDoItem, NewToDoItem } from "../types/ToDoItem";

const app = express();
const port = 3001;

app.use(cors())
app.use(bodyParser.json())

interface FakeResponse<T extends unknown> {
  status: number;
  message: string;
  data?: T;
  ok: boolean;
}

function wait(timeout: number): Promise<any> {
    return new Promise(resolve => setTimeout(resolve, timeout))
}

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

app.get("/items", async (req, res) => {
  await wait(Math.random() * 250 + 50)
  res.send(api.getList())
});

app.delete("/items/:id", async (req, res) => {
  await wait(Math.random() * 250 + 50)
  api.deleteItem(Number(req.params.id))
  res.send()
});

app.post("/items", async (req, res) => {
  await wait(Math.random() * 250 + 50)
  console.log(req.body)
  const item = api.addItem(req.body)
  res.send(item)
});

app.put("/items/:id/toggle", async (req, res) => {
  await wait(Math.random() * 250 + 50)
  api.toggleItem(Number(req.params.id))
  res.send()
});

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
