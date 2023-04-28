import { Record } from 'immutable'

export type CollectionType = 'List' | 'OrderedMap' | 'OrderedSet' | 'Map' | 'Set' | 'Stack'

export interface SerializationOptions {
  pretty?: boolean
}

export interface SerializationStreamOptions {
  bigChunks?: boolean
  pretty?: boolean
}

export interface DeserializationOptions {
  recordTypes?: {
    [recordName: string]: ReturnType<typeof Record>
  }
  throwOnMissingRecordType?: boolean
}

export interface SerializedCollection {
  __collection: CollectionType
  data: unknown[] | Array<[string | number, unknown]>
}

export interface SerializedRecord {
  __record: string
  data: { [key: string]: unknown }
}
