import { defineStore } from 'pinia';
import * as AuthAPI from 'src/api/auth';
import type {  Credential } from 'src/types/auth';
import * as Tokens from 'src/core/tokens';

export const useAuthStore = defineStore('useAuthStore', {
  state: ()=> ({}),
  getters: {},
  actions: {
    async login(cred: Credential) {
      const data = await AuthAPI.login(cred);
      Tokens.set(data);
    },
    async logout() {
      Tokens.clean();
    }
  }
});
