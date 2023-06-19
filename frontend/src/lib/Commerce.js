import Commerce from '@chec/commerce.js';

const checAPIKey = process.env.REACT_APP_CHEC_PUBLIC_KEY;
const devEnvironment = process.env.NODE_ENV === 'live';

const commerceConfig = {
  axiosConfig: {
    headers: {
      'X-Chec-Agent': 'commerce.js/v2',
      'Chec-Version': '2022-07-21',
    },
  },
};

if (devEnvironment && !checAPIKey) {
  throw Error('Your public API key must be provided as an environment variable named NEXT_PUBLIC_CHEC_PUBLIC_KEY. Obtain your Chec public key by logging into your Chec account and navigate to Setup > Developer, or can be obtained with the Chec CLI via with the command chec whoami');
}

const commerce = new Commerce('pk_52711fa8c1357f4ec58a2f48ab2f33b6ae75eb3391920', true, commerceConfig);
export default commerce