// @ts-nocheck
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ReflexTest({ onNavigate }) {
  // Generate random duration between 1000 and 8000 milliseconds on initial load
  const getRandomDuration = () => Math.floor(Math.random() * 7000) + 1000;
  const initialDuration = useRef(getRandomDuration()).current;

  const newGame = () => {
    const newDuration = getRandomDuration();
    console.log('new duration: ', newDuration)
    setDuration(newDuration);
    setTimeLeft(newDuration);
  }
  
  const [duration, setDuration] = useState(initialDuration); // Random duration until button changes green
  const [timeLeft, setTimeLeft] = useState(initialDuration); // Time left in milliseconds
  const [isCountdownRunning, setIsCountdownRunning] = useState(false); // Is the button red
  const [isCountUpRunning, setIsCountUpRunning] = useState(false); // start counting up for final time when button turns green
  const [isButtonGreen, setIsButtonGreen] = useState(false)
  const [isResultVisible, setIsResultVisible] = useState(false); // Show result when green button pressed
  const [finalTime, setFinalTime] = useState(null); // Total time user takes to press green button
  const intervalRef = useRef(null); // Count down
  const startTimeRef = useRef(null); // Count down
  const countUpIntervalRef = useRef(null); // Count up
  const countUpStartTimeRef = useRef(null); // Count up
  const targetTimeRef = useRef(null);

  console.log('initial duration: ', duration)
  console.log('timeLeft: ', timeLeft)

  // Count down (button red)
  useEffect(() => {
    if (isCountdownRunning) {
      startTimeRef.current = Date.now();
      targetTimeRef.current = startTimeRef.current + timeLeft;

      intervalRef.current = setInterval(() => {
        const now = Date.now();
        const remaining = targetTimeRef.current - now;
        
        setTimeLeft(remaining);

        if (remaining <= 0) {
          setIsButtonGreen(true);
          console.log('timer complete, turn button green');
          setIsCountdownRunning(false);
        }
      }, 10);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isCountdownRunning]);

  // Count up - button green
  useEffect(() => {
    if (isCountUpRunning) {
      countUpStartTimeRef.current = Date.now();
      countUpIntervalRef.current = setInterval(() => {
        const now = Date.now();
        const elapsed = now - countUpStartTimeRef.current;
        
        setFinalTime(elapsed);
      }, 10);
    } else {
      if (countUpIntervalRef.current) {
        clearInterval(countUpIntervalRef.current);
      }
    }
    
    return () => {
      if (countUpIntervalRef.current) {
        clearInterval(countUpIntervalRef.current);
      }
    };
  }, [isCountUpRunning]);
  
  const handlePress = () => {
    setIsCountdownRunning(!isCountdownRunning);
    console.log('isCountdownRunning: ', isCountdownRunning)
  };

  const handleReset = () => {
    console.log('reset')
  };

  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);
    
    return `${secondsStr}:${String(milliseconds).padStart(2, '0')}`;
  };

  const getResultMessage = () => {
    if (finalTime === null) return '';
    if (finalTime <= 10) return 'Incredible!';
    if (finalTime <= 100) return 'Amazing!';
    if (finalTime <= 500) return 'Great job!';
    if (finalTime <= 1000) return 'Good job!';
    if (finalTime <= 3000) return 'Timed Out. Better luck next time!'
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => onNavigate('home')}
        className="bg-gray-800 px-8 py-4 mb-4 rounded-lg shadow-lg self-start"
      >
        <Text className="text-white font-semibold text-lg">Back to Home</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Reflex Test</Text>
      <Text style={styles.subtitle}>Press the button as quickly as you can when it turns green!</Text>
      {/* <View style={styles.timerContainer}>
        {isVisible ? (
          <>
            <Text style={styles.timer}>{formatTime(timeLeft)}</Text>
            {finalTime !== null && (
              <Text style={styles.result}>{getResultMessage()}</Text>
            )}
          </>
        ) : (
          <Text style={styles.hiddenText}>Try to press Stop at exactly 0!</Text>
        )}
      </View> */}

      {/* {(isRunning || finalTime === null) && (
        <TouchableOpacity
          style={[styles.button, isRunning && styles.buttonRunning]}
          onPress={handlePress}
        >
          <Text style={styles.buttonText}>
            {isRunning ? 'STOP' : 'START'}
          </Text>
        </TouchableOpacity>
      )} */}
      <TouchableOpacity
        style={[styles.button, isCountdownRunning && styles.buttonRunning, isButtonGreen && styles.buttonGreen]}
        onPress={handlePress}
      >
        <Text style={styles.buttonText}>
            {isCountdownRunning ? 'Wait...' : isButtonGreen ? 'Go!' : 'Start'}
        </Text>
      </TouchableOpacity>

      {/* {!isRunning && timeLeft !== duration * 1000 && (
        <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
          <Text style={styles.resetText}>Try Again</Text>
        </TouchableOpacity>
      )} */}

      <View style={styles.instructions}>
        <Text style={styles.instructionText}>
          • Press START to begin the game
        </Text>
        <Text style={styles.instructionText}>
          • Don't press the button while it's red
        </Text>
        <Text style={styles.instructionText}>
          • Press the button as soon as it turns green
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    alignItems: 'center',
    justifyContent: 'start',
    padding: 20,
    paddingTop: 100
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#94a3b8',
    marginBottom: 30,
  },
  durationSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    gap: 12,
  },
  durationLabel: {
    fontSize: 18,
    color: '#cbd5e1',
    fontWeight: '600'
  },
  marker: {
    fontSize: 12,
    color: '#cbd5e1'
  },
  timerContainer: {
    minHeight: 120,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  timer: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#3b82f6',
    fontVariant: ['tabular-nums'],
  },
  hiddenText: {
    fontSize: 24,
    color: '#475569',
    fontStyle: 'italic',
  },
  result: {
    fontSize: 24,
    color: '#22c55e',
    marginTop: 16,
    fontWeight: '600',
  },
  button: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#3b82f6',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 8,
  },
  buttonRunning: {
    backgroundColor: '#ef4444',
    shadowColor: '#ef4444',
  },
  buttonGreen: {
    backgroundColor: '#90be6d',
    shadowColor: '#90be6d'

  },
  buttonText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  resetButton: {
    marginTop: 30,
    paddingHorizontal: 48,
    paddingVertical: 24,
    borderRadius: 48,
    backgroundColor: '#a70ad6',
  },
  resetText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
  },
  instructions: {
    position: 'absolute',
    bottom: 40,
    alignItems: 'flex-start',
  },
  instructionText: {
    fontSize: 14,
    color: '#64748b',
    marginVertical: 4,
  },
});