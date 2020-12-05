<template>
  <v-container>
    <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          :label="Search"
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
    <v-dialog v-if="selectGame" v-model="dialogGame" width="800">
      <v-card outlined>
        <v-card-title>
          {{ selectGame.info.title }}
        </v-card-title>

        <v-card-text>
          Description:
          {{
            selectGame.info.description
              ? selectGame.info.description
              : 'Non spécifié'
          }}
          <br />
          Version:
          {{
            selectGame.info.version ? selectGame.info.version : 'Non spécifié'
          }}
          <br />
          Author:
          {{ selectGame.info.author ? selectGame.info.author : 'Non spécifié'
          }}<br />
          Size:
          {{ selectGame.info.size ? selectGame.info.size : 'Non spécifié' }}
          <br />
          Category:
          {{
            selectGame.info.category ? selectGame.info.category : 'Non spécifié'
          }}
          <br />
          Console:
          {{
            selectGame.info.console ? selectGame.info.console : 'Non spécifié'
          }}
          <br />
        </v-card-text>

        <v-tabs
          v-if="downloadLinks[0]"
          v-model="tabGame"
          next-icon="mdi-arrow-right-bold-box-outline"
          prev-icon="mdi-arrow-left-bold-box-outline"
          show-arrows
        >
          <v-tab
            v-for="downloadLinkItem in downloadLinks"
            :key="downloadLinkItem.name"
          >
            {{ downloadLinkItem.name }}
          </v-tab>
        </v-tabs>

        <v-card flat>
          <qrcode-vue
            v-if="QRCodeURL"
            class="qrcode text-center"
            :value="QRCodeURL"
            :size="200"
          />
        </v-card>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialogGame = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
  fetch() {
    const gamesURL = fs.readFileSync(
      `${path.join(process.env.APPDATA, 'gedesktop')}/games/ghosteshop.eshop`
    )
    const gamesResponse = JSON.parse(gamesURL)
    this.games = gamesResponse
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
      selectGame: null,
      dialogGame: false,
      downloadLinks: [],
      tabGame: null,
      QRCodeURL: null,
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
  watch: {
    tabGame(index, item) {
      if (this.downloadLinks[index]) {
        this.QRCodeURL = this.downloadLinks[index].downloadLink
      } else {
        this.QRCodeURL = this.downloadLinks[0].downloadLink
      }
    },
  },
  methods: {
    selectGameBtn(item) {
      this.downloadLinks = []
      for (const i in item) {
        if (i !== 'info') {
          this.downloadLinks.push({
            name: i,
            downloadLink: item[i][0].file,
          })
        }
      }
      this.selectGame = item
      this.dialogGame = true
    },
  },
}
</script>

<style scopped>
.qrcode canvas {
  border: 15px solid #ffffff;
}
</style>
