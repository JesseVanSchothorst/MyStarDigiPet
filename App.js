/**
 * File:    App.js
 * Author:  Jesse Van Schothorst
 * Brief:   App will allow us to play with a digipet
 */
import React, { useEffect, useState } from 'react';
import { Text, View, Pressable, stylessheet, ImageBackground, StatusBar, Alert } from 'react-native';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';

// all from components

import Stars from './components/stars';
import HappinessBar from './components/happiness';

import styles from './styles/styles.js';

export default function App() {

    // Plays digipet background music!
    useEffect(() => {
        const soundObject = new Audio.Sound();

        const playSound = async () => {
            try {
                await soundObject.loadAsync(require('./assets/sounds/game-music.mp3'));
                await soundObject.setIsLoopingAsync(true)
                await soundObject.playAsync();
            } catch (error) {
                console.log('Error loading sound:', error);
            }
        };
        playSound();
        // Clean up on unmount
        return () => {
            soundObject.stopAsync();
            soundObject.unloadAsync();
        };
    }, []);

    // Happiness stuff
    const [starNumber, setStarNumber] = useState(2);
    const [happinessLevel, setHappinessLevel] = useState(100);
    const [starDied, setStarDied] = useState(false);
    const [starDiedAlert, setStarDiedAlert] = useState(false); // Add state to track if alert has been shown


    const beHappier = () => {
        if (starNumber < 3) {
            setHappinessLevel(prevLevel => Math.min(prevLevel + 10, 100));
            if (happinessLevel === 80 && starNumber < 2) {
                setStarNumber(oldStar => oldStar + 1);
            }
        }
    };

    const beSadder = () => {
        if (starNumber > 0 && !starDied) {
            setHappinessLevel(prevLevel => Math.max(prevLevel - 10, 0));
            if (happinessLevel === 80) {
                setStarNumber(oldStar => oldStar - 1);
            }
        }
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (!starDied) {
                beSadder();
            }
        }, 2000);
        return () => clearTimeout(timeout);
    }, [happinessLevel, starDied]); // Include starDied in the dependency array

    useEffect(() => {
        if (happinessLevel === 0 && !starDied) {
            setStarNumber(oldStar => oldStar - 1);
            setStarDied(true);
        }
    }, [happinessLevel, starDied]);

    const restartGame = () => {
        setHappinessLevel(100);
        setStarNumber(2);
        setStarDied(false);
        setStarDiedAlert(false); // Reset alertShown state
    };

    useEffect(() => {
        if (starDied && !starDiedAlert) { // Show alert only if starDied and alert hasn't been shown
            Alert.alert(
                'Pet Died!',
                'You are irresponsible! Your Pet Died',
                [
                    {
                        text: 'Revive',
                        onPress: restartGame,
                    },
                ],
                { cancelable: false }
            );
            setStarDiedAlert(true); // Set alertShown to true after showing the alert
        }
    }, [starDied, starDiedAlert]);





    // data saving stuff
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
            const currentState = JSON.parse(currentStateString);
            // extract all the saved states
            setStarNumber(currentState.starNumber);
             setHappinessLevel(currentState.happinessLevel);
             setStarDied(currentState.starDied);
             setStarDiedAlert(currentState.starDiedAlert);
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
        const currentState = {
            starNumber: starNumber, // Add starNumber to save
            happinessLevel: happinessLevel, // Add happinessLevel to save
            starDied: starDied, // Add starDied to save
            starDiedAlert: starDiedAlert // Add starDiedAlert to save
        };
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
        return () => { saveState() }; // Add parentheses to invoke saveState function
    }, [])



    return (
        <ImageBackground source={require('./assets/images/star-background.gif')} style={styles.background}>
            <View style={styles.container}>
                {/* Header w/ Save in top right */}
                <View style={styles.header}>
                    <Pressable
                        style={({ pressed }) => [
                            styles.saveButton,
                            { backgroundColor: pressed ? '#0056b3' : '#007bff' }
                        ]}
                        onPress={saveState}
                        android_ripple={{ color: '#fff' }}
                        ios_ripple={{ color: '#fff' }}
                    >
                        <Text style={styles.saveButtonText}>Save</Text>
                    </Pressable>
                </View>

                <View style={styles.moodContainer}>
                    <HappinessBar happinessLevel={happinessLevel} />
                </View>

                {/* The Star Digipet */}
                <View style={styles.digipetContainer}>
                    <Pressable onPress={beHappier}>
                        <Stars starNumber={starNumber} />
                    </Pressable>
                </View>

                {/* Inventory options/options to do with star */}

                <StatusBar style="dark" />
            </View>
        </ImageBackground>
    );
}