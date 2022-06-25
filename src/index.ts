// HANDLERS
const todoInput = <HTMLInputElement | null>document.getElementById('todo-input');
const cancelButton = <HTMLButtonElement | null>document.getElementById('cancel-todo');
const addButton = <HTMLButtonElement | null>document.getElementById('add-todo');

// ERROR PROMPTS
const errorPopup = <HTMLDivElement | null>document.getElementById('error-popup');
const errorMessage = <HTMLSpanElement>document.getElementById('error-message');

// TODOs
const todoContainer = <HTMLUListElement | null>document.getElementById('todo-container');
const itemsLeftMessage = <HTMLParagraphElement | null>document.getElementById('items-left');
const clearCheckedButton = <HTMLButtonElement | null>document.getElementById('clear-completed');

// HELPER FUNCTIONS
function showError(message: string): void {
  errorPopup?.classList.remove('hidden');
  errorMessage.textContent = message;
}

function hideError() {
  if (!errorPopup) return;
  !errorPopup.classList.contains('hidden') && errorPopup.classList.add('hidden');
}

function clearInput() {
  if (!todoInput) return;
  todoInput.value = '';
}

function showTodosLeft() {
  if (!itemsLeftMessage) return;
  const checkedTodos = document.querySelectorAll('input[type=checkbox]:checked').length;
  const uncheckedTodos = document.querySelectorAll('input[type=checkbox]').length;
  const itemsLeft = uncheckedTodos - checkedTodos;
  itemsLeftMessage.textContent = `${itemsLeft} ${itemsLeft !== 1 ? 'items' : 'item'} left...`;
}

// LISTENERS
cancelButton?.addEventListener('click', () => {
  clearInput();
  hideError();
});

addButton?.addEventListener('click', () => {
  if (!todoInput || !errorPopup || !todoContainer) return;
  if (todoInput.value.trim().length === 0) return showError(`Todo mustn't me empty!`);
  if (todoInput.value.trim().length < 5) return showError(`${5 - todoInput.value.length} characters remaining...`);

  const li = document.createElement('li');
  li.className = 'bg-neutral-800 px-4 py-2 flex items-center';

  const input = document.createElement('input');
  input.className =
    'w-4 h-4 text-indigo-600 bg-gray-100 rounded border-gray-300 focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600';
  input.type = 'checkbox';
  input.onchange = () => showTodosLeft();

  const label = document.createElement('label');
  label.className = 'ml-2 text-sm font-medium text-gray-900 dark:text-gray-300';
  label.textContent = todoInput.value;

  const button = document.createElement('button');
  button.className =
    'ml-4 focus:outline-none text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-2 py-1.5 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-900';
  button.onclick = function (event: MouseEvent) {
    if (event.target instanceof Element) {
      event.target.parentElement?.remove();
      showTodosLeft();
    }
  };
  button.textContent = 'Delete';

  li.appendChild(input);
  li.appendChild(label);
  li.appendChild(button);

  todoContainer.appendChild(li);

  hideError();
  clearInput();
  showTodosLeft();
});

clearCheckedButton?.addEventListener('click', () => {
  const checkedTodos: NodeListOf<Element> = document.querySelectorAll('input[type=checkbox]:checked');
  if (checkedTodos.length === 0) return showError('There are no checked todos');

  checkedTodos.forEach((element: Element) => {
    element.parentElement?.remove();
  });
});
