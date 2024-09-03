<script>
import AppHeader from './components/Header.vue'
import Auth from './components/Auth.vue'
import { mapActions } from 'pinia'
import useUserStore from './stores/user'
import { auth } from './plugins/firebase'
import Player from './components/Player.vue'

export default {
  components: {
    AppHeader,
    Auth,
    Player
  },
  methods: {
    ...mapActions(useUserStore, ['login'])
  },
  created() {
    if (auth.currentUser) {
      this.login()
    }
  }
}
</script>

<template>
  <!-- Header -->
  <AppHeader></AppHeader>

  <!-- Main Content -->
  <router-view v-slot="{ Component }">
    <!-- 过渡包裹的组件必须有根组件 -->
    <transition name="fade" mode="out-in">
      <component :is="Component"></component>
    </transition>
  </router-view>

  <!-- Player -->
  <Player></Player>

  <!-- Auth Modal -->
  <Auth></Auth>
</template>

<style scoped>
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active {
  transition: all 0.3s linear;
}

.fade-leave-active {
  transition: all 0s linear;
}
</style>
