<template>
  <VeeForm @submit="save">
    <AppFormField label="Título" name="title" v-model="form.title" rules="required" />
    <AppFormField as="textarea" label="Conteúdo" name="text" v-model="form.text" rules="required" rows="8" cols="140" />

    <div class="btn-group">
      <button @click.prevent="$emit('cancel')" class="btn btn-ghost">Cancelar</button>
      <button class="btn btn-blue" type="submit" name="Publicar">
        {{existing ? 'Atualizar' : 'Publicar'}}
      </button>
    </div>
  </VeeForm>
</template>

<script>
export default {
  props: {
    title: { type: String, default: '' },
    text: { type: String, default: '' }
  },
  data () {
    return {
      form: {
        title: this.title,
        text: this.text
      }
    }
  },
  computed: {
    existing () {
      return !!this.title
    }
  },
  methods: {
    save () {
      this.$emit('clean')
      this.$emit('save', { ...this.form })
    }
  },
  watch: {
    form: {
      handler () {
        if (this.form.title !== this.title || this.form.text !== this.text) {
          this.$emit('dirty')
        } else {
          this.$emit('clean')
        }
      },
      deep: true
    }
  }
}
</script>
