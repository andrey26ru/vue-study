<template lang="pug">
v-container
  v-layout(row)
    v-flex(xs12, sm6, offset-sm3)
      h1.text--secondary.mb-3 Добавить продукт
      v-form.mb-3(ref='form', v-model='valid', lazy-validation)
        v-text-field(name='title', label='Название', type='text', required='', :rules="[v => !!v || 'Название обязательно']", v-model='title')
        v-text-field(name='price', label='Цена', type='text', required='', :rules="[v => !!v || 'Цена обязательна']", v-model='price')
        v-textarea(name='description', label='Описание', type='text', v-model='description')
      v-layout.mb-4(row)
        v-flex(xs12)
          v-btn.warning(@click='upload') Картинка
            v-icon(right, dark) cloud_upload
          input(ref='fileInput', type='file', style='display: none;', accept='image/*', @change='onFileChange')
      v-layout(row)
        v-flex(xs12)
          img(:src='imageSrc', height='200px', v-if='imageSrc')
      v-layout(row)
        v-flex(xs12)
          v-spacer
          v-btn.success(@click='createProduct', :disabled='!valid || !image || loading', :loading='loading') Создать
</template>

<script>
export default {
  data() {
    return {
      title: "",
      vendor: "",
      color: "",
      material: "",
      price: 0,
      description: "",
      promo: false,
      valid: false,
      image: null,
      imageSrc: ""
    };
  },
  computed: {
    loading() {
      return this.$store.getters.LOADING;
    }
  },
  methods: {
    createProduct() {
      if (this.$refs.form.validate() && this.image) {
        const product = {
          title: this.title,
          vendor: this.vendor,
          color: this.color,
          material: this.material,
          price: this.price,
          description: this.description,
          promo: this.promo,
          image: this.image
        };
        this.$store
          .dispatch("PRODUCT_CREATE", product)
          .then(() => {
            this.$router.push("/");
          })
          .catch(() => {});
      }
    },
    upload() {
      this.$refs.fileInput.click();
    },
    onFileChange(event) {
      const file = event.target.files[0]; // получаем картинку
      const reader = new FileReader();
      // eslint-disable-next-line
      reader.onload = e => this.imageSrc = reader.result      
      reader.readAsDataURL(file);
      this.image = file;
    }
  }
};
</script>
