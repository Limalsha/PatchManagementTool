import { createRouter, createWebHistory } from "vue-router";
import SystemDashboard from "@/components/SystemDashboard.vue";
import ServerManagement from "@/components/ServerManagement.vue";
import PatchScanning from "../components/PatchScanning.vue";

const routes = [
  { path: "/", component: SystemDashboard }, // Default Page
  { path: "/servers", component: ServerManagement },
  { path: "/patch-scanning", component: PatchScanning }, 

];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
