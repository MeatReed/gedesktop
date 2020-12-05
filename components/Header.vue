<template>
  <v-app-bar v-if="!$vuetify.breakpoint.mobile" app color="white">
    <v-toolbar-title class="font-weight-black">Ghost Eshop</v-toolbar-title>
    <v-spacer></v-spacer>
    <!-- <v-menu left bottom>
      <template #activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on">
          <v-icon>mdi-earth</v-icon>
        </v-btn>
      </template>

      <v-list v-model="listLang">
        <v-list-item
          v-for="item in lang"
          :key="item.lang"
          :to="switchLocalePath(item.lang)"
        >
          <v-list-item-title>{{ item.name }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu> -->
  </v-app-bar>
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
