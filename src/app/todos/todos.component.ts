import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from '../models/Todos';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  TodoForm !: FormGroup;
  Todos: Todo[] = [];
  updateIndex!: any;

  isEditEnabled: boolean = false;
  inputTodo = '';
  constructor(private fb: FormBuilder,
    ) {}

    public i = '';
    public item: Todo[] = [];

  ngOnInit(): void {
    this.TodoForm = this.fb.group({
      item: ['', Validators.required]
    })
    this.Todos = [
      /* {
        content: 'First Todo',
        completed : false
      },
      {
        content: 'Second Todo',
        completed : false
      } */
    ]
  }

  toogledone(id: number) {
    this.Todos.map((v, i) => {
      if (i == id) v.completed = !v.completed
      return v;
    }
    )
  }

  deleteTodo(id: number) {
    this.Todos = this.Todos.filter((v, i) => i != id)
  }

  addTodo() {
    this.Todos.push({
      content: this.inputTodo,
      completed: false
    })
    this.inputTodo = '';
  }

  onEdit(item: Todo, i: number) {
    this.TodoForm.controls['item'].setValue(item.content);
    this.updateIndex = i;
    this.isEditEnabled = true;

  }

  updateTodo() {
    this.Todos[this.updateIndex].content = this.TodoForm.value.item;
    this.Todos[this.updateIndex].completed = false;
    this.TodoForm.reset();
    this.updateIndex = undefined;
    this.isEditEnabled = false;

  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.Todos, event.previousIndex, event.currentIndex);
  }

}
