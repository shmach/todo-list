import { TodosListController } from "../controllers/todosListController";
import { TodosListRenderer } from "./todosListRenderer";

export class UncompletedTodosListRenderer extends TodosListRenderer {
  constructor(
    todosListContainer: HTMLElement,
    todosListController: TodosListController,
  ) {
    super(todosListContainer, todosListController);
    this.todosListController.addObserver(this);
  }

  update(): void {
    const uncompletedTodos = this.todosListController.todosList.filter(todo => !todo.isDone);
    this.renderTodosList(uncompletedTodos)
  }
}