import * as React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import styled from "styled-components"
import Header from '../Components/Header'
import Home from '../Screens/Home'

import { FontAwesome } from '@expo/vector-icons';
    
const About = () => <Container><Text>About</Text></Container>

const Shop = () => <Container><Text>Shop</Text></Container>

const Container = styled.View`
    flex: 1;
    justifyContent: center;
    alignItems: center
`;

const iconos = {
    Home: "home",
    About: "info",
    Shop: "shopping-bag",
}

const Tab = createBottomTabNavigator();

export default function TabV() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions = {({ route }) => ({
                    tabBarIcon: ({size, color}) => <FontAwesome name={iconos[route.name]} size={size} color={color}/>
                })}
                tabBarOptions={{
                    activeTintColor: '#201F22',
                    inactiveTintColor: 'gray',
                }}
            >
            <Tab.Screen name="Home" component={Home}     />
            <Tab.Screen name="Shop" component={Shop}/>
            <Tab.Screen name="About" component={About}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

