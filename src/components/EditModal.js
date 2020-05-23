import React, { useState } from 'react'
import { View, Modal, TextInput, StyleSheet, Alert } from 'react-native'
import { THEME } from '../theme'
import { AppButton } from '../components/ui/AppButton'

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
                    <AppButton onPress={onCancel} color={THEME.DANGER_COLOR}>
                        Cancel
                    </AppButton>
                    <AppButton onPress={saveHandler}>
                        Save changes
                    </AppButton>
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