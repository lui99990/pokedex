import React, { createContext, useContext, useState, useEffect } from 'react';
import { BackHandler } from 'react-native';
import { Route } from './NavigationTypes';

export interface NavigationContextProps {
  currentRoute: Route;
  routeStack: Route[];
  navigate: (route: Route) => void;
  goBack: () => void;
}

export const NavigationContext = createContext<NavigationContextProps>(
  {} as NavigationContextProps,
);

export const NavigationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [routeStack, setRouteStack] = useState<Route[]>([{ name: 'Home' }]);

  const currentRoute = routeStack[routeStack.length - 1];

  const navigate = (route: Route) => {
    setRouteStack(prev => [...prev, route]);
  };

  const goBack = () => {
    setRouteStack(prev => {
      if (prev.length > 1) {
        const newStack = [...prev];
        newStack.pop();
        return newStack;
      }
      return prev;
    });
  };

  useEffect(() => {
    const handleBackPress = () => {
      if (routeStack.length > 1) {
        goBack();
        return true;
      }
      return false;
    };

    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress,
    );

    return () => subscription.remove();
  }, [routeStack]);

  return (
    <NavigationContext.Provider
      value={{ currentRoute, routeStack, navigate, goBack }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => useContext(NavigationContext);
