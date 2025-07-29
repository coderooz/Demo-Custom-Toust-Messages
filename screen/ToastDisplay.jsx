import React from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { useToast } from '../context/ToastContext';

const ToastDemo = () => {
    const { showToast } = useToast();

    return (
        <>
            <View style={styles.container}>
                <Button
                    title="Show Success Toast"
                    onPress={() =>
                        showToast({
                            alert: 'success',
                            title: 'Success!',
                            message: 'Everything worked!',
                        })
                    }
                />
                <Button
                    title="Show Error Toast"
                    onPress={() =>
                        showToast({
                            alert: 'error',
                            title: 'Error!',
                            message: 'Something went wrong.',
                        })
                    }
                />
                <Button
                    title="Show Warning Toast"
                    onPress={() =>
                        showToast({
                            alert: 'warning',
                            title: 'Warning!',
                            message: 'This is a warning message.',
                        })
                    }
                />
                <Button
                    style={styles.button}
                    title="Show Info Toast"
                    onPress={() =>
                        showToast({
                            alert: 'info',
                            title: 'Info',
                            message: 'This is an informational message.',
                        })
                    }
                />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        padding: 20,
        gap: 20,
    },
});

export default ToastDemo;