/**
 * File:    saveButton.js
 * Author:  Jesse Van Schothorst
 * Brief:   saves button mostly inspired by stephen
 */
import { Button, StyleSheet, Text, TextInput, View, Pressable } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { useEffect, useState } from 'react';

import saveButtonStyles from '../styles/styles.js'; // Adjust the import path as needed

const SaveButton = ({ onPress }) => {

    // save-state-24wn by Stephen
    const [name, setName] = useState('Nothing');
    const [count, setCount] = useState(0); // not displayed in this example
    const [skipInitial, setSkipInitial] = useState(true);

    const dataFileName = 'datafile.json';

    /**
     * This function will load a json string of all the saved data 
     * We assume that the file is good
     * We assume that all the required object parts are present
     */
    const loadState = async () => {
        try {
            // get the string
            const currentStateString = await FileSystem.readAsStringAsync(
                FileSystem.documentDirectory + dataFileName
            );
            // convert it to an object
            currentState = JSON.parse(currentStateString)
            // extract all the saved states
            setName(currentState.name);
            setCount(currentState.count);
        } catch (e) {
            console.log(FileSystem.documentDirectory + dataFileName + e);
            // probably there wasn't a saved state, so make one for next time?
            saveState();
        }
    }

    /**
     * This function will save the data as a json string 
     */
    const saveState = async () => {
        // build an object of everything we are saving
        const currentState = { "name": name, "count": count };
        try {
            // write the stringified object to the save file
            await FileSystem.writeAsStringAsync(
                FileSystem.documentDirectory + dataFileName,
                JSON.stringify(currentState)
            );
        } catch (e) {
            console.log(FileSystem.documentDirectory + dataFileName + e);
        }
    }

    // load on app load, save on app unload
    useEffect(() => {
        loadState();
        return () => { saveState }
    }, [])



  return (
    <Pressable
      style={({ pressed }) => [
        saveButtonStyles.saveButton,
        { backgroundColor: pressed ? '#0056b3' : '#007bff' }
      ]}
      onPress={saveState}
      android_ripple={{ color: '#fff' }}
      ios_ripple={{ color: '#fff' }}
    >
      <Text style={saveButtonStyles.saveButtonText}>Save</Text>
    </Pressable>
  );
};

export default SaveButton;
