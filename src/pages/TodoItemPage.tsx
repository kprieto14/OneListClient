import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { TodoItemType } from "../App";
import axios from "axios";

export function TodoItemPage() {
    const params = useParams<{ id:string }>()
    const history = useNavigate()
    
    const [todoItem, setTodoItem] = useState<TodoItemType>({
        id: undefined,
        text: '',
        complete: false,
        created_at: undefined,
        updated_at: undefined,
    })

    useEffect(
        function () {
          async function loadItems() {
            const response = await axios.get(
              `https://one-list-api.herokuapp.com/items/${params.id}?access_token=kristy-prieto`
      )
            if (response.status === 200) {
                setTodoItem(response.data)
      } }
          loadItems()
        },
        [params.id]
    )

    async function deleteTodoItem() {
       const response = await axios.delete(
            `https://one-list-api.herokuapp.com/items/${params.id}?access_token=kristy-prieto`
        )

        if (response.status === 204) {
            // Send the user back to the homepage
            history("/")
        }
    }

    return (
        <div>
            <p className={todoItem.complete ? 'completed' : ''}>{todoItem.text}</p>
            <p>Created: {todoItem.created_at?.toString()}</p>
            <p>Updated: {todoItem.updated_at?.toString()}</p>
            <button onClick={deleteTodoItem}>Delete</button>
        </div>
    )
}