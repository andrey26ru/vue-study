<template lang="pug">
.login
  form.login__form(@submit.prevent='onSubmit')
    .login__header Войти на сайт
    .login__field
      input.login__input(type='email', name='email', placeholder='Email', v-model.trim='email', @input='$v.email.$touch()', :class='{ form__error: $v.email.$error }')
      div(v-if='$v.email.$dirty')
        p.login__error-message(v-if='!$v.email.email') Введите правильный адрес электронной почты
    .login__field
      input.login__input(type='password', name='password', placeholder='Пароль', v-model.trim='password', @input='$v.password.$touch()', :class='{ form__error: $v.password.$error }')
      div(v-if='$v.password.$dirty')
        p.login__error-message(v-if='!$v.password.minLength') Паспорт должен состоять не менее чем из 6 знаков
    button.login__button(type='submit') Отправить
</template>

<script>
import { required, email, minLength } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    onSubmit() {
      const user = {
        email: this.email,
        password: this.password
      };
      this.$store
        .dispatch("USER_LOGIN", user)
        .then(() => this.$router.push("/"))
        .catch(() => {});
    }
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(6)
    }
  },
  created() {
    if (this.$route.query["loginError"]) {
      this.$store.dispatch("ERROR_SET", "Please log in to access this page");
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  display: flex;

  &__form {
    display: inline-block;
    border: 1px solid rgb(182, 184, 190);
    border-radius: 5px;
    width: 500px;
    margin: 80px auto;
  }

  &__header {
    color: #fff;
    text-align: center;
    background-color: rgb(120, 120, 238);
    padding: 20px;
    font-size: 1.3rem;
  }

  &__field {
    margin: 30px 15px;
  }

  &__input {
    outline: none;
    display: block;
    width: 100%;
    border-radius: 2px;
    border: 1px solid #ccc;
    padding: 10px;
    box-sizing: border-box;
  }

  &__button {
    width: 50%;
    padding: 10px;
    border-radius: 2px;
    border: 0;
    background-color: rgb(120, 120, 238);
    color: #fff;
    margin: 0 25% 25px 25%;
  }

  &__error {
    border: 1px solid rgb(235, 91, 91);
  }

  &__error-message {
    color: rgb(235, 91, 91);
  }
}
</style>
