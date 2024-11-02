import { TodosListController } from "../controllers/todosListController";
import { TodosListRenderer } from "./todosListRenderer";

export class CompletedTodosListRenderer extends TodosListRenderer {
  constructor(
    todosListContainer: HTMLElement,
    todosListController: TodosListController,
  ) {
    super(todosListContainer, todosListController);
    this.todosListController.addObserver(this);
  }

  update(): void {
    const completedTodos = this.todosListController.todosList.filter(todo => todo.isDone);
    this.renderTodosList(completedTodos);
  }
}