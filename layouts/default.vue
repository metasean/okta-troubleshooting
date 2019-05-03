<template>
  <div class="container">
    <header>
      <button v-if="authenticated" id="logout-button" @click="logout">
        Logout
      </button>
      <button v-else id="login-button" @click="$auth.loginRedirect">
        Login
      </button>
      <p>username: okta@sharklasers.com</p>
      <p>password: FishLasers42</p>
      <!-- <p>favorite book/movie character: Neo</p> -->
    </header>
    <div id="pages">
      <Nuxt />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      authenticated: false
    }
  },
  watch: {
    // Everytime the route changes, check for auth status
    $route: 'isAuthenticated'
  },
  created() {
    this.isAuthenticated()
  },
  methods: {
    async isAuthenticated() {
      this.authenticated = await this.$auth.isAuthenticated()
    },
    async logout() {
      await this.$auth.logout()
      await this.isAuthenticated()

      // Navigate back to home
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  color: #2E495E;
}

header {
  display: block;
  width: 100vw;
  margin: 2em auto;
  padding: 1em;
  background: darkslategrey;
  color: white;
  text-align: center;
}

header p {
  line-height: 1.5em;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.pages {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #00C48D;
  color: #00C48D;
  text-decoration: none;
  padding: 10px 30px;
  display: inline-flex;
  align-self: center;
}

.button--green:hover {
  color: #fff;
  background-color: #00C48D;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #2E495E;
  color: #2E495E;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #2E495E;
}
</style>
