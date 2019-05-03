# The Problem
When logging in with this configuration and the standard `@okta/okta-vue` module, the user is taken to the Okta log-in page 👍, then redirected back to `http://localhost:8081/implicit/callback` for a split second before being taken to `http://localhost:8081/implicit/[object%20MouseEvent]` 😳⁉️

The section below is how I've been able to get it working, but 🤢🤮 🙅‍♂️.  

I don't know if I'm consuming `@okta/okta-vue` incorrectly, or if there's a genuine problem with the provided `implicitCallback.vue` (if that's the case, I'm confident that the solution below is is **_not_** the optimal solution).

## VERY HACKY ¿ FIX ⸮ 

After running the standard `npm install`, **_replace_** `node_modules/@okta/okta-vue/src/components/implicitCallback.vue`
with,

```javascript
<script>
export default {
  name: 'ImplicitCallback',
  async beforeMount () {
    await this.$auth.handleAuthentication()
    // const path = await this.$auth.getFromUri()
    // DOES NO GOOD
    // console.log('path:', path)

    // THIS IN CONJUNCTION WITH THE SAME CALL INSIDE
    // this.$router.replace
    // IS THE ONLY THING THAT SEEMS TO MAKE IT WORK
    this.$auth.getFromUri()                    // FIRST CALL
    
    this.$router.replace({
      path: this.$auth.getFromUri()           // SECOND CALL
    })
  },
  render () {}
}
</script>
```