import { Inject } from '@nestjs/common'
import { registerAs } from '@nestjs/config'

export const InjectObjectStorageConfig = () => Inject(objectStorageConfig.KEY)

export const objectStorageConfig = registerAs('object-storage', () => ({
  provider: process.env.UNDB_OBJECT_STORAGE_PROVIDER! as 'local',
  local: {
    path: process.env.UNDB_OBJECT_STORAGE_LOCAL_PATH!,
  },
}))
