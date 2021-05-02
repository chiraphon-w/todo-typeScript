import { selector } from 'recoil'; //เอาค่าจาก atom มาคำนวณ
import {
  todoState,
  inputSearchState,
  isSelectState,
} from './atom';

export const totalState = selector({
  key: 'total',
  get: ({ get }) => {
    // console.log("xx ", get(todoState));
    const totalTodo = get(todoState); //เอาค่าจาก todoState มา
    const completed = totalTodo.filter((data) => {
      return data.completed === false;
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
    const todoList = get(todoState);
    const todoSearch = get(inputSearchState);
    const selectStatus = get(isSelectState);
    console.log('selectStatus : ', selectStatus);

    let searchData = todoList;
    if (selectStatus === 'completed') {
      console.log('xxx');
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
 

    console.log('searchData ja: ', searchData);
    return searchData;
  },
});
