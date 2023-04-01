<template>
  <q-layout view="lHh LpR fFf" class="tw-bg-gray-100">

    <q-header class="bg-secondary">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggle" />
        <q-toolbar-title>CRM</q-toolbar-title>
        <q-btn class="tw-ml-auto" dense flat round icon="home" :to="{ name: 'home' }" />
      </q-toolbar>
    </q-header>

    <q-drawer class="tw-bg-gray-200" :mini="mini" :width="250" :model-value="true" behavior="desktop" side="left" bordered>
      <q-list padding>
        <q-item
          clickable
          v-ripple
          v-for="item in menu"
          :key="item.label"
          :to="item.to"
        >
          <q-item-section avatar>
            <q-icon :name="item.icon" />
          </q-item-section>

          <q-item-section>{{ item.label }}</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const mini = ref(true);

  const menu = [
    {
      icon: 'shopping_cart',
      label: 'Товары',
      to: { name: 'crm.products' }
    },
    {
      icon: 'sell',
      label: 'Теги',
      to: { name: 'crm.tags' }
    },
    {
      icon: 'category',
      label: 'Категории',
      to: { name: 'crm.categories' }
    },
    {
      icon: 'description',
      label: 'Отчеты',
      to: { name: 'crm.reports' }
    },
  ]

  function toggle() {
    mini.value = !mini.value
  }
</script>
