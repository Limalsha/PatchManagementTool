<template>
  <div class="dashboard-container">
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
    <div class="main-content">
      <div class="stats-grid">
        <div class="card">
          <i class="fas fa-server icon"></i>
          <p>Total Servers</p>
          <h2>{{ stats.servers }}</h2>
        </div>
        <div class="card">
          <i class="fas fa-exclamation-circle icon"></i>
          <p>Pending Updates</p>
          <h2>{{ stats.pending_updates }}</h2>
        </div>
        <div class="card">
          <i class="fas fa-calendar icon"></i>
          <p>Last Update</p>
          <h2>{{ stats.last_update }}</h2>
        </div>
        <div class="card">
          <i class="fas fa-sync-alt icon"></i>
          <p>Major Updates</p>
          <h2>{{ stats.major_updates }}</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "@/assets/dashboard.css";  // Import the CSS file
export default {
  name: "SystemDashboard",
  data() {
    return {
      stats: { servers: 0, pending_updates: 0, last_update: "-", major_updates: 0 },
    };
  },
  mounted() {
    this.fetchStats();
  },
  methods: {
    async fetchStats() {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/dashboard");
        const data = await response.json();
        this.stats = data;
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      }
    },
  },
};
</script>


