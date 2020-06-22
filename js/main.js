'use strict';

const toDoList = localStorage.getItem('list')
    ? JSON.parse(localStorage.getItem('list'))
    : [];
const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');

todoControl.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const value = headerInput.value.trim();
    if (value !== '') {
        toDoList.push({
            value: value,
            complete: false,
        });
        localStorage.setItem('list', JSON.stringify(toDoList));
        headerInput.value = '';
        render();
    }
});

const toDoListUl = document.querySelector('.js-todo-list');
const toDoListComplitetUl = document.querySelector('.js-todo-list-complete');

function render() {
    toDoListUl.innerHTML = '';
    toDoListComplitetUl.innerHTML = '';

    toDoList.forEach((item, i) => {
        const li = document.createElement('li');
        li.className = 'todo-item';
        if (item.complete) {
            li.innerHTML = getComplitedItemHTML(item.value);
            toDoListComplitetUl.append(li);
        } else {
            li.innerHTML = getItemHTML(item.value);
            toDoListUl.append(li);
        }

        const btnComplite = li.querySelector('.todo-complete');
        const btnDelete = li.querySelector('.todo-remove');
        btnComplite.addEventListener('click', () => {
            toDoList[i].complete = !toDoList[i].complete;
            localStorage.setItem('list', JSON.stringify(toDoList));
            render();
        });
        btnDelete.addEventListener('click', () => {
            toDoList.splice(i, 1);
            localStorage.setItem('list', JSON.stringify(toDoList));
            render();
        });
    });
}

render();

function getItemHTML(text) {
    return `
        <span class="todo-text">${text}</span>
        <div class="todo-buttons">
            <button class="todo-remove">
                <img class="img-remove" src="img/1485477104-basket_78591.svg" alt="">
            </button>
            <button class="todo-complete"></button>
        </div>
   `;
}

function getComplitedItemHTML(text) {
    return `
        <span class="todo-text">${text}</span>
        <div class="todo-buttons">
            <button class="todo-remove">
                <img class="img-remove" src="img/1485477104-basket_78591.svg" alt="">
            </button>
            <button class="todo-complete todo-complete--checked"></button>
        </div>
   `;
}
