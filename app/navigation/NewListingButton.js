import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons";


import colors from '../config/colors';

function NewListingButton({ onPress }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.container}>
                <MaterialCommunityIcons
                    name='plus-circle'
                    color={colors.white}
                    size={40}
                />
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.primary,
        bottom: 15,
        width: 60,
        height: 60,
        borderRadius: 30,
        borderColor: colors.white,
        borderWidth: 5,
    },
});

export default NewListingButton;