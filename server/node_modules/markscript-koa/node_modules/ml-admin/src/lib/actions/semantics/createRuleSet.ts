import {basicRestCall, createUrl} from '../../utils/rest'
import {Client} from 'marklogic'
import {createDocument} from '../documents/createDocument'

export interface RuleSetConfiguration {
  path: string
}

export function createRuleSet(client: Client, config: RuleSetConfiguration, ruleSet: string): Promise<boolean> {
  return createDocument(client, {
    uri: config.path
  }, ruleSet)
}
