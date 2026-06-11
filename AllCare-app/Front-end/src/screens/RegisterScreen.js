import React, { useState } from "react";
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function RegisterScreen({ navigation }) {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    cpf: "",
    dataNascimento: "",
    cep: "",
    endereco: "",
    numero: "",
    bairro: "",
    cidade: "",
    estado: "SP",
    tipoUsuario: "contratante",
  });

  function update(field, value) {
    setForm((old) => ({ ...old, [field]: value }));
  }

  function handleNext() {
    const required = ["nome", "email", "cpf", "dataNascimento", "cep", "endereco", "numero", "bairro", "cidade", "estado"];
    const missing = required.find((field) => !String(form[field] || "").trim());

    if (missing) {
      Alert.alert("Atenção", "Preencha todos os campos obrigatórios.");
      return;
    }

    navigation.navigate("Password", { dadosCadastro: form });
  }

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>← Voltar</Text>
        </TouchableOpacity>

        <View style={styles.card}>
          <Text style={styles.title}>Cadastro AllCare</Text>
          <Text style={styles.subtitle}>Dados do contratante ou paciente responsável</Text>

          <Field label="Nome completo" value={form.nome} onChangeText={(text) => update("nome", text)} />
          <Field label="E-mail" value={form.email} onChangeText={(text) => update("email", text)} keyboardType="email-address" autoCapitalize="none" />
          <Field label="Telefone" value={form.telefone} onChangeText={(text) => update("telefone", text)} keyboardType="phone-pad" />
          <Field label="CPF" value={form.cpf} onChangeText={(text) => update("cpf", text)} />
          <Field label="Data de nascimento" placeholder="DD/MM/AAAA" value={form.dataNascimento} onChangeText={(text) => update("dataNascimento", text)} />

          <Text style={styles.section}>Endereço</Text>
          <Field label="CEP" value={form.cep} onChangeText={(text) => update("cep", text)} />
          <Field label="Endereço" value={form.endereco} onChangeText={(text) => update("endereco", text)} />
          <Field label="Número" value={form.numero} onChangeText={(text) => update("numero", text)} />
          <Field label="Bairro" value={form.bairro} onChangeText={(text) => update("bairro", text)} />
          <Field label="Cidade" value={form.cidade} onChangeText={(text) => update("cidade", text)} />
          <Field label="Estado" value={form.estado} onChangeText={(text) => update("estado", text.toUpperCase())} />

          <Text style={styles.section}>Tipo de usuário</Text>
          <View style={styles.rowButtons}>
            <Choice selected={form.tipoUsuario === "contratante"} label="Contratante" onPress={() => update("tipoUsuario", "contratante")} />
            <Choice selected={form.tipoUsuario === "cuidador"} label="Cuidador" onPress={() => update("tipoUsuario", "cuidador")} />
          </View>

          <TouchableOpacity style={styles.primaryButton} onPress={handleNext}>
            <Text style={styles.primaryText}>Continuar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Field({ label, ...props }) {
  return (
    <View style={styles.fieldGroup}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={styles.input} placeholder={props.placeholder || label} {...props} />
    </View>
  );
}

function Choice({ selected, label, onPress }) {
  return (
    <TouchableOpacity style={[styles.choice, selected && styles.choiceSelected]} onPress={onPress}>
      <Text style={[styles.choiceText, selected && styles.choiceTextSelected]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#E6F2FF" },
  container: { padding: 20, paddingBottom: 40 },
  backButton: { marginBottom: 12 },
  backText: { color: "#2563EB", fontWeight: "bold" },
  card: { backgroundColor: "#fff", borderRadius: 28, padding: 22, shadowColor: "#000", shadowOpacity: 0.08, shadowRadius: 12, elevation: 4 },
  title: { fontSize: 28, fontWeight: "bold", color: "#0F2A44", textAlign: "center" },
  subtitle: { color: "#51647A", textAlign: "center", marginBottom: 22 },
  fieldGroup: { marginBottom: 12 },
  label: { fontWeight: "bold", color: "#1E3A5F", marginBottom: 6 },
  input: { backgroundColor: "#F4F7FB", borderColor: "#D6E4FF", borderWidth: 1, borderRadius: 12, padding: 13 },
  section: { fontWeight: "bold", color: "#2563EB", marginTop: 12, marginBottom: 10, fontSize: 16 },
  rowButtons: { flexDirection: "row", gap: 10, marginBottom: 10 },
  choice: { flex: 1, borderWidth: 1, borderColor: "#2563EB", borderRadius: 12, padding: 12, alignItems: "center" },
  choiceSelected: { backgroundColor: "#2563EB" },
  choiceText: { color: "#2563EB", fontWeight: "bold" },
  choiceTextSelected: { color: "#fff" },
  primaryButton: { backgroundColor: "#2563EB", borderRadius: 14, padding: 16, alignItems: "center", marginTop: 16 },
  primaryText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
