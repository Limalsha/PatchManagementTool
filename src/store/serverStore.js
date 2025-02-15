// src/store/serverStore.js
import { defineStore } from "pinia";

export const useServerStore = defineStore("server", {
  state: () => ({
    servers: [], // List of servers
  }),
  getters: {
    totalServers: (state) => state.servers.length, // Total server count
  },
  actions: {
    async fetchServers() {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/servers");
        this.servers = await response.json();
      } catch (error) {
        console.error("Error loading servers:", error);
      }
    },
    addServer(server) {
      this.servers.push(server);
    },
    deleteServer(ip) {
      this.servers = this.servers.filter((s) => s.ip !== ip);
    },
  },
});
