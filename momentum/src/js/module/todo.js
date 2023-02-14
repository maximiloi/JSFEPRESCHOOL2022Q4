// const todoButton = document.querySelector('.todo');
const todoWrapper = document.querySelector('.todo__wrapper');
const todoTextInput = document.querySelector('.todo__text');
const filters = document.querySelectorAll('.todo__filter span');
const todoTaskBox = document.querySelector('.todo__task-box');

let todos = JSON.parse(localStorage.getItem('todo-list'));
let editTodoId = 0;
let isEditedTask = false;

function showTodo(filter) {
    let li = '';

    if (todos) {
        todos.forEach((todo, id) => {
            let isCompleted = todo.status == 'completed' ? 'checked' : '';

            if (filter == todo.status || filter == 'all') {
                li += `<li class="todo__task task">
                            <label for="${id}">
                                <input class="task__checkbox" type="checkbox"  id="${id}" ${isCompleted}>
                                <p class="${isCompleted}">${todo.name}</p>
                            </label>
                            <div class="task__setting">
                                <span class="task__setting--point">...</span>
                                <ul class="task__menu">
                                    <li class="task--edit">edit</li>
                                    <li class="task--delete">delete</li>
                                </ul>
                            </div>
                        </li>`;
            }
        });
    }
    todoTaskBox.innerHTML = li || `<span>You don't have any task here</span>`;
}

document.addEventListener('click', function (event) {
    const targetElement = event.target;

    if (targetElement.closest('.todo')) {
        todoWrapper.classList.toggle('active');
    }

    if (targetElement.closest('.task--edit')) {
        // Редоктирование тодо
        let idEditTodo = targetElement.parentElement.parentElement.previousElementSibling.getAttribute('for');
        let textEditTodo = targetElement.parentElement.parentElement.previousElementSibling.lastElementChild.innerText;

        editTodoId = idEditTodo;
        isEditedTask = true;
        todoTextInput.value = textEditTodo;
    }

    if (targetElement.closest('.task--delete')) {
        // Удаление тодо
        let idDeleteTodo = targetElement.parentElement.parentElement.previousElementSibling.getAttribute('for');
        todos.splice(idDeleteTodo, 1);
        targetElement.parentElement.remove('open');
        showTodo('all');
    }

    if (targetElement.closest('.clear')) {
        // Удаление тодо
        todos.splice(0, todos.length);
        showTodo('all');
    }

    if (!targetElement.closest('.task__menu.open')) {
        const taskMenus = document.querySelectorAll('.task__menu');
        taskMenus.forEach((menu) => {
            if (menu.closest('.open')) {
                menu.classList.remove('open');
            }
        });
    }

    if (targetElement.closest('.task__setting--point')) {
        targetElement.nextElementSibling.classList.add('open');
    }

    if (targetElement.closest('.task__checkbox')) {
        let taskName = targetElement.parentElement.lastElementChild;

        if (targetElement.checked) {
            taskName.classList.add('checked');
            todos[targetElement.id].status = 'completed';
        } else {
            taskName.classList.remove('checked');
            todos[targetElement.id].status = 'pending';
        }
    }

    if (targetElement.closest('.todo__filter')) {
        filters.forEach((item) => {
            item.classList.remove('active');
        });
        targetElement.classList.add('active');
        showTodo(targetElement.innerText.toLowerCase());
    }

    localStorage.setItem('todo-list', JSON.stringify(todos));
});

todoTextInput.addEventListener('keyup', function (event) {
    let userTask = todoTextInput.value.trim();
    if (event.keyCode === 13 && userTask) {
        if (!isEditedTask) {
            if (!todos) {
                todos = [];
            }
            let taskInfo = { name: userTask, status: 'pending' };
            todos.push(taskInfo);
        } else {
            isEditedTask = false;
            todos[editTodoId].name = userTask;
        }
        todoTextInput.value = '';
        localStorage.setItem('todo-list', JSON.stringify(todos));
        showTodo('all');
    }
});

showTodo('all');
