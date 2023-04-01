import { api } from 'src/api/index';
import type { Credential, TokenData } from 'src/types/auth';

export function login(cred: Credential) {
  return api.post('login', { json: cred }).json<TokenData>();
}
