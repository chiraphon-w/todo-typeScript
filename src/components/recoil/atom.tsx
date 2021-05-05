import { atom } from 'recoil'; //useState
import { TodoProps } from '@/components/types/index';

export const todoState = atom<TodoProps[]>({
  key: 'todo',
  default: [],
});

export const editState = atom({
  key: 'edit',
  default: false,
});

export const inputSearchState = atom<string>({
  key: 'inputSearch',
  default: '',
});

export const isSelectState = atom({
  key: 'isSelect',
  default: '',
});

export const clearSearchState = atom({
  key: 'clearSearch',
  default: false,
});
