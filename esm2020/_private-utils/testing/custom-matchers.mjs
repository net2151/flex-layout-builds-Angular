const _global = (typeof window === 'undefined' ? global : window);
import { _dom as _ } from './dom-tools';
import { applyCssPrefixes, extendObject, } from '@angular/flex-layout/_private-utils';
export const expect = _global.expect;
/**
 * NOTE: These custom JASMINE Matchers are used only
 *       in the Karma/Jasmine testing for the Layout Directives
 *       in `src/lib/flex/api`
 */
export const customMatchers = {
    toEqual: function (util) {
        return {
            compare: function (actual, expected) {
                return { pass: util.equals(actual, expected, [compareMap]) };
            }
        };
        function compareMap(actual, expected) {
            if (actual instanceof Map) {
                let pass = actual.size === expected.size;
                if (pass) {
                    actual.forEach((v, k) => {
                        pass = pass && util.equals(v, expected.get(k));
                    });
                }
                return pass;
            }
            else {
                return undefined;
            }
        }
    },
    toHaveText: function () {
        return {
            compare: function (actual, expectedText) {
                const actualText = elementText(actual);
                return {
                    pass: actualText == expectedText,
                    get message() {
                        return 'Expected ' + actualText + ' to be equal to ' + expectedText;
                    }
                };
            }
        };
    },
    toHaveCssClass: function () {
        return { compare: buildError(false), negativeCompare: buildError(true) };
        function buildError(isNot) {
            return function (actual, className) {
                return {
                    pass: _.hasClass(actual, className) == !isNot,
                    get message() {
                        return `
              Expected ${actual.outerHTML} ${isNot ? 'not ' : ''}
              to contain the CSS class '${className}'
            `;
                    }
                };
            };
        }
    },
    toHaveMap: function () {
        return {
            compare: function (actual, map) {
                let allPassed;
                allPassed = Object.keys(map).length !== 0;
                Object.keys(map).forEach(key => {
                    allPassed = allPassed && (actual[key] === map[key]);
                });
                return {
                    pass: allPassed,
                    get message() {
                        return `
              Expected ${JSON.stringify(actual)} ${!allPassed ? ' ' : 'not '} to contain the
              '${JSON.stringify(map)}'
            `;
                    }
                };
            }
        };
    },
    toHaveAttributes: function () {
        return {
            compare: function (actual, map) {
                let allPassed;
                let attributeNames = Object.keys(map);
                allPassed = attributeNames.length !== 0;
                attributeNames.forEach(name => {
                    allPassed = allPassed && _.hasAttribute(actual, name)
                        && _.getAttribute(actual, name) === map[name];
                });
                return {
                    pass: allPassed,
                    get message() {
                        return `
              Expected ${actual.outerHTML} ${allPassed ? 'not ' : ''} attributes to contain
              '${JSON.stringify(map)}'
            `;
                    }
                };
            }
        };
    },
    /**
     * Check element's inline styles only
     */
    toHaveStyle: function () {
        return {
            compare: buildCompareStyleFunction(true)
        };
    },
    /**
     * Check element's css stylesheet only (if not present inline)
     */
    toHaveCSS: function () {
        return {
            compare: buildCompareStyleFunction(false)
        };
    }
};
/**
 * Curried value to function to check styles that are inline or in a stylesheet for the
 * specified DOM element.
 */
