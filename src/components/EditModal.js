import React, { useState } from 'react'
import { View, Modal, TextInput, Button, StyleSheet, Alert } from 'react-native'
import { THEME } from '../theme'

export const EditModal = ({ visible, onCancel, value, onSave }) => {
    const [title, setTitle] = useState(value)

    const saveHandler = () => {
        if(!title.trim()) {
            Alert.alert('Error', 'Task cannot be empty. To delete use delete button.')
        } else {
            onSave(title)
        }
    }

    return (
        <Modal visible={visible} animationType="slide" transparent={false}>
            <View style={styles.wrap}>
                <TextInput 
                    value={title}
                    onChangeText={setTitle}
                    style={styles.input}
                    placeholder="Enter a task"
                    autoCapitalize="none"
                    autoCorrect={false}
                    maxLength={64}
                />
                <View style={styles.buttons}>
                    <Button 
                        title="Cancel"
                        onPress={onCancel}
                        color={THEME.GREY_COLOR}
                    />
                    <Button 
                        title="Save changes"
                        onPress={saveHandler}
                        color={THEME.DANGER_COLOR}
                    />
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    wrap: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    input: {
        padding: 10,
        borderBottomColor: THEME.MAIN_COLOR,
        borderBottomWidth: 2,
        width: '80%'
    },
    buttons: {
        width: '100%',
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
})