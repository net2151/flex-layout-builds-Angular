/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { InjectionToken } from '@angular/core';
export const DEFAULT_CONFIG = {
    addFlexToParent: true,
    addOrientationBps: false,
    disableDefaultBps: false,
    disableVendorPrefixes: false,
    serverLoaded: false,
    useColumnBasisZero: true,
    printWithBreakpoints: [],
    mediaTriggerAutoRestore: true,
    ssrObserveBreakpoints: [],
    // This is disabled by default because otherwise the multiplier would
    // run for all users, regardless of whether they're using this feature.
    // Instead, we disable it by default, which requires this ugly cast.
    multiplier: undefined,
    defaultUnit: 'px',
};
export const LAYOUT_CONFIG = new InjectionToken('Flex Layout token, config options for the library', {
    providedIn: 'root',
    factory: () => DEFAULT_CONFIG
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlicmFyeS1jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9saWJzL2ZsZXgtbGF5b3V0L2NvcmUvdG9rZW5zL2xpYnJhcnktY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUNILE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFrQjdDLE1BQU0sQ0FBQyxNQUFNLGNBQWMsR0FBa0M7SUFDM0QsZUFBZSxFQUFFLElBQUk7SUFDckIsaUJBQWlCLEVBQUUsS0FBSztJQUN4QixpQkFBaUIsRUFBRSxLQUFLO0lBQ3hCLHFCQUFxQixFQUFFLEtBQUs7SUFDNUIsWUFBWSxFQUFFLEtBQUs7SUFDbkIsa0JBQWtCLEVBQUUsSUFBSTtJQUN4QixvQkFBb0IsRUFBRSxFQUFFO0lBQ3hCLHVCQUF1QixFQUFFLElBQUk7SUFDN0IscUJBQXFCLEVBQUUsRUFBRTtJQUN6QixxRUFBcUU7SUFDckUsdUVBQXVFO0lBQ3ZFLG9FQUFvRTtJQUNwRSxVQUFVLEVBQUUsU0FBa0M7SUFDOUMsV0FBVyxFQUFFLElBQUk7Q0FDbEIsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLGFBQWEsR0FBRyxJQUFJLGNBQWMsQ0FDM0MsbURBQW1ELEVBQUU7SUFDbkQsVUFBVSxFQUFFLE1BQU07SUFDbEIsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDLGNBQWM7Q0FDOUIsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQge0luamVjdGlvblRva2VufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TXVsdGlwbGllcn0gZnJvbSAnLi4vbXVsdGlwbHkvbXVsdGlwbGllcic7XG5cbi8qKiBhIHNldCBvZiBjb25maWd1cmF0aW9uIG9wdGlvbnMgZm9yIEZsZXhMYXlvdXRNb2R1bGUgKi9cbmV4cG9ydCBpbnRlcmZhY2UgTGF5b3V0Q29uZmlnT3B0aW9ucyB7XG4gIGFkZEZsZXhUb1BhcmVudD86IGJvb2xlYW47XG4gIGFkZE9yaWVudGF0aW9uQnBzPzogYm9vbGVhbjtcbiAgZGlzYWJsZURlZmF1bHRCcHM/OiBib29sZWFuO1xuICBkaXNhYmxlVmVuZG9yUHJlZml4ZXM/OiBib29sZWFuO1xuICBzZXJ2ZXJMb2FkZWQ/OiBib29sZWFuO1xuICB1c2VDb2x1bW5CYXNpc1plcm8/OiBib29sZWFuO1xuICBwcmludFdpdGhCcmVha3BvaW50cz86IHN0cmluZ1tdO1xuICBtZWRpYVRyaWdnZXJBdXRvUmVzdG9yZT86IGJvb2xlYW47XG4gIHNzck9ic2VydmVCcmVha3BvaW50cz86IHN0cmluZ1tdO1xuICBtdWx0aXBsaWVyPzogTXVsdGlwbGllcjtcbiAgZGVmYXVsdFVuaXQ/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX0NPTkZJRzogUmVxdWlyZWQ8TGF5b3V0Q29uZmlnT3B0aW9ucz4gPSB7XG4gIGFkZEZsZXhUb1BhcmVudDogdHJ1ZSxcbiAgYWRkT3JpZW50YXRpb25CcHM6IGZhbHNlLFxuICBkaXNhYmxlRGVmYXVsdEJwczogZmFsc2UsXG4gIGRpc2FibGVWZW5kb3JQcmVmaXhlczogZmFsc2UsXG4gIHNlcnZlckxvYWRlZDogZmFsc2UsXG4gIHVzZUNvbHVtbkJhc2lzWmVybzogdHJ1ZSxcbiAgcHJpbnRXaXRoQnJlYWtwb2ludHM6IFtdLFxuICBtZWRpYVRyaWdnZXJBdXRvUmVzdG9yZTogdHJ1ZSxcbiAgc3NyT2JzZXJ2ZUJyZWFrcG9pbnRzOiBbXSxcbiAgLy8gVGhpcyBpcyBkaXNhYmxlZCBieSBkZWZhdWx0IGJlY2F1c2Ugb3RoZXJ3aXNlIHRoZSBtdWx0aXBsaWVyIHdvdWxkXG4gIC8vIHJ1biBmb3IgYWxsIHVzZXJzLCByZWdhcmRsZXNzIG9mIHdoZXRoZXIgdGhleSdyZSB1c2luZyB0aGlzIGZlYXR1cmUuXG4gIC8vIEluc3RlYWQsIHdlIGRpc2FibGUgaXQgYnkgZGVmYXVsdCwgd2hpY2ggcmVxdWlyZXMgdGhpcyB1Z2x5IGNhc3QuXG4gIG11bHRpcGxpZXI6IHVuZGVmaW5lZCBhcyB1bmtub3duIGFzIE11bHRpcGxpZXIsXG4gIGRlZmF1bHRVbml0OiAncHgnLFxufTtcblxuZXhwb3J0IGNvbnN0IExBWU9VVF9DT05GSUcgPSBuZXcgSW5qZWN0aW9uVG9rZW48TGF5b3V0Q29uZmlnT3B0aW9ucz4oXG4gICAgJ0ZsZXggTGF5b3V0IHRva2VuLCBjb25maWcgb3B0aW9ucyBmb3IgdGhlIGxpYnJhcnknLCB7XG4gICAgICBwcm92aWRlZEluOiAncm9vdCcsXG4gICAgICBmYWN0b3J5OiAoKSA9PiBERUZBVUxUX0NPTkZJR1xuICAgIH0pO1xuIl19