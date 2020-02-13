<template>
  <v-app>
    <v-content>
      <p class="count">### {{ count }} ###</p>
      <v-switch
        v-model="active"
        :label="`Active: ${active.toString()}`"
      ></v-switch>
      <v-slider
        v-model="speed"
        min="1"
        max="20"
        :label="`Speed: ${speed}`"
      ></v-slider>
    </v-content>
  </v-app>
</template>

<script>
import sleep from './lib/sleep'
import trampoline from './lib/trampoline'

export default {
  name: 'App',

  data: () => ({
    count: 0,
    active: true,
    speed: 10,
  }),

  watch: {
    active(newState, oldState) {
      if (!oldState && newState) { this.main() }
    },
  },

  methods: {
    main() {
      const tramped = trampoline(this.loop)
      tramped()
    },

    async loop() {
      await sleep(1000 / this.speed)

      this.count = this.count + 1

      return this.active ? this.loop : null
    },
  },

  mounted() {
    this.main()
  },
};
</script>

<style scoped>
.count {
  font-family: monospace;
  font-size: 24px;
  font-weight: 700;
}
</style>
