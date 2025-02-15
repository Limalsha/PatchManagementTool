import { defineStore } from "pinia";

export const useServerStore = defineStore("serverStore", {
  state: () => ({
    servers: [],
  }),
  actions: {
    async addServer(ip) {
      const newServer = { ip, os: "Fetching...", status: "Pending" };
      this.servers.push(newServer);

      try {
        const response = await fetch(`http://${ip}:5000/execute-command`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ command: "cat /etc/os-release" }),
        });

        const data = await response.json();

        if (data.status === "success") {
          newServer.os = data.output;
          newServer.status = "Online";
        } else {
          newServer.os = "Unknown";
          newServer.status = "Error";
        }
      } catch (error) {
        newServer.os = "Unknown";
        newServer.status = "Offline";
        console.error("Error fetching OS:", error);
      }
    },
  },
});
