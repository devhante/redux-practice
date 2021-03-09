/* 액션 타입 선언 */
const ADD_TODO = 'todos/ADD_TODO' as const;
const TOGGLE_TODO = 'todos/TOGGLE_TODO' as const;

/* 액션 생성함수 선언 */
let nextId = 1; // todo 데이터에서 사용할 고유 id

export const addTodo = (text: string) => ({
  type: ADD_TODO,
  todo: {
    id: nextId++, // 새 항목을 추가하고 nextId 값에 1을 더해줍니다.
    text,
    done: false
  }
});

export const toggleTodo = (id: number) => ({
  type: TOGGLE_TODO,
  id
});

type TodosAction = ReturnType<typeof addTodo> | ReturnType<typeof toggleTodo>;

export type TodosState = {
  id: number;
  text: string;
  done: boolean;
};

/* 초기 상태 선언 */
// 리듀서의 초기 상태는 꼭 객체 타입일 필요는 없습니다.
// 배열이어도 되고, 원시 타입(숫자, 문자열, 불리언)이어도 상관 없습니다.
const initialState: TodosState[] = [
  /* 우리는 다음과 같이 구성된 객체를 이 배열 안에 넣을 것입니다.
  {
    id: 1,
    text: '예시',
    done: false
  }
  */
];

export default function todos(
  state: TodosState[] = initialState,
  action: TodosAction
) {
  switch (action.type) {
    case ADD_TODO:
      return state.concat(action.todo);
    case TOGGLE_TODO:
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo
      );
    default:
      return state;
  }
}
