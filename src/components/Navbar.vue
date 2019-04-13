<template>
  <div>
    <v-navigation-drawer app temporary v-model="drawer">
      <v-list>
        <v-list-tile v-for="(link, i) in links" :key="i" :to="link.url">
          <v-list-tile-action>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="link.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile @click="onLogout" v-if="isUserLoggedIn">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="'Logout'"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar app dark color="primary" class="nav">
      <v-toolbar-side-icon @click="drawer = !drawer" class="hidden-md-and-up">
      </v-toolbar-side-icon>
      <v-toolbar-title class="pl-5">
        <router-link to="/" tag="span" class="pointer headline"
          >Мексика тут</router-link
        >
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat v-for="(link, i) in links" :key="i" :to="link.url">
          <v-icon left>{{ link.icon }}</v-icon>
          {{ link.title }}
        </v-btn>
        <v-btn flat @click="onLogout" v-if="isUserLoggedIn">
          <v-icon left>exit_to_app</v-icon>
          Logout
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: false
    };
  },
  methods: {
    onLogout() {
      this.$store.dispatch("USER_LOGOUT");
      this.$router.push("/");
    }
  },
  computed: {
    isUserLoggedIn() {
      return this.$store.getters.USER_ISLOGGEDIN; // чтобы при перегрузке страницы не терялось логирование
    },
    links() {
      if (this.isUserLoggedIn) {
        return [
          { title: "Заказы", icon: "shopping_cart", url: "/orders" },
          { title: "Добавить продукт", icon: "add", url: "/new" },
          { title: "О нас", icon: "accessibility_new", url: "/about" }
        ];
      }
      return [
        { title: "Вход", icon: "account_box", url: "/login" }, // если посетитель не залогинен
        { title: "Регистрация", icon: "face", url: "/registration" }
      ];
    }
  }
};
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
.nav {
  z-index: 10;
}
</style>
