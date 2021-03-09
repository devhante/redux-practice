import React, { useState } from 'react';
import { TodosState } from '../modules/todos';

interface TodoItemProps {
  todo: TodosState;
  onToggle: (id: number) => void;
}

interface TodoListProps {
  todos: TodosState[];
  onToggle: (id: number) => void;
}

interface TodosProps {
  todos: TodosState[];
  onCreate: (text: string) => void;
  onToggle: (id: number) => void;
}

// 컴포넌트 최적화를 위하여 React.memo를 사용합니다.
const TodoItem = React.memo(({ todo, onToggle }: TodoItemProps) => {
  return (
    <li
      style={{ textDecoration: todo.done ? 'line-through' : 'none' }}
      onClick={() => onToggle(todo.id)}>
      {todo.text}
    </li>
  );
});

// 컴포넌트 최적화를 위하여 React.memo를 사용합니다.
const TodoList = React.memo(({ todos, onToggle }: TodoListProps) => {
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onToggle={onToggle} />
      ))}
    </ul>
  );
});

function Todos({ todos, onCreate, onToggle }: TodosProps) {
  // 리덕스를 사용한다고 해서 모든 상태를 리덕스에서 관리해야 하는 것은 아닙니다.
  const [text, setText] = useState('');
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Submit 이벤트 발생했을 때 새로고침 방지
    onCreate(text);
    setText(''); // 인풋 초기화
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={text}
          placeholder="할 일을 입력하세요.."
          onChange={onChange}
        />
        <button type="submit">등록</button>
      </form>
      <TodoList todos={todos} onToggle={onToggle} />
    </div>
  );
}

export default Todos;
