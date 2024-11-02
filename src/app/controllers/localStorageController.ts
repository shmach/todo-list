import { ITodo } from "../interfaces/ITodo";

export class LocalStorageController {
  constructor() { }

  getTodosList(): ITodo[] {
    return JSON.parse(localStorage.getItem('todos')!) ?? [];
  }

  setTodosList(todos: ITodo[]) {
    localStorage.setItem('todos', JSON.stringify(todos))
  }
}