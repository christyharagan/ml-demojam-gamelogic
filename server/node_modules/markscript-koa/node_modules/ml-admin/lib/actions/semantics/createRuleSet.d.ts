import { Client } from 'marklogic';
export interface RuleSetConfiguration {
    path: string;
}
export declare function createRuleSet(client: Client, config: RuleSetConfiguration, ruleSet: string): Promise<boolean>;
