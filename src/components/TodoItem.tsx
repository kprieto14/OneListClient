import axios from 'axios';
import React from 'react';
import { TodoItemType } from '../App';

type TodoItemProps = {
  todoItem: TodoItemType;
  reloadItems: () => void;
};

export function TodoItem({ todoItem, reloadItems }: TodoItemProps) {
  async function toggleCompleteStatus() {
    const response = await axios.put(
      `https://one-list-api.herokuapp.com/items/${todoItem.id}?access_token=kristy-prieto`,
      { item: { complete: !todoItem.complete } }
    );
    if (response.status === 200) {
      console.log(response.data);
      reloadItems();
    }
  }

  return (
    <li
      className={todoItem.complete ? 'completed' : ''}
      onClick={toggleCompleteStatus}
    >
      {todoItem.text}
    </li>
  );
}
