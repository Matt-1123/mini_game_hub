// @ts-nocheck

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import CountdownTimerGame from '@/components/CountdownGame';

import '../global.css'

// Home Page Component
const HomePage = ({ onNavigate }) => {
  return (
    <View className="flex-1 bg-blue-50 items-center justify-center px-6">
      <Text className="text-4xl font-bold text-blue-900 mb-4 text-center">
        Welcome to Mini Game Hub!
      </Text>
      <Text className="text-lg text-gray-700 text-center mb-8">
        Choose an option below
      </Text>
      <TouchableOpacity 
        onPress={() => onNavigate('countdown-timer')}
        className="bg-blue-600 px-8 py-4 rounded-lg shadow-lg mb-4"
      >
        <Text className='text-white font-semibold text-lg'>Countdown Timer</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onNavigate('about')}
        className="bg-blue-600 px-8 py-4 rounded-lg shadow-lg mb-4"
      >
        <Text className="text-white font-semibold text-lg">About</Text>
      </TouchableOpacity>
    </View>
  );
};

// About Page Component
const AboutPage = ({ onNavigate }) => {
  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="px-6 py-12">
        <Text className="text-3xl font-bold text-gray-900 mb-6">
          About
        </Text>
        <Text className="text-base text-gray-700 leading-6 mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </Text>
        <Text className="text-base text-gray-700 leading-6 mb-4">
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </Text>
        <Text className="text-base text-gray-700 leading-6 mb-8">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
        </Text>
        <TouchableOpacity
          onPress={() => onNavigate('home')}
          className="bg-gray-800 px-8 py-4 rounded-lg shadow-lg self-start"
        >
          <Text className="text-white font-semibold text-lg">Back to Home</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

// Main App Component
export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  
  return (
    <SafeAreaView className="flex-1">
      {currentPage === 'home' ? (
        <HomePage onNavigate={setCurrentPage} />
      ) : currentPage === 'about' ? (
        <AboutPage onNavigate={setCurrentPage} />
      ) : currentPage === 'countdown-timer' ? (
        <CountdownTimerGame onNavigate={setCurrentPage} />
      ) : null}
    </SafeAreaView>
  );
}