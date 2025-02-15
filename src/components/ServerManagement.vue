<template>
  <div class="container">
    <aside class="sidebar">
      <h1 class="sidebar-title">Patch Manager</h1>
      <ul class="menu">
        <li><router-link to="/" class="menu-item">📊 Dashboard</router-link></li>
        <li><router-link to="/servers" class="menu-item active">🖥️ Server Management</router-link></li>
        <li><router-link to="/patch-scanning" class="menu-item">🔍 Patch Scanning</router-link></li>
      </ul>
    </aside>

    <main class="content">
      <h2>Server Management</h2>
      <div class="server-input">
        <input v-model="newServerIp" placeholder="Enter Server IP" />
        <button @click="addServer">Add Server</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>IP Address</th>
            <th>OS</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="server in serverStore.servers" :key="server.ip">
            <td>{{ server.ip }}</td>
            <td>{{ server.os }}</td>
            <td>{{ server.status }}</td>
          </tr>
        </tbody>
      </table>
    </main>
  </div>
</template>

<script>
import { ref } from "vue";
import { useServerStore } from "@/store/useServerStore";

export default {
  setup() {
    const serverStore = useServerStore();
    const newServerIp = ref("");

    const addServer = () => {
      if (!newServerIp.value) {
        alert("Enter a valid IP address!");
        return;
      }
      serverStore.addServer(newServerIp.value);
      newServerIp.value = "";
    };

    return { newServerIp, addServer, serverStore };
  },
};
</script>

<style scoped>
.dashboard-container {
  display: flex;
  height: 100vh;
  background-color: #ffffff;
}

.sidebar {
  width: 250px;
  background-color: #f7f6ff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  height: 100vh;
}


.menu {
  list-style: none;
  padding: 0;
}

.menu-item {
  display: block;
  padding: 10px;
  text-decoration: none;
  color: black;
  font-size: 16px;
  border-radius: 8px;
}

.menu-item.active {
  background-color: #d8b4fe;
}

.main-content {
  flex-grow: 1;
  padding: 40px;
}

.add-server {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  background: #6200ea;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
}

button:hover {
  background: #3700b3;
}

.server-list {
  display: grid;
  gap: 10px;
}

.server-card {
  padding: 15px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
</style>
