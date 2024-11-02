import { TodosListController } from "../controllers/todosListController";
import { IObserver } from "../interfaces/IObserver";
import { ITodo } from "../interfaces/ITodo";
import { todoListItemView } from "../views/todoListItemView";
import { updateTodoFormView } from "../views/updateTodoFormView";

export class TodosListRenderer implements IObserver {
  constructor(
    public todosListContainer: HTMLElement,
    public todosListController: TodosListController
  ) { }

  update(): void { }

  renderTodosList(todosList: ITodo[]) {
    if (this.todosListContainer) {
      this.todosListContainer.innerHTML = '';

      const todosListItems = todosList.map((todo) => todo.isEditing
        ? updateTodoFormView(todo)
        : todoListItemView(todo)
      );

      this.todosListContainer.innerHTML += todosListItems.join('');

      todosList.forEach((todo) => {
        const checkbox = document.querySelector(`[data-checkbox="${todo.id}"]`);
        const deleteBtn = document.querySelector(`[data-delete="${todo.id}"]`);
        const editBtn = document.querySelector(`[data-edit="${todo.id}"]`);
        const updateForm = document.querySelector(`[data-updateForm="${todo.id}"]`) as HTMLFormElement;
        const updateInput = document.querySelector(`[data-updateInput="${todo.id}"]`) as HTMLInputElement;

        checkbox?.addEventListener('change', () => {
          this.todosListController.toggleTodoDone(todo.id)
        });

        deleteBtn?.addEventListener('click', () => {
          this.todosListController.deleteTodo(todo.id);
        });

        editBtn?.addEventListener('click', () => {
          this.todosListController.toggleTodoEditing(todo.id)
        });

        updateForm?.addEventListener('submit', (e: Event) => {
          e.preventDefault();
          this.todosListController.updateTodo(todo.id, updateInput.value);
        })
      });
    }
  }
}