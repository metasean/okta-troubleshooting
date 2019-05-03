<template>
  <div id="login-notice">
    <div v-if="isLoggedIn">
      <h1>When the page loaded, you were signed in</h1>
      <p>Hi, {{ user.given_name }} (aka {{ user.preferred_username }})</p>
      <p>You've successfully accessed {{ appIssuer }}</p>
      <p>{{ user.preferred_username }}</p>
      <p>
        You can now access the
        <router-link to="/protected">
          protected
        </router-link>section.
      </p>

      <p>
        You should also be able to access
        <router-link to="/another">
          other
        </router-link>sections until you are signed in.
      </p>
    </div>
    <div v-else>
      <h1>When the page loaded, you were not signed in</h1>
      <p>
        You cannot access the
        <router-link to="/protected">
          protected
        </router-link>section until you are signed in.
      </p>

      <p>
        You should also not be able to access
        <router-link to="/another">
          other
        </router-link>sections until you are signed in.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dash',
  data() {
    return {
      user: '',
      isLoggedIn: false,
      appIssuer: ''
    }
  },
  created() {
    this.refreshData()
  },
  update() {
    this.refreshData()
  },
  methods: {
    async refreshData() {
      this.isLoggedIn = await this.$auth.isAuthenticated()
      this.user = await this.$auth.getUser()
      this.appIssuer = process.env.VUE_APP_ISSUER
    }
  }
}
</script>

<style>
#login-notice {
  padding: 1em;
}
p {
  line-height: 2.5em;
}
</style>
