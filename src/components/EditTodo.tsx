import React, { useEffect, useRef } from 'react';
import { Input, Button, Form, Modal } from 'antd';
import { editState } from './recoil/atom';
import { useRecoilState } from 'recoil';
import { TodoEditProps } from '@/components/types/index';

const EditTodo = ({ todo, onEdit }: TodoEditProps) => {
  const [modalActiveEdit, setModalActiveEdit] = useRecoilState(editState);
  const [form] = Form.useForm();
  const formRef = useRef(null);

  // const [form] = Form.useForm({ forceFormElementConnection: false });

  const handleCancel = () => {
    setModalActiveEdit(false);
  };

  const onEditSubmit = (values: { title: string }) => {
    onEdit(todo.id, values.title);
    console.log('values : ', values);

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
        title='Edit'
        visible={modalActiveEdit}
        footer={null}
        onCancel={handleCancel}

      >
        <Form form={form} onFinish={onEditSubmit} layout='inline'>
          <Form.Item name='title'>
            <Input placeholder='Enter text'/>
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

// <Form name="basic" className="flex mt-5" onFinish={handleType} form={form}>
//       <Form.Item
//         label={`${type} todo`}
//         name="addTodo"
//         className={"mx-5"}
//         rules={[
//           {
//             required: type !== "Search",
//             message: "Please input todo!",
//           },
//         ]}
//       >
//         <Input
//           className={"w-full px-2.5 py-1 border focus:outline-none rounded-md"}
//         />
//       </Form.Item>
//       <Form.Item>
//         <Button type="primary" htmlTyp
//   footer={null}

export default EditTodo;
