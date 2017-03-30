/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { // tslint:disable-line:no-unused-variable
Optional, SkipSelf } from '@angular/core';
import { MediaMonitor } from './media-monitor';
import { MatchMedia } from './match-media';
import { BreakPointRegistry } from './breakpoints/break-point-registry';
/**
 * Ensure a single global service provider
 */
export function MEDIA_MONITOR_PROVIDER_FACTORY(parentMonitor, breakpoints, matchMedia) {
    return parentMonitor || new MediaMonitor(breakpoints, matchMedia);
}
/**
 * Export provider that uses a global service factory (above)
 */
export var MEDIA_MONITOR_PROVIDER = {
    provide: MediaMonitor,
    deps: [
        [new Optional(), new SkipSelf(), MediaMonitor],
        BreakPointRegistry,
        MatchMedia,
    ],
    useFactory: MEDIA_MONITOR_PROVIDER_FACTORY
};
//# sourceMappingURL=/usr/local/google/home/tinagao/WebstormProjects/caretaker/flex-layout/src/lib/media-query/media-monitor-provider.js.map