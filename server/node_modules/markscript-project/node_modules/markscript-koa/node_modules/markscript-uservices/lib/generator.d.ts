import { reflective as s, KeyValue } from 'typescript-schema';
import * as m from './model';
import * as ms from 'markscript-core';
export declare function generateServiceSpecs(modules: KeyValue<s.Module>): m.MLServices;
export declare function generateAssetModel(serviceSpecs: m.MLServices, baseUri: string, assetModel: ms.AssetModel, pkgDir?: string): void;
