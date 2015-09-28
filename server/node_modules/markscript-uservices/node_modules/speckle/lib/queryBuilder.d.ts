import { Variable } from './variable';
import { Value } from './value';
export interface Query {
    toSparql(): string;
    and(src: Value, pred: Value, obj: Value): Query;
}
export interface Select {
    where(src: Value, pred: Value, obj: Value): Query;
}
export declare function select(...variables: Variable[]): Select;
