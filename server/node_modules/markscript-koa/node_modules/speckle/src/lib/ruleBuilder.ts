import {Value, v} from './value'
import {PrefixBuilder} from './prefix'

export interface RuleSet {
  toSparql(): string
  rule(name:string): Rule
}

export interface Rule {
  when(src: Value, pred: Value, obj: Value): Construct
}

export interface Construct {
  and(src: Value, pred: Value, obj: Value): Construct
  then(src: Value, pred: Value, obj: Value): RuleSet
}

export function rule(name: string): Rule {
  return _rule('', new PrefixBuilder(), name)
}

function _rule(ruleSet:string, pb: PrefixBuilder, name: string): Rule {
  return {
    when: _when.bind(null, ruleSet, name, [], pb)
  }
}

function _when(ruleSet:string, ruleName: string, ands: [Value, Value, Value][], pb: PrefixBuilder, src: Value, pred: Value, obj: Value): Construct {
  pb.addValue(src).addValue(pred).addValue(obj)
  ands.push([src, pred, obj])
  return {
    and: <(src: Value, pred: Value, obj: Value)=> Construct>_when.bind(null, ruleSet, ruleName, ands, pb),
    then: function(src: Value, pred: Value, obj: Value): RuleSet {
      pb.addValue(src).addValue(pred).addValue(obj)
      ruleSet += `
rule "${ruleName}" CONSTRUCT {
  ${v(src)} ${v(pred)} ${v(obj)}
}{`
      for (let i = 0; i < ands.length - 1; i++) {
        let and = ands[i]
        ruleSet += `
  ${v(and[0])} ${v(and[1])} ${v(and[2])} .`
      }
      let and = ands[ands.length - 1]
      ruleSet += `
  ${v(and[0])} ${v(and[1])} ${v(and[2])}
}`
      return {
        toSparql(): string {
          return pb.toSparql(ruleSet)
        },
        rule: <(name:string)=>Rule>_rule.bind(null, ruleSet, pb)
      }
    }
  }
}
