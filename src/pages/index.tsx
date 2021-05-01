import { Typography } from 'antd';
import TodoForm from '@/components/TodoForm';
import React, { useState } from 'react';
import TodoCard from '@/components/TodoCard';
import { useRecoilState, useRecoilValue } from 'recoil';
import { inputSearchState, todoState } from '@/components/recoil/atom';
import { todoSearchState, totalState } from '@/components/recoil/selector';
import { TodoProps } from '@/components/types/index';
// import { stringify } from 'node:querystring';
import _ from 'lodash';

export default function Home() {
  const { Title } = Typography;
  const [todos, setTodos] = useRecoilState(todoState);
  const totalTodo = useRecoilValue(totalState);
  const [inputSearch, setInputSearch] = useRecoilState(inputSearchState);
  const todoSearch = useRecoilValue(todoSearchState);
 
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
      status: false,
      value,
      date: dateTime(),
    };

    setTodos([...todos, data]);
  };
  const deleteTodo = (todo: TodoProps) => {
    if (todos.length > 0) {
      setTodos(todos.filter((todoFilter) => todoFilter.id !== todo.id));
    }
  };

  const editTodo = (newId: number, newValue: string) => {
    const temp = _.cloneDeep(todos);
    const newData = temp.map((data) => {
      if (data.id === newId) {
        data.value = newValue;
        data.date = dateTime();
      }
      return data;
    });
    console.log("xx ",newData);
    setTodos(newData);
  };
  console.log('test ', todos);

  return (
    <>
      <div className='w-100 max-w-4xl mx-auto p-5'>
        <h1 className='text-4xl font-bold'>TodoList</h1>
        <div className='flex'>
          <TodoForm addTodo={addTodo} type={'add'} />
          <TodoForm search={search} type={'search'} />
        </div>
        <TodoCard onDelete={deleteTodo} onEdit={editTodo} />
      </div>
    </>
  );
}
