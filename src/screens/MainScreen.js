import React, { useContext, useEffect, useCallback } from 'react'
import { View, StyleSheet, FlatList, Image } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import { AddTodo } from '../components/AddTodo'
import { Todo } from '../components/Todo'
import { AppText } from '../components/ui/AppText'
import { TodoContext } from '../context/todo/todoContext'
import { ScreenContext } from '../context/screen/screenContext'
import { AppLoader } from '../components/ui/AppLoader'
import { AppButton } from '../components/ui/AppButton'
import { THEME } from '../theme'

export const MainScreen = () => {
    const { todos, addTodo, removeTodo, fetchTodos, loading, error } = useContext(TodoContext)
    const { changeScreen } = useContext(ScreenContext)

    const loadTodos = useCallback(async () => await fetchTodos(), [fetchTodos])

    useEffect(() => {
        loadTodos()
    }, [])

    if (loading) {
        return <AppLoader />
    }

    if (error) {
        return (
            <View style={styles.center}>
                <AppText style={styles.error}>{error}</AppText>
                <AppButton onPress={loadTodos} color="#fff">
                    <MaterialCommunityIcons name="reload" size={26} color={THEME.GREY_COLOR} />
                </AppButton>
            </View>
        )
    }

    let content = (
        <FlatList 
            keyExtractor={item => item.id.toString()}
            data={todos}
            renderItem={({item}) => (
                <Todo todo={item} onOpen={changeScreen} onRemove={removeTodo}/>
            )}
        />
    )

    if(!todos.length) {
        content = (
            <View style={styles.imgWrap}>
                <Image 
                    style={styles.image}
                    source={require('../../assets/no-items.png')}
                />
                <AppText style={{fontSize: 16}}>There are no tasks for today</AppText>
            </View>
        )
    }

    return (
        <View>
            <AddTodo onSubmit={addTodo}/>
            {content}
        </View>
    )
}

const styles = StyleSheet.create({
    imgWrap: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        height: 300,
        opacity: 0.5
    },
    image: {
        width: '70%',
        height: '70%',
        resizeMode: 'contain',
        marginBottom: 20
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    error: {
        fontSize: 20,
        color: THEME.DANGER_COLOR,
        marginBottom: 10
    }
})