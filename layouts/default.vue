<template>
  <v-app>
    <Header />
    <HeaderMobile />
    <DrawerMobile />
    <v-main>
      <!-- <v-img class="imgCover" src="/banner.png" height="695">
        <v-container fluid class="fill-height align-end">
          <v-row>
            <v-col class="text-center">
              <h1 color="white" class="button font-weight-black white--text">
                STAY ALIVE!
              </h1>
            </v-col>
          </v-row>
        </v-container>
      </v-img> -->
      <nuxt />
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
export default {
  data() {
    return {}
  },
}
</script>

<style scoped>
.imgCover {
  margin-top: 40px;
}

/* .v-main {
  padding: 0px 0px 0px !important;
} */
</style>
