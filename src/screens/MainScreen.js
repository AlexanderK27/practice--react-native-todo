import React from 'react'
import { View, StyleSheet, FlatList, Image, Text } from 'react-native'
import { AddTodo } from '../components/AddTodo'
import { Todo } from '../components/Todo'

export const MainScreen = ({todos, addTodo, openTodo, removeTodo}) => {
    let content = (
        <FlatList 
            data={todos}
            renderItem={({item}) => (
                <Todo todo={item} onOpen={openTodo} onRemove={removeTodo}/>
            )}
            keyExtractor={item => item.id.toString()}
        />
    )

    if(!todos.length) {
        content = (
            <View style={styles.imgWrap}>
                <Image 
                    style={styles.image}
                    source={require('../../assets/no-items.png')}
                />
                <Text style={{fontSize: 16}}>There are no tasks for today :)</Text>
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