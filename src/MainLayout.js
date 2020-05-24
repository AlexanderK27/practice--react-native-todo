import React, { useContext } from 'react'
import { StyleSheet, View } from 'react-native';

import { ScreenContext } from './context/screen/screenContext'
import { Navbar } from './components/Navbar';
import { MainScreen } from './screens/MainScreen';
import { TodoScreen } from './screens/TodoScreen';

export const MainLayout = () => {
    const { todoId } = useContext(ScreenContext)

    return (
        <View>
            <Navbar title="Todo App" />
            <View style={styles.container}>
                {
                    todoId ? <TodoScreen/> : <MainScreen/>
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 30,
        paddingVertical: 20
    },
});
