import { Todo } from './todo.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TodoService {
  // ประกาศตัวแปร array มี datatype เป็น class Todo ที่รับค่าเป็น array
  private todoArray: Todo[] = [];

  getTodo() {
    return this.todoArray;
  }

  addTodo(title: string, subtitle: string) {
    console.log(`Title: ${title}, Subtitle: ${subtitle}`);

    const todo = new Todo();
    todo.id = uuidv4();
    todo.title = title;
    todo.subtitle = subtitle;

    this.todoArray.push(todo);
  }

  removeTodoById(id: number) {
    const found = this.todoArray.find((todo) => todo.id === id);
    if (!found) {
      throw new NotFoundException(`Todo with ${id} not found`);
    }

    return this.todoArray.filter((todo) => todo.id !== id);
  }
}
