import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { FontAwesome, Entypo, MaterialCommunityIcons } from '@expo/vector-icons'

import { THEME } from '../theme'
import { AppCard } from '../components/ui/AppCard'
import { EditModal } from '../components/EditModal'
import { AppText } from '../components/ui/AppText'
import { AppButton } from '../components/ui/AppButton'

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
                <AppText style={styles.title}>{todo.title}</AppText>
                <AppButton onPress={() => setModal(true)}>
                    <FontAwesome name="edit" size={20} />
                </AppButton>
            </AppCard>
            <View style={styles.buttons}>
                <View style={styles.button}>
                    <AppButton
                        onPress={goBack}
                        color={THEME.GREY_COLOR}
                    >
                        <Entypo name="back" size={20} color="#fff" />
                    </AppButton>
                </View>
                <View style={styles.button}>
                    <AppButton
                        onPress={onRemove.bind(null, todo.id)}
                        color={THEME.DANGER_COLOR}
                    >
                        <MaterialCommunityIcons name="delete-circle-outline" size={20} color="#fff" />
                    </AppButton>
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