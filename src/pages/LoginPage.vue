<template>
  <q-page class="tw-flex tw-items-center tw-px-4">
    <q-card class="tw-w-full tw-p-4">
      <q-form @submit="login">
        <h1 class="tw-text-2xl tw-font-bold tw-mb-2">Вход</h1>
        <div class="tw-space-y-2">
          <q-input required v-model="form.email" label="Email" />
          <q-input required v-model="form.password" type="password" label="Пароль" />
        </div>
        <q-btn class="tw-mt-6" color="primary" type="submit" :loading="loading">
          Войти
        </q-btn>
      </q-form>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
  import { Notify } from 'quasar';
  import { useAuthStore } from 'src/stores/auth';
  import { reactive, ref } from 'vue';
  import { useRouter } from 'vue-router';

  const router = useRouter();
  const authStore = useAuthStore();
  const loading = ref(false);

  const form = reactive({
    email: '',
    password: ''
  });

  async function login() {
    try {
      loading.value = true;
      await authStore.login(form);
      router.push({ name: 'home' });
    } catch(e) {
      Notify.create({ type: 'negative', message: 'Неправильный логин или пароль' });
    } finally {
      loading.value = false;
    }
  }
</script>
