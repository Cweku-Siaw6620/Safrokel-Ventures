import React from 'react';
import { View, Text, StyleSheet,TouchableOpacity,Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5 } from '@expo/vector-icons';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoRow}>
        <Text style={styles.header}>SAFROKEL</Text>
        <FontAwesome5 name="money-bill-wave" size={32} color="#37de4d" style={styles.icon} />
        <Text style={styles.header}>VENTURES</Text>
      </View>

     <View style={styles.headerContainer}>
        <Text style={{fontSize: 20,fontWeight: "bold"}}>Welcome ......</Text>
        <TouchableOpacity style={styles.button} onPress={() => alert("Button pressed!")}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
 
      <View>
        <Text>Your Financial Partner</Text>
      </View>
      <View>
        <Text>Home Screen</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff' 
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    justifyContent: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "900",
    letterSpacing: 2,
    color: "#2e3a59",
    textTransform: "uppercase",
  },
  icon: {
    marginHorizontal: 6, // spacing between words and icon
    shadowColor: "#37de4d", 
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 10, 
    marginTop: 20, // Android shadow
  },
  headerContainer: {
    marginTop: 20, 
    marginBottom: 20,
    flexDirection: "row", 
    justifyContent: "space-between", // text left, button right
    alignItems: "center", 
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  button: {
    backgroundColor: "#37de4dff",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
});

export default HomeScreen;
