/**
 * File:    App.js
 * Author:  Jesse Van Schothorst
 * Brief:   App will allow us to play with a digipet
 */
import React, { useEffect, useState } from 'react';
import {
    Text,
    TextInput,
    View,
    Pressable,
    stylessheet,
    ImageBackground,
    StatusBar,
    Alert,
    Vibration,
} from 'react-native';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';

import Animated, {
    useSharedValue,
    withTiming,
    Easing,
    useAnimatedStyle,
    withRepeat,
    withSequence,
} from 'react-native-reanimated';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import * as Haptics from 'expo-haptics';

// all from components

import Stars from './components/stars';
import HappinessBar from './components/happiness';
import HungerBar from './components/hunger';

import styles from './styles/styles.js';

// https://docs.swmansion.com/react-native-reanimated/docs/animations/withSequence for the wobble
const ANGLE = 10;
const TIME = 100;
const EASING = Easing.elastic(1.5);




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

    // all my variables should go at top but I am lazy
    const [name, setName] = useState('Stary!');
    const [starNumber, setStarNumber] = useState(2);
    const [happinessLevel, setHappinessLevel] = useState(100);
    const [money, setMoney] = useState(100);
    const [hungerLevel, setHungerLevel] = useState(100);
    const [foodQuantity, setFoodQuantity] = useState(5);
    const [starDied, setStarDied] = useState(false);
    const [starDiedAlert, setStarDiedAlert] = useState(false); // Add state to track if alert has been shown

    const getDough = () => {
        setMoney(prevLevel => Math.min(prevLevel + 10, 500));
    };
    // could add more food options but for now basic food
    const buyFood = () => {
        if (money > 0) {
            playBuySound();
            setMoney(prevLevel => Math.max(prevLevel - 10, 0));
            setFoodQuantity(prevLevel => Math.min(prevLevel + 1, 500));
        }

    };
    useEffect(() => {
        const timeout = setTimeout(() => {
            getDough();
        }, 5000);
        return () => clearTimeout(timeout);
    }, [money, starDied]); 


    const beHappier = () => {
        if (starNumber < 3) {
            setHappinessLevel(prevLevel => Math.min(prevLevel + 10, 100));
            if (happinessLevel >= 70) {
                setStarNumber(2);
                playStarSound();
            } else if (happinessLevel <= 20) {
                setStarNumber(0);
            }
        }
    };
    const beSadder = () => {
        if (starNumber > -1 && !starDied) {
            setHappinessLevel(prevLevel => Math.max(prevLevel - 10, 0));
            if (happinessLevel === 80) {
                setStarNumber(1);
            }
        }
    }; // set low for testing purposes also we dont go time
    useEffect(() => {
        const timeout = setTimeout(() => {
                beSadder();
        }, 3000);
        return () => clearTimeout(timeout);
    }, [happinessLevel, starDied]); 

    // could be put together better
    let eatSound = new Audio.Sound();
    useEffect(() => {
        return () => {
            eatSound.unloadAsync();
        };
    }, []);
    const playEatSound = async () => {
        try {
            await eatSound.loadAsync(require('./assets/sounds/eating.mp3'));
            await eatSound.playAsync();
        } catch (error) {
            console.log('Error playing sound:', error);
        }
    };    // could be put together better
    let buySound = new Audio.Sound();
    useEffect(() => {
        return () => {
            buySound.unloadAsync();
        };
    }, []);
    const playBuySound = async () => {
        try {
            await buySound.loadAsync(require('./assets/sounds/buy.mp3'));
            await buySound.playAsync();
        } catch (error) {
            console.log('Error playing sound:', error);
        }
    };

    // could be put together better
    let deadSound = new Audio.Sound();
    useEffect(() => {
        return () => {
            deadSound.unloadAsync(); 
        };
    }, []);
    const playDeadSound = async () => {
        try {
            await deadSound.loadAsync(require('./assets/sounds/oof.mp3'));
            await deadSound.playAsync();
        } catch (error) {
            console.log('Error playing sound:', error);
        }
    };
    let hurtSound = new Audio.Sound();
    useEffect(() => {
        return () => {
            hurtSound.unloadAsync(); // Unload the sound when the component unmounts
        };
    }, []);
    const playHurtSound = async () => {
        try {
            await hurtSound.loadAsync(require('./assets/sounds/hurt.mp3'));
            await hurtSound.playAsync();
        } catch (error) {
            console.log('Error playing sound:', error);
        }
    };
    let starSound = new Audio.Sound();
    useEffect(() => {
        return () => {
            starSound.unloadAsync(); // Unload the sound when the component unmounts
        };
    }, []);
    const playStarSound = async () => {
        try {
            await starSound.loadAsync(require('./assets/sounds/star.mp3'));
            await starSound.playAsync();
        } catch (error) {
            console.log('Error playing sound:', error);
        }
    };


    // increases fullness by 10 and reduces food. if low then star gets mad
    const beFuller = () => {
        if (foodQuantity > 0) {
            setHungerLevel(prevLevel1 => Math.min(prevLevel1 + 10, 100));
            setFoodQuantity(prevLevel1 => Math.max(prevLevel1 -1, 0));
            if (hungerLevel === 30) {
                setStarNumber(1);
            }
            playEatSound();
        }
    };
    const beHungry = () => {
        if (!starDied) {
            setHungerLevel(prevLevel1 => Math.max(prevLevel1 - 10, 0));
            if (hungerLevel === 20) {
                setStarNumber(3);
                
            }
        }
    };
    useEffect(() => {
        const timeout = setTimeout(() => {
            beHungry();
        }, 6000);
        return () => clearTimeout(timeout);
    }, [hungerLevel, starDied]); 

    useEffect(() => {
        if (hungerLevel <= 0 && !starDied) {
            setStarNumber(4);
            setStarDied(true);
            Vibration.vibrate(10 * 15)
            playDeadSound();
        }
    }, [hungerLevel, starDied]);

    // all the original states of the game
    const restartGame = () => {
        playStarSound();
        setHappinessLevel(100);
        setMoney(100);
        setHungerLevel(100);
        setFoodQuantity(5);
        setStarNumber(2);
        setStarDied(false);
        setStarDiedAlert(false); 
    };

    // nice popup
    useEffect(() => {
        if (starDied && !starDiedAlert) { 
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
            setStarDiedAlert(true);
        }
    }, [starDied, starDiedAlert]);




    // Inspired by Stephen
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
            setName(currentState.name);
            setMoney(currentState.money);
            setFoodQuantity(currentState.foodQuantity);
            setStarNumber(currentState.starNumber);
            setHappinessLevel(currentState.happinessLevel);
            setHungerLevel(currentState.hungerLevel);
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
            name: name,
            money: money,
            foodQuantity: foodQuantity,
            hungerLevel: hungerLevel,
            starNumber: starNumber, 
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

    // https://docs.swmansion.com/react-native-reanimated/docs/animations/withSequence
 


        const rotation = useSharedValue(0);

        const animatedStyle = useAnimatedStyle(() => ({
            transform: [{ rotateZ: `${rotation.value}deg` }],
            
        }));

    const wobble = () => {
        setStarNumber(5);
        playHurtSound();
        Vibration.vibrate(10 * 15)
            rotation.value = withSequence(
                // deviate left to start from -ANGLE
                withTiming(-ANGLE, { duration: TIME / 2, easing: EASING }),
                // wobble between -ANGLE and ANGLE 7 times
                withRepeat(
                    withTiming(ANGLE, {
                        duration: TIME,
                        easing: EASING,
                    }),
                    7,
                    true
                ),
                // go back to 0 at the end
                withTiming(0, { duration: TIME / 2, easing: EASING })
            );
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
                            { backgroundColor: pressed ? '#0056b5' : '#007bf5' }
                        ]}
                        onPress={saveState, () =>
                            Haptics.notificationAsync(
                                Haptics.NotificationFeedbackType.Warning
                            )}
                        android_ripple={{ color: '#fff' }}
                        ios_ripple={{ color: '#fff' }}
                    >
                        <Text style={styles.saveButtonText}>Save</Text>
                    </Pressable>
                    <Pressable
                        style={({ pressed }) => [
                            styles.saveButton,
                            { backgroundColor: pressed ? '#0056b5' : '#007bf5' }
                        ]}
                        onPress={restartGame}
                        android_ripple={{ color: '#fff' }}
                        ios_ripple={{ color: '#fff' }}
                    >
                        <Text style={styles.saveButtonText}>Restart</Text>
                    </Pressable>
                    <Text style={styles.saveButtonText}>My Little Pet</Text>
                    <TextInput
                        style={{ width: '20%'}, styles.saveButtonText}
                        onChangeText={setName}
                        value={name}
                        placeholder="useless placeholder"
                        onEndEditing={saveState}
                        onBlur={saveState}
                    />
                </View>


                {/* The Star Digipet */}
                <View style={styles.digipetContainer}>
                    <Animated.View style={animatedStyle}>
                        <Pressable onPress={wobble}>
                            <Stars starNumber={starNumber} />
                        </Pressable>
                    </Animated.View>
                </View>
                <View>
                    <Text style={styles.anotherButtonText  }>${money}</Text>
                 </View>
                <View style={styles.moodContainer}>
                    <Text style={styles.buttonText}>Happy </Text>
                    <HappinessBar happinessLevel={happinessLevel} />
                </View>

                <View style={styles.moodContainer}>
                    <Text style={styles.buttonText}>Hunger </Text>
                    <HungerBar hungerLevel={hungerLevel} />
                </View>



                {/* Inventory options/options to do with star */}
                <View style={styles.header}>
                    <Pressable
                        style={({ pressed }) => [
                            styles.petButton,
                            { backgroundColor: pressed ? '#0056b3' : '#007bff' }
                        ]}
                        onPress={
                            beHappier                      
                        }
          
                        android_ripple={{ color: '#fff' }}
                        ios_ripple={{ color: '#fff' }}
                    >
                        <Text style={styles.saveButtonText}>Play</Text>
                    </Pressable>

                    <Pressable
                        style={({ pressed }) => [
                            styles.petButton,
                            { backgroundColor: pressed ? '#0056b3' : '#007bff' }
                        ]}
                        onPress={beFuller}
                        android_ripple={{ color: '#fff' }}
                        ios_ripple={{ color: '#fff' }}
                    >
                        <Text style={styles.saveButtonText}>Feed ({foodQuantity})</Text>
                    </Pressable>

                    <Pressable
                        style={({ pressed }) => [
                            styles.petButton,
                            { backgroundColor: pressed ? '#0056b3' : '#007bff' }
                        ]}
                        onPress={buyFood}
                        android_ripple={{ color: '#fff' }}
                        ios_ripple={{ color: '#fff' }}
                    >
                        <Text style={styles.saveButtonText}>Buy Food ($10)</Text>
                    </Pressable>
                </View>

                <StatusBar style="dark" />
            </View>
        </ImageBackground>
    );
}