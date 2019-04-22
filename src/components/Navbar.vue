<template lang="pug">
  div
    v-navigation-drawer(app, temporary, v-model='drawer')
      v-list
        v-list-tile(v-for='(link, i) in links', :key='i', :to='link.url')
          v-list-tile-action
            v-icon {{ link.icon }}
          v-list-tile-content
            v-list-tile-title(v-text='link.title')
        v-list-tile(@click='onLogout', v-if='isUserLoggedIn')
          v-list-tile-action
            v-icon exit_to_app
          v-list-tile-content
            v-list-tile-title(v-text="'Logout'")
    v-toolbar.nav(app, dark, color='primary')
      v-toolbar-side-icon.hidden-md-and-up(@click='drawer = !drawer')
      v-toolbar-title.pl-5
        router-link.pointer.headline(to='/', tag='span') Мексика тут
      v-spacer
      v-toolbar-items.hidden-sm-and-down
        v-btn(flat, v-for='(link, i) in links', :key='i', :to='link.url')
          v-icon(left) {{ link.icon }}
          |           {{ link.title }}
        v-btn(flat, @click='onLogout', v-if='isUserLoggedIn')
          v-icon(left) exit_to_app
          |           Logout
    v-content
      router-view
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
