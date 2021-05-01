import { selector } from 'recoil'; //เอาค่าจาก atom มาคำนวณ
import { todoState, inputSearchState } from './atom';

export const totalState = selector({
  key: 'total',
  get: ({ get }) => {
    // console.log("xx ", get(todoState));
    const totalTodo = get(todoState); //เอาค่าจาก todoState มา
    const completed = totalTodo.filter((data) => {
      return data.status === false;
    });
    // return totalTodo;
    return {
      total: totalTodo.length,
      // completed,
      notCompleted: 2,
      search: 'dd',
    };
  },
});

export const todoSearchState = selector({
  key: 'todoSearch',
  get: ({ get }) => {
    const todos = get(todoState);
    const todoSearch = get(inputSearchState);
    console.log(todoSearch);
    let searchData;
    if (todoSearch !== '') {
      searchData = todos.filter((todo) => {
        return todo.value.includes(todoSearch);
      });
    } else {
      searchData = todos;
    }
    console.log('searchData : ', searchData);
    return searchData;
  },
});
