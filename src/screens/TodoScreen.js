import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import { THEME } from '../theme'
import { AppCard } from '../components/ui/AppCard'

export const TodoScreen = ({todo, goBack, onRemove}) => {
    return (
        <View>
            <AppCard style={styles.card}>
                <Text style={styles.title}>{todo.title}</Text>
                <Button title="Edit" />
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