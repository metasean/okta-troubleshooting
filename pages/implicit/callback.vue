<template>
  <div>
    Callback page
  </div>
</template>

<script>

import Auth from '@okta/okta-vue'

let auth

export default {
  name: 'Callback',
  async created() {
    console.log('CALLBACK - created')
    auth = await Auth.handleCallback()
    console.log('auth:', auth)
  },
  beforeMount() {
    console.log('CALLBACK - beforeMount')
  }
}
</script>

<style lang="scss" scoped>

</style>
