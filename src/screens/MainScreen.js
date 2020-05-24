import React, { useContext } from 'react'
import { View, StyleSheet, FlatList, Image } from 'react-native'

import { AddTodo } from '../components/AddTodo'
import { Todo } from '../components/Todo'
import { AppText } from '../components/ui/AppText'
import { TodoContext } from '../context/todo/todoContext'
import { ScreenContext } from '../context/screen/screenContext'

export const MainScreen = () => {
    const { todos, addTodo, removeTodo } = useContext(TodoContext)
    const { changeScreen } = useContext(ScreenContext)

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
    }
})