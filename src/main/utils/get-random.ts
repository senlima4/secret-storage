import randomString from 'crypto-random-string'
import crypto from 'crypto'

export const generateSecretWord = (): string => {
  let cursor = 0
  let result = ''
  while (cursor < 8) {
    result = result.concat(
      `${randomString(crypto.randomInt(3, 6))}${cursor < 7 ? '-' : ''}`
    )
    cursor += 1
  }
  return result
}
