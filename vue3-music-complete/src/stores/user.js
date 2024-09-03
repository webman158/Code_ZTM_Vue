import { auth, userCollection } from '@/utils/firebase'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const useUserStore = defineStore('user', () => {
  const userLoggedIn = ref(false)

  const login = () => {
    userLoggedIn.value = true
  }

  const logout = async () => {
    await auth.signOut()

    userLoggedIn.value = false
  }
  const register = async (values) => {
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

    login()
  }
  const authentice = async (values) => {
    await auth.signInWithEmailAndPassword(values.email, values.password)
    login()
  }

  return {
    userLoggedIn,
    logout,
    login,
    authentice,
    register
  }
})

export default useUserStore
