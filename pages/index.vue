<template>
  <v-container>
    <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        v-if="!$fetchState.pending"
        :headers="headers"
        :items="games.storeContent"
        :search="search"
        :items-per-page="5"
        class="elevation-1"
        @click:row="selectGameBtn"
      ></v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import path from 'path'
import QrcodeVue from 'qrcode.vue'
const fs = require('fs')

export default {
  components: {
    QrcodeVue,
  },
  // asyncData() {
  //   return new Promise((resolve) => {
  //     // eslint-disable-next-line nuxt/no-timing-in-fetch-data
  //     setTimeout(function () {
  //       resolve({})
  //     }, 500)
  //   })
  // },
  data() {
    return {
      search: '',
      games: null,
      headers: [
        {
          text: 'Title',
          align: 'start',
          value: 'info.title',
        },
        { text: 'Description', value: 'info.description' },
        { text: 'Version', value: 'info.version' },
        { text: 'Author', value: 'info.author' },
        { text: 'Size', value: 'info.size' },
        { text: 'Category', value: 'info.category' },
        { text: 'Console', value: 'info.console' },
      ],
    }
  },
  fetch() {
    const gamesURL = fs.readFileSync(
      `${path.join(process.env.APPDATA, 'gedesktop')}/games/ghosteshop.eshop`
    )
    const gamesResponse = JSON.parse(gamesURL)
    this.games = gamesResponse
  },
  methods: {
    selectGameBtn(item) {
      this.$store.commit('setSelectGame', item)
      this.$router.push('/game')
    },
  },
}
</script>

<style scopped>
.qrcode canvas {
  border: 15px solid #ffffff;
}
</style>
