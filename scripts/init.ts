import dotenv from 'dotenv'
import { appendFileSync, writeFileSync } from 'fs'
import { inspect } from 'util'

const user = (process.env.USER || process.env.USERNAME || '').toLowerCase()
const isDev = process.argv.includes('--dev')
const path = user ? `env/.env.${user}` : `env/.env.${process.env.ENV}`

const result = dotenv.config({ path })

if (result.error) {
  console.log(result.error)
  throw Error('Failure while loading the environment variables')
}

console.log(result.parsed)

const env = process.env.ENV ?? 'development'

const configInterface = `{
  api_base_url: string;
  environment: string;
}`

writeFileSync(
  'src/config.ts',
  `
/*
******* NOTICE **********
This is an auto generated file. Please DO NOT modify !!
if you want to add any new config, please have a look at aws-init.ts
*************************
*/

export interface Config ${configInterface}
`
)

function run() {
  const config = {
    api_base_url: isDev ? `http://localhost:3000` : process.env.API_BASE_URL,
    environment: env
  }

  appendFileSync('src/config.ts', `\n export const config: Config = ${inspect(config)};\n`)
}

console.info(`Generating Config for ${env || user}\n`)
run()