function buildCompareStyleFunction(inlineOnly = true) {
    return function (actual, styles, styler) {
        const found = {};
        const styleMap = {};
        if (typeof styles === 'string') {
            styleMap[styles] = '';
        }
        else {
            Object.assign(styleMap, styles);
        }
        let allPassed = Object.keys(styleMap).length !== 0;
        Object.keys(styleMap).forEach(prop => {
            let { elHasStyle, current } = hasPrefixedStyles(actual, prop, styleMap[prop], inlineOnly, styler);
            allPassed = allPassed && elHasStyle;
            if (!elHasStyle) {
                extendObject(found, current);
            }
        });
        return {
            pass: allPassed,
            get message() {
                const expectedValueStr = (typeof styles === 'string') ? styleMap :
                    JSON.stringify(styleMap, null, 2);
                const foundValueStr = inlineOnly ? actual.outerHTML : JSON.stringify(found);
                return `
          Expected ${foundValueStr}${!allPassed ? '' : ' not'} to contain the
          CSS ${typeof styles === 'string' ? 'property' : 'styles'} '${expectedValueStr}'
        `;
            }
        };
    };
}
/**
 * Validate presence of requested style or use fallback
 * to possible `prefixed` styles. Useful when some browsers
 * (Safari, IE, etc) will use prefixed style instead of defaults.
 */
