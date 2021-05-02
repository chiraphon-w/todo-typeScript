export interface TodoProps {
  id: number;
  completed: boolean;
  value: string;
  date: string;
}

export interface TodoFormProps {
  addTodo?: (value: string) => void;
  searchTodo?: (value: string) => void;
  type: string;
}

export interface TodoEditProps {
  todo: TodoProps;
  onEdit: (newId: number, newValue: string) => void;
}
