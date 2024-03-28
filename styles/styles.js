/**
 * File:    styles.js
 * Author:  Jesse Van Schothorst
 * Brief:   all my styles
 */
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center', 
        alignItems: 'center', 
    },
    container: {
        flex: 1,
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
    moodText: {
        textAlign: 'center',
        color: '#333',
    },
    digipetContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    digipetImage: {
        width: 250,
        height: 250,
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



    gameOverText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    restartButton: {
        backgroundColor: '#007bff', 
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff', 
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default styles;