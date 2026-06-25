const API_URL = "http://10.127.176.209:8001";

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  const text = await response.text();
  let data = null;

  try {
    data = text ? JSON.parse(text) : null;
  } catch (_error) {
    data = { message: text || "Resposta inválida do servidor." };
  }

  if (!response.ok) {
    throw new Error(data?.message || "Erro na comunicação com a API.");
  }

  return data;
}

export async function registerUser(payload) {
  return request("/usuarios", { method: "POST", body: JSON.stringify(payload) });
}

export async function loginUser(email, senha) {
  const data = await request("/usuarios/login", { method: "POST", body: JSON.stringify({ email, senha }) });
  return data.user;
}

export async function getChatMessages() { return request("/chat/mensagens"); }
export async function sendChatMessage(payload) { return request("/chat/mensagens", { method: "POST", body: JSON.stringify(payload) }); }

export async function getAppointments() { return request("/agendamentos"); }
export async function createAppointment(payload) { return request("/agendamentos", { method: "POST", body: JSON.stringify(payload) }); }
export async function updateAppointmentStatus(id, status) { return request(`/agendamentos/${id}/status`, { method: "PUT", body: JSON.stringify({ status }) }); }
export async function deleteAppointment(id) { return request(`/agendamentos/${id}`, { method: "DELETE" }); }

export async function getHistory() { return request("/historico"); }
export async function createHistory(payload) { return request("/historico", { method: "POST", body: JSON.stringify(payload) }); }

export async function getReviews() { return request("/avaliacoes"); }
export async function createReview(payload) { return request("/avaliacoes", { method: "POST", body: JSON.stringify(payload) }); }

export async function getFamilyMembers() { return request("/familiares"); }
export async function createFamilyMember(payload) { return request("/familiares", { method: "POST", body: JSON.stringify(payload) }); }
export async function deleteFamilyMember(id) { return request(`/familiares/${id}`, { method: "DELETE" }); }

export { API_URL };
