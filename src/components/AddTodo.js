import React, { useState } from 'react'
import {View, TextInput, Button, StyleSheet, Alert} from 'react-native'
import { THEME } from '../theme'

export const AddTodo = ({onSubmit}) => {
    const [value, setValue] = useState('')

    const pressHandler = () => {
        if (value.trim()) {
            onSubmit(value)
            setValue('')
        } else {
            Alert.alert('Write some text to create a new task')
        }
    }

    return (
        <View style={styles.block}>
            <TextInput 
                style={styles.input} 
                onChangeText={setValue}
                value={value}
                placeholder="Enter a new task..."
                autoCorrect={false}
                autoCapitalize='none'
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
        borderBottomColor: THEME.MAIN_COLOR
    }
})