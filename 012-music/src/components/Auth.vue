<script>
import useModalStore from '@/stores/modal'
import Login from './Login.vue'
import Register from './Register.vue'

export default {
  data() {
    return {
      modalStore: null,
      height: 344
    }
  },
  components: { Login, Register },
  created() {
    this.modalStore = useModalStore()
  },
  methods: {
    clickTabFn(tab) {
      this.modalStore.toggleTab(tab)

      if (tab === 'register') {
        this.height = 706
      } else {
        this.height = 344
      }
    }
  }
}
</script>

<template>
  <!-- overflow-y-auto -->
  <div class="fixed z-50 inset-0 overflow-hidden" id="modal" :class="modalStore.toggleClass">
    <div
      class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 bg-gray-900/75 dark:bg-gray-500/16 h-screen overflow-y-auto"
    >
      <!-- <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-900 opacity-70 dark:bg-gray-600 dark:opacity-60"></div>
      </div> -->

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

      <!-- :style="{ height: height + 'px' }" -->
      <div
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all duration-500 ease-in-out sm:my-8 sm:align-middle sm:max-w-lg sm:w-full dark:bg-zinc-900 dark:text-white"
      >
        <!-- Add margin if you want to see some of the overlay behind the modal-->
        <div class="py-4 text-left px-6">
          <!--Title-->
          <div class="flex justify-between items-center pb-4">
            <p class="text-2xl font-bold">{{ $t('login_register.account') }}</p>
            <!-- Modal Close Button -->
            <div class="modal-close cursor-pointer z-50" @click="modalStore.toggle()">
              <i class="fas fa-times"></i>
            </div>
          </div>

          <!-- Tabs -->
          <ul class="flex flex-wrap mb-4">
            <li class="flex-auto text-center">
              <a
                @click.prevent="clickTabFn('login')"
                class="block rounded py-3 px-4 transition"
                :class="{
                  'hover:text-white text-white bg-blue-600': modalStore.tab === 'login',
                  'hover:text-blue-600': modalStore.tab === 'register'
                }"
                href="#"
              >
                {{ $t('nav.login') }}
              </a>
            </li>
            <li class="flex-auto text-center">
              <a
                @click.prevent="clickTabFn('register')"
                class="block rounded py-3 px-4 transition"
                :class="{
                  'hover:text-white text-white bg-blue-600': modalStore.tab === 'register',
                  'hover:text-blue-600': modalStore.tab === 'login'
                }"
                href="#"
              >
                {{ $t('nav.register') }}
              </a>
            </li>
          </ul>

          <!-- Login Form -->
          <Login v-if="modalStore.tab === 'login'"></Login>

          <!-- Registration Form -->
          <Register v-else></Register>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
