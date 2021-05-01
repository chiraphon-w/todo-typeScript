import {
  EditOutlined,
  DeleteOutlined,
  CheckSquareOutlined,
} from '@ant-design/icons';
import { Card, Form, Input, Modal, Button } from 'antd';
import { useRecoilState, useRecoilValue } from 'recoil';
import { editState, todoState } from '@/components/recoil/atom';
import { TodoProps } from '@/components/types/index';
import { todoSearchState } from './recoil/selector';

const TodoCard = ({ onDelete, todo, onEdit }: any) => {
  const [todoList, setTodoList] = useRecoilState(todoState);
  const { Meta } = Card;
  const [modalActiveEdit, setModalActiveEdit] = useRecoilState(editState);
  const [form] = Form.useForm();
  const todoSearch = useRecoilValue(todoSearchState);

  const handleCancel = () => {
    setModalActiveEdit(false);
  };

  const deleteTodo = (todo: TodoProps) => {
    onDelete(todo);
  };

  const onEditSubmit = (values: { title: string; id: number }) => {
    onEdit(values.id, values.title);
    setModalActiveEdit(false);
  };

  return (
    <>
      {todoList.map((todo: TodoProps) => {
        return (
          <Modal
            title='Edit Todo'
            key={todo.id}
            visible={modalActiveEdit}
            onCancel={handleCancel}
            footer={[
              <Button form='myForm' key='submit' htmlType='submit'>
                ADD
              </Button>,
            ]}
          >
            <Form
              onFinish={onEditSubmit}
              form={form}
              layout='inline'
              id='myForm'
              initialValues={{ remember: todo.value }}
            >
              <Form.Item name='id'>
                <Input type='hidden' />
              </Form.Item>
              <Form.Item name='title'>
                <Input placeholder='Enter text' />
              </Form.Item>
            </Form>
          </Modal>
        );
      })}

      {todoSearch.map((todo: TodoProps) => {
        return (
          <Card
            key={todo.id}
            className='my-4'
            actions={[
              <CheckSquareOutlined key='check' onClick={() => {}} />,
              <EditOutlined
                key='edit'
                onClick={() => {
                  setModalActiveEdit(true);
                  form.setFieldsValue({
                    title: todo.value,
                    id: todo.id,
                  });
                }}
              />,
              <DeleteOutlined key='delete' onClick={() => deleteTodo(todo)} />,
            ]}
          >
            <Meta title={todo.value} description={todo.date} />
          </Card>
        );
      })}
    </>
  );
};

export default TodoCard;