function hasPrefixedStyles(actual, key, value, inlineOnly, styler) {
    const current = {};
    if (value === '*') {
        return { elHasStyle: styler.lookupStyle(actual, key, inlineOnly) !== '', current };
    }
    value = value.trim();
    let elHasStyle = styler.lookupStyle(actual, key, inlineOnly) === value;
    if (!elHasStyle) {
        let prefixedStyles = applyCssPrefixes({ [key]: value });
        Object.keys(prefixedStyles).forEach(prop => {
            // Search for optional prefixed values
            elHasStyle = elHasStyle ||
                styler.lookupStyle(actual, prop, inlineOnly) === prefixedStyles[prop];
        });
    }
    // Return BOTH confirmation and current computed key values (if confirmation == false)
    return { elHasStyle, current };
}
function elementText(n) {
    const hasNodes = (m) => {
        const children = _.childNodes(m);
        return children && children['length'];
    };
    if (n instanceof Array) {
        return n.map(elementText).join('');
    }
    if (_.isCommentNode(n)) {
        return '';
    }
    if (_.isElementNode(n) && _.tagName(n) == 'CONTENT') {
        return elementText(Array.prototype.slice.apply(_.getDistributedNodes(n)));
    }
    if (_.hasShadowRoot(n)) {
        return elementText(_.childNodesAsList(_.getShadowRoot(n)));
    }
    if (hasNodes(n)) {
        return elementText(_.childNodesAsList(n));
    }
    return _.getText(n);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tLW1hdGNoZXJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbGlicy9mbGV4LWxheW91dC9fcHJpdmF0ZS11dGlscy90ZXN0aW5nL2N1c3RvbS1tYXRjaGVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFRQSxNQUFNLE9BQU8sR0FBUSxDQUFDLE9BQU8sTUFBTSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUV2RSxPQUFPLEVBQUMsSUFBSSxJQUFJLENBQUMsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUV0QyxPQUFPLEVBQUMsZ0JBQWdCLEVBQUUsWUFBWSxHQUFHLE1BQU0scUNBQXFDLENBQUM7QUFHckYsTUFBTSxDQUFDLE1BQU0sTUFBTSxHQUFzQyxPQUFPLENBQUMsTUFBTSxDQUFDO0FBMER4RTs7OztHQUlHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sY0FBYyxHQUFtQztJQUU1RCxPQUFPLEVBQUUsVUFBVSxJQUFJO1FBQ3JCLE9BQU87WUFDTCxPQUFPLEVBQUUsVUFBVSxNQUFXLEVBQUUsUUFBYTtnQkFDM0MsT0FBTyxFQUFDLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFDLENBQUM7WUFDN0QsQ0FBQztTQUNGLENBQUM7UUFFRixTQUFTLFVBQVUsQ0FBQyxNQUFXLEVBQUUsUUFBYTtZQUM1QyxJQUFJLE1BQU0sWUFBWSxHQUFHLEVBQUU7Z0JBQ3pCLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLEtBQUssUUFBUSxDQUFDLElBQUksQ0FBQztnQkFDekMsSUFBSSxJQUFJLEVBQUU7b0JBQ1IsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQU0sRUFBRSxDQUFNLEVBQUUsRUFBRTt3QkFDaEMsSUFBSSxHQUFHLElBQUksSUFB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V0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0tBQ3BDO0lBRUQsSUFBSSxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxFQUFFO1FBQ3RCLE9BQU8sRUFBRSxDQUFDO0tBQ1g7SUFFRCxJQUFJLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxTQUFTLEVBQUU7UUFDbkQsT0FBTyxXQUFXLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDM0U7SUFFRCxJQUFJLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLEVBQUU7UUFDdEIsT0FBTyxXQUFXLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQzVEO0lBRUQsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUU7UUFDZixPQUFPLFdBQVcsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUMzQztJQUVELE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN0QixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5kZWNsYXJlIHZhciBnbG9iYWw6IGFueTtcbmNvbnN0IF9nbG9iYWwgPSA8YW55Pih0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJyA/IGdsb2JhbCA6IHdpbmRvdyk7XG5cbmltcG9ydCB7X2RvbSBhcyBffSBmcm9tICcuL2RvbS10b29scyc7XG5cbmltcG9ydCB7YXBwbHlDc3NQcmVmaXhlcywgZXh0ZW5kT2JqZWN0LCB9IGZyb20gJ0Bhbmd1bGFyL2ZsZXgtbGF5b3V0L19wcml2YXRlLXV0aWxzJztcbmltcG9ydCB7U3R5bGVVdGlsc30gZnJvbSAnQGFuZ3VsYXIvZmxleC1sYXlvdXQvY29yZSc7XG5cbmV4cG9ydCBjb25zdCBleHBlY3Q6IChhY3R1YWw6IGFueSkgPT4gTmdNYXRjaGVycyA9IDxhbnk+IF9nbG9iYWwuZXhwZWN0O1xuXG4vKipcbiAqIEphc21pbmUgbWF0Y2hlcnMgdGhhdCBjaGVjayBBbmd1bGFyIHNwZWNpZmljIGNvbmRpdGlvbnMuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTmdNYXRjaGVycyBleHRlbmRzIGphc21pbmUuTWF0Y2hlcnM8YW55PiB7XG4gIC8qKlxuICAgKiBFeHBlY3QgdGhlIGVsZW1lbnQgdG8gaGF2ZSBleGFjdGx5IHRoZSBnaXZlbiB0ZXh0LlxuICAgKlxuICAgKiAjIyBFeGFtcGxlXG4gICAqXG4gICAqIHtAZXhhbXBsZSB0ZXN0aW5nL3RzL21hdGNoZXJzLnRzIHJlZ2lvbj0ndG9IYXZlVGV4dCd9XG4gICAqL1xuICB0b0hhdmVUZXh0KGV4cGVjdGVkOiBzdHJpbmcpOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBDb21wYXJlIGtleTp2YWx1ZSBwYWlycyBhcyBtYXRjaGluZyBFWEFDVExZXG4gICAqL1xuICB0b0hhdmVNYXAoZXhwZWN0ZWQ6IHsgW2s6IHN0cmluZ106IHN0cmluZyB9KTogYm9vbGVhbjtcblxuICAvKipcbiAgICogRXhwZWN0IHRoZSBlbGVtZW50IHRvIGhhdmUgdGhlIGdpdmVuIENTUyBjbGFzcy5cbiAgICpcbiAgICogIyMgRXhhbXBsZVxuICAgKlxuICAgKiB7QGV4YW1wbGUgdGVzdGluZy90cy9tYXRjaGVycy50cyByZWdpb249J3RvSGF2ZUNzc0NsYXNzJ31cbiAgICovXG4gIHRvSGF2ZUNzc0NsYXNzKGV4cGVjdGVkOiBzdHJpbmcpOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBFeHBlY3QgdGhlIGVsZW1lbnQgdG8gaGF2ZSB0aGUgZ2l2ZW4gcGFpcnMgb2YgYXR0cmlidXRlIG5hbWUgYW5kIGF0dHJpYnV0ZSB2YWx1ZVxuICAgKi9cbiAgdG9IYXZlQXR0cmlidXRlcyhleHBlY3RlZDogeyBbazogc3RyaW5nXTogc3RyaW5nIH0pOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBFeHBlY3QgdGhlIGVsZW1lbnQgdG8gaGF2ZSB0aGUgZ2l2ZW4gQ1NTIHN0eWxlcyBpbmplY3RlZCBJTkxJTkVcbiAgICpcbiAgICogIyMgRXhhbXBsZVxuICAgKlxuICAgKiB7QGV4YW1wbGUgdGVzdGluZy90cy9tYXRjaGVycy50cyByZWdpb249J3RvSGF2ZVN0eWxlJ31cbiAgICovXG4gIHRvSGF2ZVN0eWxlKGV4cGVjdGVkOiB7IFtrOiBzdHJpbmddOiBzdHJpbmcgfSB8IHN0cmluZyk6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEV4cGVjdCB0aGUgZWxlbWVudCB0byBoYXZlIHRoZSBnaXZlbiBDU1MgaW5saW5lIE9SIGNvbXB1dGVkIHN0eWxlcy5cbiAgICpcbiAgICogIyMgRXhhbXBsZVxuICAgKlxuICAgKiB7QGV4YW1wbGUgdGVzdGluZy90cy9tYXRjaGVycy50cyByZWdpb249J3RvSGF2ZVN0eWxlJ31cbiAgICovXG4gIHRvSGF2ZVN0eWxlKGV4cGVjdGVkOiB7IFtrOiBzdHJpbmddOiBzdHJpbmcgfSB8IHN0cmluZyk6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEludmVydCB0aGUgbWF0Y2hlcnMuXG4gICAqL1xuICBub3Q6IE5nTWF0Y2hlcnM7XG59XG5cbi8qKlxuICogTk9URTogVGhlc2UgY3VzdG9tIEpBU01JTkUgTWF0Y2hlcnMgYXJlIHVzZWQgb25seVxuICogICAgICAgaW4gdGhlIEthcm1hL0phc21pbmUgdGVzdGluZyBmb3IgdGhlIExheW91dCBEaXJlY3RpdmVzXG4gKiAgICAgICBpbiBgc3JjL2xpYi9mbGV4L2FwaWBcbiAqL1xuZXhwb3J0IGNvbnN0IGN1c3RvbU1hdGNoZXJzOiBqYXNtaW5lLkN1c3RvbU1hdGNoZXJGYWN0b3JpZXMgPSB7XG5cbiAgdG9FcXVhbDogZnVuY3Rpb24gKHV0aWwpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29tcGFyZTogZnVuY3Rpb24gKGFjdHVhbDogYW55LCBleHBlY3RlZDogYW55KSB7XG4gICAgICAgIHJldHVybiB7cGFzczogdXRpbC5lcXVhbHMoYWN0dWFsLCBleHBlY3RlZCwgW2NvbXBhcmVNYXBdKX07XG4gICAgICB9XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGNvbXBhcmVNYXAoYWN0dWFsOiBhbnksIGV4cGVjdGVkOiBhbnkpIHtcbiAgICAgIGlmIChhY3R1YWwgaW5zdGFuY2VvZiBNYXApIHtcbiAgICAgICAgbGV0IHBhc3MgPSBhY3R1YWwuc2l6ZSA9PT0gZXhwZWN0ZWQuc2l6ZTtcbiAgICAgICAgaWYgKHBhc3MpIHtcbiAgICAgICAgICBhY3R1YWwuZm9yRWFjaCgodjogYW55LCBrOiBhbnkpID0+IHtcbiAgICAgICAgICAgIHBhc3MgPSBwYXNzICYmIHV0aWwuZXF1YWxzKHYsIGV4cGVjdGVkLmdldChrKSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBhc3M7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICB0b0hhdmVUZXh0OiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbXBhcmU6IGZ1bmN0aW9uIChhY3R1YWw6IGFueSwgZXhwZWN0ZWRUZXh0OiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgYWN0dWFsVGV4dCA9IGVsZW1lbnRUZXh0KGFjdHVhbCk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgcGFzczogYWN0dWFsVGV4dCA9PSBleHBlY3RlZFRleHQsXG4gICAgICAgICAgZ2V0IG1lc3NhZ2UoKSB7XG4gICAgICAgICAgICByZXR1cm4gJ0V4cGVjdGVkICcgKyBhY3R1YWxUZXh0ICsgJyB0byBiZSBlcXVhbCB0byAnICsgZXhwZWN0ZWRUZXh0O1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9LFxuXG4gIHRvSGF2ZUNzc0NsYXNzOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHtjb21wYXJlOiBidWlsZEVycm9yKGZhbHNlKSwgbmVnYXRpdmVDb21wYXJlOiBidWlsZEVycm9yKHRydWUpfTtcblxuICAgIGZ1bmN0aW9uIGJ1aWxkRXJyb3IoaXNOb3Q6IGJvb2xlYW4pIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoYWN0dWFsOiBhbnksIGNsYXNzTmFtZTogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgcGFzczogXy5oYXNDbGFzcyhhY3R1YWwsIGNsYXNzTmFtZSkgPT0gIWlzTm90LFxuICAgICAgICAgIGdldCBtZXNzYWdlKCkge1xuICAgICAgICAgICAgcmV0dXJuIGBcbiAgICAgICAgICAgICAgRXhwZWN0ZWQgJHthY3R1YWwub3V0ZXJIVE1MfSAke2lzTm90ID8gJ25vdCAnIDogJyd9XG4gICAgICAgICAgICAgIHRvIGNvbnRhaW4gdGhlIENTUyBjbGFzcyAnJHtjbGFzc05hbWV9J1xuICAgICAgICAgICAgYDtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9O1xuICAgIH1cbiAgfSxcblxuICB0b0hhdmVNYXA6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29tcGFyZTogZnVuY3Rpb24gKGFjdHVhbDogeyBbazogc3RyaW5nXTogc3RyaW5nIH0sIG1hcDogeyBbazogc3RyaW5nXTogc3RyaW5nIH0pIHtcbiAgICAgICAgbGV0IGFsbFBhc3NlZDogYm9vbGVhbjtcbiAgICAgICAgYWxsUGFzc2VkID0gT2JqZWN0LmtleXMobWFwKS5sZW5ndGggIT09IDA7XG4gICAgICAgIE9iamVjdC5rZXlzKG1hcCkuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgIGFsbFBhc3NlZCA9IGFsbFBhc3NlZCAmJiAoYWN0dWFsW2tleV0gPT09IG1hcFtrZXldKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBwYXNzOiBhbGxQYXNzZWQsXG4gICAgICAgICAgZ2V0IG1lc3NhZ2UoKSB7XG4gICAgICAgICAgICByZXR1cm4gYFxuICAgICAgICAgICAgICBFeHBlY3RlZCAke0pTT04uc3RyaW5naWZ5KGFjdHVhbCl9ICR7IWFsbFBhc3NlZCA/ICcgJyA6ICdub3QgJ30gdG8gY29udGFpbiB0aGVcbiAgICAgICAgICAgICAgJyR7SlNPTi5zdHJpbmdpZnkobWFwKX0nXG4gICAgICAgICAgICBgO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9LFxuXG4gIHRvSGF2ZUF0dHJpYnV0ZXM6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29tcGFyZTogZnVuY3Rpb24gKGFjdHVhbDogYW55LCBtYXA6IHsgW2s6IHN0cmluZ106IHN0cmluZyB9KSB7XG4gICAgICAgIGxldCBhbGxQYXNzZWQ6IGJvb2xlYW47XG4gICAgICAgIGxldCBhdHRyaWJ1dGVOYW1lcyA9IE9iamVjdC5rZXlzKG1hcCk7XG4gICAgICAgIGFsbFBhc3NlZCA9IGF0dHJpYnV0ZU5hbWVzLmxlbmd0aCAhPT0gMDtcbiAgICAgICAgYXR0cmlidXRlTmFtZXMuZm9yRWFjaChuYW1lID0+IHtcbiAgICAgICAgICBhbGxQYXNzZWQgPSBhbGxQYXNzZWQgJiYgXy5oYXNBdHRyaWJ1dGUoYWN0dWFsLCBuYW1lKVxuICAgICAgICAgICAgICAmJiBfLmdldEF0dHJpYnV0ZShhY3R1YWwsIG5hbWUpID09PSBtYXBbbmFtZV07XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHBhc3M6IGFsbFBhc3NlZCxcbiAgICAgICAgICBnZXQgbWVzc2FnZSgpIHtcbiAgICAgICAgICAgIHJldHVybiBgXG4gICAgICAgICAgICAgIEV4cGVjdGVkICR7YWN0dWFsLm91dGVySFRNTH0gJHthbGxQYXNzZWQgPyAnbm90ICcgOiAnJ30gYXR0cmlidXRlcyB0byBjb250YWluXG4gICAgICAgICAgICAgICcke0pTT04uc3RyaW5naWZ5KG1hcCl9J1xuICAgICAgICAgICAgYDtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfTtcbiAgfSxcblxuICAvKipcbiAgICogQ2hlY2sgZWxlbWVudCdzIGlubGluZSBzdHlsZXMgb25seVxuICAgKi9cbiAgdG9IYXZlU3R5bGU6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29tcGFyZTogYnVpbGRDb21wYXJlU3R5bGVGdW5jdGlvbih0cnVlKVxuICAgIH07XG4gIH0sXG5cblxuICAvKipcbiAgICogQ2hlY2sgZWxlbWVudCdzIGNzcyBzdHlsZXNoZWV0IG9ubHkgKGlmIG5vdCBwcmVzZW50IGlubGluZSlcbiAgICovXG4gIHRvSGF2ZUNTUzogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb21wYXJlOiBidWlsZENvbXBhcmVTdHlsZUZ1bmN0aW9uKGZhbHNlKVxuICAgIH07XG4gIH1cblxufTtcblxuLyoqXG4gKiBDdXJyaWVkIHZhbHVlIHRvIGZ1bmN0aW9uIHRvIGNoZWNrIHN0eWxlcyB0aGF0IGFyZSBpbmxpbmUgb3IgaW4gYSBzdHlsZXNoZWV0IGZvciB0aGVcbiAqIHNwZWNpZmllZCBET00gZWxlbWVudC5cbiAqL1xuZnVuY3Rpb24gYnVpbGRDb21wYXJlU3R5bGVGdW5jdGlvbihpbmxpbmVPbmx5ID0gdHJ1ZSkge1xuICByZXR1cm4gZnVuY3Rpb24gKGFjdHVhbDogYW55LCBzdHlsZXM6IHsgW2s6IHN0cmluZ106IHN0cmluZyB9IHwgc3RyaW5nLCBzdHlsZXI6IFN0eWxlVXRpbHMpIHtcbiAgICBjb25zdCBmb3VuZCA9IHt9O1xuICAgIGNvbnN0IHN0eWxlTWFwOiB7W2s6IHN0cmluZ106IHN0cmluZ30gPSB7fTtcblxuICAgIGlmICh0eXBlb2Ygc3R5bGVzID09PSAnc3RyaW5nJykge1xuICAgICAgc3R5bGVNYXBbc3R5bGVzXSA9ICcnO1xuICAgIH0gZWxzZSB7XG4gICAgICBPYmplY3QuYXNzaWduKHN0eWxlTWFwLCBzdHlsZXMpO1xuICAgIH1cblxuICAgIGxldCBhbGxQYXNzZWQgPSBPYmplY3Qua2V5cyhzdHlsZU1hcCkubGVuZ3RoICE9PSAwO1xuICAgIE9iamVjdC5rZXlzKHN0eWxlTWFwKS5mb3JFYWNoKHByb3AgPT4ge1xuICAgICAgbGV0IHtlbEhhc1N0eWxlLCBjdXJyZW50fSA9IGhhc1ByZWZpeGVkU3R5bGVzKGFjdHVhbCwgcHJvcCwgc3R5bGVNYXBbcHJvcF0sIGlubGluZU9ubHksXG4gICAgICAgIHN0eWxlcik7XG4gICAgICBhbGxQYXNzZWQgPSBhbGxQYXNzZWQgJiYgZWxIYXNTdHlsZTtcbiAgICAgIGlmICghZWxIYXNTdHlsZSkge1xuICAgICAgICBleHRlbmRPYmplY3QoZm91bmQsIGN1cnJlbnQpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHBhc3M6IGFsbFBhc3NlZCxcbiAgICAgIGdldCBtZXNzYWdlKCkge1xuICAgICAgICBjb25zdCBleHBlY3RlZFZhbHVlU3RyID0gKHR5cGVvZiBzdHlsZXMgPT09ICdzdHJpbmcnKSA/IHN0eWxlTWFwIDpcbiAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KHN0eWxlTWFwLCBudWxsLCAyKTtcbiAgICAgICAgY29uc3QgZm91bmRWYWx1ZVN0ciA9IGlubGluZU9ubHkgPyBhY3R1YWwub3V0ZXJIVE1MIDogSlNPTi5zdHJpbmdpZnkoZm91bmQpO1xuICAgICAgICByZXR1cm4gYFxuICAgICAgICAgIEV4cGVjdGVkICR7Zm91bmRWYWx1ZVN0cn0keyFhbGxQYXNzZWQgPyAnJyA6ICcgbm90J30gdG8gY29udGFpbiB0aGVcbiAgICAgICAgICBDU1MgJHt0eXBlb2Ygc3R5bGVzID09PSAnc3RyaW5nJyA/ICdwcm9wZXJ0eScgOiAnc3R5bGVzJ30gJyR7ZXhwZWN0ZWRWYWx1ZVN0cn0nXG4gICAgICAgIGA7XG4gICAgICB9XG4gICAgfTtcbiAgfTtcbn1cblxuLyoqXG4gKiBWYWxpZGF0ZSBwcmVzZW5jZSBvZiByZXF1ZXN0ZWQgc3R5bGUgb3IgdXNlIGZhbGxiYWNrXG4gKiB0byBwb3NzaWJsZSBgcHJlZml4ZWRgIHN0eWxlcy4gVXNlZnVsIHdoZW4gc29tZSBicm93c2Vyc1xuICogKFNhZmFyaSwgSUUsIGV0Yykgd2lsbCB1c2UgcHJlZml4ZWQgc3R5bGUgaW5zdGVhZCBvZiBkZWZhdWx0cy5cbiAqL1xuZnVuY3Rpb24gaGFzUHJlZml4ZWRTdHlsZXMoYWN0dWFsOiBIVE1MRWxlbWVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleTogc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGlubGluZU9ubHk6IGJvb2xlYW4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZXI6IFN0eWxlVXRpbHMpIHtcbiAgY29uc3QgY3VycmVudCA9IHt9O1xuXG4gIGlmICh2YWx1ZSA9PT0gJyonKSB7XG4gICAgcmV0dXJuIHtlbEhhc1N0eWxlOiBzdHlsZXIubG9va3VwU3R5bGUoYWN0dWFsLCBrZXksIGlubGluZU9ubHkpICE9PSAnJywgY3VycmVudH07XG4gIH1cblxuICB2YWx1ZSA9IHZhbHVlLnRyaW0oKTtcbiAgbGV0IGVsSGFzU3R5bGUgPSBzdHlsZXIubG9va3VwU3R5bGUoYWN0dWFsLCBrZXksIGlubGluZU9ubHkpID09PSB2YWx1ZTtcbiAgaWYgKCFlbEhhc1N0eWxlKSB7XG4gICAgbGV0IHByZWZpeGVkU3R5bGVzID0gYXBwbHlDc3NQcmVmaXhlcyh7W2tleV06IHZhbHVlfSk7XG4gICAgT2JqZWN0LmtleXMocHJlZml4ZWRTdHlsZXMpLmZvckVhY2gocHJvcCA9PiB7XG4gICAgICAvLyBTZWFyY2ggZm9yIG9wdGlvbmFsIHByZWZpeGVkIHZhbHVlc1xuICAgICAgZWxIYXNTdHlsZSA9IGVsSGFzU3R5bGUgfHxcbiAgICAgICAgc3R5bGVyLmxvb2t1cFN0eWxlKGFjdHVhbCwgcHJvcCwgaW5saW5lT25seSkgPT09IHByZWZpeGVkU3R5bGVzW3Byb3BdO1xuICAgIH0pO1xuICB9XG4gIC8vIFJldHVybiBCT1RIIGNvbmZpcm1hdGlvbiBhbmQgY3VycmVudCBjb21wdXRlZCBrZXkgdmFsdWVzIChpZiBjb25maXJtYXRpb24gPT0gZmFsc2UpXG4gIHJldHVybiB7ZWxIYXNTdHlsZSwgY3VycmVudH07XG59XG5cbmZ1bmN0aW9uIGVsZW1lbnRUZXh0KG46IGFueSk6IHN0cmluZyB7XG4gIGNvbnN0IGhhc05vZGVzID0gKG06IGFueSkgPT4ge1xuICAgIGNvbnN0IGNoaWxkcmVuID0gXy5jaGlsZE5vZGVzKG0pO1xuICAgIHJldHVybiBjaGlsZHJlbiAmJiBjaGlsZHJlblsnbGVuZ3RoJ107XG4gIH07XG5cbiAgaWYgKG4gaW5zdGFuY2VvZiBBcnJheSkge1xuICAgIHJldHVybiBuLm1hcChlbGVtZW50VGV4dCkuam9pbignJyk7XG4gIH1cblxuICBpZiAoXy5pc0NvbW1lbnROb2RlKG4pKSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG5cbiAgaWYgKF8uaXNFbGVtZW50Tm9kZShuKSAmJiBfLnRhZ05hbWUobikgPT0gJ0NPTlRFTlQnKSB7XG4gICAgcmV0dXJuIGVsZW1lbnRUZXh0KEFycmF5LnByb3RvdHlwZS5zbGljZS5hcHBseShfLmdldERpc3RyaWJ1dGVkTm9kZXMobikpKTtcbiAgfVxuXG4gIGlmIChfLmhhc1NoYWRvd1Jvb3QobikpIHtcbiAgICByZXR1cm4gZWxlbWVudFRleHQoXy5jaGlsZE5vZGVzQXNMaXN0KF8uZ2V0U2hhZG93Um9vdChuKSkpO1xuICB9XG5cbiAgaWYgKGhhc05vZGVzKG4pKSB7XG4gICAgcmV0dXJuIGVsZW1lbnRUZXh0KF8uY2hpbGROb2Rlc0FzTGlzdChuKSk7XG4gIH1cblxuICByZXR1cm4gXy5nZXRUZXh0KG4pO1xufVxuXG4iXX0=