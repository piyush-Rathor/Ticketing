import { COMMON_CONSTANTS } from '@piyushr.webdev/common'
import { ENV } from '../types/env'
import { EnvVariablesValidationDto } from '../utils/config'

// Please also add valid and invalid for each and every env variables
export const envConfig = {
  PORT: { valid: '3000', invalid: '', message: 'must be a valid PORT' },
  ENV: { valid: ENV.STAGE, invalid: '', message: 'must be a valid ENV' },
  MONGO_URI: { valid: 'mongodb://localhost:27017/db', invalid: 'url', message: 'must be a valid MONGO_URI' },
  JWT_KEY: { valid: 'a_valid_jwt_key', invalid: '123', message: 'must be a valid JWT_KEY' },
}
type EnvConfigKeys = keyof typeof envConfig

// Please also add valid and invalid for each and every env variables
const constantsAsTypeEnvConfig: Record<EnvConfigKeys, string> = {
  PORT: process.env.PORT as string,
  ENV: process.env.ENV as string,
  MONGO_URI: process.env.MONGO_URI as string,
  JWT_KEY: COMMON_CONSTANTS.JWT_KEY as string,
}

export default constantsAsTypeEnvConfig as EnvVariablesValidationDto
