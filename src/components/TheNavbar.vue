<template>
  <header class="header" id="header"
    v-click-outside="()=> mobileNavMenu=false"
    v-page-scroll="()=> mobileNavMenu = false"
  >

    <router-link :to="{name: 'Home'}" class="logo" v-if="!['Home'].includes($route.name)">
      <img src="../assets/svg/unematica.svg" alt="logo escrito unemática">
    </router-link>

    <a href="/" class="logo" v-else>
      <img src="../assets/svg/unematica.svg" alt="logo escrito unemática">
    </a>

    <div class="btn-hamburger" @click="mobileNavMenu = !mobileNavMenu">
      <!-- use .btn-humburger-active to open the menu -->
      <div class="top bar"></div>
      <div class="middle bar"></div>
      <div class="bottom bar"></div>
    </div>

    <!-- use .navbar-open to open nav -->
    <nav class="navbar" :class="{'navbar-open': mobileNavMenu}">
      <ul>
        <li v-if="authUser" class="navbar-user">
          <a
            @click.prevent="userDropdownOpen = !userDropdownOpen"
            v-click-outside="()=> userDropdownOpen = false"
          >
            <AppAvatarImg class="avatar-small" :src="authUser.avatar" :alt="`${authUser.name} imagem de perfil`"/>
            <span>
                {{authUser.name}}
                <img class="icon-profile" src="../assets/svg/arrow-profile.svg" alt=""/>
            </span>
          </a>

          <!-- dropdown menu -->
          <!-- add class "active-drop" to show the dropdown -->
          <div id="user-dropdown" :class="{'active-drop': userDropdownOpen}">
            <div class="triangle-drop"></div>
            <ul class="dropdown-menu">
              <li class="dropdown-menu-item"><router-link :to="{name: 'Profile'}">Ver perfil</router-link></li>
              <li class="dropdown-menu-item"><a
                @click.prevent="$store.dispatch('auth/signOut'),
                $router.push({name: 'Home'})">
                Sair
              </a></li>
            </ul>
          </div>
        </li>
        <li v-if="!authUser" class="navbar-item"><router-link :to="{name: 'SignIn'}">Entrar</router-link></li>
        <li v-if="!authUser" class="navbar-item"><router-link :to="{name: 'Register'}">Criar Conta</router-link></li>
        <li v-if="authUser" class="navbar-mobile-item"><router-link :to="{name: 'Profile'}">Ver Perfil</router-link></li>
        <li v-if="authUser" class="navbar-mobile-item"><a
          @click.prevent="$store.dispatch('auth/signOut'),
          $router.push({name: 'Home'})">
        Sair</a></li>
      </ul>

<!--      <ul>-->
<!--        <li class="navbar-item">-->
<!--          <a href="index.html">Home</a>-->
<!--        </li>-->
<!--        <li class="navbar-item">-->
<!--          <a href="category.html">Category</a>-->
<!--        </li>-->
<!--        <li class="navbar-item">-->
<!--          <a href="forum.html">Forum</a>-->
<!--        </li>-->
<!--        <li class="navbar-item">-->
<!--          <a href="thread.html">Thread</a>-->
<!--        </li>-->
<!--        &lt;!&ndash; Show these option only on mobile&ndash;&gt;-->
<!--        <li class="navbar-item mobile-only">-->
<!--          <a href="profile.html">My Profile</a>-->
<!--        </li>-->
<!--        <li class="navbar-item mobile-only">-->
<!--          <a href="#">Logout</a>-->
<!--        </li>-->
<!--      </ul>-->
    </nav>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      userDropdownOpen: false,
      mobileNavMenu: false
    }
  },
  computed: {
    ...mapGetters('auth', ['authUser'])
  },
  created () {
    this.$router.beforeEach((to, from) => {
      this.mobileNavMenu = false
    })
  },
  async beforeRouteUpdate(to, from) {
    console.log('created')
    // react to route changes...
    // this.userData = await fetchUser(to.params.id)
  }
}
</script>

<style lang="scss" scoped>
  .header {
    z-index: 100;
    position: fixed;
    width: 100%;
  }
</style>
