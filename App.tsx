import React from 'react';
import { View, StatusBar, StyleSheet, Platform } from 'react-native';
import { NavigationProvider } from './src/presentation/navigation/NavigationContext';
import { AppNavigator } from './src/presentation/navigation/AppNavigator';

const App = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <NavigationProvider>
        <AppNavigator />
      </NavigationProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 20 : 50,
  },
});

export default App;
