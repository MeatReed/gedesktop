<template>
  <v-navigation-drawer
    v-if="$vuetify.breakpoint.mobile"
    v-model="drawerMobile"
    app
  >
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title"> Ghost Eshop </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      listLang: null,
      lang: [
        {
          name: 'French',
          lang: 'fr',
        },
        {
          name: 'English',
          lang: 'en',
        },
      ],
    }
  },
  computed: {
    drawerMobile: {
      get() {
        return this.$store.getters.getDrawerMobile
      },
      set(value) {
        return this.$store.commit('setDrawerMobile', value)
      },
    },
  },
}
</script>

<style scopped>
.v-btn {
  margin-left: 10px;
}

.noActive::before {
  opacity: 0 !important;
}
</style>
