import router from './router.js'

const app = new Vue({
  el: '#app',
  router,
  methods: {
    async logout() {
      const res = await fetch('/logout')
      if (res.ok) {
        localStorage.clear()
        this.$router.push('/')
      } else {
        console.log('could not logout the user')
      }
    },
  },
})

export default app




// const app = new Vue({
//     el: '#app',
//     router,
//     methods: {
//       async logout() {
//         const res = await fetch('/logout')
//         if (res.ok) {
//           localStorage.clear()
//           this.$router.push('/')
//         } else {
//           console.log('could not logout the user')
//         }
//       },
//     },
//   })
  