import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Navbar } from './src/Navbar';
import { AddTodo } from './src/AddTodo'
import { Todo } from './src/Todo';

export default function App() {

    const [todos, setTodos] = useState([])

    const addTodo = (title) => {
        return (
            setTodos(prev => [
                {
                    id: Date.now().toString(),
                    title
                },
                ...prev
            ])
        )
    }

    return (
        <View>
            <Navbar title="Todo App" />
            <View style={styles.container}>
                <AddTodo onSubmit={addTodo} />
                <View>
                    {
                        todos.map(todo => <Todo todo={todo} key={todo.id} />)
                    }
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 30,
        paddingVertical: 20
    },
});
