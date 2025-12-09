// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';

export default function CountdownTimerGame({ onNavigate }) {
  const [duration, setDuration] = useState(5); // Duration in seconds
  const [timeLeft, setTimeLeft] = useState(5000); // Time left in milliseconds
  const [isRunning, setIsRunning] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [finalTime, setFinalTime] = useState(null);
  const intervalRef = useRef(null);
  const startTimeRef = useRef(null);
  const targetTimeRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = Date.now();
      targetTimeRef.current = startTimeRef.current + timeLeft;

      intervalRef.current = setInterval(() => {
        const now = Date.now();
        const remaining = targetTimeRef.current - now;
        
        setTimeLeft(remaining);
        
        // End game at -10 seconds (-10000 ms)
        if (remaining <= -10000) {
          clearInterval(intervalRef.current);
          setIsRunning(false);
          setIsVisible(true);
          setTimeLeft(-10000);
        }
      }, 10);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const handlePress = () => {
    if (!isRunning) {
      // Start the countdown
      setIsRunning(true);
      setIsVisible(false);
      setFinalTime(null);
      if (timeLeft === 0) {
        setTimeLeft(duration * 1000);
      }
    } else {
      // Stop the countdown and show result
      setIsRunning(false);
      setIsVisible(true);
      setFinalTime(timeLeft);
    }
  };

  const handleReset = () => {
    setTimeLeft(duration * 1000);
    setIsRunning(false);
    setIsVisible(true);
    setFinalTime(null);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const handleDurationChange = (text) => {
    const num = parseInt(text) || 1;
    const clampedNum = Math.max(1, Math.min(99, num)); // Limit between 1-99 seconds
    setDuration(clampedNum);
    setTimeLeft(clampedNum * 1000);
    setFinalTime(null);
  };

  const formatTime = (ms) => {
    let totalSeconds;
    let milliseconds;
    let seconds;
    if(ms < 0) {
      totalSeconds = Math.ceil(ms / 1000);
      milliseconds = Math.abs(Math.floor((ms % 1000) / 10))
      seconds = totalSeconds % 60;
    } else {
      totalSeconds = Math.floor(ms / 1000);
      milliseconds = Math.floor((ms % 1000) / 10);
      seconds = totalSeconds % 60;
    }
  
    // Display -0 if remaining ms is between -1 and -999
    let secondsStr;
    if(ms < 0 && ms > -1000){
      console.log('ms is between -1 and -999')
      secondsStr = '-0'
    } else {
      secondsStr = String(seconds).padStart(2, '0')
    }
    
    return `${secondsStr}:${String(milliseconds).padStart(2, '0')}`;
  };

  const getResultMessage = () => {
    if (finalTime === null) return '';
    if (finalTime === 0) return '🎯 PERFECT! You hit 00:00!';
    if (finalTime <= 100) return '🔥 Amazing! So close!';
    if (finalTime <= 500) return '👏 Great job!';
    if (finalTime <= 1000) return '👍 Good attempt!';
    return '💪 Keep trying!';
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => onNavigate('home')}
        className="bg-gray-800 px-8 py-4 mb-4 rounded-lg shadow-lg self-start"
      >
        <Text className="text-white font-semibold text-lg">Back to Home</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Countdown Challenge</Text>
      <Text style={styles.subtitle}>How close can you get to 00:00?</Text>

      <View style={styles.durationSelector}>
        <Text style={styles.durationLabel}>Duration (seconds):</Text>
        <TextInput
          style={styles.durationInput}
          value={String(duration)}
          onChangeText={handleDurationChange}
          keyboardType="number-pad"
          maxLength={2}
          editable={!isRunning}
        />
      </View>

      <View style={styles.timerContainer}>
        {isVisible ? (
          <>
            <Text style={styles.timer}>{formatTime(timeLeft)}</Text>
            {finalTime !== null && (
              <Text style={styles.result}>{getResultMessage()}</Text>
            )}
          </>
        ) : (
          <Text style={styles.hiddenText}>Timer Hidden...</Text>
        )}
      </View>

      <TouchableOpacity
        style={[styles.button, isRunning && styles.buttonRunning]}
        onPress={handlePress}
      >
        <Text style={styles.buttonText}>
          {isRunning ? 'STOP' : 'START'}
        </Text>
      </TouchableOpacity>

      {!isRunning && timeLeft !== duration * 1000 && (
        <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
          <Text style={styles.resetText}>Reset</Text>
        </TouchableOpacity>
      )}

      <View style={styles.instructions}>
        <Text style={styles.instructionText}>
          • Press START to begin the countdown
        </Text>
        <Text style={styles.instructionText}>
          • Timer will be hidden while running
        </Text>
        <Text style={styles.instructionText}>
          • Press STOP when you think it's at 00:00
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
    fontSize: 16,
    color: '#cbd5e1',
    fontWeight: '600'
  },
  durationInput: {
    width: 70,
    height: 55,
    backgroundColor: '#1e293b',
    borderWidth: 2,
    borderColor: '#334155',
    borderRadius: 12,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    paddingHorizontal: 8,
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
  buttonText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  resetButton: {
    marginTop: 30,
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 24,
    backgroundColor: '#1e293b',
    borderWidth: 2,
    borderColor: '#334155',
  },
  resetText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#94a3b8',
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