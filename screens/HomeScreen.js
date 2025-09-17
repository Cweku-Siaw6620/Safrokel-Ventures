import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions, Image } from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import Swiper from "react-native-swiper";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");

const HomeScreen = ({navigation}) => {
  const [balanceVisible, setBalanceVisible] = useState(true);

  //CHECK BALANCE CODE
  const [balance, setBalance] = useState("...");
  const [fullName, setFullName] = useState("...");

  // Load fullName from AsyncStorage when component mounts
 useEffect(() => {
    const loadName = async () => {
      try {
        const name = await AsyncStorage.getItem("userName");
        if (name) setFullName(name);
      } catch (e) {
        console.log("Failed to load name", e);
      }
    };
    loadName();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("userName"); // clear saved user
    setFullName(null); // reset to guest mode

  };
      
  const savingsData = [
    { id: "1", title: "Adipiscing", amount: "$178.90", change: "+5.39%" },
    { id: "2", title: "Consectetur", amount: "$218.90", change: "+3.30%" },
    { id: "3", title: "Pulvinar", amount: "$108.20", change: "-4.19%" },
    { id: "4", title: "Solitudin", amount: "$138.10", change: "-5.22%" },
    { id: "5", title: "Bibendum", amount: "$78.10", change: "+3.19%" },
  ];

  const handleLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoRow}>
        <Text style={styles.header}>SAFROKEL</Text>
        <FontAwesome5 name="money-bill-wave" size={32} color="#37de4d" style={styles.icon} />
        <Text style={styles.header}>VENTURES</Text>
      </View>
      {/* Header */}
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.greeting}>Hello, {fullName} 👋</Text>
          <View style={styles.balanceRow}>
            <Text style={styles.balanceLabel}>Balance</Text>
            <TouchableOpacity onPress={() => setBalanceVisible(!balanceVisible)}>
              <Ionicons name={balanceVisible ? "eye" : "eye-off"} size={20} color="gray" />
            </TouchableOpacity>
          </View>
          <Text style={styles.balance}>
            {balanceVisible ? `Ghc ${balance}` : "••••••"}
          </Text>
        </View>

        {!fullName ?(
        <TouchableOpacity style={styles.loginButton} onPress={() => handleLogin()}>
        <Ionicons name="log-in-outline" size={20} color="#fff" />
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
        ):(
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Ionicons name="power-outline" size={24} color="#d9534f" />
        </TouchableOpacity>
        )}

      </View>

      {/* Slideshow */}
      <View style={styles.sliderContainer}>
        <Swiper
          autoplay
          autoplayTimeout={3}
          showsPagination={true}
          activeDotColor="#37de4d"
          style={{ borderRadius: 12 }}
        >
          <View style={styles.slide}>
            <Image
              style={styles.slideImage}
              source={require("../assets/slide1.jpg")}
            />
          </View>
          <View style={styles.slide}>
            <Image
              style={styles.slideImage}
              source={require("../assets/slide2.jpg")}
            />
          </View>
          <View style={styles.slide}>
            <Image
              style={styles.slideImage}
              source={require("../assets/slide3.jpg")}
            />
          </View>
          <View style={styles.slide}>
            <Image
              style={styles.slideImage}
              source={require("../assets/slide4.jpg")}
            />
          </View>
        </Swiper>
      </View>

      {/* Actions */}
      <View style={styles.actionRow}>
        <View style={styles.actionButton}>
          <Ionicons name="cash-outline" size={28} color="#37de4d" />
          <Text>Save</Text>
        </View>
        <View style={styles.actionButton}>
          <Ionicons name="swap-horizontal-outline" size={28} color="#37de4d" />
          <Text>Transfer</Text>
        </View>
      </View>

      {/* Recent Savings */}
      <View style={styles.savingsHeader}>
        <Text style={styles.sectionTitle}>RECENT SAVINGS</Text>
        <TouchableOpacity>
          <Text style={styles.viewAll}>VIEW ALL</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={savingsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.savingItem}>
            <FontAwesome5 name="piggy-bank" size={20} color="#37de4d" />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.savingTitle}>{item.title}</Text>
              <Text style={styles.savingAmount}>{item.amount}</Text>
            </View>
            <Text
              style={[
                styles.savingChange,
                { color: item.change.includes("-") ? "red" : "green" },
              ]}
            >
              {item.change}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16, 
    backgroundColor: "#fff", 
    marginTop: 30 
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
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
  loginButton: {
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "#37de4dff",
  paddingVertical: 8,
  paddingHorizontal: 16,
  borderRadius: 8,
},
loginText: {
  color: "#fff",
  fontSize: 16,
  fontWeight: "600",
  marginLeft: 6,
},
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  greeting: { fontSize: 20, fontWeight: "600" },
  balanceRow: { flexDirection: "row", alignItems: "center", marginTop: 4 },
  balanceLabel: { fontSize: 14, color: "gray", marginRight: 6 },
  balance: { fontSize: 28, fontWeight: "bold", marginTop: 4 },
  sliderContainer: { height: 150, marginVertical: 20 },
  slide: { flex: 1, borderRadius: 12, overflow: "hidden" },
  slideImage: { width: "100%", height: "100%", resizeMode: "contain" },
  actionRow: { flexDirection: "row", justifyContent: "space-around", marginVertical: 16 },
  actionButton: { alignItems: "center" },
  savingsHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
  sectionTitle: { fontWeight: "bold", fontSize: 14, color: "#333" },
  viewAll: { fontSize: 12, color: "#37de4d", fontWeight: "600" },
  savingItem: { flexDirection: "row", alignItems: "center", paddingVertical: 12, borderBottomWidth: 1, borderColor: "#eee" },
  savingTitle: { fontSize: 14, fontWeight: "500" },
  savingAmount: { fontSize: 12, color: "gray" },
  savingChange: { fontSize: 13, fontWeight: "600" },
  logoutButton: {
    marginLeft: 10,
    padding: 6,
    borderRadius: 30,
    backgroundColor: "#f9f9f9",
  },
});

export default HomeScreen;
