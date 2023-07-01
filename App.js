import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import { Colors } from './constants/styles';
import AuthcontextProvider, { AuthContext } from './store/auth-context';
import { useContext, useEffect, useState } from 'react';
import IconButton from './components/ui/IconButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SplashScreen from 'expo-splash-screen';

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const authctx = useContext(AuthContext)
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} options={{
        headerRight: ({tintColor}) => <IconButton icon="exit" color= {tintColor} size= {24} onPress= {authctx.logout}/>
      }}/>
    </Stack.Navigator>
  );
}

function Navigation() {

  const authctx = useContext(AuthContext)

  return ( 
    <NavigationContainer>
      { !authctx.isAuthenticated && <AuthStack />}
      { authctx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

function Root() {
  const [isTryingLogin, setIsTryinglogin] = useState(true);
  const authctx = useContext(AuthContext);
  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem("token");
      if (storedToken) {
        authctx.authenticate(storedToken);
      }
      setIsTryinglogin(false);
    }
    fetchToken();
  }, []);

  if(isTryingLogin){
    SplashScreen.preventAutoHideAsync();
  }else {
    SplashScreen.hideAsync();
  }
  return <Navigation />
}

SplashScreen.preventAutoHideAsync();

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AuthcontextProvider>
        <Root />
      </AuthcontextProvider>
    </>
  );
}
