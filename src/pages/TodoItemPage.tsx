import React from "react";
import { useParams } from "react-router";

export function TodoItemPage() {
    const params = useParams()
    
    return <p>This would be the details of item 42!</p>
}