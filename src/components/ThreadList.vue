<template>
  <div class="col-full">
    <div class="thread-list">

      <h2 class="list-title">Tópicos</h2>

      <div v-if="threads.length">
        <div v-for="thread in threads" :key="thread.id" class="thread">
          <div>
            <p>
              <router-link :to="{name: 'ThreadShow', params: {id: thread.id}}">{{ thread.title }}</router-link>
            </p>
            <p class="text-faded text-xsmall">
              Por <a href="#">{{ userById(thread.userId).name }}</a>, <AppDate :timestamp="thread.publishedAt" />.
            </p>
          </div>

          <div class="activity">
            <p class="replies-count">
            {{ thread.repliesCount > 1 ? `${thread.repliesCount} respostas` : `${thread.repliesCount} resposta` }}
            </p>

            <AppAvatarImg class="avatar-medium" :src="userById(thread.userId).avatar" />

            <div>
              <p class="text-xsmall">
                <a href="#">{{ userById(thread.userId).name }}</a>
              </p>
              <p class="text-xsmall text-faded"><AppDate :timestamp="thread.publishedAt" /></p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="!threads.length" style="padding:10px; text-align: center;">
      <em>Nenhum Tópico Disponível</em>
    </div>
  </div>
</template>

<script>
import { findById } from '@/helpers'
export default {
  props: {
    threads: {
      type: Array,
      required: true
    }
  },
  computed: {
    posts () {
      return this.$store.state.posts.items
    },
    users () {
      return this.$store.state.users.items
    }
  },
  methods: {
    postById (postId) {
      return findById(this.posts, postId)
    },
    userById (userId) {
      return findById(this.users, userId) || {}
    }
  }
}
</script>

<style scoped>

</style>
