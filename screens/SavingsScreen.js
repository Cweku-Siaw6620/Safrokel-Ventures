import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

const SavingsScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [savings, setSavings] = useState([]);
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [balance, setBalance] = useState(0);

  // Modal state
  const [modalVisible, setModalVisible] = useState(false);
  const [amount, setAmount] = useState("");
  const [title, setTitle] = useState("");

  // Load user + savings from AsyncStorage
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const name = await AsyncStorage.getItem("userName");
        const phone = await AsyncStorage.getItem("phoneNumber");
        if (phone) setPhoneNumber(phone);
        if (name) setFullName(name);

        const storedSavings = await AsyncStorage.getItem("savings");
        if (storedSavings) {
          const parsed = JSON.parse(storedSavings);
          setSavings(parsed);
          const total = parsed.reduce((sum, item) => sum + item.amount, 0);
          setBalance(total);
        }
      } catch (err) {
        console.log("Error loading savings", err);
      }
    };
    loadUserData();
  }, []);

  // Save new saving
  const handleAddSaving = async () => {
    if (!amount) {
      Alert.alert("Error", "Please enter an amount");
      return;
    }

    const newEntry = {
      id: Date.now(), // unique id
      title: title || "Savings",
      amount: parseFloat(amount),
      date: new Date().toLocaleDateString(),
    };

    const updatedSavings = [...savings, newEntry];
    setSavings(updatedSavings);
    setBalance((prev) => prev + newEntry.amount);

    // Save to AsyncStorage
    await AsyncStorage.setItem("savings", JSON.stringify(updatedSavings));

    // Reset form & close modal
    setAmount("");
    setTitle("");
    setModalVisible(false);
  };

  // Guest view
  if (!fullName) {
    return (
      <View style={styles.centered}>
        <Ionicons name="lock-closed-outline" size={60} color="gray" />
        <Text style={styles.infoText}>Log in to view your savings page</Text>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.loginText}>Log In</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Balance Card */}
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Current Balance</Text>
        <TouchableOpacity
          onPress={() => setBalanceVisible(!balanceVisible)}
          style={{ marginBottom: 10 }}
        >
          <Ionicons
            name={balanceVisible ? "eye" : "eye-off"}
            size={22}
            color="gray"
          />
        </TouchableOpacity>
        <Text style={styles.balance}>
          {balanceVisible ? `Ghc ${balance.toFixed(2)}` : "Ghc ••••••"}
        </Text>
      </View>
      {/* 

      
      {savings.length === 0 ? (
        <View style={styles.centered}>
          <Ionicons name="wallet-outline" size={70} color="#37de4d" />
          <Text style={styles.infoText}>
            You haven’t started saving yet. Begin your journey today!
          </Text>
        </View>
      ) : (
        <>
          <Text style={styles.sectionTitle}>Savings History</Text>
          <FlatList
            data={savings}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.historyCard}>
                <Text style={styles.historyTitle}>{item.title}</Text>
                <Text style={styles.historyAmount}>Ghc {item.amount}</Text>
                <Text style={styles.historyDate}>{item.date}</Text>
              </View>
            )}
          />
        </>
      )}  */}
    
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  infoText: { fontSize: 16, color: "gray", textAlign: "center", marginTop: 10 },
  loginButton: {
    marginTop: 20,
    backgroundColor: "#37de4d",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  loginText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  balanceCard: {
    backgroundColor: "#f1f1f1",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
  },
  balanceLabel: { fontSize: 14, color: "gray" },
  balance: { fontSize: 28, fontWeight: "bold", color: "#333" },
  sectionTitle: { fontSize: 18, fontWeight: "600", marginBottom: 10 },
  historyCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#fafafa",
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#eee",
  },
  historyTitle: { fontSize: 16, fontWeight: "500" },
  historyAmount: { fontSize: 16, fontWeight: "600", color: "#37de4d" },
  historyDate: { fontSize: 12, color: "gray" },
});

export default SavingsScreen;
