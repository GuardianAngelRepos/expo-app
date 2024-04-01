import React, { useState } from "react";
import { SafeAreaView, Text, StyleSheet, View, Button } from "react-native";
import { ClerkProvider, SignedIn, SignedOut, useAuth } from "@clerk/clerk-expo";
import Constants from "expo-constants";
import * as SecureStore from "expo-secure-store";
import SignInWithOAuth from "./components/SignInWithOAuth";
import SignUpScreen from "./components/SignUpScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInScreen from "./components/SignInScreen";
import { NavigationContainer } from "@react-navigation/native";
import CustomButton from "./components/CustomButton";

const Stack = createNativeStackNavigator();

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

const SignOut = () => {
  const { isLoaded, signOut } = useAuth();
  if (!isLoaded) {
    return null;
  }
  return (
    <View>
      <CustomButton
        title="Sign Out"
        onPress={() => {
          signOut();
        }}
      />
    </View>
  );
};

export default function App() {
  return (
    <>
      <ClerkProvider
        tokenCache={tokenCache}
        publishableKey={Constants.expoConfig!.extra!.clerkPublishableKey}
      >
        <View style={styles.container}>
          <SignedIn>
            <Text>GuardianAngel</Text>
            <SignOut />
          </SignedIn>
          <SignedOut>
            {/* <SignUpScreen /> */}
            <SignInWithOAuth />
          </SignedOut>
        </View>
      </ClerkProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
