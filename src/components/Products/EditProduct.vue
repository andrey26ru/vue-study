<template lang="pug">
v-dialog(width='400px', v-model='dialog')
  v-btn(round, color='secondary', slot='activator', large) Edit
  v-card
    v-container
      v-layout(row)
        v-flex(xs12)
          v-card-title
            h1.text--primary Edit Product
      v-divider
      v-layout(row)
        v-flex(xs12)
          v-card-text
            v-text-field(name='title', label='Title', type='text', v-model='editedTitle')
            v-text-field(name='description', label='Description', type='text', multi-line='', v-model='editedDescription')
      v-divider
      v-layout(row)
        v-flex(xs12)
          v-card-actions
            v-spacer
            v-btn(dark, color='secondary', outline, @click='onCancel') Выйти
            v-btn(dark, color='secondary', @click='onSave') Сохранить
</template>

<script>
export default {
  props: ["product"],
  data() {
    return {
      dialog: false,
      editedTitle: this.product.title,
      editedDescription: this.product.description
    };
  },
  methods: {
    onCancel() {
      this.editedTitle = this.product.title;
      this.editedDescription = this.product.description;
      this.dialog = false;
    },
    onSave() {
      if (this.editedTitle !== "" && this.editedDescription !== "") {
        this.$store.dispatch("PRODUCT_UPDATE", {
          title: this.editedTitle,
          description: this.editedDescription,
          id: this.product.id
        });
        this.dialog = false;
      }
    }
  }
};
</script>
