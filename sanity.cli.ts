/**
* This configuration file lets you run `$ sanity [command]` in this folder
* Go to https://www.sanity.io/docs/cli to learn more.
**/
import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({ 
  api: { 
    projectId: '3s1726oo', 
    dataset: 'production' 
  },
  deployment: {
    appId: 'n9jdjplb2s2t9zjljjqilkxq',
  },
})
