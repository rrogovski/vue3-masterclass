<template>
  <div v-if="asyncDataStatus_ready" class="col-full push-top">
    <h1>
      Editar <i>{{ thread.title }}</i>
    </h1>

    <ThreadEditor
      :title="thread.title"
      :text="text"
      @save="save"
      @cancel="cancel"
      @dirty="formIsDirty = true" @clean="formIsDirty = false"
    />
  </div>
</template>
<script>
import ThreadEditor from '@/components/ThreadEditor'
import { findById } from '@/helpers'
import { mapActions } from 'vuex'
import asyncDataStatus from '@/mixins/asyncDataStatus'
export default {
  components: { ThreadEditor },
  mixins: [asyncDataStatus],
  props: {
    id: { type: String, required: true }
  },
  data () {
    return {
      formIsDirty: false
    }
  },
  computed: {
    thread () {
      return findById(this.$store.state.threads.items, this.id)
    },
    text () {
      const post = findById(this.$store.state.posts.items, this.thread.posts[0])
      return post ? post.text : ''
    }
  },
  methods: {
    ...mapActions('threads', ['fetchThread', 'updateThread']),
    ...mapActions('posts', ['fetchPost']),
    async save ({ title, text }) {
      const thread = await this.updateThread({
        id: this.id,
        title,
        text
      })
      this.$router.push({ name: 'ThreadShow', params: { id: thread.id } })
    },
    cancel () {
      this.$router.push({ name: 'ThreadShow', params: { id: this.id } })
    }
  },
  async created () {
    const thread = await this.fetchThread({ id: this.id })
    await this.fetchPost({ id: thread.posts[0] })
    this.asyncDataStatus_fetched()
  },
  beforeRouteLeave () {
    if (this.formIsDirty) {
      const confirmed = window.confirm('Tem certeza que deseja sair? As alterações que não foram salvas serão perdidas!')
      if (!confirmed) return false
    }
  }
}
</script>
