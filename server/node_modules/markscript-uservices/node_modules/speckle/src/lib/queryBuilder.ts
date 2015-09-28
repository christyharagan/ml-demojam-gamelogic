import {Variable} from './variable'
import {Value, v} from './value'
import {PrefixBuilder} from './prefix'

export interface Query {
  toSparql(): string
  and(src: Value, pred: Value, obj: Value): Query
}

export interface Select {
  where(src: Value, pred: Value, obj: Value): Query
}

function _where(variables:Variable[], prefixBuilder:PrefixBuilder, statements:[Value, Value, Value][], src: Value, pred: Value, obj: Value): Query {
  prefixBuilder = prefixBuilder.addValue(src).addValue(pred).addValue(obj)
  statements.push([src, pred, obj])
  return {
    toSparql(): string {
      let query = 'SELECT '
      variables.forEach(function(variable){
        query += `?${variable.name} `
      })
      query += `WHERE {
`
      for (let i = 0; i < statements.length - 1; i++) {
        let statement = statements[i]
        query += `${v(statement[0])} ${v(statement[1])} ${v(statement[2])} .
`
      }
      let statement = statements[statements.length - 1]
      query += `${v(statement[0])} ${v(statement[1])} ${v(statement[2])};
}`
      return prefixBuilder.toSparql(query)
    },
    and: _where.bind(null, variables, prefixBuilder, statements)
  }
}

export function select(...variables:Variable[]): Select {
  return {
    where: _where.bind(null, variables, new PrefixBuilder(), [])
  }
}
