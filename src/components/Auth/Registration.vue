<template lang="pug">
.wrap
  my-form(@submit.prevent='onSubmit' header='Регистрация')
    .form__field
      input.form__input(type='email', placeholder='Email', v-model.trim.lazy='email', @input='$v.email.$touch()', :class='{ form__error: $v.email.$error }')
      div(v-if='$v.email.$dirty')
        p.form__error-message(v-if='!$v.email.email') Введите корректный адрес электронной почты
    .form__field
      input.form__input(type='password', name='password', placeholder='Пароль', v-model.trim='password', @input='$v.password.$touch()', :class='{ form__error: $v.password.$error }')
    p.form__error-message(v-if='!$v.password.minLength') Пароль должен содержать не менее 6 знаков

    .form__field
      input.form__input(type='password', name='password', placeholder='Повторите пароль', v-model.trim.='repeatPassword', @input='$v.password.$touch()', :class='{ form__error: $v.password.$error }')
    p.form__error-message(v-if='!$v.repeatPassword.sameAsPassword') Пароли должны совпадать
    button.form__button(type='submit') Отправить
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
.wrap {
  display: flex;
}
</style>
