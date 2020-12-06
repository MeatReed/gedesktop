<template>
  <v-container>
    <v-btn nuxt to="/">Back</v-btn>
    <v-row v-if="game">
      <v-col v-if="game.info.screenshots">
        <v-carousel>
          <v-carousel-item
            v-for="(item, i) in game.info.screenshots"
            :key="i"
            :src="item.url"
            reverse-transition="fade-transition"
            transition="fade-transition"
          ></v-carousel-item>
        </v-carousel>
      </v-col>
      <v-col>
        <v-card>
          <v-card-title>{{ game.info.title }}</v-card-title>
          <v-card-text>
          Description:
          {{
            game.info.description
              ? game.info.description
              : 'Unspecified'
          }}
          <br />
          Version:
          {{
            game.info.version ? game.info.version : 'Unspecified'
          }}
          <br />
          Author:
          {{ game.info.author ? game.info.author : 'Unspecified'
          }}<br />
          Size:
          {{ game.info.size ? game.info.size : 'Unspecified' }}
          <br />
          Category:
          {{
            game.info.category ? game.info.category : 'Unspecified'
          }}
          <br />
          Console:
          {{
            game.info.console ? game.info.console : 'Unspecified'
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
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import QrcodeVue from 'qrcode.vue'

export default {
  components: {
    QrcodeVue,
  },
  data() {
    return {
      dialogGame: false,
      downloadLinks: [],
      tabGame: null,
      QRCodeURL: null,
    }
  },
  computed: {
    game: {
      get() {
        for (const i in this.$store.getters.getSelectGame) {
          if (i !== 'info') {
            this.downloadLinks.push({
              name: i,
              downloadLink: this.$store.getters.getSelectGame[i][0].file,
            })
          }
        }
        return this.$store.getters.getSelectGame
      },
    },
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
}
</script>

<style scopped>
.qrcode canvas {
  border: 15px solid #ffffff;
}
</style>
