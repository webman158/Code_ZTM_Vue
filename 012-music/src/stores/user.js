import { auth, userCollection } from '@/plugins/firebase'
import { defineStore } from 'pinia'

const useUserStore = defineStore('user', {
  state: () => ({
    userLoggedIn: false
  }),
  actions: {
    login() {
      this.userLoggedIn = true
    },
    async logout() {
      await auth.signOut()

      this.userLoggedIn = false
    },
    async register(values) {
      // 注册用户
      const userCred = await auth.createUserWithEmailAndPassword(values.email, values.password)

      // 将用户数据存储到firestore中
      await userCollection.doc(userCred.user.uid).set({
        name: values.name,
        email: values.email,
        age: values.age,
        country: values.country
      })

      // 更新用户信息
      await userCred.user.updateProfile({
        displayName: values.name
      })

      this.login()
    },
    async authentice(values) {
      await auth.signInWithEmailAndPassword(values.email, values.password)
      this.login()
    }
  }
})

export default useUserStore
