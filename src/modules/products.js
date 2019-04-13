import * as fb from "firebase";

class Product {
  constructor(
    title,
    vendor,
    color,
    material,
    price,
    description,
    ownerId,
    imageSrc = "",
    promo = false,
    id = null
  ) {
    this.title = title;
    this.vendor = vendor;
    this.color = color;
    this.material = material;
    this.price = price;
    this.description = description;
    this.ownerId = ownerId;
    this.promo = promo;
    this.imageSrc = imageSrc;
    this.id = id;
  }
}

export default {
  state: {
    products: []
  },
  mutations: {
    PRODUCT_CREATE: (state, payload) => state.products.push(payload),
    PRODUCTS_LOAD: (state, payload) => (state.products = payload),
    PRODUCT_UPDATE: (state, { title, description, id }) => {
      const product = state.products.find(a => {
        return a.id === id;
      });
      product.title = title;
      product.description = description;
    }
  },

  actions: {
    PRODUCT_CREATE: async ({ commit, getters }, payload) => {
      commit("ERROR_CLEAR");
      commit("LOADING_SET", true);
      const image = payload.image;
      try {
        const newProduct = new Product(
          payload.title,
          payload.vendor,
          payload.color,
          payload.material,
          payload.price,
          payload.description,
          getters.USER.id, // id текущего юзера (ownerId) , id созданного продукта мы получим от firebase
          "", // вместо payload.imageSrc передаём пустую строку
          payload.promo
        );
        const product = await fb
          .database()
          .ref("products")
          .push(newProduct);
        const imageExt = image.name.slice(image.name.lastIndexOf(".")); // находим расширение картинки (после точки в имени)
        const fileData = await fb
          .storage()
          .ref(`products/${product.key}.${imageExt}`)
          .put(image); // картинку сохраняем по ключу key c соответствующим расширением
        const imageSrc = await fb
          .storage()
          .ref()
          .child(fileData.ref.fullPath)
          .getDownloadURL(); // находим путь к картинке (URL)
        await fb
          .database()
          .ref("products")
          .child(product.key)
          .update({ imageSrc }); // передаём путь к файлу в базу данных и делаем обновление
        commit("LOADING_SET", false);
        commit("PRODUCT_CREATE", {
          ...newProduct,
          id: product.key, // key - это id созданного в firebase нового товара
          imageSrc
        });
      } catch (error) {
        commit("ERROR_SET", error.message);
        commit("LOADING_SET", false);
        throw error;
      }
    },

    PRODUCTS_FETCH: async ({ commit }) => {
      commit("ERROR_CLEAR");
      commit("LOADING_SET", true);
      const resultProducts = [];
      try {
        const productsVal = await fb
          .database()
          .ref("products")
          .once("value"); // получаем данные из firebase
        const products = productsVal.val(); // получаем зачения данных
        Object.keys(products).forEach(key => {
          // метод Object.keys() возвращает массив из собственных перечисляемых свойств переданного объекта
          const product = products[key]; // key - это id конкретного продукта
          resultProducts.push(
            new Product(
              product.title,
              product.vendor,
              product.color,
              product.material,
              product.price,
              product.description,
              product.ownerId, // id текущего юзера
              product.imageSrc,
              product.promo,
              key // id конкретного продукта (он же ключ)
            )
          );
          commit("PRODUCTS_LOAD", resultProducts);
          commit("LOADING_SET", false);
        });
      } catch (error) {
        commit("ERROR_SET", error.message);
        commit("LOADING_SET", false);
        throw error;
      }
    },

    PRODUCT_UPDATE: async ({ commit }, { title, description, id }) => {
      commit("ERROR_CLEAR");
      commit("LOADING_SET", true);
      try {
        await fb
          .database()
          .ref("products")
          .child(id)
          .update({ title, description });
        commit("PRODUCT_UPDATE", { title, description, id });
        commit("LOADING_SET", false);
      } catch (error) {
        commit("ERROR_SET", error.message);
        commit("LOADING_SET", false);
        throw error;
      }
    }
  },

  getters: {
    PRODUCTS: state => state.products,
    PRODUCT_BYID: state => product_id =>
      state.products.find(product => product.id === product_id)
  }
};
