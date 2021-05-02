import React, { useEffect } from 'react';
import { Input, Button, Form, Modal, Space } from 'antd';
import { editState } from './recoil/atom';
import { useRecoilState } from 'recoil';
import { TodoEditProps } from '@/components/types/index';

const EditTodo = ({ todo, onEdit }: TodoEditProps) => {
  const [modalActiveEdit, setModalActiveEdit] = useRecoilState(editState);
  const [form] = Form.useForm();

  const handleCancel = () => {
    setModalActiveEdit(false);
  };

  const editTodo = (values: { title: string }) => {
    onEdit(todo.id, values.title);
    console.log('values : ', values.title);

    setModalActiveEdit(false);
  };

  useEffect(() => {
    form.setFieldsValue({
      title: todo.value,
    });
  }, [todo.value]);

  return (
    <>
      <Modal
        title='Edit Todo'
        visible={modalActiveEdit}
        footer={null}
        onCancel={handleCancel}
      >
        <Form
          id='myForm'
          form={form}
          onFinish={editTodo}
          layout='inline'
          style={{ justifyContent: 'center' }}
        >
          <Form.Item
            name='title'
            rules={[{ required: true, message: 'Please Enter Text' }]}
          >
            <Input style={{ width: 380 }} placeholder='Enter text' />
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit'>
              Edit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditTodo;
