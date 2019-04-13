import store from "./store";

export default function(to, from, next) {
  if (store.getters.USER) {
    // если пользователь зарегистрирован
    next();
  } else {
    next("/login?loginError=true");
  }
}

// файл защиты от перехода незалогиненного пользователя по роутам приложения
// регистрируется в router.js
