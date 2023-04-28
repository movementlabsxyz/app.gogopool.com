/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Record, isCollection } from 'immutable'

import { decodeData } from './decoders'
import { isSupportedNativeType, patchNativeTypeMethods } from './native-types'
import { serializeData } from './serializers'

import { DeserializationOptions, SerializationOptions } from '@/types/immutable'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function deserialize(json: string, options: DeserializationOptions = {}) {
  return JSON.parse(json, (key, value) => {
    return decodeData(key, value, options)
  })
}

export function serialize(data: any, options: SerializationOptions = {}): string | never {
  if (isCollection(data) || Record.isRecord(data) || isSupportedNativeType(data)) {
    const patchedData = Object.create(data)

    if (isSupportedNativeType(data)) {
      // NOTE: When native type (such as Date or RegExp) methods are called
      //   on an `Object.create()`'d objects, invalid usage errors are thrown
      //   in many cases. We need to patch the used methods to work
      //   on originals.
      patchNativeTypeMethods(patchedData, data)
    }

    // NOTE: JSON.stringify() calls the #toJSON() method of the root object.
    //   Immutable.JS provides its own #toJSON() implementation which does not
    //   preserve map key types.
    patchedData.toJSON = function () {
      return this
    }

    data = patchedData
  }

  const indentation = options.pretty ? 2 : 0

  return JSON.stringify(data, serializeData, indentation)
}
