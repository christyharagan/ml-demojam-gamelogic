import { Value } from './value';
export interface RuleSet {
    toSparql(): string;
    rule(name: string): Rule;
}
export interface Rule {
    when(src: Value, pred: Value, obj: Value): Construct;
}
export interface Construct {
    and(src: Value, pred: Value, obj: Value): Construct;
    then(src: Value, pred: Value, obj: Value): RuleSet;
}
export declare function rule(name: string): Rule;
