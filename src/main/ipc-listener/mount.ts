import AccountListener from './account'
import ItemListener from './item'

export default function mountIpcListener() {
  AccountListener()
  ItemListener()
}
