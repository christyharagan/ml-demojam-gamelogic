import { Value } from './value';
export interface CompactUri {
    prefix: Prefix;
    curi: string;
}
export interface Prefix {
    name: string;
    prefix: string;
    uri(suffix: string): CompactUri;
}
export declare function prefix(name: string, prefix: string): Prefix;
export interface Prefixes {
    [name: string]: Prefix;
}
export declare class PrefixBuilder {
    prefixes: Prefixes;
    addValue(value: Value): PrefixBuilder;
    toSparql(sparql: string): string;
}
