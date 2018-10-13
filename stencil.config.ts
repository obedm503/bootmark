import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'bootmark',
  outputTargets:[
    {
      type: 'dist'
    },
    {
      type: 'www',
      serviceWorker: null
    }
  ]
};
