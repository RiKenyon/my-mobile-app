import { Image } from "expo-image";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";

import { HelloWave } from "@/components/hello-wave";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export default function HomeScreen() {
  // 1. Setup state to hold the Pi's response
  const [serverMessage, setServerMessage] = useState<string>(
    "Connecting to Pi..."
  );
  const [loading, setLoading] = useState(true);

  // 2. The function that talks to the Raspberry Pi
  useEffect(() => {
    fetch("http://192.168.0.30:3000/status") // Use your Pi IP
      .then((response) => response.json())
      .then((data) => {
        setServerMessage(data.message); // Should say "Hello from the backend!"
        setLoading(false);
      })
      .catch((error) => {
        setServerMessage("Offline: " + error.message);
        setLoading(false);
      });
  }, []);
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Pi Connected Test</ThemedText>
        <HelloWave />
      </ThemedView>
      {/* 3. Display the Pi Status here */}
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Raspberry Pi Status:</ThemedText>
        <ThemedView style={styles.statusBox}>
          {loading ? (
            <ActivityIndicator color="#A1CEDC" />
          ) : (
            <ThemedText
              style={{
                color: serverMessage.includes("Offline") ? "red" : "#4CAF50",
              }}
            >
              {serverMessage}
            </ThemedText>
          )}
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  statusBox: {
    padding: 15,
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
});
