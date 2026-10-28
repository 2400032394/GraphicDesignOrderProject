import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:8080/graphicdesignorder";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export async function fetchOrders() {
  const response = await api.get("/displayall");
  if (!Array.isArray(response.data)) {
    throw new Error("The server returned an unexpected orders response.");
  }
  return response.data;
}

export async function fetchOrderById(id) {
  const response = await api.get("/display", { params: { id } });
  return response.data;
}

export async function addOrder(order) {
  return api.post("/add", order);
}

export async function updateOrder(order) {
  return api.put("/update", order);
}

export async function deleteOrder(id) {
  return api.delete(`/delete/${encodeURIComponent(id)}`);
}

export function getApiErrorMessage(error, fallback) {
  const data = error?.response?.data;
  if (typeof data === "string" && data.trim()) {
    return data.trim();
  }
  if (data && typeof data === "object") {
    const message = data.message || data.error || data.detail;
    if (typeof message === "string" && message.trim()) {
      return message.trim();
    }
    const responseText = JSON.stringify(data);
    if (responseText && responseText !== "{}") {
      return responseText;
    }
  }
  if (error?.response) {
    return fallback;
  }
  if (error?.request) {
    return "Could not reach the backend. Check that the server is running and that CORS permits this frontend.";
  }
  return error?.message || fallback;
}
