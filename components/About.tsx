// @ts-nocheck
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function AboutPage({ onNavigate }) {
  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="px-6 py-12">
        <TouchableOpacity
          onPress={() => onNavigate('home')}
          className="bg-gray-800 px-8 py-4 rounded-lg shadow-lg self-start mb-6 mt-4"
        >
          <Text className="text-white font-semibold text-lg">Back to Home</Text>
        </TouchableOpacity>
        <Text className="text-3xl font-bold text-gray-900 mb-6">
          About
        </Text>
        <Text className="text-xl font-bold text-gray-900 mb-6">
          Countdown Timer Game
        </Text>
        <Text className="text-base text-gray-700 leading-6 mb-4">
          How good is your timing? Try to stop the countdown timer at exactly 00:00!
        </Text>
        <Text className="text-xl font-bold text-gray-900 mb-6">
          Reflex Test Game
        </Text>
        <Text className="text-base text-gray-700 leading-6 mb-4">
          How quickly can you press the button when it turns from red to green?
        </Text>
      </View>
    </ScrollView>
  );
};
