import * as ms from 'markscript-core';
import * as m from './model';
export interface UServicesBuildOptions {
    serviceSpecs?: m.MLServices;
}
export declare const UServicesPlugin: ms.Plugin<UServicesBuildOptions>;
