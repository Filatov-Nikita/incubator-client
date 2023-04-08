import ky from 'ky';
import { API } from 'src/config/app';
import * as Tokens from 'src/core/tokens';

export const api = ky.create({
  prefixUrl: API,
  hooks: {
    beforeRequest: [
      (req) => {
        const token = Tokens.get();
        if(token) req.headers.append('token', token);
      }
    ],
    afterResponse: [
      (req, opts, res) => {
        if(res.status === 401) {
          Tokens.clean();
          const cb = (api as any).onAuthFailed;
          cb && cb();
        }
      }
    ]
  }
});
