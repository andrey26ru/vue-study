<template lang="pug" functional>
  form.form
    .form__header
      h3 {{header}}
    slot
</template>

<script>
export default {
  props: ["header"]
};
</script>

<style lang="scss" scoped>
.form {
  display: inline-block;
  border: 1px solid rgb(182, 184, 190);
  border-radius: 5px;
  width: 500px;
  margin: 80px auto;
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
