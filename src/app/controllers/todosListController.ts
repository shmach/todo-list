import { IObserver } from "../interfaces/IObserver";
import { ITodo } from "../interfaces/ITodo";
import { LocalStorageController } from "./localStorageController";

export class TodosListController implements IObserver {
  constructor(
    public localStorageController: LocalStorageController
  ) { }

  private todos: ITodo[] = [];
  private observers: IObserver[] = [];

  public addObserver(observer: IObserver) {
    this.observers.push(observer);
  }

  public notifyObservers() {
    this.observers.forEach(observer => {
      observer.update();
    })
  };

  update(): void {
    const todos = this.todosList;
    this.localStorageController.setTodosList(todos);
  }

  get todosList() {
    return this.todos;
  }

  set todosList(updatedTodos: ITodo[]) {
    this.todos = updatedTodos;
  }

  addTodo(todo: ITodo) {
    this.todosList.push(todo);
    this.notifyObservers();
    this.update();
  };

  deleteTodo(todoId: number) {
    const updatedTodosList = this.todosList.filter((todo) => todo.id !== todoId);

    this.todosList = updatedTodosList;
    this.notifyObservers();
    this.update();
  };

  toggleTodoDone(todoId: number) {
    const updatedTodosList = this.todosList.map((todo) => todo.id === todoId
      ? { ...todo, isDone: !todo.isDone }
      : todo
    );

    this.todosList = updatedTodosList;
    this.notifyObservers();
    this.update();
  };

  toggleTodoEditing(todoId: number) {
    const updatedTodosList = this.todosList.map((todo) => todo.id === todoId
      ? { ...todo, isEditing: !todo.isEditing }
      : todo
    );

    this.todosList = updatedTodosList;
    this.notifyObservers();
    this.update();
  };

  updateTodo(todoId: number, newDescription: string) {
    const updatedTodosList = this.todosList.map((todo) => todo.id === todoId
      ? { ...todo, description: newDescription, isEditing: false }
      : todo
    );

    this.todosList = updatedTodosList;
    this.notifyObservers();
    this.update();
  };
}