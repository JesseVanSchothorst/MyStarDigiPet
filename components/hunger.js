import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HungerBar = ({ hungerLevel }) => {
    const barWidth = `${hungerLevel}%`;

    return (
        <View style={styles.container}>
            
            <View style={[styles.bar, { width: barWidth }]} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '80%',
        height: 20,
        backgroundColor: '#ddd',
        borderRadius: 10,
        overflow: 'hidden',
    },
    bar: {
        height: '100%',
        backgroundColor: 'red',
        borderRadius: 10,
    },
});

export default HungerBar;
