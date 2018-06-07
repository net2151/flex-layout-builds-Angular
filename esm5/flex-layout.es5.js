/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Version, Inject, NgModule, Optional, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { SERVER_TOKEN, DEFAULT_CONFIG, LAYOUT_CONFIG, BREAKPOINT } from '@angular/flex-layout/core';
export { removeStyles, BROWSER_PROVIDER, CLASS_NAME, CoreModule, MediaChange, StylesheetMap, STYLESHEET_MAP_PROVIDER_FACTORY, STYLESHEET_MAP_PROVIDER, DEFAULT_CONFIG, LAYOUT_CONFIG, SERVER_TOKEN, BREAKPOINT, BaseDirective, BaseDirectiveAdapter, BaseFxDirective, RESPONSIVE_ALIASES, DEFAULT_BREAKPOINTS, ScreenTypes, ORIENTATION_BREAKPOINTS, BreakPointRegistry, BREAKPOINTS, MatchMedia, MockMatchMedia, MockMediaQueryList, MockMatchMediaProvider, ServerMediaQueryList, ServerMatchMedia, MediaMonitor, MEDIA_MONITOR_PROVIDER_FACTORY, MEDIA_MONITOR_PROVIDER, ObservableMedia, MediaService, ObservableMediaProvider, OBSERVABLE_MEDIA_PROVIDER_FACTORY, OBSERVABLE_MEDIA_PROVIDER, KeyOptions, ResponsiveActivation, StyleUtils, validateBasis } from '@angular/flex-layout/core';
import { ExtendedModule } from '@angular/flex-layout/extended';
export { ExtendedModule, ClassDirective, ImgSrcDirective, negativeOf, ShowHideDirective, StyleDirective } from '@angular/flex-layout/extended';
import { FlexModule } from '@angular/flex-layout/flex';
export { FlexModule, FlexDirective, FlexAlignDirective, FlexFillDirective, FlexOffsetDirective, FlexOrderDirective, LayoutDirective, LayoutAlignDirective, LayoutGapDirective } from '@angular/flex-layout/flex';
import { GridModule } from '@angular/flex-layout/grid';
export { ɵb, ɵc, ɵd, ɵe, ɵf, ɵg, ɵh, ɵi, ɵa, ɵj, ɵk, GridModule } from '@angular/flex-layout/grid';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Current version of Angular Flex-Layout.
 */
var /** @type {?} */ VERSION = new Version('6.0.0-beta.15-b72c498');

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 *
 */
var FlexLayoutModule = /** @class */ (function () {
    function FlexLayoutModule(serverModuleLoaded, platformId) {
        if (isPlatformServer(platformId) && !serverModuleLoaded) {
            console.warn('Warning: Flex Layout loaded on the server without FlexLayoutServerModule');
        }
    }
    /**
     * Initialize the FlexLayoutModule with a set of config options,
     * which sets the corresponding tokens accordingly
     */
    /**
     * Initialize the FlexLayoutModule with a set of config options,
     * which sets the corresponding tokens accordingly
     * @param {?} configOptions
     * @param {?=} breakpoints
     * @return {?}
     */
    FlexLayoutModule.withConfig = /**
     * Initialize the FlexLayoutModule with a set of config options,
     * which sets the corresponding tokens accordingly
     * @param {?} configOptions
     * @param {?=} breakpoints
     * @return {?}
     */
    function (configOptions, breakpoints) {
        var /** @type {?} */ config = Object.assign({}, DEFAULT_CONFIG);
        var /** @type {?} */ moduleProviders = [];
        for (var /** @type {?} */ key in configOptions) {
            // If the setting is different and not undefined or null, change it
            if (configOptions[key] !== config[key] &&
                (configOptions[key] === false || configOptions[key] === true)) {
                config[key] = configOptions[key];
            }
        }
        if (configOptions.serverLoaded) {
            moduleProviders.push({ provide: SERVER_TOKEN, useValue: true });
        }
        if (Array.isArray(breakpoints)) {
            moduleProviders.push({ provide: BREAKPOINT, useValue: breakpoints, multi: true });
        }
        moduleProviders.push({ provide: LAYOUT_CONFIG, useValue: config });
        return {
            ngModule: FlexLayoutModule,
            providers: moduleProviders
        };
    };
    FlexLayoutModule.decorators = [
        { type: NgModule, args: [{
                    imports: [FlexModule, ExtendedModule, GridModule],
                    exports: [FlexModule, ExtendedModule, GridModule]
                },] },
    ];
    /** @nocollapse */
    FlexLayoutModule.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [SERVER_TOKEN,] },] },
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] },] },
    ]; };
    return FlexLayoutModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { VERSION, FlexLayoutModule };
//# sourceMappingURL=flex-layout.es5.js.map
