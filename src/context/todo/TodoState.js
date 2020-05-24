import React, { useReducer, useContext } from 'react'
import { Alert } from 'react-native'

import { TodoContext } from './todoContext'
import { todoReducer } from './todoReducer'
import { 
    ADD_TODO, REMOVE_TODO, UPDATE_TODO, SHOW_LOADER, 
    HIDE_LOADER, SHOW_ERROR, CLEAR_ERROR, FETCH_TODOS 
} from '../types'
import { ScreenContext } from '../screen/screenContext'
import { Http } from '../../http'
import { FIREBASE_DB_URL } from '../../constants'

export const TodoState = ({ children }) => {
    const initialState = {
        todos: [],
        loading: false,
        error: null
    }
    const { changeScreen } = useContext(ScreenContext)
    const [state, dispatch] = useReducer(todoReducer, initialState)

    const addTodo = async title => {
        clearError()
        try {
            // create new project on firebase
            // create realtime database
            // paste database url instead of FIREBASE_DB_URL
            const data = await Http.post(`${FIREBASE_DB_URL}/todos.json`, { title })
            dispatch({ type: ADD_TODO, id: data.name, title })
        } catch (e) {
            showError('Something went wrong...')
        }
    }

    const fetchTodos = async () => {
        clearError()
        showLoader()
        try {
            const data = await Http.get(`${FIREBASE_DB_URL}/todos.json`)
            const todosFIFO = Object.keys(data).map(key => ({ id: key, ...data[key]}))
            const todosLIFO = todosFIFO.reverse()
            dispatch({ type: FETCH_TODOS, todos: todosLIFO })
        } catch (e) {
            showError('Something went wrong...')
        } finally {
            hideLoader()
        }
    }

    const updateTodo = async (id, title) => {
        clearError()
        try {
            await Http.patch(`${FIREBASE_DB_URL}/todos/${id}.json`, { title })
            dispatch({ type: UPDATE_TODO, id, title })
        } catch (e) {
            showError('Something went wrong...')
        }
    }
    
    const removeTodo = id => {
        const todo = state.todos.find(t => t.id === id)
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
                    onPress: async () => {
                        changeScreen(null)
                        clearError()
                        try {
                            await Http.delete(`${FIREBASE_DB_URL}/todos/${id}.json`)
                            dispatch({ type: REMOVE_TODO, id })
                        } catch (e) {
                            showError('Something went wrong...')
                        }
                    },
                    style: 'destructive'
                }
            ],
            { cancelable: true }
        );
    }

    const showLoader = () => dispatch({ type: SHOW_LOADER })
    const hideLoader = () => dispatch({ type: HIDE_LOADER })

    const showError = error => dispatch({ type: SHOW_ERROR, error })
    const clearError = () => dispatch({ type: CLEAR_ERROR })

    return (
        <TodoContext.Provider
            value={{
                todos: state.todos,
                loading: state.loading,
                error: state.error,
                addTodo,
                fetchTodos,
                removeTodo,
                updateTodo
            }}
        >
            {children}
        </TodoContext.Provider>
    )
}