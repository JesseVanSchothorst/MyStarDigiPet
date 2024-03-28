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
        gap: 20,
        alignItems: 'center',
        marginBottom: 10,
        backgroundColor: '#0#f0f27e07bff',
    },
    saveButton: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
    },
    petButton: {
        backgroundColor: '#007bff',
        padding: 30,
        borderRadius: 5,
    },
    saveButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    anotherButtonText: {
        fontSize:56,
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
        marginTop: 50,
        marginBottom: 100,
    },
    digipetImage: {
        width: 300,
        height: 300,
        
    },



    inventoryOptionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    inventoryOption: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 5,
        width: '50%',
    },
    inventoryOptionText: {
        textAlign: 'center',
        color: 'green',
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