import { environment } from './../../../../environments/environment';

export const TIMEOUT = 30000;

export class RequestEndpoints {
  static WALLETS = environment.API_URL + '/wallets';
  static AUTHENTICATE = environment.API_URL + '/authenticate-user';
  static REGISTER_ADMIN = environment.API_URL + '/users/admin';
  static REGISTER_USER = environment.API_URL + '/users/user';
  static LOGOUT_USER = environment.API_URL + '/users/logout';
  static CITIZEN_USER = environment.API_URL + '/user';
  static ADMIN_USER = environment.API_URL + '/admin-user';

  static POLL = environment.API_URL + '/poll';
  static POLLS = environment.API_URL + '/polls';
  static TOTAL_POLLS = environment.API_URL + '/total-polls';
  static POLL_RESULTS = environment.API_URL + '/poll/results';
  static POLL_ANSWER = environment.API_URL + '/poll/answer';

  static SOCIAL = environment.API_URL + '/social';
  static SOCIALS = environment.API_URL + '/socials';
  static TOTAL_SOCIAL = environment.API_URL + '/total-socials';
  static SOCIAL_CHECK = environment.API_URL + '/social/check';
  static SOCIAL_RECIEVE = environment.API_URL + '/social/recieve';

  static UPLOAD_IPFS = environment.API_URL + '/upload-ipfs';
  static CONTRACT = environment.API_URL + '/contract';
}
