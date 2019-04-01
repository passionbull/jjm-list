import sc2 from 'sc2-sdk';
// import Config from '../../config';

const api = sc2.Initialize({
  app: 'wp-steem-share',
  callbackURL: 'http://localhost:3000/voting',
	accessToken: 'access_token',
	scope: ['vote', 'comment', 'custom_json', ]
});

export default api;
