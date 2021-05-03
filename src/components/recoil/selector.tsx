import { selector } from 'recoil'; //เอาค่าจาก atom มาคำนวณ
import { todoState, inputSearchState, isSelectState } from './atom';

export const totalState = selector({
  key: 'total',
  get: ({ get }) => {
    const totalTodo = get(todoState); //เอาค่าจาก todoState มา
    const completed = totalTodo.filter((data) => {
      return data.completed === true;
    });
    const uncompleted = totalTodo.filter((data) => {
      return data.completed === false;
    });
    return {
      total: totalTodo.length,
      completed: completed.length,
      uncompleted: uncompleted.length,
    };
  },
});

export const todoSearchState = selector({
  key: 'todoSearch',
  get: ({ get }) => {
    const todoList = get(todoState);
    const todoSearch = get(inputSearchState);
    const selectStatus = get(isSelectState);

    let searchData = todoList;
    if (selectStatus === 'completed') {
      searchData = todoList.filter((todo) => {
        return todo.completed === true;
      });
    }
    if (selectStatus === 'uncompleted') {
      searchData = todoList.filter((todo) => {
        return todo.completed === false;
      });
    }
    if (todoSearch !== '') {
      searchData = searchData.filter((todo) => {
        return todo.value.includes(todoSearch);
      });
    }

    return searchData;
  },
});
