import Store from 'electron-store'

const AccountStore = new Store({
  name: 'entry',
  schema: {
    password: {
      type: 'string',
    },
    secureWord: {
      type: 'string',
    },
    mode: {
      type: 'string',
      enum: ['default', 'reset', 'init'],
      default: 'init',
    },
  },
})

export default AccountStore
