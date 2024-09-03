<script>
import { mapState, mapActions } from 'pinia'
import usePlayerStore from '@/stores/player'

export default {
  name: 'Player',
  computed: {
    ...mapState(usePlayerStore, [
      'currentSong',
      'sound',
      'seek',
      'duration',
      'playIconClass',
      'progressBar'
    ])
  },
  methods: {
    ...mapActions(usePlayerStore, ['updateProgress', 'toggleSong'])
  }
}
</script>

<template>
  <transition
    appear
    name="test"
    enter-active-class="animate__animated animate__slideInUp"
    leave-active-class="animate__animated animate__slideOutDown"
  >
    <div
      class="fixed bottom-0 left-0 bg-white px-4 py-2 w-full border-t dark:bg-gray-700 dark:text-white"
      v-show="currentSong.modified_name"
    >
      <!-- Track Info -->
      <div class="text-center">
        <span class="song-title font-bold">{{ currentSong.modified_name }}</span> by
        <span class="song-artist">{{ currentSong.display_name }}</span>
      </div>
      <div class="flex flex-nowrap gap-4 items-center">
        <!-- Play/Pause Button -->
        <button type="button" @click.prevent="toggleSong">
          <i class="fa text-gray-500 dark:text-white text-xl" :class="playIconClass"></i>
        </button>
        <!-- Current Position -->
        <div class="player-currenttime">{{ seek }}</div>
        <!-- Scrub Container  -->
        <div
          class="w-full h-2 rounded bg-gray-200 relative cursor-pointer"
          @click.stop="updateProgress"
        >
          <!-- Player Ball -->
          <span
            class="absolute -top-2.5 -ml-2.5 text-gray-800 dark:text-white text-lg"
            :style="{ left: progressBar }"
          >
            <i class="fas fa-circle"></i>
          </span>
          <!-- Player Progress Bar-->
          <span
            class="block h-2 rounded bg-gradient-to-r from-green-500 to-green-400"
            :style="{ width: progressBar }"
          ></span>
        </div>
        <!-- Duration -->
        <div class="player-duration">{{ duration }}</div>
      </div>
    </div>
  </transition>
</template>
