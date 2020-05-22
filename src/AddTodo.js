import React, { useState } from 'react'
import {View, TextInput, Button, StyleSheet} from 'react-native'

export const AddTodo = ({onSubmit}) => {
    const [value, setValue] = useState('')

    pressHandler = () => {
        if (value.trim()) {
            onSubmit('new todo')
            setValue('')
        } else {
            // error
        }
    }

    return (
        <View style={styles.block}>
            <TextInput 
                style={styles.input} 
                onChangeText={setValue}
                value={value}
                placeholder="Enter a new task..."
            />
            <Button title="Add task" onPress={pressHandler}/>
        </View>
    )
}

const styles = StyleSheet.create({
    block: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15
    },
    input: {
        width: '70%',
        padding: 10,
        borderStyle: 'solid',
        borderBottomWidth: 2,
        borderBottomColor: '#3949ab'
    }
})