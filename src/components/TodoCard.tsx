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
import dateTime from './dateTime';

const TodoCard = ({ onDelete, onCheck }: any) => {
  const { Text, Title } = Typography;
  const [todoList, setTodoList] = useRecoilState(todoState);
  const { Meta } = Card;
  const [modalActiveEdit, setModalActiveEdit] = useRecoilState(editState);
  const todoSearch = useRecoilValue(todoSearchState);
  const [modalEditContent, setModalEditContent] = useState<JSX.Element>();

  const handleDlete = (todo: TodoProps) => {
    onDelete(todo);
  };
  const handleEidt = (todo: TodoProps) => {
    setModalEditContent(<EditTodo todo={todo} onEdit={editTodo} />);
  };
  const handleCheck = (todo: TodoProps) => {
    onCheck(todo);
  };

  const editTodo = (newId: number, newValue: string) => {
    const temp = _.cloneDeep(todoList);
    const newData = temp.map((data) => {
      if (data.id === newId) {
        data.value = newValue;
        data.date = dateTime();
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
                }}
              />,
              <DeleteOutlined key='delete' onClick={() => handleDlete(todo)} />,
            ]}
          >
            <Title level={5}>
              {todo.completed ? (
                <Text delete type='danger'>
                  {todo.value}
                </Text>
              ) : (
                todo.value
              )}
            </Title>
            <Meta description={todo.date}/>
          </Card>
        );
      })}
      {modalEditContent}
    </>
  );
};

export default TodoCard;
