<script setup>
import { onMounted } from 'vue'
import AppHeader from './components/Header.vue'
import Auth from './components/Auth.vue'
import Player from './components/Player.vue'
import { auth } from './utils/firebase'
import useUserStore from './stores/user'

onMounted(() => {
  const { login } = useUserStore()

  if (auth.currentUser) {
    login()
  }
})
</script>

<template>
  <AppHeader></AppHeader>

  <!-- Main Content -->
  <router-view v-slot="{ Component }">
    <!-- 过渡包裹的组件必须有根组件 -->
    <transition name="fade" mode="out-in">
      <component :is="Component"></component>
    </transition>
  </router-view>

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
