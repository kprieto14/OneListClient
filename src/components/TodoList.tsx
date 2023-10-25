import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { TodoItem } from './TodoItem';
import { TodoItemType } from '../App';

export function TodoList() {
  const [todoItems, setTodoItems] = useState<TodoItemType[]>([]);
  const [newTodoText, setNewTodoText] = useState('');

  function loadAllItems() {
    async function loadItems() {
      const response = await axios.get(
        'https://one-list-api.herokuapp.com/items?access_token=kristy-prieto'
      );

      if (response.status === 200) {
        setTodoItems(response.data);
      }
    }

    loadItems();
  }

  useEffect(loadAllItems, []);

  async function handleCreateNewTodoItem() {
    const response = await axios.post(
      'https://one-list-api.herokuapp.com/items?access_token=kristy-prieto',
      { item: { text: newTodoText } }
    );

    if (response.status === 201) {
      loadAllItems();
      setNewTodoText('');
    }
  }
  return (
    <>
      <ul>
        {todoItems.map(function (todoItem) {
          return <TodoItem key={todoItem.id} todoItem={todoItem} reloadItems={loadAllItems} />;
        })}
      </ul>

      <form
        onSubmit={function (event) {
          event.preventDefault();

          handleCreateNewTodoItem();
        }}
      >
        <input
          type="text"
          placeholder="Whats up?"
          value={newTodoText}
          onChange={(event) => setNewTodoText(event.target.value)} />
      </form>
    </>
  );
}
