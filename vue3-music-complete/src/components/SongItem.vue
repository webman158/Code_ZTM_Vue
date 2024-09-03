<script setup>
defineProps({
  song: {
    require: true
  }
})
</script>

<template>
  <li
    class="flex justify-between items-center p-3 pl-6 cursor-pointer transition duration-300 hover:bg-gray-50 dark:hover:bg-gray-800"
  >
    <div>
      <router-link
        :to="{ name: 'song', params: { id: song.docId } }"
        class="font-bold block text-gray-600 dark:text-white dark:hover:text-yellow-400"
      >
        {{ song.modified_name }}
      </router-link>
      <span class="text-gray-500 dark:text-white text-sm">{{ song.display_name }}</span>
    </div>

    <div class="text-gray-600 text-lg">
      <router-link
        custom
        v-slot="{ navigate }"
        :to="{ name: 'song', params: { id: song.docId }, hash: '#comments' }"
      >
        <span class="comments dark:text-white" @click="navigate">
          <i class="fa fa-comments text-gray-600 dark:text-white"></i>
          {{ song.comment_count }}
        </span>
      </router-link>
    </div>
  </li>
</template>

<style scoped></style>
