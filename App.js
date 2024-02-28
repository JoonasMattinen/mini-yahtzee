import Home from './components/Home';
import Gameboard from './components/Gameboard';
import ScoreBoard from './components/Scoreboard';
import  { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();
const Tab = createBottomTabNavigator();

export default function App() {

  const [fontsloaded, fontError] = useFonts({ 
    'kodemono': require('./assets/fonts/KodeMono.ttf'),
   });

   useEffect(() => {
    async function handleSplashScreen() {
      if (fontsloaded || fontError) {
        await SplashScreen.hideAsync();
      }
    }
    handleSplashScreen();
   }, [fontsloaded, fontError]);

   if (!fontsloaded && !fontError) {
    return null;
  }

  return(
    <NavigationContainer>
      <Tab.Navigator
        sceneContainerStyle={{ backgroundColor: 'transparent' }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused
                ? 'information'
                : 'information-outline';
            } else if (route.name === 'Gameboard') {
              iconName = focused 
                ? 'dice-multiple' 
                : 'dice-multiple-outline';
            } else if (route.name === 'Scoreboard') {
              iconName = focused 
                ? 'view-list' 
                : 'view-list-outline';
            }

            // You can return any component that you like here!
            return <MaterialCommunityIcons
              name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#f39c12',
          tabBarInactiveTintColor: '#f5d6a4',
          tabBarLabelStyle: { fontFamily: 'kodemono', fontSize: 12},
        })}
      >
        <Tab.Screen name="Home" component={Home} 
          options={{tabBarStyle: {display: 'none'}}}
        />
        <Tab.Screen name="Gameboard" component={Gameboard} />
        <Tab.Screen name="Scoreboard" component={ScoreBoard} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

