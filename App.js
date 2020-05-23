import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Navbar } from './src/components/Navbar';
import { MainScreen } from './src/screens/MainScreen';
import { TodoScreen } from './src/screens/TodoScreen';

export default function App() {
    const [todoId, setTodoId] = useState(null)
    const [todos, setTodos] = useState([])

    const addTodo = (title) => {
        setTodos(prev => [
            {
                id: Date.now().toString(),
                title
            },
            ...prev
        ])
    }

    const findTodo = (todoId) => todos.find(todo => todo.id === todoId)

    const removeTodo = (id) => {
        const todo = findTodo(id)
        Alert.alert(
            'Delete this task?',
            `Are you sure you want to delete "${todo.title}"`,
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                },
                { 
                    text: 'Delete', 
                    onPress: () => {
                        setTodoId(null)
                        setTodos(todos => todos.filter(todo => todo.id !== id))
                    },
                    style: 'destructive'
                }
            ],
            { cancelable: true }
        );
    }

    let content = (
        <MainScreen 
            todos={todos} 
            addTodo={addTodo} 
            openTodo={setTodoId}
            removeTodo={removeTodo}
        />
    )
    
    if (todoId) {
        const selectedTodo = findTodo(todoId)
        content = <TodoScreen todo={selectedTodo} onRemove={removeTodo} goBack={() => setTodoId(null)} />
    }

    return (
        <View>
            <Navbar title="Todo App" />
            <View style={styles.container}>{content}</View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 30,
        paddingVertical: 20
    },
});
