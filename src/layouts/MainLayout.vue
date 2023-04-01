<template>
  <q-layout view="lhr lpR fFf" class="tw-bg-gray-100">
    <q-header>
      <q-toolbar>
        <q-toolbar-title>Инкубатор v2</q-toolbar-title>
        <q-btn round flat icon="settings" :to="{ name: 'crm.products' }" />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
</script>
