import * as fb from "firebase";

class User {
  constructor(id) {
    this.id = id;
  }
}

export default {
  state: {
    user: null
  },

  mutations: {
    USER_SET: (state, payload) => (state.user = payload)
  },

  actions: {
    USER_REGISTER: async ({ commit }, { email, password }) => {
      commit("ERROR_CLEAR");
      commit("LOADING_SET", true);
      try {
        const user = await fb
          .auth()
          .createUserWithEmailAndPassword(email, password);
        commit("USER_SET", new User(user.uid)); // uid - id пришедший с firebase
        commit("LOADING_SET", false);
      } catch (error) {
        commit("LOADING_SET", false);
        // commit("ERROR_SET", error.message);
        throw error;
      }
    },

    USER_LOGIN: async ({ commit }, { email, password }) => {
      commit("ERROR_CLEAR");
      commit("LOADING_SET", true);
      return fb
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => {
          commit("USER_SET", new User(user.uid));
          return user;
        })
        .catch(err => {
          console.log("CATCH", err);
          return err;
        })
        .finally(() => {
          commit("LOADING_SET", false);
        });
    },

    USER_LOGOUT: ({ commit }) => {
      fb.auth().signOut(); // после разлогинивания
      commit("USER_SET", null); // запускаем мутацию и устанавливаем значение юзера, равное нулю
    },

    USER_AUTOLOGIN: ({ commit }, payload) =>
      commit("USER_SET", new User(payload.uid))
  },

  getters: {
    USER: state => state.user,
    USER_ISLOGGEDIN: state => state.user !== null // чтобы при перегрузке страницы не терялось логирование (см. Navbar)
  }
};
