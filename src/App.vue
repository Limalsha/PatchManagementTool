<template>
  <div>
    <router-view></router-view> <!-- This will display the current route -->
  </div>
</template>

<script>
import SystemDashboard from './components/SystemDashboard.vue';

export default {
  name: 'App',
  components: {
    SystemDashboard
  }
};
</script>
