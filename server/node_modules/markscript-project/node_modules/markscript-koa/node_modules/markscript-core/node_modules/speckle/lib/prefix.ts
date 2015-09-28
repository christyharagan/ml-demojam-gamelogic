import {Value} from './value'

export interface CompactUri {
  prefix: Prefix
  curi: string
}

export interface Prefix {
  name: string,
  prefix: string,
  uri(suffix:string): CompactUri
}

export function prefix(name: string, prefix: string): Prefix {
  let self = {
    name: name,
    prefix: prefix,
    uri: function(suffix: string) {
      return {
        prefix: self,
        curi: `${name}:${suffix}`
      }
    }
  }
  return self
}

export interface Prefixes {
  [name:string]:Prefix
}

export class PrefixBuilder {
  prefixes:Prefixes = {}

  addValue(value: Value): PrefixBuilder {
    if ((<CompactUri>value).curi) {
      let prefix = (<CompactUri>value).prefix
      this.prefixes[prefix.name] = prefix
    }
    return this
  }

  toSparql(sparql:string): string {
    let prefixes: Prefixes = this.prefixes
    let s = ''
    Object.keys(this.prefixes).forEach(function(name){
      let prefix = prefixes[name]
      s += `PREFIX ${prefix.name}: <${prefix.prefix}>
`
    })
    return s + sparql
  }
}
