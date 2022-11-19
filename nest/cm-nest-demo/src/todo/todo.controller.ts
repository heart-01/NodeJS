import { TodoService } from './todo.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get()
  getTodos() {
    return this.todoService.getTodo();
  }

  @Post()
  // รับค่าจาก form มี data เป็น title , subtitle ที่เป็น string
  postTodo(@Body('title') title: string, @Body('subtitle') subtitle: string) {
    this.todoService.addTodo(title, subtitle);
  }

  @Patch(':id')
  patchTodoById(@Param('id') id: number) {
    console.log(id);
  }

  @Delete(':id')
  deleteTodoById(@Param('id') id: number) {
    return this.todoService.removeTodoById(id);
  }
}
