import React, { useState } from "react";
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { registerUser } from "../services/api";

export default function CreatePasswordScreen({ navigation, route }) {
  const dadosCadastro = route?.params?.dadosCadastro || {};
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    if (!password || !confirmPassword) {
      Alert.alert("Atenção", "Preencha os dois campos de senha.");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Atenção", "A senha precisa ter pelo menos 6 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Atenção", "As senhas não coincidem.");
      return;
    }

    try {
      setLoading(true);
      await registerUser({ ...dadosCadastro, senha: password });
      Alert.alert("Sucesso", "Cadastro finalizado com sucesso.");
      navigation.replace("Home", { user: { usr_name: dadosCadastro.nome, usr_mail: dadosCadastro.email, tipo_usuario: dadosCadastro.tipoUsuario } });
    } catch (error) {
      Alert.alert("Erro ao cadastrar", error.message || "Não foi possível finalizar o cadastro.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>← Voltar</Text>
        </TouchableOpacity>

        <View style={styles.card}>
          <View style={styles.iconCircle}><Text style={styles.icon}>🔒</Text></View>
          <Text style={styles.title}>Crie sua senha</Text>
          <Text style={styles.subtitle}>Para finalizar seu cadastro, crie uma senha segura para sua conta.</Text>

          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite sua senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Text style={styles.help}>A senha deve ter pelo menos 6 caracteres.</Text>

          <Text style={styles.label}>Confirmar senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite novamente sua senha"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />

          <View style={styles.tipBox}>
            <Text style={styles.tipTitle}>🛡️ Dicas para uma senha segura:</Text>
            <Text style={styles.tipText}>• Use pelo menos 6 caracteres</Text>
            <Text style={styles.tipText}>• Combine letras, números e símbolos</Text>
            <Text style={styles.tipText}>• Evite informações pessoais</Text>
          </View>

          <TouchableOpacity style={styles.primaryButton} onPress={handleRegister} disabled={loading}>
            <Text style={styles.primaryText}>{loading ? "Finalizando..." : "Finalizar cadastro  →"}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#E6F2FF", padding: 10 },
  container: { padding: 20, paddingBottom: 40 },
  backButton: { marginBottom: 12 },
  backText: { color: "#2563EB", fontWeight: "bold" },
  card: { backgroundColor: "#fff", borderRadius: 28, padding: 24, shadowColor: "#000", shadowOpacity: 0.08, shadowRadius: 12, elevation: 4 },
  iconCircle: { width: 110, height: 110, borderRadius: 55, backgroundColor: "#E0E7FF", justifyContent: "center", alignItems: "center", alignSelf: "center", marginBottom: 18 },
  icon: { fontSize: 46 },
  title: { fontSize: 28, fontWeight: "bold", color: "#0F2A44", textAlign: "center" },
  subtitle: { textAlign: "center", color: "#51647A", marginBottom: 28 },
  label: { color: "#1E3A5F", fontWeight: "bold", marginTop: 14, marginBottom: 8 },
  input: { backgroundColor: "#F4F7FB", borderColor: "#D6E4FF", borderWidth: 1, borderRadius: 12, padding: 14 },
  help: { color: "#64748B", fontSize: 12, marginTop: 6 },
  tipBox: { backgroundColor: "#F4F7FB", borderColor: "#D6E4FF", borderWidth: 1, borderRadius: 16, padding: 16, marginTop: 22 },
  tipTitle: { color: "#1E3A5F", fontWeight: "bold", marginBottom: 10 },
  tipText: { color: "#334155", marginBottom: 4 },
  primaryButton: { backgroundColor: "#2563EB", borderRadius: 14, padding: 16, alignItems: "center", marginTop: 22 },
  primaryText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
