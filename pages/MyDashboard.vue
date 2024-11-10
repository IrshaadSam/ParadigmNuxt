<template>
  <v-container>
    <v-row class="mb-4">
      <v-col cols="12" class="text-center">
        <h2 class="primary--text">Client Trades Dashboard</h2>
        <p class="subtitle-1 grey--text">
          Filter and view client trades data with customized options.
        </p>
      </v-col>
    </v-row>

    <!-- Filters Section -->
    <v-card class="pa-4 mb-4 elevation-2">
      <v-row>
        <!-- Start Date Picker -->
        <v-col cols="12" sm="6" md="4">
          <v-menu
            v-model="menuStart"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="startDate"
                label="Start Date"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
                outlined
                clearable
              />
            </template>
            <v-date-picker v-model="startDate" no-title @input="menuStart = false" />
          </v-menu>
        </v-col>

        <!-- End Date Picker -->
        <v-col cols="12" sm="6" md="4">
          <v-menu
            v-model="menuEnd"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="endDate"
                label="End Date"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
                outlined
                clearable
              />
            </template>
            <v-date-picker v-model="endDate" no-title @input="menuEnd = false" />
          </v-menu>
        </v-col>

        <!-- Min and Max Price Filters -->
        <v-col cols="12" sm="6" md="4">
          <v-text-field
            v-model.number="minPrice"
            label="Min Price"
            type="number"
            prepend-icon="mdi-currency-usd"
            outlined
            clearable
          />
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-text-field
            v-model.number="maxPrice"
            label="Max Price"
            type="number"
            prepend-icon="mdi-currency-usd"
            outlined
            clearable
          />
        </v-col>

        <!-- Min Commission Filter -->
        <v-col cols="12" sm="6" md="4">
          <v-slider
            v-model="minCommission"
            label="Minimum Commission"
            min="0"
            max="1000"
            step="10"
            ticks
            tick-size="4"
            thumb-label
            outlined
          />
        </v-col>

        <!-- Reset Filters Button -->
        <v-col cols="12" class="text-center">
          <v-btn color="primary" @click="resetFilters" outlined>
            Reset Filters
          </v-btn>
        </v-col>
      </v-row>
    </v-card>

    <!-- Data Table for Displaying Trades -->
    <v-card class="elevation-2">
      <v-data-table
        :headers="tableHeaders"
        :items="filteredTrades"
        item-value="id"
        class="elevation-1"
        :items-per-page="5"
        show-select
      >
        <template v-slot:top>
          <v-toolbar flat color="primary" dark>
            <v-toolbar-title>Trades Data</v-toolbar-title>
          </v-toolbar>
        </template>

        <template v-slot:item.date="{ item }">
          <span>{{ new Date(item.date).toLocaleDateString() }}</span>
        </template>

        <template v-slot:no-data>
          <v-alert type="info" color="blue lighten-4" text>
            No trade data available. Please adjust filters or try again later.
          </v-alert>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      trades: [], // Initialize as empty array
      minCommission: 0,
      minPrice: null,
      maxPrice: null,
      startDate: null,
      endDate: null,
      menuStart: false,
      menuEnd: false,
      tableHeaders: [
        { text: 'Trade ID', value: 'id' },
        { text: 'Client ID', value: 'client' },
        { text: 'Side', value: 'side' },
        { text: 'Ticker', value: 'ticker' },
        { text: 'Quantity', value: 'quantity' },
        { text: 'Price', value: 'price' },
        { text: 'Commission', value: 'commission' },
        { text: 'Date', value: 'date' }
      ]
    };
  },
  computed: {
    filteredTrades() {
      // Check if trades is an array before filtering
      if (!Array.isArray(this.trades)) {
        return []; // Return an empty array if trades is not an array
      }

      return this.trades.filter((trade) => {
        const matchesDateRange =
          (!this.startDate || new Date(trade.date) >= new Date(this.startDate)) &&
          (!this.endDate || new Date(trade.date) <= new Date(this.endDate));
        const matchesPrice =
          (!this.minPrice || trade.price >= this.minPrice) &&
          (!this.maxPrice || trade.price <= this.maxPrice);
        const matchesCommission = trade.commission >= this.minCommission;

        return matchesDateRange && matchesPrice && matchesCommission;
      });
    }
  },
  async mounted() {
    await this.getTrades();
  },
  methods: {
    async getTrades() {
      try {
        const response = await this.$axios.$get('/trades');
        console.log('API Response:', response);
        this.trades = response.items || []; // Safely handle the response
      } catch (error) {
        console.error('Error fetching trades:', error);
        this.trades = []; // Ensure trades is an empty array on error
      }
    },
    resetFilters() {
      this.startDate = null;
      this.endDate = null;
      this.minPrice = null;
      this.maxPrice = null;
      this.minCommission = 0;
    }
  }
};
</script>

<style scoped>
.primary--text {
  color: #1976d2 !important;
}

.mb-4 {
  margin-bottom: 1.5rem !important;
}
</style>
