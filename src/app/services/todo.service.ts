import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Todo {
    id?: number;
    todo?: string;
    completed?: boolean;
    userId?: number;
}
export type Todos = Todo[];
@Injectable({
  providedIn: 'root'
})
export class TodoService {
  /*
  * CRUD API for Todo
  */
  private _api = environment.todo.api;
  
  async addTodo(todo: Todo): Promise<Todo> {
    const response = await fetch(`${this._api}/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    });
    return await response.json();
  }


  async getTodos(): Promise<Todos> {
    const response = await fetch(`${this._api}`);
    const { todos } = await response.json();
    return todos;
  }


  async updateTodo(id: number, todo: Todo): Promise<Todo> {
    const response = await fetch(`${this._api}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    });
    return await response.json();
  }

  async deleteTodo(id: number): Promise<Todo> {
    const response = await fetch(`${this._api}/${id}`, {
      method: 'DELETE',
    });
    return await response.json();
  }

  constructor() { }
}
