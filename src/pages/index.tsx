import { Typography, Select } from 'antd';
import TodoForm from '@/components/TodoForm';
import React, { useState } from 'react';
import TodoCard from '@/components/TodoCard';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  inputSearchState,
  isSelectState,
  todoState,
} from '@/components/recoil/atom';
import { totalState } from '@/components/recoil/selector';
import { TodoProps } from '@/components/types/index';
import dateTime from '@/components/dateTime';


export default function Home() {
  const [todoList, setTodoList] = useRecoilState(todoState);
  const [select, setSelect] = useRecoilState(isSelectState);

  const [inputSearch, setInputSearch] = useRecoilState(inputSearchState);
  const { Option } = Select;
  

  const searchTodo = (value: string) => {
    setInputSearch(value);
    console.log('value', value);
    if (value === '') {
      setInputSearch('');
    }
  };

  const addTodo = (value: string) => {
    const id = Math.floor(Math.random() * 10000) + 1;
    const data = {
      id,
      completed: false,
      value,
      date: dateTime(),
    };

    setTodoList([...todoList, data]);
  };

  const deleteTodo = (todo: TodoProps) => {
    if (todoList.length > 0) {
      setTodoList(todoList.filter((todoFilter) => todoFilter.id !== todo.id));
    }
  };

  const checkTodo = (todo: TodoProps) => {
    if (todoList.length > 0) {
      setTodoList(
        todoList.map((item) => {
          if (item.id === todo.id) {
            return {
              ...item,
              completed: !item.completed,
            };
          }
          return item;
        })
      );
    }
  };

 

  function handleChange(value: string) {
    console.log(`selected : ${value}`);
    setSelect(value);
  }

  return (
    <>
      <div className='w-full max-w-4xl mx-auto p-5'>
        <h1 className='text-4xl font-bold'>TodoList</h1>
        <div className='flex p-5'>
          <TodoForm addTodo={addTodo} type={'add'} />
          <TodoForm searchTodo={searchTodo} type={'search'} />
        </div>
        <Select
          defaultValue='All'
          style={{ width: 140 }}
          onChange={handleChange}
        >
          <Option value='all'>All</Option>
          <Option value='completed'>Complete</Option>
          <Option value='uncompleted'>Uncompleted</Option>
        </Select>
        <TodoCard onDelete={deleteTodo} onCheck={checkTodo} />
      </div>
    </>
  );
}
