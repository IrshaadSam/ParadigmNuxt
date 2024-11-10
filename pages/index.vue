<!-- pages/index.vue -->
<template>
  <v-container class="fill-height d-flex justify-center align-center">
    <v-card class="elevation-3 text-center" max-width="600">
      <v-card-title class="headline primary--text">
        <v-icon large color="primary" class="mr-2">mdi-finance</v-icon>
        Welcome to the Financial Dashboard
      </v-card-title>
      <v-card-subtitle class="mb-4">
        Your one-stop solution for monitoring and analyzing client trades and commissions.
      </v-card-subtitle>
      <v-card-text class="text-body-1 grey--text">
        Explore detailed insights into financial transactions, performance metrics, and data visualizations designed to keep you informed and in control.
      </v-card-text>
      <v-card-actions class="justify-center mt-4">
        <v-btn color="primary" dark large @click="navigateToDashboard">
          <v-icon left>mdi-chart-line</v-icon>
          Go to Dashboard
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  methods: {
    navigateToDashboard() {
      this.$router.push('/MyDashboard');
    }
  }
};
</script>

<style scoped>
/* Custom styles for the index page */
.fill-height {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.primary--text {
  color: #1976d2 !important;
}
</style>
