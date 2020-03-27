import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Detail from './pages/Detail';
import Incidents from './pages/Incidents';

const AppStack = createStackNavigator();

export default function Routes(){
    return(
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{headerShown: false}}>
                <AppStack.Screen name="Incidentes"  component={Incidents} />
                <AppStack.Screen name="Detalhes"  component={Detail} />
            </AppStack.Navigator>
        </NavigationContainer>
    );



}