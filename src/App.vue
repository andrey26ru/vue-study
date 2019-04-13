<template>
  <v-app>
    <Navbar />

    <template v-if="error">
      <v-snackbar
        :multi-line="true"
        :timeout="5000"
        color="error"
        @input="closeError"
        :value="true"
      >
        {{ error }}
        <v-btn dark flat @click.native="errorClose">Close</v-btn>
      </v-snackbar>
    </template>
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar.vue";
export default {
  components: {
    Navbar
  },
  methods: {
    errorClose() {
      this.$store.dispatch("ERROR_CLEAR");
    }
  },
  computed: {
    error() {
      return this.$store.getters.ERROR;
    }
  }
};
</script>

<style scoped>
body {
  text-align: center;
  padding: 10px;
}
</style>
