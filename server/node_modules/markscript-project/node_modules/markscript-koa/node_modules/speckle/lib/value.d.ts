import { Variable } from './variable';
import { CompactUri } from './prefix';
export declare type Value = Variable | string | CompactUri;
export declare function v(vsc: Value): string;
