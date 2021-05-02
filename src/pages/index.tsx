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


export default function Home() {
  // const { Title } = Typography;
  const [todoList, setTodoList] = useRecoilState(todoState);
  const [select, setSelect] = useRecoilState(isSelectState);

  // const totalTodo = useRecoilValue(totalState);
  const [inputSearch, setInputSearch] = useRecoilState(inputSearchState);
  const { Option } = Select;
  const dateTime = () => {
    let realTime: string;
    let d = new Date();
    let ye = new Intl.DateTimeFormat('en', { year: '2-digit' }).format(d);
    let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
    let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
    let hms = new Intl.DateTimeFormat('en', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(d);
    return (realTime = `Add on ${mo} ${da}, ${ye}, ${hms}`);
  };

  const search = (value: string) => {
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
          <TodoForm search={search} type={'search'} />
        </div>
        <Select
          defaultValue='All'
          style={{ width: 120 }}
          onChange={handleChange}
        >
          <Option value='all'>All</Option>
          <Option value='completed'>Complete</Option>
          <Option value='uncompleted'>Uncomplet</Option>
        </Select>
        <TodoCard onDelete={deleteTodo} onCheck={checkTodo} />
      </div>
    </>
  );
}
