import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import * as Font from 'expo-font'
import { AppLoading } from 'expo'

import { Navbar } from './src/components/Navbar';
import { MainScreen } from './src/screens/MainScreen';
import { TodoScreen } from './src/screens/TodoScreen';

async function loadApplication() {
    await Font.loadAsync({
        'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
        'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf')
    })
}

export default function App() {
    const [isReady, setIsReady] = useState(false)
    const [todoId, setTodoId] = useState(null)
    const [todos, setTodos] = useState([
        {id: '24235', title: 'Finish React Native course'}
    ])

    if(!isReady) {
        return (
            <AppLoading
                startAsync={loadApplication}
                onError={err => console.log(err)}
                onFinish={() => setIsReady(true)}
            />
        )
    }

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

    const updateTodo = (id, title) => {
        setTodos(old => old.map(todo => {
            if(todo.id === id) {
                todo.title = title
            }
            return todo
        }))
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
        content = (
            <TodoScreen 
                todo={selectedTodo} 
                onRemove={removeTodo} 
                onEdit={updateTodo}
                goBack={() => setTodoId(null)} 
            />
        )
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
