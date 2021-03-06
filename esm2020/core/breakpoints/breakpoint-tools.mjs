import { extendObject } from '@angular/flex-layout/_private-utils';
const ALIAS_DELIMITERS = /(\.|-|_)/g;
function firstUpperCase(part) {
    let first = part.length > 0 ? part.charAt(0) : '';
    let remainder = (part.length > 1) ? part.slice(1) : '';
    return first.toUpperCase() + remainder;
}
/**
 * Converts snake-case to SnakeCase.
 * @param name Text to UpperCamelCase
 */
function camelCase(name) {
    return name
        .replace(ALIAS_DELIMITERS, '|')
        .split('|')
        .map(firstUpperCase)
        .join('');
}
/**
 * For each breakpoint, ensure that a Suffix is defined;
 * fallback to UpperCamelCase the unique Alias value
 */
export function validateSuffixes(list) {
    list.forEach((bp) => {
        if (!bp.suffix) {
            bp.suffix = camelCase(bp.alias); // create Suffix value based on alias
            bp.overlapping = !!bp.overlapping; // ensure default value
        }
    });
    return list;
}
/**
 * Merge a custom breakpoint list with the default list based on unique alias values
 *  - Items are added if the alias is not in the default list
 *  - Items are merged with the custom override if the alias exists in the default list
 */
