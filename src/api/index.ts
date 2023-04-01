import ky from 'ky';
import { API } from 'src/config/app';

export const api = ky.create({ prefixUrl: API });
