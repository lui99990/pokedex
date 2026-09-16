import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from './NavigationContext';
import { HomeScreen } from '../screens/HomeScreen';
import { DetailScreen } from '../screens/DetailScreen';

export const AppNavigator = () => {
  const { routeStack } = useNavigation();

  return (
    <View style={styles.container}>
      {routeStack.map((route, index) => {
        return (
          <View
            key={`${route.name}-${index}`}
            style={[
              StyleSheet.absoluteFill,
              // eslint-disable-next-line react-native/no-inline-styles
              { zIndex: index, backgroundColor: '#f2f2f2' },
            ]}
          >
            {route.name === 'Home' && <HomeScreen />}

            {route.name === 'Detail' && <DetailScreen route={route as any} />}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
});
