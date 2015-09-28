import {Variable} from './variable'
import {CompactUri} from './prefix'

export type Value = Variable|string|CompactUri

export function v(vsc: Value) {
  if ((<CompactUri>vsc).curi) {
    let curi = <CompactUri>vsc
    return `${curi.curi}`
  } else if ((<Variable>vsc).name) {
    return `?${(<Variable>vsc).name}`
  } else {
    return `<${vsc}>`
  }
}
