import React, { useState } from 'react';
import { Form, Input, Button, Radio } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import {TodoFormProps} from '@/components/types/index';
import { fromPairs } from 'lodash';

const TodoForm: React.FC<TodoFormProps> = ({ addTodo, search, type }) => {
  // const SearchBar: React.FC<SearchBarProps> = ({ onCitySearch }) => {
  const [form] = Form.useForm();

  const onHandleAdd = (values: { title: string }) => {
    if (!!addTodo) addTodo(values.title);
    form.resetFields();
  };

  const onHandleSearch = (values: { title: string }) => {
    if (!!search) search(values.title);
  };

  return (
    <>
      <Form
        onFinish={type === 'add' ? onHandleAdd : onHandleSearch}
        form={form}
        layout='vertical'
      >
        <Form.Item label='Todo' name='title'>
          <Input placeholder='Enter text' />
        </Form.Item>
        <Form.Item>
          <Button htmlType='submit' type='primary'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default TodoForm;