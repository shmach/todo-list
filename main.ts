import { TodosListController } from "./controllers/todosListController";
import { ITodo } from "./interfaces/ITodo";
import { CompletedTodosListRenderer } from "./services/completedTodosListRenderer";
import { UncompletedTodosListRenderer } from "./services/uncompletedTodosListRenderer";
import { LocalStorageController } from "./controllers/localStorageController";

const form = document.getElementById('form') as HTMLFormElement;
const input = document.getElementById('form-input') as HTMLInputElement;

const uncompletedTodosListContainer = document.getElementById('uncompleted-todos') as HTMLElement;
const completedTodosListContainer = document.getElementById('completed-todos') as HTMLElement;

const localStorageController = new LocalStorageController();
const controller = new TodosListController(localStorageController);

const uncompletedTodosListRenderer = new UncompletedTodosListRenderer(
  uncompletedTodosListContainer,
  controller
);

const completedTodosListRenderer = new CompletedTodosListRenderer(
  completedTodosListContainer,
  controller
)

form.addEventListener("submit", (e: SubmitEvent) => {
  e.preventDefault();
  const id = Math.floor(Math.random() * 10000);
  const newTodo: ITodo = {
    id,
    description: input.value,
    isDone: false,
    isEditing: false
  };

  controller.addTodo(newTodo);
  uncompletedTodosListRenderer.renderTodosList(controller.todosList);
  form.reset();
});

class Main {
  constructor() { }

  init() {
    const storedTodos = controller.localStorageController.getTodosList();
    controller.todosList = storedTodos;
    uncompletedTodosListRenderer.update();
    completedTodosListRenderer.update();
  }
}

const main = new Main()

main.init();