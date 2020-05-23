import React, { useState } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import { THEME } from '../theme'
import { AppCard } from '../components/ui/AppCard'
import { EditModal } from '../components/EditModal'

export const TodoScreen = ({todo, goBack, onRemove, onEdit}) => {
    const [modal, setModal] = useState(false)

    const editTodoTitle = title => {
        setModal(false)
        onEdit(todo.id, title)
    }
 
    return (
        <View>
            <EditModal value={todo.title} visible={modal} onCancel={() => setModal(false)} onSave={editTodoTitle} />

            <AppCard style={styles.card}>
                <Text style={styles.title}>{todo.title}</Text>
                <Button title="Edit" onPress={() => setModal(true)}/>
            </AppCard>
            <View style={styles.buttons}>
                <View style={styles.button}>
                    <Button 
                        title="Go back" 
                        onPress={goBack}
                        color={THEME.GREY_COLOR}
                    />
                </View>
                <View style={styles.button}>
                    <Button 
                        title="Delete" 
                        onPress={onRemove.bind(null, todo.id)}
                        color={THEME.DANGER_COLOR}
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    button: {
        width: '40%'
    },
    card: {
        padding: 15,
        marginBottom: 20
    },
    title: {
        fontSize: 20
    }
})