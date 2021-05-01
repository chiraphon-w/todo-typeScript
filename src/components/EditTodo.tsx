import React, { useState } from 'react';
import { Input, Button, Form } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { TodoProps } from './types';

interface TodoFormProps {
  onEditSubmit: (todo: TodoProps) => void;
}
const EditTodo: React.FC<TodoFormProps> = ({ onEditSubmit }) => {
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [modalText, setModalText] = React.useState('Content of the modal');
  const [form] = Form.useForm();
  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false);
  };

  return (
    <>
      <Form form={form} layout='vertical'>
        <Form.Item
          label='Todo'
          name='title'
          //   required
          //   tooltip='This is a required field'
        >
          <Input placeholder='input placeholder' />
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

export default EditTodo;
