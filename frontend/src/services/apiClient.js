import axios from "axios";
import API_BASE_URL from ".././constants";

class ApiClient {
  constructor(remoteHostUrl) {
    this.remoteHostUrl = remoteHostUrl;
    this.token = null;
    this.tokenName = "lifetracker_token";
  }

  setToken(token) {
    this.token = token;
    localStorage.setItem(this.tokenName, token);
  }

  async request({ endpoint, method = "GET", data = {} }) {
    const url = `${this.remoteHostUrl}/${endpoint}`;
    const headers = {
      "Content-Type": "application/json",
    };

    if (this.token) headers["Authorization"] = `Bearer ${this.token}`;

    try {
      const res = await axios({ url, method, data, headers });
      console.log();
      return { data: res.data, error: null };
    } catch (error) {
      console.error({ errorResponse: error.response });
      const message = error?.response?.data?.error?.message;
      return { data: null, error: message || String(error) };
    }
  }

  async login(credentials) {
    console.log("url", this.remoteHostUrl);
    return await this.request({
      endpoint: `auth/login`,
      method: `POST`,
      data: credentials,
    });
  }
  async signup(credentials) {
    return await this.request({
      endpoint: `auth/register`,
      method: `POST`,
      data: credentials,
    });
  }
  async logout() {
    this.setToken(null);
    localStorage.setItem(this.tokenName, "");
  }

  async fetchUserFromToken() {
    return await this.request({ endpoint: "auth/me", method: "GET" });
  }

  async fetchNutritionForUser() {
    return await this.request({ endpoint: "nutrition/", method: "GET" });
  }

  async createNutrition(nutritionForm) {
    return await this.request({
      endpoint: "nutrition/",
      method: "POST",
      data: nutritionForm,
    });
  }

  async fetchNutrition(nutritionId) {
    return await this.request({
      endpoint: `nutrition/${nutritionId}`,
      method: "GET",
    });
  }

  async calculateSummaryStats() {
    return await this.request({ endpoint: "activity/", method: "GET" });
  }
}
export default new ApiClient(API_BASE_URL || "http://localhost:3001");
