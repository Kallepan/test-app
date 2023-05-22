import { Component, OnInit } from '@angular/core';
import { Todo, TodoService, Todos } from '../services/todo.service';
import { BehaviorSubject, delay, tap } from 'rxjs';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  private _todos = new BehaviorSubject<Todos>([]);
  readonly todos$ = this._todos.asObservable().pipe(
    tap(() => this._loading.next(false))
  );
  private _loading = new BehaviorSubject<boolean>(false);
  readonly loading$ = this._loading.asObservable().pipe(
    delay(100),
  );

  todo: string = '';

  constructor(private _todoService: TodoService) { }
  
  ngOnInit(): void {
    this._loading.next(true);
    this._todoService.getTodos().then((todos) => {
      this._todos.next(todos);
    });
  }

  updateCompleted(event: any, todo: Todo) {
    this.updateTodo({
      ...todo,
      completed: event.target.checked,
    });
  }

  async addTodo(event: any) {
    event.preventDefault();
    if (this.todo.trim().length === 0) {
      return;
    }
    
    const todo = {
      todo: this.todo,
      completed: false,
      userId: 1,
    };

    this._loading.next(true);
    this._todoService.addTodo(todo).then((todo) => {
      this._todos.next([...this._todos.getValue(), todo]);
      this.todo = '';
    });
  }

  async updateTodo({id, completed}: Todo) {
    if (!id) {
      return;
    }

    this._loading.next(true);
    this._todoService.updateTodo(id, {completed}).then((todo) => {
      const todos = this._todos.getValue();
      const index = todos.findIndex((t) => t.id === todo.id);
      todos[index].completed = todo.completed;
      this._todos.next(todos);
    });
  }

  deleteTodo(id: number|undefined) {
    if (!id) {
      return;
    }

    this._loading.next(true);
    this._todoService.deleteTodo(id).then((todo) => {
      const todos = this._todos.getValue();
      const index = todos.findIndex((t) => t.id === todo.id);
      todos.splice(index, 1);
      this._todos.next(todos);
    });
  }
}
