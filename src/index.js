import './styles.css';
import { TodoList } from './js/classes';
import { crearTodoHtml } from './js/components.js';

export const todoList = new TodoList();

todoList.todos.forEach(crearTodoHtml);