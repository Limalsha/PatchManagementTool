<template>
    <div class="layout">
      <!-- Sidebar -->
      <aside class="sidebar">
      <h1 class="sidebar-title">Patch Manager</h1>
      <ul class="menu">
        <ul class="menu">
  <li><router-link to="/">📊 Dashboard</router-link></li>
  <li><router-link to="/servers">🖥️ Server Management</router-link></li>
</ul>
<li>
  <router-link to="/patch-scanning">🔍 Patch Scanning</router-link>
</li>
  </ul>
      <div class="user-info">
        <img src="/user-avatar.png" alt="User Avatar" class="avatar" />
        <div>
          <p class="user-name">Admin User</p>
          <p class="user-role">System Admin</p>
        </div>
      </div>
    </aside>
  
      <!-- Main Content -->
      <main class="content">
        <h2>Patch Scanning & Reporting</h2>
  
        <!-- Server Selection -->
        <div class="server-selection">
          <label for="server">Select Server:</label>
          <select v-model="selectedServer">
            <option v-for="server in servers" :key="server.ip" :value="server.ip">
              {{ server.name }} ({{ server.ip }})
            </option>
          </select>
          <button @click="fetchPatches">Check Available Patches</button>
        </div>
  
        <!-- Patches Table -->
        <div v-if="patches.length > 0" class="table-container">
          <table>
            <thead>
              <tr>
                <th>Package Name</th>
                <th>Current Version</th>
                <th>Updated Version</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="patch in patches" :key="patch.package">
                <td>{{ patch.package }}</td>
                <td>{{ patch.current_version }}</td>
                <td>{{ patch.updated_version }}</td>
              </tr>
            </tbody>
          </table>
  
          <!-- Download CSV Button -->
          <button @click="downloadCSV">Download CSV</button>
        </div>
      </main>
    </div>
  </template>
  
  <script>
  export default {
    name: "PatchScanning",
    data() {
      return {
        servers: [], // List of servers
        selectedServer: "",
        patches: [], // List of available patches
      };
    },
    mounted() {
      this.loadServers();
    },
    methods: {
      // Fetch servers from API
      async loadServers() {
        try {
          const response = await fetch("http://127.0.0.1:5000/api/servers");
          this.servers = await response.json();
        } catch (error) {
          console.error("Error loading servers:", error);
        }
      },
  
      // Fetch patches for selected server
      async fetchPatches() {
        if (!this.selectedServer) {
          alert("Please select a server!");
          return;
        }
  
        try {
          const response = await fetch(`http://127.0.0.1:5000/api/check-patches?ip=${this.selectedServer}`);
          this.patches = await response.json();
        } catch (error) {
          console.error("Error fetching patches:", error);
          alert("Failed to fetch patch details.");
        }
      },
  
      // Download table as CSV
      downloadCSV() {
        let csvContent = "data:text/csv;charset=utf-8,";
        csvContent += "Package Name,Current Version,Updated Version\n";
  
        this.patches.forEach((patch) => {
          csvContent += `${patch.package},${patch.current_version},${patch.updated_version}\n`;
        });
  
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "patches_report.csv");
        document.body.appendChild(link);
        link.click();
      },
    },
  };
  </script>
  
  <style scoped>
  /* Layout */
  .layout {
    display: flex;
    height: 100vh;
  }
  
  /* Sidebar */
  .sidebar {
  width: 250px;
  background-color: #f7f6ff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  }
  
  
  
  .menu {
    list-style: none;
    padding: 0;
  }
  
  .menu-item {
    display: block;
    padding: 10px;
    color: rgb(0, 0, 0);
    text-decoration: none;
  }
  
  .menu-item:hover,
  .menu-item.active {
    background: #444;
  }
  
  /* Main Content */
  .content {
    flex: 1;
    padding: 20px;
    background: #ffffff;
  }
  
  /* Server Selection */
  .server-selection {
    margin-bottom: 20px;
  }
  
  button {
    margin-left: 10px;
    padding: 10px;
    background: #007bff;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  button:hover {
    background: #0056b3;
  }
  
  /* Table */
  .table-container {
    margin-top: 20px;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
  }
  
  th, td {
    border: 1px solid #ddd;
    padding: 10px;
  }
  
  th {
    background-color: #333;
    color: white;
  }
  </style>
  