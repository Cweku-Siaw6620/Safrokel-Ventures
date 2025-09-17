import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './screens/WelcomeScreen';
import HomeScreen from './screens/HomeScreen';
import HistoryScreen from './screens/HistoryScreen';
import SavingsScreen from './screens/SavingsScreen';
import { Ionicons } from '@expo/vector-icons';
import { View, Platform } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTabs = () => (
  <Tab.Navigator>
    <Tab.Screen  options={{
        headerShown:false,
        tabBarIcon: ({ color, size }) => (
        <Ionicons name="home" size={size} color={color} />
          ),
          tabBarActiveTintColor: '#37de4dff', // active tab color
          tabBarInactiveTintColor: 'gray',  // inactive tab color
        }}
          name='Home' component={HomeScreen}/>

      <Tab.Screen
      name="Savings"
      component={SavingsScreen}
      options={{
        headerShown: false,
        tabBarActiveTintColor: '#37de4dff',
        tabBarIcon: ({ focused }) => {
          return (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: focused ? "#37de4dff" : "white", // highlight when active
                height: Platform.OS === "ios" ? 50 : 60,
                width: Platform.OS === "ios" ? 50 : 60,
                top: Platform.OS === "ios" ? -10 : -20, // floating effect
                borderRadius: Platform.OS === "ios" ? 25 : 30,
                borderWidth: 2,
                borderColor: focused ? "#37de4dff" : "gray", // change border when active
                shadowColor: "#000",
                shadowOpacity: 0.2,
                shadowOffset: { width: 0, height: 2 },
                shadowRadius: 4,
                elevation: 5, // Android shadow
              }}
            >
              <Ionicons
                name="cash-outline"
                size={24}
                color={focused ? "white" : "#37de4dff"} // icon color changes
              />
            </View>
          );
        },
      }}
    />

    <Tab.Screen  options={{
        headerShown:false,
        tabBarIcon: ({ color, size }) => (
        <Ionicons name="wallet-outline" size={size} color={color} />
          ),
          tabBarActiveTintColor: '#37de4dff', // active tab color
          tabBarInactiveTintColor: 'gray',  // inactive tab color
          }}
          name='History' component={HistoryScreen}/>
  </Tab.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="HomeTabs" component={HomeTabs} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
