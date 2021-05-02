import {
  EditOutlined,
  DeleteOutlined,
  CheckSquareOutlined,
} from '@ant-design/icons';
import { Card, Form, Input, Modal, Button, Typography } from 'antd';
import { useRecoilState, useRecoilValue } from 'recoil';
import { editState, todoState } from '@/components/recoil/atom';
import { TodoProps } from '@/components/types/index';
import { todoSearchState } from './recoil/selector';
import { useState } from 'react';
import EditTodo from '@/components/EditTodo';
import _ from 'lodash';

const { Text, Link } = Typography;

const TodoCard = ({ onDelete, onCheck }: any) => {
  const [todoList, setTodoList] = useRecoilState(todoState);
  const { Meta } = Card;
  const [modalActiveEdit, setModalActiveEdit] = useRecoilState(editState);
  const [form] = Form.useForm();
  const todoSearch = useRecoilValue(todoSearchState);
  const [modalEditContent, setModalEditContent] = useState<JSX.Element>();

  const handleCancel = () => {
    setModalActiveEdit(false);
  };

  const handleDlete = (todo: TodoProps) => {
    onDelete(todo);
  };

  const handleEidt = (todo: TodoProps) => {
    
    setModalEditContent(<EditTodo todo={todo} onEdit={editTodo}/>);
    // onEdit(values.id, values.title);
    // setModalActiveEdit(false);
  };
  const handleCheck = (todo: TodoProps) => {
    onCheck(todo);
  };

  const editTodo = (newId: number, newValue: string) => {
    const temp = _.cloneDeep(todoList);
    const newData = temp.map((data) => {
      if (data.id === newId) {
        data.value = newValue;
        // data.date = dateTime();
      }
      return data;
    });
    setTodoList(newData);
  };


  return (
    <>
      

      {todoSearch.map((todo: TodoProps) => {
        return (
          <Card
            key={todo.id}
            className='my-4'
            actions={[
              <CheckSquareOutlined
                key='check'
                onClick={() => handleCheck(todo)}
              />,
              <EditOutlined
                key='edit'
                onClick={() => {
                  setModalActiveEdit(true);
                  handleEidt(todo);
                  form.setFieldsValue({
                    title: todo.value,
                    id: todo.id,
                  });
                }}
              />,
              <DeleteOutlined key='delete' onClick={() => handleDlete(todo)} />,
            ]}
          >
            <Meta
              title={
                todo.completed ? (
                  <Text delete type='secondary'>
                    {todo.value}
                  </Text>
                ) : (
                  todo.value
                )
              }
              description={todo.date}
            />
          </Card>
        );
      })}
      {modalEditContent}

    </>
  );
};

export default TodoCard;

// {todoList.map((todo: TodoProps) => {
//   return (
//     <Modal
//       title='Edit Todo'
//       key={todo.id}
//       visible={modalActiveEdit}
//       onCancel={handleCancel}
//       footer={[
//         <Button form='myForm' key='submit' htmlType='submit'>
//           ADD
//         </Button>,
//       ]}
//     >
//       <Form
//         onFinish={handleEidt}
//         form={form}
//         layout='inline'
//         id='myForm'
//         initialValues={{ remember: todo.value }}
//       >
//         <Form.Item name='id'>
//           <Input type='hidden' />
//         </Form.Item>
//         <Form.Item name='title'>
//           <Input placeholder='Enter text' />
//         </Form.Item>
//       </Form>
//     </Modal>
//   );
// })}