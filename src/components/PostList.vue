<template>
  <div class="post-list">
    <div class="post"
         v-for="post in posts"
         :key="post.id"
    >

      <div v-if="userById(post.userId)" class="user-info">
        <a href="#" class="user-name">{{userById(post.userId).name}}</a>

        <a href="#">
          <AppAvatarImg class="avatar-large" :src="userById(post.userId).avatar" />
        </a>

        <p class="desktop-only text-small">{{userById(post.userId).postsCount > 1 ? `${userById(post.userId).postsCount} respostas` : `${userById(post.userId).postsCount} resposta`}}</p>
        <p class="desktop-only text-small">{{userById(post.userId).threadsCount > 1 ? `${userById(post.userId).threadsCount} tópicos` : `${userById(post.userId).threadsCount} tópico`}}</p>

      </div>

      <div class="post-content">
        <div class="col-full">
          <PostEditor
            v-if="editing === post.id" :post="post"
            @save="handleUpdate"
          />
          <p v-else>
            {{post.text}}
          </p>
        </div>
        <a
          v-if="post.userId === $store.state.auth.authId"
          @click.prevent="toggleEditMode(post.id)"
          href="#"
          style="margin-left: auto; padding-left:10px;"
          class="link-unstyled"
          v-tippy="{content: `Editar`}"
        >
          <fa-icon icon="pencil-alt" />
        </a>
      </div>

      <div class="post-date text-faded">
        <div v-if="post.edited?.at" class="edition-info">Editado</div>
        <AppDate :timestamp="post.publishedAt" />
      </div>

    </div>

  </div>
</template>

<script>
import PostEditor from '@/components/PostEditor'
import { mapActions } from 'vuex'
export default {
  components: { PostEditor },
  props: {
    posts: {
      required: true,
      type: Array
    }
  },
  data () {
    return {
      editing: null
    }
  },
  computed: {
    users () {
      return this.$store.state.users.items
    }
  },
  methods: {
    ...mapActions('posts', ['updatePost']),
    userById (userId) {
      return this.$store.getters['users/user'](userId)
    },
    toggleEditMode (id) {
      this.editing = id === this.editing ? null : id
    },
    handleUpdate (event) {
      this.updatePost(event.post)
      this.editing = null
    }
  }
}
</script>

<style scoped>

</style>
