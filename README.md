# Mini Game Hub
React Native app containing a collection of mini games

## Countdown Timer
This mini game is about testing your ability to time a button press. It allows the user to select a countdown time between 3 and 30 seconds using a slider component. When the user presses start, they have to try pressing Stop as close as possible to the end of the timer. The remaining time (or amount of time past 00:00) is then displayed. The user can then select 'Try Again', or 'New Game' if they got a perfect time (00:00).

## Reflex Test
This mini game tests how quickly you can press a button once it turns green. It generates a random duration between 1000 and 8000 milliseconds on initial component load and a New Game selection. When the user presses Start, the button will turn red, and the random duration will start counting down. Once the time runs down, the button will turn green, and another timer will start counting up. Once the user presses the green button, the timer that counts up will stop, and the response time is displayed. The user can then select 'New Game'

---

## Tech Stack

- **React Native** - Cross-platform mobile app framework
- **Expo** - React Native framework
- **Tailwind CSS (NativeWind)** - Utility-first CSS framework for React Native

