<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          موارد
        </q-item-label>

        <drawer-items
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DrawerItems,{DrawerItemsInterface} from 'components/DrawerItems.vue';

defineOptions({
  name: 'MainLayout'
});

const linksList: DrawerItemsInterface[] = [
  {
    title: 'کاربران',
    icon: 'user',
    link: 'https://quasar.dev'
  },
  {
    title: 'دسته بندی ها',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'آگهی ها',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'مقالات',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