export function mergeByAlias(defaults, custom = []) {
    const dict = {};
    defaults.forEach(bp => {
        dict[bp.alias] = bp;
    });
    // Merge custom breakpoints
    custom.forEach((bp) => {
        if (dict[bp.alias]) {
            extendObject(dict[bp.alias], bp);
        }
        else {
            dict[bp.alias] = bp;
        }
    });
    return validateSuffixes(Object.keys(dict).map(k => dict[k]));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJlYWtwb2ludC10b29scy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2xpYnMvZmxleC1sYXlvdXQvY29yZS9icmVha3BvaW50cy9icmVha3BvaW50LXRvb2xzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVFBLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxxQ0FBcUMsQ0FBQztBQUVqRSxNQUFNLGdCQUFnQixHQUFHLFdBQVcsQ0FBQztBQUNyQyxTQUFTLGNBQWMsQ0FBQyxJQUFZO0lBQ2xDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDbEQsSUFBSSxTQUFTLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDdkQsT0FBTyxLQUFLLENBQUMsV0FBVyxFQUFFLEdBQUcsU0FBUyxDQUFDO0FBQ3pDLENBQUM7QUFFRDs7O0dBR0c7QUFDSCxTQUFTLFNBQVMsQ0FBQyxJQUFZO0lBQzdCLE9BQU8sSUFBSTtTQUNOLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxHQUFHLENBQUM7U0FDOUIsS0FBSyxDQUFDLEdBQUcsQ0FBQztTQUNWLEdBQUcsQ0FBQyxjQUFjLENBQUM7U0FDbkIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ2hCLENBQUM7QUFFRDs7O0dBR0c7QUFDSCxNQUFNLFVBQVUsZ0JBQWdCLENBQUMsSUFBa0I7SUFDakQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQWMsRUFBRSxFQUFFO1FBQzlCLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFO1lBQ2QsRUFBRSxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUcscUNBQXFDO1lBQ3hFLEVBQUUsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQyx1QkFBdUI7U0FDM0Q7SUFDSCxDQUFDLENBQUMsQ0FBQztJQUNILE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQztBQUVEOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUsWUFBWSxDQUFDLFFBQXNCLEVBQUUsU0FBdUIsRUFBRTtJQUM1RSxNQUFNLElBQUksR0FBZ0MsRUFBRSxDQUFDO0lBQzdDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEVBQUU7UUFDcEIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDdEIsQ0FBQyxDQUFDLENBQUM7SUFDSCwyQkFBMkI7SUFDM0IsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQWMsRUFBRSxFQUFFO1FBQ2hDLElBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNsQixZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztTQUNsQzthQUFNO1lBQ0wsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUM7U0FDckI7SUFDSCxDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sZ0JBQWdCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQy9ELENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7QnJlYWtQb2ludH0gZnJvbSAnLi9icmVhay1wb2ludCc7XG5pbXBvcnQge2V4dGVuZE9iamVjdH0gZnJvbSAnQGFuZ3VsYXIvZmxleC1sYXlvdXQvX3ByaXZhdGUtdXRpbHMnO1xuXG5jb25zdCBBTElBU19ERUxJTUlURVJTID0gLyhcXC58LXxfKS9nO1xuZnVuY3Rpb24gZmlyc3RVcHBlckNhc2UocGFydDogc3RyaW5nKSB7XG4gIGxldCBmaXJzdCA9IHBhcnQubGVuZ3RoID4gMCA/IHBhcnQuY2hhckF0KDApIDogJyc7XG4gIGxldCByZW1haW5kZXIgPSAocGFydC5sZW5ndGggPiAxKSA/IHBhcnQuc2xpY2UoMSkgOiAnJztcbiAgcmV0dXJuIGZpcnN0LnRvVXBwZXJDYXNlKCkgKyByZW1haW5kZXI7XG59XG5cbi8qKlxuICogQ29udmVydHMgc25ha2UtY2FzZSB0byBTbmFrZUNhc2UuXG4gKiBAcGFyYW0gbmFtZSBUZXh0IHRvIFVwcGVyQ2FtZWxDYXNlXG4gKi9cbmZ1bmN0aW9uIGNhbWVsQ2FzZShuYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gbmFtZVxuICAgICAgLnJlcGxhY2UoQUxJQVNfREVMSU1JVEVSUywgJ3wnKVxuICAgICAgLnNwbGl0KCd8JylcbiAgICAgIC5tYXAoZmlyc3RVcHBlckNhc2UpXG4gICAgICAuam9pbignJyk7XG59XG5cbi8qKlxuICogRm9yIGVhY2ggYnJlYWtwb2ludCwgZW5zdXJlIHRoYXQgYSBTdWZmaXggaXMgZGVmaW5lZDtcbiAqIGZhbGxiYWNrIHRvIFVwcGVyQ2FtZWxDYXNlIHRoZSB1bmlxdWUgQWxpYXMgdmFsdWVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlU3VmZml4ZXMobGlzdDogQnJlYWtQb2ludFtdKTogQnJlYWtQb2ludFtdIHtcbiAgbGlzdC5mb3JFYWNoKChicDogQnJlYWtQb2ludCkgPT4ge1xuICAgIGlmICghYnAuc3VmZml4KSB7XG4gICAgICBicC5zdWZmaXggPSBjYW1lbENhc2UoYnAuYWxpYXMpOyAgIC8vIGNyZWF0ZSBTdWZmaXggdmFsdWUgYmFzZWQgb24gYWxpYXNcbiAgICAgIGJwLm92ZXJsYXBwaW5nID0gISFicC5vdmVybGFwcGluZzsgLy8gZW5zdXJlIGRlZmF1bHQgdmFsdWVcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gbGlzdDtcbn1cblxuLyoqXG4gKiBNZXJnZSBhIGN1c3RvbSBicmVha3BvaW50IGxpc3Qgd2l0aCB0aGUgZGVmYXVsdCBsaXN0IGJhc2VkIG9uIHVuaXF1ZSBhbGlhcyB2YWx1ZXNcbiAqICAtIEl0ZW1zIGFyZSBhZGRlZCBpZiB0aGUgYWxpYXMgaXMgbm90IGluIHRoZSBkZWZhdWx0IGxpc3RcbiAqICAtIEl0ZW1zIGFyZSBtZXJnZWQgd2l0aCB0aGUgY3VzdG9tIG92ZXJyaWRlIGlmIHRoZSBhbGlhcyBleGlzdHMgaW4gdGhlIGRlZmF1bHQgbGlzdFxuICovXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2VCeUFsaWFzKGRlZmF1bHRzOiBCcmVha1BvaW50W10sIGN1c3RvbTogQnJlYWtQb2ludFtdID0gW10pOiBCcmVha1BvaW50W10ge1xuICBjb25zdCBkaWN0OiB7W2tleTogc3RyaW5nXTogQnJlYWtQb2ludH0gPSB7fTtcbiAgZGVmYXVsdHMuZm9yRWFjaChicCA9PiB7XG4gICAgZGljdFticC5hbGlhc10gPSBicDtcbiAgfSk7XG4gIC8vIE1lcmdlIGN1c3RvbSBicmVha3BvaW50c1xuICBjdXN0b20uZm9yRWFjaCgoYnA6IEJyZWFrUG9pbnQpID0+IHtcbiAgICBpZiAoZGljdFticC5hbGlhc10pIHtcbiAgICAgIGV4dGVuZE9iamVjdChkaWN0W2JwLmFsaWFzXSwgYnApO1xuICAgIH0gZWxzZSB7XG4gICAgICBkaWN0W2JwLmFsaWFzXSA9IGJwO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIHZhbGlkYXRlU3VmZml4ZXMoT2JqZWN0LmtleXMoZGljdCkubWFwKGsgPT4gZGljdFtrXSkpO1xufVxuIl19