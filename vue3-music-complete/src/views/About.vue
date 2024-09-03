<!-- <script setup>
const title = 'introduction'
const intro = `Build a Music Player application  using Vue, Pinia, Vue Router, Composition API, Firebase, Vitest, more.`

const info = {
  technology_stack: [
    {
      title: 'es6',
      desc: 'es6_desc'
    },
    {
      title: 'vue3',
      desc: 'vue3_desc'
    },
    {
      title: 'testing',
      desc: 'testing_desc'
    },
    {
      title: 'pwa',
      desc: 'pwa_desc'
    },
    {
      title: 'inter',
      desc: 'inter_desc'
    },
    {
      title: 'tailwind',
      desc: 'tailwind_desc'
    }
  ],
  feature: [
    {
      title: 'upload',
      desc: 'upload_desc'
    },
    {
      title: 'music',
      desc: 'music_desc'
    },
    {
      title: 'dark',
      desc: 'dark_desc'
    },
    {
      title: 'auth',
      desc: 'auth_desc'
    },
    {
      title: 'transition',
      desc: 'transition_desc'
    },
    {
      title: 'validation',
      desc: 'validation_desc'
    },
    {
      title: 'deploy',
      desc: 'deploy_desc'
    }
  ],
  detail: [
    {
      title: 'efficiency',
      desc: 'efficiency_desc'
    },
    {
      title: 'local',
      desc: 'local_desc'
    },
    {
      title: 'loading',
      desc: 'loading_desc'
    },
    {
      title: 'firebase',
      desc: 'firebase_desc'
    }
  ]
}
</script>

<template>
  <main>
    <section class="py-6 text-white text-center relative dark:text-white">
      <div class="container mx-auto">
        <div class="text-white main-header-content">
          <h1 class="font-bold text-4xl mb-5 text-black dark:text-white">
            {{ $t('about.title') }}
          </h1>
          <p class="w-full md:w-8/12 mx-auto text-black dark:text-white">
            {{ $t('about.intro') }}
          </p>
        </div>
      </div>

      <div class="container mx-auto px-4 mb-10 mt-10" v-for="(value, key) in info" :key="key">
        <h1 class="font-bold text-3xl text-black my-5 dark:text-white">
          {{ $t('about.' + key) }}
        </h1>

        <ol
          class="bg-white dark:bg-gray-600 dark:text-white rounded border overflow-hidden border-gray-200 relative flex flex-col"
        >
          <li
            v-for="(item, index) in value"
            :key="item.title"
            class="flex items-center p-3 pl-6 border-b cursor-pointer transition duration-300 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <i class="fas fa-solid text-black dark:text-white" :class="`fa-${index + 1}`"></i>

            <div class="flex flex-col items-start ml-4">
              <span
                class="font-bold text-gray-600 text-lg dark:text-white dark:hover:text-yellow-400"
              >
                {{ $t('about.' + item.title) }}
              </span>

              <span class="text-left text-gray-500 dark:text-white text-base">{{
                $t('about.' + item.desc)
              }}</span>
            </div>
          </li>
        </ol>
      </div>
    </section>
  </main>
</template> -->

<template>
  <div>About</div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
