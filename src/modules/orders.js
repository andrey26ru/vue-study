import * as fb from "firebase";

class Order {
  constructor(name, phone, productId, done = false, id = null) {
    this.name = name;
    this.phone = phone;
    this.productId = productId;
    this.done = done;
    this.id = id;
  }
}

export default {
  state: {
    orders: []
  },
  mutations: {
    ORDERS_LOAD: (state, payload) => (state.orders = payload)
  },
  actions: {
    ORDER_CREATE: async ({ commit }, { name, phone, productId, ownerId }) => {
      const order = new Order(name, phone, productId);
      commit("ERROR_CLEAR");
      try {
        await fb
          .database()
          .ref(`/users/${ownerId}/orders`)
          .push(order);
      } catch (error) {
        commit("ERROR_SET", error.message);
        throw error;
      }
    },
    ORDERS_FETCH: async ({ commit, getters }) => {
      commit("ERROR_CLEAR");
      commit("LOADING_SET", true);
      const resultOrders = [];
      try {
        const fbVal = await fb
          .database()
          .ref(`/users/${getters.USER.id}/orders`)
          .once("value");
        const orders = fbVal.val();
        Object.keys(orders).forEach(key => {
          const order = orders[key];
          resultOrders.push(
            new Order(order.name, order.phone, order.productId, order.done, key)
          );
        });
        commit("ORDERS_LOAD", resultOrders);
        commit("LOADING_SET", false);
      } catch (error) {
        commit("ERROR_SET", error.message);
        commit("LOADING_SET", false);
      }
    },

    ORDER_MARKDONE: async ({ commit, getters }, payload) => {
      commit("ERROR_CLEAR");
      try {
        await fb
          .database()
          .ref(`/users/${getters.USER.id}/orders`)
          .child(payload)
          .update({ done: true });
      } catch (error) {
        commit("ERROR_SET", error.message);
        throw error;
      }
    }
  },

  getters: {
    ORDERS_DONE: state => state.orders.filter(order => order.done),
    ORDERS_UNDONE: state => state.orders.filter(order => !order.done),
    ORDERS: (state, getters) => {
      return getters.ORDERS_UNDONE.concat(getters.ORDERS_DONE);
    }
  }
};
