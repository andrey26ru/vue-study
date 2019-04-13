<template>
  <div class="modal">
    <div class="modal__wrapper">
      <div class="modal__inner">
        <div class="modal__header">
          <h3 class="modal__title">Хотите купить {{ product.title }} ?</h3>
        </div>
        <div>
          <form @submit.prevent="onSave">
            <div class="modal__field">
              <input
                type="text"
                placeholder="Ваше имя"
                required
                v-model="name"
                class="modal__input"
              />
            </div>
            <div class="modal__field">
              <input
                type="text"
                placeholder="Ваш телефон"
                v-model="phone"
                class="modal__input"
              />
            </div>
            <button type="submit" class="modal__button-buy">Да</button>
            <a
              title="Закрыть"
              class="modal__button-close"
              @click="$emit('close')"
              >x</a
            >
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["product"],
  data() {
    return {
      name: "",
      phone: ""
    };
  },
  methods: {
    onSave() {
      if (this.name !== "" && this.phone !== "") {
        this.$store
          .dispatch("ORDER_CREATE", {
            name: this.name,
            phone: this.phone,
            productId: this.product.id,
            ownerId: this.product.ownerId
          })
          .finally(() => {
            this.name = "Заказ принят";
            this.phone = "Приятного Вам аппетита";
          });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.modal {
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9999;
  transition: all 0.5s ease;
  margin: 0;
  padding: 0;

  &:target {
    opacity: 1;
    pointer-events: auto;
    overflow-y: auto;
  }

  &__wrapper {
    margin: auto;
    margin-top: 25vh;
    width: 600px;
  }

  &__header {
    padding: 15px;
    background: #5587b6;
  }

  &__inner {
    background: rgb(255, 255, 255);
  }

  &__title {
    font-size: 2.5rem;
    font-weight: bold;
    text-align: center;
    color: #fff;
  }

  &__text {
    padding: 15px 20px;
  }

  &__field {
    margin: 30px 15px;
  }

  &__input {
    font-size: 1.5rem;
    text-align: center;
    outline: none;
    display: block;
    width: 100%;
    border-radius: 2px;
    border: 1px solid #ccc;
    padding: 10px;
    box-sizing: border-box;
  }

  &__button-close {
    font-size: 2rem;
    color: #fff;
    background: rgb(218, 68, 42);
    padding: 8px 23px;
    border-radius: 20px;
    text-decoration: none;
    margin: 20px;
  }

  &__button-close:hover {
    background: rgb(240, 82, 55);
  }

  &__button-buy {
    font-size: 1.6rem;
    width: 50%;
    border-radius: 10px;
    padding: 10px;
    margin: 0 10% 25px 12%;
    color: #fff;
    background: rgb(96, 50, 202);
  }

  &__button-buy:focus {
    outline: none;
  }

  &__button-buy:hover {
    background: rgb(108, 56, 230);
  }

  @media screen and (max-width: 960px) {
    &__wrapper {
      width: 480px;
    }
    &__title {
      font-size: 1.8rem;
    }
  }

  @media screen and (max-width: 600px) {
    &__wrapper {
      width: 350px;
    }
    &__button-buy {
      margin: 0 6% 25px 12%;
    }
  }
}
</style>
