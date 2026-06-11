import React, { useState } from "react";
import { Alert, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { loginUser } from "../services/api";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("teste@allcare.com");
  const [senha, setSenha] = useState("123456");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!email || !senha) {
      Alert.alert("Atenção", "Digite o e-mail e a senha.");
      return;
    }

    try {
      setLoading(true);
      const user = await loginUser(email, senha);
      navigation.replace("Home", { user });
    } catch (error) {
      Alert.alert("Erro no login", error.message || "Não foi possível entrar.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.card}>
        <Text style={styles.logo}>AllCare</Text>
        <Text style={styles.subtitle}>Cuidando de quem você ama</Text>

        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Digite seu e-mail"
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          value={senha}
          onChangeText={setSenha}
          placeholder="Digite sua senha"
          secureTextEntry
        />

        <TouchableOpacity style={styles.primaryButton} onPress={handleLogin} disabled={loading}>
          <Text style={styles.primaryText}>{loading ? "Entrando..." : "Entrar"}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.navigate("Register")}>
          <Text style={styles.secondaryText}>Criar novo cadastro</Text>
        </TouchableOpacity>

        <Text style={styles.hint}>Usuário de teste: teste@allcare.com / 123456</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#E6F2FF", justifyContent: "center", padding: 20 },
  card: { backgroundColor: "#fff", borderRadius: 28, padding: 24, shadowColor: "#000", shadowOpacity: 0.08, shadowRadius: 12, elevation: 4 },
  logo: { fontSize: 42, fontWeight: "bold", color: "#24577D", textAlign: "center" },
  subtitle: { color: "#24577D", textAlign: "center", marginBottom: 30 },
  label: { color: "#1E3A5F", fontWeight: "bold", marginTop: 14, marginBottom: 8 },
  input: { backgroundColor: "#F4F7FB", borderColor: "#D6E4FF", borderWidth: 1, borderRadius: 12, padding: 14 },
  primaryButton: { backgroundColor: "#2563EB", borderRadius: 14, padding: 16, alignItems: "center", marginTop: 24 },
  primaryText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  secondaryButton: { padding: 16, alignItems: "center" },
  secondaryText: { color: "#2563EB", fontWeight: "bold" },
  hint: { textAlign: "center", color: "#64748B", marginTop: 8, fontSize: 12 },
});
