// App.js
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LeadFormScreen from './screens/LeadFormScreen';
import LoginScreen from './screens/LoginScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: 'Login' }}
        />
        <Stack.Screen
          name="LeadForm"
          component={LeadFormScreen}
          options={{ title: 'Cadastro de Lead' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
