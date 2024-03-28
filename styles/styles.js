/**
 * File:    styles.js
 * Author:  Jesse Van Schothorst
 * Brief:   all my styles
 */
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    saveButton: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
    },
    saveButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    moodContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    moodBox: {
        width: '30%',
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 5,
    },
    moodText: {
        textAlign: 'center',
        color: '#333',
    },
    digipetContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    digipetImage: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
    },
    inventoryOptionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    inventoryOption: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 5,
        width: '45%',
    },
    inventoryOptionText: {
        textAlign: 'center',
        color: '#333',
    },
});

export default styles;