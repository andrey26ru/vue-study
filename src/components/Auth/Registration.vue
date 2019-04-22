<template lang="pug">
.registration
  form.registration__form(@submit.prevent='onSubmit')
    .registration__header  
      h3 Регистрация
    .registration__field
      input.registration__input(type='email', placeholder='Email', v-model.trim.lazy='email', @input='$v.email.$touch()', :class='{ form__error: $v.email.$error }')
      div(v-if='$v.email.$dirty')
        p.registration__error-message(v-if='!$v.email.email') Введите корректный адрес электронной почты
    .registration__field
      input.registration__input(type='password', name='password', placeholder='Пароль', v-model.trim='password', @input='$v.password.$touch()', :class='{ form__error: $v.password.$error }')
    p.registration__error-message(v-if='!$v.password.minLength') Пароль должен содержать не менее 6 знаков
    .registration__field
      input.registration__input(type='password', name='password', placeholder='Повторите пароль', v-model.trim.='repeatPassword', @input='$v.password.$touch()', :class='{ form__error: $v.password.$error }')
    p.registration__error-message(v-if='!$v.repeatPassword.sameAsPassword') Пароли должны совпадать
    button.registration__button(type='submit') Отправить
</template>

<script>
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      email: "",
      password: "",
      repeatPassword: ""
    };
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(6)
    },
    repeatPassword: {
      required,
      minLength: minLength(6),
      sameAsPassword: sameAs("password")
    }
  },
  methods: {
    onSubmit() {
      const user = {
        email: this.email,
        password: this.password
      };
      this.$store
        .dispatch("USER_REGISTER", user)
        .then(() => this.$router.push("/"))
        .catch(() => {});
    }
  }
};
</script>

<style lang="scss" scoped>
.registration {
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
    text-align: center;
  }
}
</style>
