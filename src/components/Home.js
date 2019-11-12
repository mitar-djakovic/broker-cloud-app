import React from "react";
import Ionicons from 'react-native-vector-icons/FontAwesome';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import SearchScreen from './Search';
import FavoritesScreen from './Favorites';
import DetailsScreen from './Details';

const SearchStack = createStackNavigator({
    Search: { screen: SearchScreen},
    Details: { screen: DetailsScreen},
});

const FavoritesStack = createStackNavigator({
    Favorites: { screen: FavoritesScreen},
    Details: { screen: DetailsScreen},
});

export default createAppContainer(createBottomTabNavigator(
    {
        Search: { screen: SearchStack },
        Favorites: { screen: FavoritesStack },
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                
                if (routeName === 'Search') {
                    // iconName = `ios-information-circle${focused ? '' : '-outline'}`;
                    iconName = 'th-list';
                } else if (routeName === 'Favorites') {
                    iconName = 'heart';
                }

                // You can return any component that you like here! We usually use an
                // icon component from react-native-vector-icons
                return <Ionicons name={iconName} size={20} color={tintColor} />;
            },
            title: navigation.state.routeName === 'Search' ? 'Market Search' : 'Favorites'
        }),
        tabBarOptions: {
            activeTintColor: '#009688',
            inactiveTintColor: 'gray',
        },
    }
));