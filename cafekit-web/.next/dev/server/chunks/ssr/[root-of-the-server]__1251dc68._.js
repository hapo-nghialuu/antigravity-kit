module.exports = [
"[project]/cafekit-web/node_modules/kind-of/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

var toString = Object.prototype.toString;
module.exports = function kindOf(val) {
    if (val === void 0) return 'undefined';
    if (val === null) return 'null';
    var type = typeof val;
    if (type === 'boolean') return 'boolean';
    if (type === 'string') return 'string';
    if (type === 'number') return 'number';
    if (type === 'symbol') return 'symbol';
    if (type === 'function') {
        return isGeneratorFn(val) ? 'generatorfunction' : 'function';
    }
    if (isArray(val)) return 'array';
    if (isBuffer(val)) return 'buffer';
    if (isArguments(val)) return 'arguments';
    if (isDate(val)) return 'date';
    if (isError(val)) return 'error';
    if (isRegexp(val)) return 'regexp';
    switch(ctorName(val)){
        case 'Symbol':
            return 'symbol';
        case 'Promise':
            return 'promise';
        // Set, Map, WeakSet, WeakMap
        case 'WeakMap':
            return 'weakmap';
        case 'WeakSet':
            return 'weakset';
        case 'Map':
            return 'map';
        case 'Set':
            return 'set';
        // 8-bit typed arrays
        case 'Int8Array':
            return 'int8array';
        case 'Uint8Array':
            return 'uint8array';
        case 'Uint8ClampedArray':
            return 'uint8clampedarray';
        // 16-bit typed arrays
        case 'Int16Array':
            return 'int16array';
        case 'Uint16Array':
            return 'uint16array';
        // 32-bit typed arrays
        case 'Int32Array':
            return 'int32array';
        case 'Uint32Array':
            return 'uint32array';
        case 'Float32Array':
            return 'float32array';
        case 'Float64Array':
            return 'float64array';
    }
    if (isGeneratorObj(val)) {
        return 'generator';
    }
    // Non-plain objects
    type = toString.call(val);
    switch(type){
        case '[object Object]':
            return 'object';
        // iterators
        case '[object Map Iterator]':
            return 'mapiterator';
        case '[object Set Iterator]':
            return 'setiterator';
        case '[object String Iterator]':
            return 'stringiterator';
        case '[object Array Iterator]':
            return 'arrayiterator';
    }
    // other
    return type.slice(8, -1).toLowerCase().replace(/\s/g, '');
};
function ctorName(val) {
    return typeof val.constructor === 'function' ? val.constructor.name : null;
}
function isArray(val) {
    if (Array.isArray) return Array.isArray(val);
    return val instanceof Array;
}
function isError(val) {
    return val instanceof Error || typeof val.message === 'string' && val.constructor && typeof val.constructor.stackTraceLimit === 'number';
}
function isDate(val) {
    if (val instanceof Date) return true;
    return typeof val.toDateString === 'function' && typeof val.getDate === 'function' && typeof val.setDate === 'function';
}
function isRegexp(val) {
    if (val instanceof RegExp) return true;
    return typeof val.flags === 'string' && typeof val.ignoreCase === 'boolean' && typeof val.multiline === 'boolean' && typeof val.global === 'boolean';
}
function isGeneratorFn(name, val) {
    return ctorName(name) === 'GeneratorFunction';
}
function isGeneratorObj(val) {
    return typeof val.throw === 'function' && typeof val.return === 'function' && typeof val.next === 'function';
}
function isArguments(val) {
    try {
        if (typeof val.length === 'number' && typeof val.callee === 'function') {
            return true;
        }
    } catch (err) {
        if (err.message.indexOf('callee') !== -1) {
            return true;
        }
    }
    return false;
}
/**
 * If you need to support Safari 5-7 (8-10 yr-old browser),
 * take a look at https://github.com/feross/is-buffer
 */ function isBuffer(val) {
    if (val.constructor && typeof val.constructor.isBuffer === 'function') {
        return val.constructor.isBuffer(val);
    }
    return false;
}
}),
"[project]/cafekit-web/node_modules/is-extendable/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/*!
 * is-extendable <https://github.com/jonschlinkert/is-extendable>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */ module.exports = function isExtendable(val) {
    return typeof val !== 'undefined' && val !== null && (typeof val === 'object' || typeof val === 'function');
};
}),
"[project]/cafekit-web/node_modules/extend-shallow/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var isObject = __turbopack_context__.r("[project]/cafekit-web/node_modules/is-extendable/index.js [app-rsc] (ecmascript)");
module.exports = function extend(o /*, objects*/ ) {
    if (!isObject(o)) {
        o = {};
    }
    var len = arguments.length;
    for(var i = 1; i < len; i++){
        var obj = arguments[i];
        if (isObject(obj)) {
            assign(o, obj);
        }
    }
    return o;
};
function assign(a, b) {
    for(var key in b){
        if (hasOwn(b, key)) {
            a[key] = b[key];
        }
    }
}
/**
 * Returns true if the given `key` is an own property of `obj`.
 */ function hasOwn(obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
}
}),
"[project]/cafekit-web/node_modules/section-matter/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var typeOf = __turbopack_context__.r("[project]/cafekit-web/node_modules/kind-of/index.js [app-rsc] (ecmascript)");
var extend = __turbopack_context__.r("[project]/cafekit-web/node_modules/extend-shallow/index.js [app-rsc] (ecmascript)");
/**
 * Parse sections in `input` with the given `options`.
 *
 * ```js
 * var sections = require('{%= name %}');
 * var result = sections(input, options);
 * // { content: 'Content before sections', sections: [] }
 * ```
 * @param {String|Buffer|Object} `input` If input is an object, it's `content` property must be a string or buffer.
 * @param {Object} options
 * @return {Object} Returns an object with a `content` string and an array of `sections` objects.
 * @api public
 */ module.exports = function(input, options) {
    if (typeof options === 'function') {
        options = {
            parse: options
        };
    }
    var file = toObject(input);
    var defaults = {
        section_delimiter: '---',
        parse: identity
    };
    var opts = extend({}, defaults, options);
    var delim = opts.section_delimiter;
    var lines = file.content.split(/\r?\n/);
    var sections = null;
    var section = createSection();
    var content = [];
    var stack = [];
    function initSections(val) {
        file.content = val;
        sections = [];
        content = [];
    }
    function closeSection(val) {
        if (stack.length) {
            section.key = getKey(stack[0], delim);
            section.content = val;
            opts.parse(section, sections);
            sections.push(section);
            section = createSection();
            content = [];
            stack = [];
        }
    }
    for(var i = 0; i < lines.length; i++){
        var line = lines[i];
        var len = stack.length;
        var ln = line.trim();
        if (isDelimiter(ln, delim)) {
            if (ln.length === 3 && i !== 0) {
                if (len === 0 || len === 2) {
                    content.push(line);
                    continue;
                }
                stack.push(ln);
                section.data = content.join('\n');
                content = [];
                continue;
            }
            if (sections === null) {
                initSections(content.join('\n'));
            }
            if (len === 2) {
                closeSection(content.join('\n'));
            }
            stack.push(ln);
            continue;
        }
        content.push(line);
    }
    if (sections === null) {
        initSections(content.join('\n'));
    } else {
        closeSection(content.join('\n'));
    }
    file.sections = sections;
    return file;
};
function isDelimiter(line, delim) {
    if (line.slice(0, delim.length) !== delim) {
        return false;
    }
    if (line.charAt(delim.length + 1) === delim.slice(-1)) {
        return false;
    }
    return true;
}
function toObject(input) {
    if (typeOf(input) !== 'object') {
        input = {
            content: input
        };
    }
    if (typeof input.content !== 'string' && !isBuffer(input.content)) {
        throw new TypeError('expected a buffer or string');
    }
    input.content = input.content.toString();
    input.sections = [];
    return input;
}
function getKey(val, delim) {
    return val ? val.slice(delim.length).trim() : '';
}
function createSection() {
    return {
        key: '',
        data: '',
        content: ''
    };
}
function identity(val) {
    return val;
}
function isBuffer(val) {
    if (val && val.constructor && typeof val.constructor.isBuffer === 'function') {
        return val.constructor.isBuffer(val);
    }
    return false;
}
}),
"[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/exception.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// YAML error class. http://stackoverflow.com/questions/8458984
//
function YAMLException(reason, mark) {
    // Super constructor
    Error.call(this);
    this.name = 'YAMLException';
    this.reason = reason;
    this.mark = mark;
    this.message = (this.reason || '(unknown reason)') + (this.mark ? ' ' + this.mark.toString() : '');
    // Include stack trace in error object
    if (Error.captureStackTrace) {
        // Chrome and NodeJS
        Error.captureStackTrace(this, this.constructor);
    } else {
        // FF, IE 10+ and Safari 6+. Fallback for others
        this.stack = new Error().stack || '';
    }
}
// Inherit from Error
YAMLException.prototype = Object.create(Error.prototype);
YAMLException.prototype.constructor = YAMLException;
YAMLException.prototype.toString = function toString(compact) {
    var result = this.name + ': ';
    result += this.reason || '(unknown reason)';
    if (!compact && this.mark) {
        result += ' ' + this.mark.toString();
    }
    return result;
};
module.exports = YAMLException;
}),
"[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var YAMLException = __turbopack_context__.r("[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/exception.js [app-rsc] (ecmascript)");
var TYPE_CONSTRUCTOR_OPTIONS = [
    'kind',
    'resolve',
    'construct',
    'instanceOf',
    'predicate',
    'represent',
    'defaultStyle',
    'styleAliases'
];
var YAML_NODE_KINDS = [
    'scalar',
    'sequence',
    'mapping'
];
function compileStyleAliases(map) {
    var result = {};
    if (map !== null) {
        Object.keys(map).forEach(function(style) {
            map[style].forEach(function(alias) {
                result[String(alias)] = style;
            });
        });
    }
    return result;
}
function Type(tag, options) {
    options = options || {};
    Object.keys(options).forEach(function(name) {
        if (TYPE_CONSTRUCTOR_OPTIONS.indexOf(name) === -1) {
            throw new YAMLException('Unknown option "' + name + '" is met in definition of "' + tag + '" YAML type.');
        }
    });
    // TODO: Add tag format check.
    this.tag = tag;
    this.kind = options['kind'] || null;
    this.resolve = options['resolve'] || function() {
        return true;
    };
    this.construct = options['construct'] || function(data) {
        return data;
    };
    this.instanceOf = options['instanceOf'] || null;
    this.predicate = options['predicate'] || null;
    this.represent = options['represent'] || null;
    this.defaultStyle = options['defaultStyle'] || null;
    this.styleAliases = compileStyleAliases(options['styleAliases'] || null);
    if (YAML_NODE_KINDS.indexOf(this.kind) === -1) {
        throw new YAMLException('Unknown kind "' + this.kind + '" is specified for "' + tag + '" YAML type.');
    }
}
module.exports = Type;
}),
"[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/common.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

function isNothing(subject) {
    return typeof subject === 'undefined' || subject === null;
}
function isObject(subject) {
    return typeof subject === 'object' && subject !== null;
}
function toArray(sequence) {
    if (Array.isArray(sequence)) return sequence;
    else if (isNothing(sequence)) return [];
    return [
        sequence
    ];
}
function extend(target, source) {
    var index, length, key, sourceKeys;
    if (source) {
        sourceKeys = Object.keys(source);
        for(index = 0, length = sourceKeys.length; index < length; index += 1){
            key = sourceKeys[index];
            target[key] = source[key];
        }
    }
    return target;
}
function repeat(string, count) {
    var result = '', cycle;
    for(cycle = 0; cycle < count; cycle += 1){
        result += string;
    }
    return result;
}
function isNegativeZero(number) {
    return number === 0 && Number.NEGATIVE_INFINITY === 1 / number;
}
module.exports.isNothing = isNothing;
module.exports.isObject = isObject;
module.exports.toArray = toArray;
module.exports.repeat = repeat;
module.exports.isNegativeZero = isNegativeZero;
module.exports.extend = extend;
}),
"[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/schema.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/*eslint-disable max-len*/ var common = __turbopack_context__.r("[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/common.js [app-rsc] (ecmascript)");
var YAMLException = __turbopack_context__.r("[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/exception.js [app-rsc] (ecmascript)");
var Type = __turbopack_context__.r("[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type.js [app-rsc] (ecmascript)");
function compileList(schema, name, result) {
    var exclude = [];
    schema.include.forEach(function(includedSchema) {
        result = compileList(includedSchema, name, result);
    });
    schema[name].forEach(function(currentType) {
        result.forEach(function(previousType, previousIndex) {
            if (previousType.tag === currentType.tag && previousType.kind === currentType.kind) {
                exclude.push(previousIndex);
            }
        });
        result.push(currentType);
    });
    return result.filter(function(type, index) {
        return exclude.indexOf(index) === -1;
    });
}
function compileMap() {
    var result = {
        scalar: {},
        sequence: {},
        mapping: {},
        fallback: {}
    }, index, length;
    function collectType(type) {
        result[type.kind][type.tag] = result['fallback'][type.tag] = type;
    }
    for(index = 0, length = arguments.length; index < length; index += 1){
        arguments[index].forEach(collectType);
    }
    return result;
}
function Schema(definition) {
    this.include = definition.include || [];
    this.implicit = definition.implicit || [];
    this.explicit = definition.explicit || [];
    this.implicit.forEach(function(type) {
        if (type.loadKind && type.loadKind !== 'scalar') {
            throw new YAMLException('There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.');
        }
    });
    this.compiledImplicit = compileList(this, 'implicit', []);
    this.compiledExplicit = compileList(this, 'explicit', []);
    this.compiledTypeMap = compileMap(this.compiledImplicit, this.compiledExplicit);
}
Schema.DEFAULT = null;
Schema.create = function createSchema() {
    var schemas, types;
    switch(arguments.length){
        case 1:
            schemas = Schema.DEFAULT;
            types = arguments[0];
            break;
        case 2:
            schemas = arguments[0];
            types = arguments[1];
            break;
        default:
            throw new YAMLException('Wrong number of arguments for Schema.create function');
    }
    schemas = common.toArray(schemas);
    types = common.toArray(types);
    if (!schemas.every(function(schema) {
        return schema instanceof Schema;
    })) {
        throw new YAMLException('Specified list of super schemas (or a single Schema object) contains a non-Schema object.');
    }
    if (!types.every(function(type) {
        return type instanceof Type;
    })) {
        throw new YAMLException('Specified list of YAML types (or a single Type object) contains a non-Type object.');
    }
    return new Schema({
        include: schemas,
        explicit: types
    });
};
module.exports = Schema;
}),
"[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/str.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var Type = __turbopack_context__.r("[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type.js [app-rsc] (ecmascript)");
module.exports = new Type('tag:yaml.org,2002:str', {
    kind: 'scalar',
    construct: function(data) {
        return data !== null ? data : '';
    }
});
}),
"[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/seq.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var Type = __turbopack_context__.r("[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type.js [app-rsc] (ecmascript)");
module.exports = new Type('tag:yaml.org,2002:seq', {
    kind: 'sequence',
    construct: function(data) {
        return data !== null ? data : [];
    }
});
}),
"[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/map.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var Type = __turbopack_context__.r("[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type.js [app-rsc] (ecmascript)");
module.exports = new Type('tag:yaml.org,2002:map', {
    kind: 'mapping',
    construct: function(data) {
        return data !== null ? data : {};
    }
});
}),
"[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/schema/failsafe.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Standard YAML's Failsafe schema.
// http://www.yaml.org/spec/1.2/spec.html#id2802346
var Schema = __turbopack_context__.r("[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/schema.js [app-rsc] (ecmascript)");
module.exports = new Schema({
    explicit: [
        __turbopack_context__.r("[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/str.js [app-rsc] (ecmascript)"),
        __turbopack_context__.r("[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/seq.js [app-rsc] (ecmascript)"),
        __turbopack_context__.r("[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/map.js [app-rsc] (ecmascript)")
    ]
});
}),
"[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/null.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var Type = __turbopack_context__.r("[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type.js [app-rsc] (ecmascript)");
function resolveYamlNull(data) {
    if (data === null) return true;
    var max = data.length;
    return max === 1 && data === '~' || max === 4 && (data === 'null' || data === 'Null' || data === 'NULL');
}
function constructYamlNull() {
    return null;
}
function isNull(object) {
    return object === null;
}
module.exports = new Type('tag:yaml.org,2002:null', {
    kind: 'scalar',
    resolve: resolveYamlNull,
    construct: constructYamlNull,
    predicate: isNull,
    represent: {
        canonical: function() {
            return '~';
        },
        lowercase: function() {
            return 'null';
        },
        uppercase: function() {
            return 'NULL';
        },
        camelcase: function() {
            return 'Null';
        }
    },
    defaultStyle: 'lowercase'
});
}),
"[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/bool.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var Type = __turbopack_context__.r("[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type.js [app-rsc] (ecmascript)");
function resolveYamlBoolean(data) {
    if (data === null) return false;
    var max = data.length;
    return max === 4 && (data === 'true' || data === 'True' || data === 'TRUE') || max === 5 && (data === 'false' || data === 'False' || data === 'FALSE');
}
function constructYamlBoolean(data) {
    return data === 'true' || data === 'True' || data === 'TRUE';
}
function isBoolean(object) {
    return Object.prototype.toString.call(object) === '[object Boolean]';
}
module.exports = new Type('tag:yaml.org,2002:bool', {
    kind: 'scalar',
    resolve: resolveYamlBoolean,
    construct: constructYamlBoolean,
    predicate: isBoolean,
    represent: {
        lowercase: function(object) {
            return object ? 'true' : 'false';
        },
        uppercase: function(object) {
            return object ? 'TRUE' : 'FALSE';
        },
        camelcase: function(object) {
            return object ? 'True' : 'False';
        }
    },
    defaultStyle: 'lowercase'
});
}),
"[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/int.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var common = __turbopack_context__.r("[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/common.js [app-rsc] (ecmascript)");
var Type = __turbopack_context__.r("[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type.js [app-rsc] (ecmascript)");
function isHexCode(c) {
    return 0x30 /* 0 */  <= c && c <= 0x39 /* 9 */  || 0x41 /* A */  <= c && c <= 0x46 /* F */  || 0x61 /* a */  <= c && c <= 0x66 /* f */ ;
}
function isOctCode(c) {
    return 0x30 /* 0 */  <= c && c <= 0x37 /* 7 */ ;
}
function isDecCode(c) {
    return 0x30 /* 0 */  <= c && c <= 0x39 /* 9 */ ;
}
function resolveYamlInteger(data) {
    if (data === null) return false;
    var max = data.length, index = 0, hasDigits = false, ch;
    if (!max) return false;
    ch = data[index];
    // sign
    if (ch === '-' || ch === '+') {
        ch = data[++index];
    }
    if (ch === '0') {
        // 0
        if (index + 1 === max) return true;
        ch = data[++index];
        // base 2, base 8, base 16
        if (ch === 'b') {
            // base 2
            index++;
            for(; index < max; index++){
                ch = data[index];
                if (ch === '_') continue;
                if (ch !== '0' && ch !== '1') return false;
                hasDigits = true;
            }
            return hasDigits && ch !== '_';
        }
        if (ch === 'x') {
            // base 16
            index++;
            for(; index < max; index++){
                ch = data[index];
                if (ch === '_') continue;
                if (!isHexCode(data.charCodeAt(index))) return false;
                hasDigits = true;
            }
            return hasDigits && ch !== '_';
        }
        // base 8
        for(; index < max; index++){
            ch = data[index];
            if (ch === '_') continue;
            if (!isOctCode(data.charCodeAt(index))) return false;
            hasDigits = true;
        }
        return hasDigits && ch !== '_';
    }
    // base 10 (except 0) or base 60
    // value should not start with `_`;
    if (ch === '_') return false;
    for(; index < max; index++){
        ch = data[index];
        if (ch === '_') continue;
        if (ch === ':') break;
        if (!isDecCode(data.charCodeAt(index))) {
            return false;
        }
        hasDigits = true;
    }
    // Should have digits and should not end with `_`
    if (!hasDigits || ch === '_') return false;
    // if !base60 - done;
    if (ch !== ':') return true;
    // base60 almost not used, no needs to optimize
    return /^(:[0-5]?[0-9])+$/.test(data.slice(index));
}
function constructYamlInteger(data) {
    var value = data, sign = 1, ch, base, digits = [];
    if (value.indexOf('_') !== -1) {
        value = value.replace(/_/g, '');
    }
    ch = value[0];
    if (ch === '-' || ch === '+') {
        if (ch === '-') sign = -1;
        value = value.slice(1);
        ch = value[0];
    }
    if (value === '0') return 0;
    if (ch === '0') {
        if (value[1] === 'b') return sign * parseInt(value.slice(2), 2);
        if (value[1] === 'x') return sign * parseInt(value, 16);
        return sign * parseInt(value, 8);
    }
    if (value.indexOf(':') !== -1) {
        value.split(':').forEach(function(v) {
            digits.unshift(parseInt(v, 10));
        });
        value = 0;
        base = 1;
        digits.forEach(function(d) {
            value += d * base;
            base *= 60;
        });
        return sign * value;
    }
    return sign * parseInt(value, 10);
}
function isInteger(object) {
    return Object.prototype.toString.call(object) === '[object Number]' && object % 1 === 0 && !common.isNegativeZero(object);
}
module.exports = new Type('tag:yaml.org,2002:int', {
    kind: 'scalar',
    resolve: resolveYamlInteger,
    construct: constructYamlInteger,
    predicate: isInteger,
    represent: {
        binary: function(obj) {
            return obj >= 0 ? '0b' + obj.toString(2) : '-0b' + obj.toString(2).slice(1);
        },
        octal: function(obj) {
            return obj >= 0 ? '0' + obj.toString(8) : '-0' + obj.toString(8).slice(1);
        },
        decimal: function(obj) {
            return obj.toString(10);
        },
        /* eslint-disable max-len */ hexadecimal: function(obj) {
            return obj >= 0 ? '0x' + obj.toString(16).toUpperCase() : '-0x' + obj.toString(16).toUpperCase().slice(1);
        }
    },
    defaultStyle: 'decimal',
    styleAliases: {
        binary: [
            2,
            'bin'
        ],
        octal: [
            8,
            'oct'
        ],
        decimal: [
            10,
            'dec'
        ],
        hexadecimal: [
            16,
            'hex'
        ]
    }
});
}),
"[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/float.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var common = __turbopack_context__.r("[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/common.js [app-rsc] (ecmascript)");
var Type = __turbopack_context__.r("[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type.js [app-rsc] (ecmascript)");
var YAML_FLOAT_PATTERN = new RegExp(// 2.5e4, 2.5 and integers
'^(?:[-+]?(?:0|[1-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?' + // .2e4, .2
// special case, seems not from spec
'|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?' + // 20:59
'|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\\.[0-9_]*' + // .inf
'|[-+]?\\.(?:inf|Inf|INF)' + // .nan
'|\\.(?:nan|NaN|NAN))$');
function resolveYamlFloat(data) {
    if (data === null) return false;
    if (!YAML_FLOAT_PATTERN.test(data) || // Quick hack to not allow integers end with `_`
    // Probably should update regexp & check speed
    data[data.length - 1] === '_') {
        return false;
    }
    return true;
}
function constructYamlFloat(data) {
    var value, sign, base, digits;
    value = data.replace(/_/g, '').toLowerCase();
    sign = value[0] === '-' ? -1 : 1;
    digits = [];
    if ('+-'.indexOf(value[0]) >= 0) {
        value = value.slice(1);
    }
    if (value === '.inf') {
        return sign === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;
    } else if (value === '.nan') {
        return NaN;
    } else if (value.indexOf(':') >= 0) {
        value.split(':').forEach(function(v) {
            digits.unshift(parseFloat(v, 10));
        });
        value = 0.0;
        base = 1;
        digits.forEach(function(d) {
            value += d * base;
            base *= 60;
        });
        return sign * value;
    }
    return sign * parseFloat(value, 10);
}
var SCIENTIFIC_WITHOUT_DOT = /^[-+]?[0-9]+e/;
function representYamlFloat(object, style) {
    var res;
    if (isNaN(object)) {
        switch(style){
            case 'lowercase':
                return '.nan';
            case 'uppercase':
                return '.NAN';
            case 'camelcase':
                return '.NaN';
        }
    } else if (Number.POSITIVE_INFINITY === object) {
        switch(style){
            case 'lowercase':
                return '.inf';
            case 'uppercase':
                return '.INF';
            case 'camelcase':
                return '.Inf';
        }
    } else if (Number.NEGATIVE_INFINITY === object) {
        switch(style){
            case 'lowercase':
                return '-.inf';
            case 'uppercase':
                return '-.INF';
            case 'camelcase':
                return '-.Inf';
        }
    } else if (common.isNegativeZero(object)) {
        return '-0.0';
    }
    res = object.toString(10);
    // JS stringifier can build scientific format without dots: 5e-100,
    // while YAML requres dot: 5.e-100. Fix it with simple hack
    return SCIENTIFIC_WITHOUT_DOT.test(res) ? res.replace('e', '.e') : res;
}
function isFloat(object) {
    return Object.prototype.toString.call(object) === '[object Number]' && (object % 1 !== 0 || common.isNegativeZero(object));
}
module.exports = new Type('tag:yaml.org,2002:float', {
    kind: 'scalar',
    resolve: resolveYamlFloat,
    construct: constructYamlFloat,
    predicate: isFloat,
    represent: representYamlFloat,
    defaultStyle: 'lowercase'
});
}),
"[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/schema/json.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Standard YAML's JSON schema.
// http://www.yaml.org/spec/1.2/spec.html#id2803231
//
// NOTE: JS-YAML does not support schema-specific tag resolution restrictions.
// So, this schema is not such strict as defined in the YAML specification.
// It allows numbers in binary notaion, use `Null` and `NULL` as `null`, etc.
var Schema = __turbopack_context__.r("[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/schema.js [app-rsc] (ecmascript)");
module.exports = new Schema({
    include: [
        __turbopack_context__.r("[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/schema/failsafe.js [app-rsc] (ecmascript)")
    ],
    implicit: [
        __turbopack_context__.r("[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/null.js [app-rsc] (ecmascript)"),
        __turbopack_context__.r("[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/bool.js [app-rsc] (ecmascript)"),
        __turbopack_context__.r("[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/int.js [app-rsc] (ecmascript)"),
        __turbopack_context__.r("[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/float.js [app-rsc] (ecmascript)")
    ]
});
}),
"[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/schema/core.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Standard YAML's Core schema.
// http://www.yaml.org/spec/1.2/spec.html#id2804923
//
// NOTE: JS-YAML does not support schema-specific tag resolution restrictions.
// So, Core schema has no distinctions from JSON schema is JS-YAML.
var Schema = __turbopack_context__.r("[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/schema.js [app-rsc] (ecmascript)");
module.exports = new Schema({
    include: [
        __turbopack_context__.r("[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/schema/json.js [app-rsc] (ecmascript)")
    ]
});
}),
"[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/timestamp.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var Type = __turbopack_context__.r("[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type.js [app-rsc] (ecmascript)");
var YAML_DATE_REGEXP = new RegExp('^([0-9][0-9][0-9][0-9])' + // [1] year
'-([0-9][0-9])' + // [2] month
'-([0-9][0-9])$'); // [3] day
var YAML_TIMESTAMP_REGEXP = new RegExp('^([0-9][0-9][0-9][0-9])' + // [1] year
'-([0-9][0-9]?)' + // [2] month
'-([0-9][0-9]?)' + // [3] day
'(?:[Tt]|[ \\t]+)' + // ...
'([0-9][0-9]?)' + // [4] hour
':([0-9][0-9])' + // [5] minute
':([0-9][0-9])' + // [6] second
'(?:\\.([0-9]*))?' + // [7] fraction
'(?:[ \\t]*(Z|([-+])([0-9][0-9]?)' + // [8] tz [9] tz_sign [10] tz_hour
'(?::([0-9][0-9]))?))?$'); // [11] tz_minute
function resolveYamlTimestamp(data) {
    if (data === null) return false;
    if (YAML_DATE_REGEXP.exec(data) !== null) return true;
    if (YAML_TIMESTAMP_REGEXP.exec(data) !== null) return true;
    return false;
}
function constructYamlTimestamp(data) {
    var match, year, month, day, hour, minute, second, fraction = 0, delta = null, tz_hour, tz_minute, date;
    match = YAML_DATE_REGEXP.exec(data);
    if (match === null) match = YAML_TIMESTAMP_REGEXP.exec(data);
    if (match === null) throw new Error('Date resolve error');
    // match: [1] year [2] month [3] day
    year = +match[1];
    month = +match[2] - 1; // JS month starts with 0
    day = +match[3];
    if (!match[4]) {
        return new Date(Date.UTC(year, month, day));
    }
    // match: [4] hour [5] minute [6] second [7] fraction
    hour = +match[4];
    minute = +match[5];
    second = +match[6];
    if (match[7]) {
        fraction = match[7].slice(0, 3);
        while(fraction.length < 3){
            fraction += '0';
        }
        fraction = +fraction;
    }
    // match: [8] tz [9] tz_sign [10] tz_hour [11] tz_minute
    if (match[9]) {
        tz_hour = +match[10];
        tz_minute = +(match[11] || 0);
        delta = (tz_hour * 60 + tz_minute) * 60000; // delta in mili-seconds
        if (match[9] === '-') delta = -delta;
    }
    date = new Date(Date.UTC(year, month, day, hour, minute, second, fraction));
    if (delta) date.setTime(date.getTime() - delta);
    return date;
}
function representYamlTimestamp(object /*, style*/ ) {
    return object.toISOString();
}
module.exports = new Type('tag:yaml.org,2002:timestamp', {
    kind: 'scalar',
    resolve: resolveYamlTimestamp,
    construct: constructYamlTimestamp,
    instanceOf: Date,
    represent: representYamlTimestamp
});
}),
"[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/merge.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var Type = __turbopack_context__.r("[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type.js [app-rsc] (ecmascript)");
function resolveYamlMerge(data) {
    return data === '<<' || data === null;
}
module.exports = new Type('tag:yaml.org,2002:merge', {
    kind: 'scalar',
    resolve: resolveYamlMerge
});
}),
"[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/binary.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/*eslint-disable no-bitwise*/ var NodeBuffer;
try {
    // A trick for browserified version, to not include `Buffer` shim
    var _require = /*TURBOPACK member replacement*/ __turbopack_context__.t;
    NodeBuffer = __turbopack_context__.r("[externals]/buffer [external] (buffer, cjs)").Buffer;
} catch (__) {}
var Type = __turbopack_context__.r("[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type.js [app-rsc] (ecmascript)");
// [ 64, 65, 66 ] -> [ padding, CR, LF ]
var BASE64_MAP = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\n\r';
function resolveYamlBinary(data) {
    if (data === null) return false;
    var code, idx, bitlen = 0, max = data.length, map = BASE64_MAP;
    // Convert one by one.
    for(idx = 0; idx < max; idx++){
        code = map.indexOf(data.charAt(idx));
        // Skip CR/LF
        if (code > 64) continue;
        // Fail on illegal characters
        if (code < 0) return false;
        bitlen += 6;
    }
    // If there are any bits left, source was corrupted
    return bitlen % 8 === 0;
}
function constructYamlBinary(data) {
    var idx, tailbits, input = data.replace(/[\r\n=]/g, ''), max = input.length, map = BASE64_MAP, bits = 0, result = [];
    // Collect by 6*4 bits (3 bytes)
    for(idx = 0; idx < max; idx++){
        if (idx % 4 === 0 && idx) {
            result.push(bits >> 16 & 0xFF);
            result.push(bits >> 8 & 0xFF);
            result.push(bits & 0xFF);
        }
        bits = bits << 6 | map.indexOf(input.charAt(idx));
    }
    // Dump tail
    tailbits = max % 4 * 6;
    if (tailbits === 0) {
        result.push(bits >> 16 & 0xFF);
        result.push(bits >> 8 & 0xFF);
        result.push(bits & 0xFF);
    } else if (tailbits === 18) {
        result.push(bits >> 10 & 0xFF);
        result.push(bits >> 2 & 0xFF);
    } else if (tailbits === 12) {
        result.push(bits >> 4 & 0xFF);
    }
    // Wrap into Buffer for NodeJS and leave Array for browser
    if (NodeBuffer) {
        // Support node 6.+ Buffer API when available
        return NodeBuffer.from ? NodeBuffer.from(result) : new NodeBuffer(result);
    }
    return result;
}
function representYamlBinary(object /*, style*/ ) {
    var result = '', bits = 0, idx, tail, max = object.length, map = BASE64_MAP;
    // Convert every three bytes to 4 ASCII characters.
    for(idx = 0; idx < max; idx++){
        if (idx % 3 === 0 && idx) {
            result += map[bits >> 18 & 0x3F];
            result += map[bits >> 12 & 0x3F];
            result += map[bits >> 6 & 0x3F];
            result += map[bits & 0x3F];
        }
        bits = (bits << 8) + object[idx];
    }
    // Dump tail
    tail = max % 3;
    if (tail === 0) {
        result += map[bits >> 18 & 0x3F];
        result += map[bits >> 12 & 0x3F];
        result += map[bits >> 6 & 0x3F];
        result += map[bits & 0x3F];
    } else if (tail === 2) {
        result += map[bits >> 10 & 0x3F];
        result += map[bits >> 4 & 0x3F];
        result += map[bits << 2 & 0x3F];
        result += map[64];
    } else if (tail === 1) {
        result += map[bits >> 2 & 0x3F];
        result += map[bits << 4 & 0x3F];
        result += map[64];
        result += map[64];
    }
    return result;
}
function isBinary(object) {
    return NodeBuffer && NodeBuffer.isBuffer(object);
}
module.exports = new Type('tag:yaml.org,2002:binary', {
    kind: 'scalar',
    resolve: resolveYamlBinary,
    construct: constructYamlBinary,
    predicate: isBinary,
    represent: representYamlBinary
});
}),
"[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/omap.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var Type = __turbopack_context__.r("[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type.js [app-rsc] (ecmascript)");
var _hasOwnProperty = Object.prototype.hasOwnProperty;
var _toString = Object.prototype.toString;
function resolveYamlOmap(data) {
    if (data === null) return true;
    var objectKeys = [], index, length, pair, pairKey, pairHasKey, object = data;
    for(index = 0, length = object.length; index < length; index += 1){
        pair = object[index];
        pairHasKey = false;
        if (_toString.call(pair) !== '[object Object]') return false;
        for(pairKey in pair){
            if (_hasOwnProperty.call(pair, pairKey)) {
                if (!pairHasKey) pairHasKey = true;
                else return false;
            }
        }
        if (!pairHasKey) return false;
        if (objectKeys.indexOf(pairKey) === -1) objectKeys.push(pairKey);
        else return false;
    }
    return true;
}
function constructYamlOmap(data) {
    return data !== null ? data : [];
}
module.exports = new Type('tag:yaml.org,2002:omap', {
    kind: 'sequence',
    resolve: resolveYamlOmap,
    construct: constructYamlOmap
});
}),
"[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/pairs.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var Type = __turbopack_context__.r("[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type.js [app-rsc] (ecmascript)");
var _toString = Object.prototype.toString;
function resolveYamlPairs(data) {
    if (data === null) return true;
    var index, length, pair, keys, result, object = data;
    result = new Array(object.length);
    for(index = 0, length = object.length; index < length; index += 1){
        pair = object[index];
        if (_toString.call(pair) !== '[object Object]') return false;
        keys = Object.keys(pair);
        if (keys.length !== 1) return false;
        result[index] = [
            keys[0],
            pair[keys[0]]
        ];
    }
    return true;
}
function constructYamlPairs(data) {
    if (data === null) return [];
    var index, length, pair, keys, result, object = data;
    result = new Array(object.length);
    for(index = 0, length = object.length; index < length; index += 1){
        pair = object[index];
        keys = Object.keys(pair);
        result[index] = [
            keys[0],
            pair[keys[0]]
        ];
    }
    return result;
}
module.exports = new Type('tag:yaml.org,2002:pairs', {
    kind: 'sequence',
    resolve: resolveYamlPairs,
    construct: constructYamlPairs
});
}),
"[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/set.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var Type = __turbopack_context__.r("[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type.js [app-rsc] (ecmascript)");
var _hasOwnProperty = Object.prototype.hasOwnProperty;
function resolveYamlSet(data) {
    if (data === null) return true;
    var key, object = data;
    for(key in object){
        if (_hasOwnProperty.call(object, key)) {
            if (object[key] !== null) return false;
        }
    }
    return true;
}
function constructYamlSet(data) {
    return data !== null ? data : {};
}
module.exports = new Type('tag:yaml.org,2002:set', {
    kind: 'mapping',
    resolve: resolveYamlSet,
    construct: constructYamlSet
});
}),
"[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/schema/default_safe.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// JS-YAML's default schema for `safeLoad` function.
// It is not described in the YAML specification.
//
// This schema is based on standard YAML's Core schema and includes most of
// extra types described at YAML tag repository. (http://yaml.org/type/)
var Schema = __turbopack_context__.r("[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/schema.js [app-rsc] (ecmascript)");
module.exports = new Schema({
    include: [
        __turbopack_context__.r("[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/schema/core.js [app-rsc] (ecmascript)")
    ],
    implicit: [
        __turbopack_context__.r("[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/timestamp.js [app-rsc] (ecmascript)"),
        __turbopack_context__.r("[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/merge.js [app-rsc] (ecmascript)")
    ],
    explicit: [
        __turbopack_context__.r("[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/binary.js [app-rsc] (ecmascript)"),
        __turbopack_context__.r("[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/omap.js [app-rsc] (ecmascript)"),
        __turbopack_context__.r("[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/pairs.js [app-rsc] (ecmascript)"),
        __turbopack_context__.r("[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/set.js [app-rsc] (ecmascript)")
    ]
});
}),
"[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/js/undefined.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var Type = __turbopack_context__.r("[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type.js [app-rsc] (ecmascript)");
function resolveJavascriptUndefined() {
    return true;
}
function constructJavascriptUndefined() {
    /*eslint-disable no-undefined*/ return undefined;
}
function representJavascriptUndefined() {
    return '';
}
function isUndefined(object) {
    return typeof object === 'undefined';
}
module.exports = new Type('tag:yaml.org,2002:js/undefined', {
    kind: 'scalar',
    resolve: resolveJavascriptUndefined,
    construct: constructJavascriptUndefined,
    predicate: isUndefined,
    represent: representJavascriptUndefined
});
}),
"[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/js/regexp.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var Type = __turbopack_context__.r("[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type.js [app-rsc] (ecmascript)");
function resolveJavascriptRegExp(data) {
    if (data === null) return false;
    if (data.length === 0) return false;
    var regexp = data, tail = /\/([gim]*)$/.exec(data), modifiers = '';
    // if regexp starts with '/' it can have modifiers and must be properly closed
    // `/foo/gim` - modifiers tail can be maximum 3 chars
    if (regexp[0] === '/') {
        if (tail) modifiers = tail[1];
        if (modifiers.length > 3) return false;
        // if expression starts with /, is should be properly terminated
        if (regexp[regexp.length - modifiers.length - 1] !== '/') return false;
    }
    return true;
}
function constructJavascriptRegExp(data) {
    var regexp = data, tail = /\/([gim]*)$/.exec(data), modifiers = '';
    // `/foo/gim` - tail can be maximum 4 chars
    if (regexp[0] === '/') {
        if (tail) modifiers = tail[1];
        regexp = regexp.slice(1, regexp.length - modifiers.length - 1);
    }
    return new RegExp(regexp, modifiers);
}
function representJavascriptRegExp(object /*, style*/ ) {
    var result = '/' + object.source + '/';
    if (object.global) result += 'g';
    if (object.multiline) result += 'm';
    if (object.ignoreCase) result += 'i';
    return result;
}
function isRegExp(object) {
    return Object.prototype.toString.call(object) === '[object RegExp]';
}
module.exports = new Type('tag:yaml.org,2002:js/regexp', {
    kind: 'scalar',
    resolve: resolveJavascriptRegExp,
    construct: constructJavascriptRegExp,
    predicate: isRegExp,
    represent: representJavascriptRegExp
});
}),
"[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/js/function.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var esprima;
// Browserified version does not have esprima
//
// 1. For node.js just require module as deps
// 2. For browser try to require mudule via external AMD system.
//    If not found - try to fallback to window.esprima. If not
//    found too - then fail to parse.
//
try {
    // workaround to exclude package from browserify list.
    var _require = /*TURBOPACK member replacement*/ __turbopack_context__.t;
    esprima = __turbopack_context__.r("[project]/cafekit-web/node_modules/esprima/dist/esprima.js [app-rsc] (ecmascript)");
} catch (_) {
    /* eslint-disable no-redeclare */ /* global window */ if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
}
var Type = __turbopack_context__.r("[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type.js [app-rsc] (ecmascript)");
function resolveJavascriptFunction(data) {
    if (data === null) return false;
    try {
        var source = '(' + data + ')', ast = esprima.parse(source, {
            range: true
        });
        if (ast.type !== 'Program' || ast.body.length !== 1 || ast.body[0].type !== 'ExpressionStatement' || ast.body[0].expression.type !== 'ArrowFunctionExpression' && ast.body[0].expression.type !== 'FunctionExpression') {
            return false;
        }
        return true;
    } catch (err) {
        return false;
    }
}
function constructJavascriptFunction(data) {
    /*jslint evil:true*/ var source = '(' + data + ')', ast = esprima.parse(source, {
        range: true
    }), params = [], body;
    if (ast.type !== 'Program' || ast.body.length !== 1 || ast.body[0].type !== 'ExpressionStatement' || ast.body[0].expression.type !== 'ArrowFunctionExpression' && ast.body[0].expression.type !== 'FunctionExpression') {
        throw new Error('Failed to resolve function');
    }
    ast.body[0].expression.params.forEach(function(param) {
        params.push(param.name);
    });
    body = ast.body[0].expression.body.range;
    // Esprima's ranges include the first '{' and the last '}' characters on
    // function expressions. So cut them out.
    if (ast.body[0].expression.body.type === 'BlockStatement') {
        /*eslint-disable no-new-func*/ return new Function(params, source.slice(body[0] + 1, body[1] - 1));
    }
    // ES6 arrow functions can omit the BlockStatement. In that case, just return
    // the body.
    /*eslint-disable no-new-func*/ return new Function(params, 'return ' + source.slice(body[0], body[1]));
}
function representJavascriptFunction(object /*, style*/ ) {
    return object.toString();
}
function isFunction(object) {
    return Object.prototype.toString.call(object) === '[object Function]';
}
module.exports = new Type('tag:yaml.org,2002:js/function', {
    kind: 'scalar',
    resolve: resolveJavascriptFunction,
    construct: constructJavascriptFunction,
    predicate: isFunction,
    represent: representJavascriptFunction
});
}),
"[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/schema/default_full.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// JS-YAML's default schema for `load` function.
// It is not described in the YAML specification.
//
// This schema is based on JS-YAML's default safe schema and includes
// JavaScript-specific types: !!js/undefined, !!js/regexp and !!js/function.
//
// Also this schema is used as default base schema at `Schema.create` function.
var Schema = __turbopack_context__.r("[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/schema.js [app-rsc] (ecmascript)");
module.exports = Schema.DEFAULT = new Schema({
    include: [
        __turbopack_context__.r("[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/schema/default_safe.js [app-rsc] (ecmascript)")
    ],
    explicit: [
        __turbopack_context__.r("[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/js/undefined.js [app-rsc] (ecmascript)"),
        __turbopack_context__.r("[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/js/regexp.js [app-rsc] (ecmascript)"),
        __turbopack_context__.r("[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/js/function.js [app-rsc] (ecmascript)")
    ]
});
}),
"[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/mark.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var common = __turbopack_context__.r("[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/common.js [app-rsc] (ecmascript)");
function Mark(name, buffer, position, line, column) {
    this.name = name;
    this.buffer = buffer;
    this.position = position;
    this.line = line;
    this.column = column;
}
Mark.prototype.getSnippet = function getSnippet(indent, maxLength) {
    var head, start, tail, end, snippet;
    if (!this.buffer) return null;
    indent = indent || 4;
    maxLength = maxLength || 75;
    head = '';
    start = this.position;
    while(start > 0 && '\x00\r\n\x85\u2028\u2029'.indexOf(this.buffer.charAt(start - 1)) === -1){
        start -= 1;
        if (this.position - start > maxLength / 2 - 1) {
            head = ' ... ';
            start += 5;
            break;
        }
    }
    tail = '';
    end = this.position;
    while(end < this.buffer.length && '\x00\r\n\x85\u2028\u2029'.indexOf(this.buffer.charAt(end)) === -1){
        end += 1;
        if (end - this.position > maxLength / 2 - 1) {
            tail = ' ... ';
            end -= 5;
            break;
        }
    }
    snippet = this.buffer.slice(start, end);
    return common.repeat(' ', indent) + head + snippet + tail + '\n' + common.repeat(' ', indent + this.position - start + head.length) + '^';
};
Mark.prototype.toString = function toString(compact) {
    var snippet, where = '';
    if (this.name) {
        where += 'in "' + this.name + '" ';
    }
    where += 'at line ' + (this.line + 1) + ', column ' + (this.column + 1);
    if (!compact) {
        snippet = this.getSnippet();
        if (snippet) {
            where += ':\n' + snippet;
        }
    }
    return where;
};
module.exports = Mark;
}),
"[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/loader.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/*eslint-disable max-len,no-use-before-define*/ var common = __turbopack_context__.r("[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/common.js [app-rsc] (ecmascript)");
var YAMLException = __turbopack_context__.r("[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/exception.js [app-rsc] (ecmascript)");
var Mark = __turbopack_context__.r("[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/mark.js [app-rsc] (ecmascript)");
var DEFAULT_SAFE_SCHEMA = __turbopack_context__.r("[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/schema/default_safe.js [app-rsc] (ecmascript)");
var DEFAULT_FULL_SCHEMA = __turbopack_context__.r("[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/schema/default_full.js [app-rsc] (ecmascript)");
var _hasOwnProperty = Object.prototype.hasOwnProperty;
var CONTEXT_FLOW_IN = 1;
var CONTEXT_FLOW_OUT = 2;
var CONTEXT_BLOCK_IN = 3;
var CONTEXT_BLOCK_OUT = 4;
var CHOMPING_CLIP = 1;
var CHOMPING_STRIP = 2;
var CHOMPING_KEEP = 3;
var PATTERN_NON_PRINTABLE = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
var PATTERN_NON_ASCII_LINE_BREAKS = /[\x85\u2028\u2029]/;
var PATTERN_FLOW_INDICATORS = /[,\[\]\{\}]/;
var PATTERN_TAG_HANDLE = /^(?:!|!!|![a-z\-]+!)$/i;
var PATTERN_TAG_URI = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
function _class(obj) {
    return Object.prototype.toString.call(obj);
}
function is_EOL(c) {
    return c === 0x0A /* LF */  || c === 0x0D /* CR */ ;
}
function is_WHITE_SPACE(c) {
    return c === 0x09 /* Tab */  || c === 0x20 /* Space */ ;
}
function is_WS_OR_EOL(c) {
    return c === 0x09 /* Tab */  || c === 0x20 /* Space */  || c === 0x0A /* LF */  || c === 0x0D /* CR */ ;
}
function is_FLOW_INDICATOR(c) {
    return c === 0x2C /* , */  || c === 0x5B /* [ */  || c === 0x5D /* ] */  || c === 0x7B /* { */  || c === 0x7D /* } */ ;
}
function fromHexCode(c) {
    var lc;
    if (0x30 /* 0 */  <= c && c <= 0x39 /* 9 */ ) {
        return c - 0x30;
    }
    /*eslint-disable no-bitwise*/ lc = c | 0x20;
    if (0x61 /* a */  <= lc && lc <= 0x66 /* f */ ) {
        return lc - 0x61 + 10;
    }
    return -1;
}
function escapedHexLen(c) {
    if (c === 0x78 /* x */ ) {
        return 2;
    }
    if (c === 0x75 /* u */ ) {
        return 4;
    }
    if (c === 0x55 /* U */ ) {
        return 8;
    }
    return 0;
}
function fromDecimalCode(c) {
    if (0x30 /* 0 */  <= c && c <= 0x39 /* 9 */ ) {
        return c - 0x30;
    }
    return -1;
}
function simpleEscapeSequence(c) {
    /* eslint-disable indent */ return c === 0x30 /* 0 */  ? '\x00' : c === 0x61 /* a */  ? '\x07' : c === 0x62 /* b */  ? '\x08' : c === 0x74 /* t */  ? '\x09' : c === 0x09 /* Tab */  ? '\x09' : c === 0x6E /* n */  ? '\x0A' : c === 0x76 /* v */  ? '\x0B' : c === 0x66 /* f */  ? '\x0C' : c === 0x72 /* r */  ? '\x0D' : c === 0x65 /* e */  ? '\x1B' : c === 0x20 /* Space */  ? ' ' : c === 0x22 /* " */  ? '\x22' : c === 0x2F /* / */  ? '/' : c === 0x5C /* \ */  ? '\x5C' : c === 0x4E /* N */  ? '\x85' : c === 0x5F /* _ */  ? '\xA0' : c === 0x4C /* L */  ? '\u2028' : c === 0x50 /* P */  ? '\u2029' : '';
}
function charFromCodepoint(c) {
    if (c <= 0xFFFF) {
        return String.fromCharCode(c);
    }
    // Encode UTF-16 surrogate pair
    // https://en.wikipedia.org/wiki/UTF-16#Code_points_U.2B010000_to_U.2B10FFFF
    return String.fromCharCode((c - 0x010000 >> 10) + 0xD800, (c - 0x010000 & 0x03FF) + 0xDC00);
}
// set a property of a literal object, while protecting against prototype pollution,
// see https://github.com/nodeca/js-yaml/issues/164 for more details
function setProperty(object, key, value) {
    // used for this specific key only because Object.defineProperty is slow
    if (key === '__proto__') {
        Object.defineProperty(object, key, {
            configurable: true,
            enumerable: true,
            writable: true,
            value: value
        });
    } else {
        object[key] = value;
    }
}
var simpleEscapeCheck = new Array(256); // integer, for fast access
var simpleEscapeMap = new Array(256);
for(var i = 0; i < 256; i++){
    simpleEscapeCheck[i] = simpleEscapeSequence(i) ? 1 : 0;
    simpleEscapeMap[i] = simpleEscapeSequence(i);
}
function State(input, options) {
    this.input = input;
    this.filename = options['filename'] || null;
    this.schema = options['schema'] || DEFAULT_FULL_SCHEMA;
    this.onWarning = options['onWarning'] || null;
    this.legacy = options['legacy'] || false;
    this.json = options['json'] || false;
    this.listener = options['listener'] || null;
    this.implicitTypes = this.schema.compiledImplicit;
    this.typeMap = this.schema.compiledTypeMap;
    this.length = input.length;
    this.position = 0;
    this.line = 0;
    this.lineStart = 0;
    this.lineIndent = 0;
    this.documents = [];
/*
  this.version;
  this.checkLineBreaks;
  this.tagMap;
  this.anchorMap;
  this.tag;
  this.anchor;
  this.kind;
  this.result;*/ }
function generateError(state, message) {
    return new YAMLException(message, new Mark(state.filename, state.input, state.position, state.line, state.position - state.lineStart));
}
function throwError(state, message) {
    throw generateError(state, message);
}
function throwWarning(state, message) {
    if (state.onWarning) {
        state.onWarning.call(null, generateError(state, message));
    }
}
var directiveHandlers = {
    YAML: function handleYamlDirective(state, name, args) {
        var match, major, minor;
        if (state.version !== null) {
            throwError(state, 'duplication of %YAML directive');
        }
        if (args.length !== 1) {
            throwError(state, 'YAML directive accepts exactly one argument');
        }
        match = /^([0-9]+)\.([0-9]+)$/.exec(args[0]);
        if (match === null) {
            throwError(state, 'ill-formed argument of the YAML directive');
        }
        major = parseInt(match[1], 10);
        minor = parseInt(match[2], 10);
        if (major !== 1) {
            throwError(state, 'unacceptable YAML version of the document');
        }
        state.version = args[0];
        state.checkLineBreaks = minor < 2;
        if (minor !== 1 && minor !== 2) {
            throwWarning(state, 'unsupported YAML version of the document');
        }
    },
    TAG: function handleTagDirective(state, name, args) {
        var handle, prefix;
        if (args.length !== 2) {
            throwError(state, 'TAG directive accepts exactly two arguments');
        }
        handle = args[0];
        prefix = args[1];
        if (!PATTERN_TAG_HANDLE.test(handle)) {
            throwError(state, 'ill-formed tag handle (first argument) of the TAG directive');
        }
        if (_hasOwnProperty.call(state.tagMap, handle)) {
            throwError(state, 'there is a previously declared suffix for "' + handle + '" tag handle');
        }
        if (!PATTERN_TAG_URI.test(prefix)) {
            throwError(state, 'ill-formed tag prefix (second argument) of the TAG directive');
        }
        state.tagMap[handle] = prefix;
    }
};
function captureSegment(state, start, end, checkJson) {
    var _position, _length, _character, _result;
    if (start < end) {
        _result = state.input.slice(start, end);
        if (checkJson) {
            for(_position = 0, _length = _result.length; _position < _length; _position += 1){
                _character = _result.charCodeAt(_position);
                if (!(_character === 0x09 || 0x20 <= _character && _character <= 0x10FFFF)) {
                    throwError(state, 'expected valid JSON character');
                }
            }
        } else if (PATTERN_NON_PRINTABLE.test(_result)) {
            throwError(state, 'the stream contains non-printable characters');
        }
        state.result += _result;
    }
}
function mergeMappings(state, destination, source, overridableKeys) {
    var sourceKeys, key, index, quantity;
    if (!common.isObject(source)) {
        throwError(state, 'cannot merge mappings; the provided source object is unacceptable');
    }
    sourceKeys = Object.keys(source);
    for(index = 0, quantity = sourceKeys.length; index < quantity; index += 1){
        key = sourceKeys[index];
        if (!_hasOwnProperty.call(destination, key)) {
            setProperty(destination, key, source[key]);
            overridableKeys[key] = true;
        }
    }
}
function storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, startLine, startPos) {
    var index, quantity;
    // The output is a plain object here, so keys can only be strings.
    // We need to convert keyNode to a string, but doing so can hang the process
    // (deeply nested arrays that explode exponentially using aliases).
    if (Array.isArray(keyNode)) {
        keyNode = Array.prototype.slice.call(keyNode);
        for(index = 0, quantity = keyNode.length; index < quantity; index += 1){
            if (Array.isArray(keyNode[index])) {
                throwError(state, 'nested arrays are not supported inside keys');
            }
            if (typeof keyNode === 'object' && _class(keyNode[index]) === '[object Object]') {
                keyNode[index] = '[object Object]';
            }
        }
    }
    // Avoid code execution in load() via toString property
    // (still use its own toString for arrays, timestamps,
    // and whatever user schema extensions happen to have @@toStringTag)
    if (typeof keyNode === 'object' && _class(keyNode) === '[object Object]') {
        keyNode = '[object Object]';
    }
    keyNode = String(keyNode);
    if (_result === null) {
        _result = {};
    }
    if (keyTag === 'tag:yaml.org,2002:merge') {
        if (Array.isArray(valueNode)) {
            for(index = 0, quantity = valueNode.length; index < quantity; index += 1){
                mergeMappings(state, _result, valueNode[index], overridableKeys);
            }
        } else {
            mergeMappings(state, _result, valueNode, overridableKeys);
        }
    } else {
        if (!state.json && !_hasOwnProperty.call(overridableKeys, keyNode) && _hasOwnProperty.call(_result, keyNode)) {
            state.line = startLine || state.line;
            state.position = startPos || state.position;
            throwError(state, 'duplicated mapping key');
        }
        setProperty(_result, keyNode, valueNode);
        delete overridableKeys[keyNode];
    }
    return _result;
}
function readLineBreak(state) {
    var ch;
    ch = state.input.charCodeAt(state.position);
    if (ch === 0x0A /* LF */ ) {
        state.position++;
    } else if (ch === 0x0D /* CR */ ) {
        state.position++;
        if (state.input.charCodeAt(state.position) === 0x0A /* LF */ ) {
            state.position++;
        }
    } else {
        throwError(state, 'a line break is expected');
    }
    state.line += 1;
    state.lineStart = state.position;
}
function skipSeparationSpace(state, allowComments, checkIndent) {
    var lineBreaks = 0, ch = state.input.charCodeAt(state.position);
    while(ch !== 0){
        while(is_WHITE_SPACE(ch)){
            ch = state.input.charCodeAt(++state.position);
        }
        if (allowComments && ch === 0x23 /* # */ ) {
            do {
                ch = state.input.charCodeAt(++state.position);
            }while (ch !== 0x0A /* LF */  && ch !== 0x0D /* CR */  && ch !== 0)
        }
        if (is_EOL(ch)) {
            readLineBreak(state);
            ch = state.input.charCodeAt(state.position);
            lineBreaks++;
            state.lineIndent = 0;
            while(ch === 0x20 /* Space */ ){
                state.lineIndent++;
                ch = state.input.charCodeAt(++state.position);
            }
        } else {
            break;
        }
    }
    if (checkIndent !== -1 && lineBreaks !== 0 && state.lineIndent < checkIndent) {
        throwWarning(state, 'deficient indentation');
    }
    return lineBreaks;
}
function testDocumentSeparator(state) {
    var _position = state.position, ch;
    ch = state.input.charCodeAt(_position);
    // Condition state.position === state.lineStart is tested
    // in parent on each call, for efficiency. No needs to test here again.
    if ((ch === 0x2D /* - */  || ch === 0x2E /* . */ ) && ch === state.input.charCodeAt(_position + 1) && ch === state.input.charCodeAt(_position + 2)) {
        _position += 3;
        ch = state.input.charCodeAt(_position);
        if (ch === 0 || is_WS_OR_EOL(ch)) {
            return true;
        }
    }
    return false;
}
function writeFoldedLines(state, count) {
    if (count === 1) {
        state.result += ' ';
    } else if (count > 1) {
        state.result += common.repeat('\n', count - 1);
    }
}
function readPlainScalar(state, nodeIndent, withinFlowCollection) {
    var preceding, following, captureStart, captureEnd, hasPendingContent, _line, _lineStart, _lineIndent, _kind = state.kind, _result = state.result, ch;
    ch = state.input.charCodeAt(state.position);
    if (is_WS_OR_EOL(ch) || is_FLOW_INDICATOR(ch) || ch === 0x23 /* # */  || ch === 0x26 /* & */  || ch === 0x2A /* * */  || ch === 0x21 /* ! */  || ch === 0x7C /* | */  || ch === 0x3E /* > */  || ch === 0x27 /* ' */  || ch === 0x22 /* " */  || ch === 0x25 /* % */  || ch === 0x40 /* @ */  || ch === 0x60 /* ` */ ) {
        return false;
    }
    if (ch === 0x3F /* ? */  || ch === 0x2D /* - */ ) {
        following = state.input.charCodeAt(state.position + 1);
        if (is_WS_OR_EOL(following) || withinFlowCollection && is_FLOW_INDICATOR(following)) {
            return false;
        }
    }
    state.kind = 'scalar';
    state.result = '';
    captureStart = captureEnd = state.position;
    hasPendingContent = false;
    while(ch !== 0){
        if (ch === 0x3A /* : */ ) {
            following = state.input.charCodeAt(state.position + 1);
            if (is_WS_OR_EOL(following) || withinFlowCollection && is_FLOW_INDICATOR(following)) {
                break;
            }
        } else if (ch === 0x23 /* # */ ) {
            preceding = state.input.charCodeAt(state.position - 1);
            if (is_WS_OR_EOL(preceding)) {
                break;
            }
        } else if (state.position === state.lineStart && testDocumentSeparator(state) || withinFlowCollection && is_FLOW_INDICATOR(ch)) {
            break;
        } else if (is_EOL(ch)) {
            _line = state.line;
            _lineStart = state.lineStart;
            _lineIndent = state.lineIndent;
            skipSeparationSpace(state, false, -1);
            if (state.lineIndent >= nodeIndent) {
                hasPendingContent = true;
                ch = state.input.charCodeAt(state.position);
                continue;
            } else {
                state.position = captureEnd;
                state.line = _line;
                state.lineStart = _lineStart;
                state.lineIndent = _lineIndent;
                break;
            }
        }
        if (hasPendingContent) {
            captureSegment(state, captureStart, captureEnd, false);
            writeFoldedLines(state, state.line - _line);
            captureStart = captureEnd = state.position;
            hasPendingContent = false;
        }
        if (!is_WHITE_SPACE(ch)) {
            captureEnd = state.position + 1;
        }
        ch = state.input.charCodeAt(++state.position);
    }
    captureSegment(state, captureStart, captureEnd, false);
    if (state.result) {
        return true;
    }
    state.kind = _kind;
    state.result = _result;
    return false;
}
function readSingleQuotedScalar(state, nodeIndent) {
    var ch, captureStart, captureEnd;
    ch = state.input.charCodeAt(state.position);
    if (ch !== 0x27 /* ' */ ) {
        return false;
    }
    state.kind = 'scalar';
    state.result = '';
    state.position++;
    captureStart = captureEnd = state.position;
    while((ch = state.input.charCodeAt(state.position)) !== 0){
        if (ch === 0x27 /* ' */ ) {
            captureSegment(state, captureStart, state.position, true);
            ch = state.input.charCodeAt(++state.position);
            if (ch === 0x27 /* ' */ ) {
                captureStart = state.position;
                state.position++;
                captureEnd = state.position;
            } else {
                return true;
            }
        } else if (is_EOL(ch)) {
            captureSegment(state, captureStart, captureEnd, true);
            writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
            captureStart = captureEnd = state.position;
        } else if (state.position === state.lineStart && testDocumentSeparator(state)) {
            throwError(state, 'unexpected end of the document within a single quoted scalar');
        } else {
            state.position++;
            captureEnd = state.position;
        }
    }
    throwError(state, 'unexpected end of the stream within a single quoted scalar');
}
function readDoubleQuotedScalar(state, nodeIndent) {
    var captureStart, captureEnd, hexLength, hexResult, tmp, ch;
    ch = state.input.charCodeAt(state.position);
    if (ch !== 0x22 /* " */ ) {
        return false;
    }
    state.kind = 'scalar';
    state.result = '';
    state.position++;
    captureStart = captureEnd = state.position;
    while((ch = state.input.charCodeAt(state.position)) !== 0){
        if (ch === 0x22 /* " */ ) {
            captureSegment(state, captureStart, state.position, true);
            state.position++;
            return true;
        } else if (ch === 0x5C /* \ */ ) {
            captureSegment(state, captureStart, state.position, true);
            ch = state.input.charCodeAt(++state.position);
            if (is_EOL(ch)) {
                skipSeparationSpace(state, false, nodeIndent);
            // TODO: rework to inline fn with no type cast?
            } else if (ch < 256 && simpleEscapeCheck[ch]) {
                state.result += simpleEscapeMap[ch];
                state.position++;
            } else if ((tmp = escapedHexLen(ch)) > 0) {
                hexLength = tmp;
                hexResult = 0;
                for(; hexLength > 0; hexLength--){
                    ch = state.input.charCodeAt(++state.position);
                    if ((tmp = fromHexCode(ch)) >= 0) {
                        hexResult = (hexResult << 4) + tmp;
                    } else {
                        throwError(state, 'expected hexadecimal character');
                    }
                }
                state.result += charFromCodepoint(hexResult);
                state.position++;
            } else {
                throwError(state, 'unknown escape sequence');
            }
            captureStart = captureEnd = state.position;
        } else if (is_EOL(ch)) {
            captureSegment(state, captureStart, captureEnd, true);
            writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
            captureStart = captureEnd = state.position;
        } else if (state.position === state.lineStart && testDocumentSeparator(state)) {
            throwError(state, 'unexpected end of the document within a double quoted scalar');
        } else {
            state.position++;
            captureEnd = state.position;
        }
    }
    throwError(state, 'unexpected end of the stream within a double quoted scalar');
}
function readFlowCollection(state, nodeIndent) {
    var readNext = true, _line, _tag = state.tag, _result, _anchor = state.anchor, following, terminator, isPair, isExplicitPair, isMapping, overridableKeys = {}, keyNode, keyTag, valueNode, ch;
    ch = state.input.charCodeAt(state.position);
    if (ch === 0x5B /* [ */ ) {
        terminator = 0x5D; /* ] */ 
        isMapping = false;
        _result = [];
    } else if (ch === 0x7B /* { */ ) {
        terminator = 0x7D; /* } */ 
        isMapping = true;
        _result = {};
    } else {
        return false;
    }
    if (state.anchor !== null) {
        state.anchorMap[state.anchor] = _result;
    }
    ch = state.input.charCodeAt(++state.position);
    while(ch !== 0){
        skipSeparationSpace(state, true, nodeIndent);
        ch = state.input.charCodeAt(state.position);
        if (ch === terminator) {
            state.position++;
            state.tag = _tag;
            state.anchor = _anchor;
            state.kind = isMapping ? 'mapping' : 'sequence';
            state.result = _result;
            return true;
        } else if (!readNext) {
            throwError(state, 'missed comma between flow collection entries');
        }
        keyTag = keyNode = valueNode = null;
        isPair = isExplicitPair = false;
        if (ch === 0x3F /* ? */ ) {
            following = state.input.charCodeAt(state.position + 1);
            if (is_WS_OR_EOL(following)) {
                isPair = isExplicitPair = true;
                state.position++;
                skipSeparationSpace(state, true, nodeIndent);
            }
        }
        _line = state.line;
        composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
        keyTag = state.tag;
        keyNode = state.result;
        skipSeparationSpace(state, true, nodeIndent);
        ch = state.input.charCodeAt(state.position);
        if ((isExplicitPair || state.line === _line) && ch === 0x3A /* : */ ) {
            isPair = true;
            ch = state.input.charCodeAt(++state.position);
            skipSeparationSpace(state, true, nodeIndent);
            composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
            valueNode = state.result;
        }
        if (isMapping) {
            storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode);
        } else if (isPair) {
            _result.push(storeMappingPair(state, null, overridableKeys, keyTag, keyNode, valueNode));
        } else {
            _result.push(keyNode);
        }
        skipSeparationSpace(state, true, nodeIndent);
        ch = state.input.charCodeAt(state.position);
        if (ch === 0x2C /* , */ ) {
            readNext = true;
            ch = state.input.charCodeAt(++state.position);
        } else {
            readNext = false;
        }
    }
    throwError(state, 'unexpected end of the stream within a flow collection');
}
function readBlockScalar(state, nodeIndent) {
    var captureStart, folding, chomping = CHOMPING_CLIP, didReadContent = false, detectedIndent = false, textIndent = nodeIndent, emptyLines = 0, atMoreIndented = false, tmp, ch;
    ch = state.input.charCodeAt(state.position);
    if (ch === 0x7C /* | */ ) {
        folding = false;
    } else if (ch === 0x3E /* > */ ) {
        folding = true;
    } else {
        return false;
    }
    state.kind = 'scalar';
    state.result = '';
    while(ch !== 0){
        ch = state.input.charCodeAt(++state.position);
        if (ch === 0x2B /* + */  || ch === 0x2D /* - */ ) {
            if (CHOMPING_CLIP === chomping) {
                chomping = ch === 0x2B /* + */  ? CHOMPING_KEEP : CHOMPING_STRIP;
            } else {
                throwError(state, 'repeat of a chomping mode identifier');
            }
        } else if ((tmp = fromDecimalCode(ch)) >= 0) {
            if (tmp === 0) {
                throwError(state, 'bad explicit indentation width of a block scalar; it cannot be less than one');
            } else if (!detectedIndent) {
                textIndent = nodeIndent + tmp - 1;
                detectedIndent = true;
            } else {
                throwError(state, 'repeat of an indentation width identifier');
            }
        } else {
            break;
        }
    }
    if (is_WHITE_SPACE(ch)) {
        do {
            ch = state.input.charCodeAt(++state.position);
        }while (is_WHITE_SPACE(ch))
        if (ch === 0x23 /* # */ ) {
            do {
                ch = state.input.charCodeAt(++state.position);
            }while (!is_EOL(ch) && ch !== 0)
        }
    }
    while(ch !== 0){
        readLineBreak(state);
        state.lineIndent = 0;
        ch = state.input.charCodeAt(state.position);
        while((!detectedIndent || state.lineIndent < textIndent) && ch === 0x20 /* Space */ ){
            state.lineIndent++;
            ch = state.input.charCodeAt(++state.position);
        }
        if (!detectedIndent && state.lineIndent > textIndent) {
            textIndent = state.lineIndent;
        }
        if (is_EOL(ch)) {
            emptyLines++;
            continue;
        }
        // End of the scalar.
        if (state.lineIndent < textIndent) {
            // Perform the chomping.
            if (chomping === CHOMPING_KEEP) {
                state.result += common.repeat('\n', didReadContent ? 1 + emptyLines : emptyLines);
            } else if (chomping === CHOMPING_CLIP) {
                if (didReadContent) {
                    state.result += '\n';
                }
            }
            break;
        }
        // Folded style: use fancy rules to handle line breaks.
        if (folding) {
            // Lines starting with white space characters (more-indented lines) are not folded.
            if (is_WHITE_SPACE(ch)) {
                atMoreIndented = true;
                // except for the first content line (cf. Example 8.1)
                state.result += common.repeat('\n', didReadContent ? 1 + emptyLines : emptyLines);
            // End of more-indented block.
            } else if (atMoreIndented) {
                atMoreIndented = false;
                state.result += common.repeat('\n', emptyLines + 1);
            // Just one line break - perceive as the same line.
            } else if (emptyLines === 0) {
                if (didReadContent) {
                    state.result += ' ';
                }
            // Several line breaks - perceive as different lines.
            } else {
                state.result += common.repeat('\n', emptyLines);
            }
        // Literal style: just add exact number of line breaks between content lines.
        } else {
            // Keep all line breaks except the header line break.
            state.result += common.repeat('\n', didReadContent ? 1 + emptyLines : emptyLines);
        }
        didReadContent = true;
        detectedIndent = true;
        emptyLines = 0;
        captureStart = state.position;
        while(!is_EOL(ch) && ch !== 0){
            ch = state.input.charCodeAt(++state.position);
        }
        captureSegment(state, captureStart, state.position, false);
    }
    return true;
}
function readBlockSequence(state, nodeIndent) {
    var _line, _tag = state.tag, _anchor = state.anchor, _result = [], following, detected = false, ch;
    if (state.anchor !== null) {
        state.anchorMap[state.anchor] = _result;
    }
    ch = state.input.charCodeAt(state.position);
    while(ch !== 0){
        if (ch !== 0x2D /* - */ ) {
            break;
        }
        following = state.input.charCodeAt(state.position + 1);
        if (!is_WS_OR_EOL(following)) {
            break;
        }
        detected = true;
        state.position++;
        if (skipSeparationSpace(state, true, -1)) {
            if (state.lineIndent <= nodeIndent) {
                _result.push(null);
                ch = state.input.charCodeAt(state.position);
                continue;
            }
        }
        _line = state.line;
        composeNode(state, nodeIndent, CONTEXT_BLOCK_IN, false, true);
        _result.push(state.result);
        skipSeparationSpace(state, true, -1);
        ch = state.input.charCodeAt(state.position);
        if ((state.line === _line || state.lineIndent > nodeIndent) && ch !== 0) {
            throwError(state, 'bad indentation of a sequence entry');
        } else if (state.lineIndent < nodeIndent) {
            break;
        }
    }
    if (detected) {
        state.tag = _tag;
        state.anchor = _anchor;
        state.kind = 'sequence';
        state.result = _result;
        return true;
    }
    return false;
}
function readBlockMapping(state, nodeIndent, flowIndent) {
    var following, allowCompact, _line, _pos, _tag = state.tag, _anchor = state.anchor, _result = {}, overridableKeys = {}, keyTag = null, keyNode = null, valueNode = null, atExplicitKey = false, detected = false, ch;
    if (state.anchor !== null) {
        state.anchorMap[state.anchor] = _result;
    }
    ch = state.input.charCodeAt(state.position);
    while(ch !== 0){
        following = state.input.charCodeAt(state.position + 1);
        _line = state.line; // Save the current line.
        _pos = state.position;
        //
        // Explicit notation case. There are two separate blocks:
        // first for the key (denoted by "?") and second for the value (denoted by ":")
        //
        if ((ch === 0x3F /* ? */  || ch === 0x3A /* : */ ) && is_WS_OR_EOL(following)) {
            if (ch === 0x3F /* ? */ ) {
                if (atExplicitKey) {
                    storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null);
                    keyTag = keyNode = valueNode = null;
                }
                detected = true;
                atExplicitKey = true;
                allowCompact = true;
            } else if (atExplicitKey) {
                // i.e. 0x3A/* : */ === character after the explicit key.
                atExplicitKey = false;
                allowCompact = true;
            } else {
                throwError(state, 'incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line');
            }
            state.position += 1;
            ch = following;
        //
        // Implicit notation case. Flow-style node as the key first, then ":", and the value.
        //
        } else if (composeNode(state, flowIndent, CONTEXT_FLOW_OUT, false, true)) {
            if (state.line === _line) {
                ch = state.input.charCodeAt(state.position);
                while(is_WHITE_SPACE(ch)){
                    ch = state.input.charCodeAt(++state.position);
                }
                if (ch === 0x3A /* : */ ) {
                    ch = state.input.charCodeAt(++state.position);
                    if (!is_WS_OR_EOL(ch)) {
                        throwError(state, 'a whitespace character is expected after the key-value separator within a block mapping');
                    }
                    if (atExplicitKey) {
                        storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null);
                        keyTag = keyNode = valueNode = null;
                    }
                    detected = true;
                    atExplicitKey = false;
                    allowCompact = false;
                    keyTag = state.tag;
                    keyNode = state.result;
                } else if (detected) {
                    throwError(state, 'can not read an implicit mapping pair; a colon is missed');
                } else {
                    state.tag = _tag;
                    state.anchor = _anchor;
                    return true; // Keep the result of `composeNode`.
                }
            } else if (detected) {
                throwError(state, 'can not read a block mapping entry; a multiline key may not be an implicit key');
            } else {
                state.tag = _tag;
                state.anchor = _anchor;
                return true; // Keep the result of `composeNode`.
            }
        } else {
            break; // Reading is done. Go to the epilogue.
        }
        //
        // Common reading code for both explicit and implicit notations.
        //
        if (state.line === _line || state.lineIndent > nodeIndent) {
            if (composeNode(state, nodeIndent, CONTEXT_BLOCK_OUT, true, allowCompact)) {
                if (atExplicitKey) {
                    keyNode = state.result;
                } else {
                    valueNode = state.result;
                }
            }
            if (!atExplicitKey) {
                storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, _line, _pos);
                keyTag = keyNode = valueNode = null;
            }
            skipSeparationSpace(state, true, -1);
            ch = state.input.charCodeAt(state.position);
        }
        if (state.lineIndent > nodeIndent && ch !== 0) {
            throwError(state, 'bad indentation of a mapping entry');
        } else if (state.lineIndent < nodeIndent) {
            break;
        }
    }
    //
    // Epilogue.
    //
    // Special case: last mapping's node contains only the key in explicit notation.
    if (atExplicitKey) {
        storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null);
    }
    // Expose the resulting mapping.
    if (detected) {
        state.tag = _tag;
        state.anchor = _anchor;
        state.kind = 'mapping';
        state.result = _result;
    }
    return detected;
}
function readTagProperty(state) {
    var _position, isVerbatim = false, isNamed = false, tagHandle, tagName, ch;
    ch = state.input.charCodeAt(state.position);
    if (ch !== 0x21 /* ! */ ) return false;
    if (state.tag !== null) {
        throwError(state, 'duplication of a tag property');
    }
    ch = state.input.charCodeAt(++state.position);
    if (ch === 0x3C /* < */ ) {
        isVerbatim = true;
        ch = state.input.charCodeAt(++state.position);
    } else if (ch === 0x21 /* ! */ ) {
        isNamed = true;
        tagHandle = '!!';
        ch = state.input.charCodeAt(++state.position);
    } else {
        tagHandle = '!';
    }
    _position = state.position;
    if (isVerbatim) {
        do {
            ch = state.input.charCodeAt(++state.position);
        }while (ch !== 0 && ch !== 0x3E /* > */ )
        if (state.position < state.length) {
            tagName = state.input.slice(_position, state.position);
            ch = state.input.charCodeAt(++state.position);
        } else {
            throwError(state, 'unexpected end of the stream within a verbatim tag');
        }
    } else {
        while(ch !== 0 && !is_WS_OR_EOL(ch)){
            if (ch === 0x21 /* ! */ ) {
                if (!isNamed) {
                    tagHandle = state.input.slice(_position - 1, state.position + 1);
                    if (!PATTERN_TAG_HANDLE.test(tagHandle)) {
                        throwError(state, 'named tag handle cannot contain such characters');
                    }
                    isNamed = true;
                    _position = state.position + 1;
                } else {
                    throwError(state, 'tag suffix cannot contain exclamation marks');
                }
            }
            ch = state.input.charCodeAt(++state.position);
        }
        tagName = state.input.slice(_position, state.position);
        if (PATTERN_FLOW_INDICATORS.test(tagName)) {
            throwError(state, 'tag suffix cannot contain flow indicator characters');
        }
    }
    if (tagName && !PATTERN_TAG_URI.test(tagName)) {
        throwError(state, 'tag name cannot contain such characters: ' + tagName);
    }
    if (isVerbatim) {
        state.tag = tagName;
    } else if (_hasOwnProperty.call(state.tagMap, tagHandle)) {
        state.tag = state.tagMap[tagHandle] + tagName;
    } else if (tagHandle === '!') {
        state.tag = '!' + tagName;
    } else if (tagHandle === '!!') {
        state.tag = 'tag:yaml.org,2002:' + tagName;
    } else {
        throwError(state, 'undeclared tag handle "' + tagHandle + '"');
    }
    return true;
}
function readAnchorProperty(state) {
    var _position, ch;
    ch = state.input.charCodeAt(state.position);
    if (ch !== 0x26 /* & */ ) return false;
    if (state.anchor !== null) {
        throwError(state, 'duplication of an anchor property');
    }
    ch = state.input.charCodeAt(++state.position);
    _position = state.position;
    while(ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)){
        ch = state.input.charCodeAt(++state.position);
    }
    if (state.position === _position) {
        throwError(state, 'name of an anchor node must contain at least one character');
    }
    state.anchor = state.input.slice(_position, state.position);
    return true;
}
function readAlias(state) {
    var _position, alias, ch;
    ch = state.input.charCodeAt(state.position);
    if (ch !== 0x2A /* * */ ) return false;
    ch = state.input.charCodeAt(++state.position);
    _position = state.position;
    while(ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)){
        ch = state.input.charCodeAt(++state.position);
    }
    if (state.position === _position) {
        throwError(state, 'name of an alias node must contain at least one character');
    }
    alias = state.input.slice(_position, state.position);
    if (!_hasOwnProperty.call(state.anchorMap, alias)) {
        throwError(state, 'unidentified alias "' + alias + '"');
    }
    state.result = state.anchorMap[alias];
    skipSeparationSpace(state, true, -1);
    return true;
}
function composeNode(state, parentIndent, nodeContext, allowToSeek, allowCompact) {
    var allowBlockStyles, allowBlockScalars, allowBlockCollections, indentStatus = 1, atNewLine = false, hasContent = false, typeIndex, typeQuantity, type, flowIndent, blockIndent;
    if (state.listener !== null) {
        state.listener('open', state);
    }
    state.tag = null;
    state.anchor = null;
    state.kind = null;
    state.result = null;
    allowBlockStyles = allowBlockScalars = allowBlockCollections = CONTEXT_BLOCK_OUT === nodeContext || CONTEXT_BLOCK_IN === nodeContext;
    if (allowToSeek) {
        if (skipSeparationSpace(state, true, -1)) {
            atNewLine = true;
            if (state.lineIndent > parentIndent) {
                indentStatus = 1;
            } else if (state.lineIndent === parentIndent) {
                indentStatus = 0;
            } else if (state.lineIndent < parentIndent) {
                indentStatus = -1;
            }
        }
    }
    if (indentStatus === 1) {
        while(readTagProperty(state) || readAnchorProperty(state)){
            if (skipSeparationSpace(state, true, -1)) {
                atNewLine = true;
                allowBlockCollections = allowBlockStyles;
                if (state.lineIndent > parentIndent) {
                    indentStatus = 1;
                } else if (state.lineIndent === parentIndent) {
                    indentStatus = 0;
                } else if (state.lineIndent < parentIndent) {
                    indentStatus = -1;
                }
            } else {
                allowBlockCollections = false;
            }
        }
    }
    if (allowBlockCollections) {
        allowBlockCollections = atNewLine || allowCompact;
    }
    if (indentStatus === 1 || CONTEXT_BLOCK_OUT === nodeContext) {
        if (CONTEXT_FLOW_IN === nodeContext || CONTEXT_FLOW_OUT === nodeContext) {
            flowIndent = parentIndent;
        } else {
            flowIndent = parentIndent + 1;
        }
        blockIndent = state.position - state.lineStart;
        if (indentStatus === 1) {
            if (allowBlockCollections && (readBlockSequence(state, blockIndent) || readBlockMapping(state, blockIndent, flowIndent)) || readFlowCollection(state, flowIndent)) {
                hasContent = true;
            } else {
                if (allowBlockScalars && readBlockScalar(state, flowIndent) || readSingleQuotedScalar(state, flowIndent) || readDoubleQuotedScalar(state, flowIndent)) {
                    hasContent = true;
                } else if (readAlias(state)) {
                    hasContent = true;
                    if (state.tag !== null || state.anchor !== null) {
                        throwError(state, 'alias node should not have any properties');
                    }
                } else if (readPlainScalar(state, flowIndent, CONTEXT_FLOW_IN === nodeContext)) {
                    hasContent = true;
                    if (state.tag === null) {
                        state.tag = '?';
                    }
                }
                if (state.anchor !== null) {
                    state.anchorMap[state.anchor] = state.result;
                }
            }
        } else if (indentStatus === 0) {
            // Special case: block sequences are allowed to have same indentation level as the parent.
            // http://www.yaml.org/spec/1.2/spec.html#id2799784
            hasContent = allowBlockCollections && readBlockSequence(state, blockIndent);
        }
    }
    if (state.tag !== null && state.tag !== '!') {
        if (state.tag === '?') {
            // Implicit resolving is not allowed for non-scalar types, and '?'
            // non-specific tag is only automatically assigned to plain scalars.
            //
            // We only need to check kind conformity in case user explicitly assigns '?'
            // tag, for example like this: "!<?> [0]"
            //
            if (state.result !== null && state.kind !== 'scalar') {
                throwError(state, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + state.kind + '"');
            }
            for(typeIndex = 0, typeQuantity = state.implicitTypes.length; typeIndex < typeQuantity; typeIndex += 1){
                type = state.implicitTypes[typeIndex];
                if (type.resolve(state.result)) {
                    state.result = type.construct(state.result);
                    state.tag = type.tag;
                    if (state.anchor !== null) {
                        state.anchorMap[state.anchor] = state.result;
                    }
                    break;
                }
            }
        } else if (_hasOwnProperty.call(state.typeMap[state.kind || 'fallback'], state.tag)) {
            type = state.typeMap[state.kind || 'fallback'][state.tag];
            if (state.result !== null && type.kind !== state.kind) {
                throwError(state, 'unacceptable node kind for !<' + state.tag + '> tag; it should be "' + type.kind + '", not "' + state.kind + '"');
            }
            if (!type.resolve(state.result)) {
                throwError(state, 'cannot resolve a node with !<' + state.tag + '> explicit tag');
            } else {
                state.result = type.construct(state.result);
                if (state.anchor !== null) {
                    state.anchorMap[state.anchor] = state.result;
                }
            }
        } else {
            throwError(state, 'unknown tag !<' + state.tag + '>');
        }
    }
    if (state.listener !== null) {
        state.listener('close', state);
    }
    return state.tag !== null || state.anchor !== null || hasContent;
}
function readDocument(state) {
    var documentStart = state.position, _position, directiveName, directiveArgs, hasDirectives = false, ch;
    state.version = null;
    state.checkLineBreaks = state.legacy;
    state.tagMap = {};
    state.anchorMap = {};
    while((ch = state.input.charCodeAt(state.position)) !== 0){
        skipSeparationSpace(state, true, -1);
        ch = state.input.charCodeAt(state.position);
        if (state.lineIndent > 0 || ch !== 0x25 /* % */ ) {
            break;
        }
        hasDirectives = true;
        ch = state.input.charCodeAt(++state.position);
        _position = state.position;
        while(ch !== 0 && !is_WS_OR_EOL(ch)){
            ch = state.input.charCodeAt(++state.position);
        }
        directiveName = state.input.slice(_position, state.position);
        directiveArgs = [];
        if (directiveName.length < 1) {
            throwError(state, 'directive name must not be less than one character in length');
        }
        while(ch !== 0){
            while(is_WHITE_SPACE(ch)){
                ch = state.input.charCodeAt(++state.position);
            }
            if (ch === 0x23 /* # */ ) {
                do {
                    ch = state.input.charCodeAt(++state.position);
                }while (ch !== 0 && !is_EOL(ch))
                break;
            }
            if (is_EOL(ch)) break;
            _position = state.position;
            while(ch !== 0 && !is_WS_OR_EOL(ch)){
                ch = state.input.charCodeAt(++state.position);
            }
            directiveArgs.push(state.input.slice(_position, state.position));
        }
        if (ch !== 0) readLineBreak(state);
        if (_hasOwnProperty.call(directiveHandlers, directiveName)) {
            directiveHandlers[directiveName](state, directiveName, directiveArgs);
        } else {
            throwWarning(state, 'unknown document directive "' + directiveName + '"');
        }
    }
    skipSeparationSpace(state, true, -1);
    if (state.lineIndent === 0 && state.input.charCodeAt(state.position) === 0x2D /* - */  && state.input.charCodeAt(state.position + 1) === 0x2D /* - */  && state.input.charCodeAt(state.position + 2) === 0x2D /* - */ ) {
        state.position += 3;
        skipSeparationSpace(state, true, -1);
    } else if (hasDirectives) {
        throwError(state, 'directives end mark is expected');
    }
    composeNode(state, state.lineIndent - 1, CONTEXT_BLOCK_OUT, false, true);
    skipSeparationSpace(state, true, -1);
    if (state.checkLineBreaks && PATTERN_NON_ASCII_LINE_BREAKS.test(state.input.slice(documentStart, state.position))) {
        throwWarning(state, 'non-ASCII line breaks are interpreted as content');
    }
    state.documents.push(state.result);
    if (state.position === state.lineStart && testDocumentSeparator(state)) {
        if (state.input.charCodeAt(state.position) === 0x2E /* . */ ) {
            state.position += 3;
            skipSeparationSpace(state, true, -1);
        }
        return;
    }
    if (state.position < state.length - 1) {
        throwError(state, 'end of the stream or a document separator is expected');
    } else {
        return;
    }
}
function loadDocuments(input, options) {
    input = String(input);
    options = options || {};
    if (input.length !== 0) {
        // Add tailing `\n` if not exists
        if (input.charCodeAt(input.length - 1) !== 0x0A /* LF */  && input.charCodeAt(input.length - 1) !== 0x0D /* CR */ ) {
            input += '\n';
        }
        // Strip BOM
        if (input.charCodeAt(0) === 0xFEFF) {
            input = input.slice(1);
        }
    }
    var state = new State(input, options);
    var nullpos = input.indexOf('\0');
    if (nullpos !== -1) {
        state.position = nullpos;
        throwError(state, 'null byte is not allowed in input');
    }
    // Use 0 as string terminator. That significantly simplifies bounds check.
    state.input += '\0';
    while(state.input.charCodeAt(state.position) === 0x20 /* Space */ ){
        state.lineIndent += 1;
        state.position += 1;
    }
    while(state.position < state.length - 1){
        readDocument(state);
    }
    return state.documents;
}
function loadAll(input, iterator, options) {
    if (iterator !== null && typeof iterator === 'object' && typeof options === 'undefined') {
        options = iterator;
        iterator = null;
    }
    var documents = loadDocuments(input, options);
    if (typeof iterator !== 'function') {
        return documents;
    }
    for(var index = 0, length = documents.length; index < length; index += 1){
        iterator(documents[index]);
    }
}
function load(input, options) {
    var documents = loadDocuments(input, options);
    if (documents.length === 0) {
        /*eslint-disable no-undefined*/ return undefined;
    } else if (documents.length === 1) {
        return documents[0];
    }
    throw new YAMLException('expected a single document in the stream, but found more');
}
function safeLoadAll(input, iterator, options) {
    if (typeof iterator === 'object' && iterator !== null && typeof options === 'undefined') {
        options = iterator;
        iterator = null;
    }
    return loadAll(input, iterator, common.extend({
        schema: DEFAULT_SAFE_SCHEMA
    }, options));
}
function safeLoad(input, options) {
    return load(input, common.extend({
        schema: DEFAULT_SAFE_SCHEMA
    }, options));
}
module.exports.loadAll = loadAll;
module.exports.load = load;
module.exports.safeLoadAll = safeLoadAll;
module.exports.safeLoad = safeLoad;
}),
"[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/dumper.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/*eslint-disable no-use-before-define*/ var common = __turbopack_context__.r("[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/common.js [app-rsc] (ecmascript)");
var YAMLException = __turbopack_context__.r("[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/exception.js [app-rsc] (ecmascript)");
var DEFAULT_FULL_SCHEMA = __turbopack_context__.r("[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/schema/default_full.js [app-rsc] (ecmascript)");
var DEFAULT_SAFE_SCHEMA = __turbopack_context__.r("[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/schema/default_safe.js [app-rsc] (ecmascript)");
var _toString = Object.prototype.toString;
var _hasOwnProperty = Object.prototype.hasOwnProperty;
var CHAR_TAB = 0x09; /* Tab */ 
var CHAR_LINE_FEED = 0x0A; /* LF */ 
var CHAR_CARRIAGE_RETURN = 0x0D; /* CR */ 
var CHAR_SPACE = 0x20; /* Space */ 
var CHAR_EXCLAMATION = 0x21; /* ! */ 
var CHAR_DOUBLE_QUOTE = 0x22; /* " */ 
var CHAR_SHARP = 0x23; /* # */ 
var CHAR_PERCENT = 0x25; /* % */ 
var CHAR_AMPERSAND = 0x26; /* & */ 
var CHAR_SINGLE_QUOTE = 0x27; /* ' */ 
var CHAR_ASTERISK = 0x2A; /* * */ 
var CHAR_COMMA = 0x2C; /* , */ 
var CHAR_MINUS = 0x2D; /* - */ 
var CHAR_COLON = 0x3A; /* : */ 
var CHAR_EQUALS = 0x3D; /* = */ 
var CHAR_GREATER_THAN = 0x3E; /* > */ 
var CHAR_QUESTION = 0x3F; /* ? */ 
var CHAR_COMMERCIAL_AT = 0x40; /* @ */ 
var CHAR_LEFT_SQUARE_BRACKET = 0x5B; /* [ */ 
var CHAR_RIGHT_SQUARE_BRACKET = 0x5D; /* ] */ 
var CHAR_GRAVE_ACCENT = 0x60; /* ` */ 
var CHAR_LEFT_CURLY_BRACKET = 0x7B; /* { */ 
var CHAR_VERTICAL_LINE = 0x7C; /* | */ 
var CHAR_RIGHT_CURLY_BRACKET = 0x7D; /* } */ 
var ESCAPE_SEQUENCES = {};
ESCAPE_SEQUENCES[0x00] = '\\0';
ESCAPE_SEQUENCES[0x07] = '\\a';
ESCAPE_SEQUENCES[0x08] = '\\b';
ESCAPE_SEQUENCES[0x09] = '\\t';
ESCAPE_SEQUENCES[0x0A] = '\\n';
ESCAPE_SEQUENCES[0x0B] = '\\v';
ESCAPE_SEQUENCES[0x0C] = '\\f';
ESCAPE_SEQUENCES[0x0D] = '\\r';
ESCAPE_SEQUENCES[0x1B] = '\\e';
ESCAPE_SEQUENCES[0x22] = '\\"';
ESCAPE_SEQUENCES[0x5C] = '\\\\';
ESCAPE_SEQUENCES[0x85] = '\\N';
ESCAPE_SEQUENCES[0xA0] = '\\_';
ESCAPE_SEQUENCES[0x2028] = '\\L';
ESCAPE_SEQUENCES[0x2029] = '\\P';
var DEPRECATED_BOOLEANS_SYNTAX = [
    'y',
    'Y',
    'yes',
    'Yes',
    'YES',
    'on',
    'On',
    'ON',
    'n',
    'N',
    'no',
    'No',
    'NO',
    'off',
    'Off',
    'OFF'
];
function compileStyleMap(schema, map) {
    var result, keys, index, length, tag, style, type;
    if (map === null) return {};
    result = {};
    keys = Object.keys(map);
    for(index = 0, length = keys.length; index < length; index += 1){
        tag = keys[index];
        style = String(map[tag]);
        if (tag.slice(0, 2) === '!!') {
            tag = 'tag:yaml.org,2002:' + tag.slice(2);
        }
        type = schema.compiledTypeMap['fallback'][tag];
        if (type && _hasOwnProperty.call(type.styleAliases, style)) {
            style = type.styleAliases[style];
        }
        result[tag] = style;
    }
    return result;
}
function encodeHex(character) {
    var string, handle, length;
    string = character.toString(16).toUpperCase();
    if (character <= 0xFF) {
        handle = 'x';
        length = 2;
    } else if (character <= 0xFFFF) {
        handle = 'u';
        length = 4;
    } else if (character <= 0xFFFFFFFF) {
        handle = 'U';
        length = 8;
    } else {
        throw new YAMLException('code point within a string may not be greater than 0xFFFFFFFF');
    }
    return '\\' + handle + common.repeat('0', length - string.length) + string;
}
function State(options) {
    this.schema = options['schema'] || DEFAULT_FULL_SCHEMA;
    this.indent = Math.max(1, options['indent'] || 2);
    this.noArrayIndent = options['noArrayIndent'] || false;
    this.skipInvalid = options['skipInvalid'] || false;
    this.flowLevel = common.isNothing(options['flowLevel']) ? -1 : options['flowLevel'];
    this.styleMap = compileStyleMap(this.schema, options['styles'] || null);
    this.sortKeys = options['sortKeys'] || false;
    this.lineWidth = options['lineWidth'] || 80;
    this.noRefs = options['noRefs'] || false;
    this.noCompatMode = options['noCompatMode'] || false;
    this.condenseFlow = options['condenseFlow'] || false;
    this.implicitTypes = this.schema.compiledImplicit;
    this.explicitTypes = this.schema.compiledExplicit;
    this.tag = null;
    this.result = '';
    this.duplicates = [];
    this.usedDuplicates = null;
}
// Indents every line in a string. Empty lines (\n only) are not indented.
function indentString(string, spaces) {
    var ind = common.repeat(' ', spaces), position = 0, next = -1, result = '', line, length = string.length;
    while(position < length){
        next = string.indexOf('\n', position);
        if (next === -1) {
            line = string.slice(position);
            position = length;
        } else {
            line = string.slice(position, next + 1);
            position = next + 1;
        }
        if (line.length && line !== '\n') result += ind;
        result += line;
    }
    return result;
}
function generateNextLine(state, level) {
    return '\n' + common.repeat(' ', state.indent * level);
}
function testImplicitResolving(state, str) {
    var index, length, type;
    for(index = 0, length = state.implicitTypes.length; index < length; index += 1){
        type = state.implicitTypes[index];
        if (type.resolve(str)) {
            return true;
        }
    }
    return false;
}
// [33] s-white ::= s-space | s-tab
function isWhitespace(c) {
    return c === CHAR_SPACE || c === CHAR_TAB;
}
// Returns true if the character can be printed without escaping.
// From YAML 1.2: "any allowed characters known to be non-printable
// should also be escaped. [However,] This isn’t mandatory"
// Derived from nb-char - \t - #x85 - #xA0 - #x2028 - #x2029.
function isPrintable(c) {
    return 0x00020 <= c && c <= 0x00007E || 0x000A1 <= c && c <= 0x00D7FF && c !== 0x2028 && c !== 0x2029 || 0x0E000 <= c && c <= 0x00FFFD && c !== 0xFEFF /* BOM */  || 0x10000 <= c && c <= 0x10FFFF;
}
// [34] ns-char ::= nb-char - s-white
// [27] nb-char ::= c-printable - b-char - c-byte-order-mark
// [26] b-char  ::= b-line-feed | b-carriage-return
// [24] b-line-feed       ::=     #xA    /* LF */
// [25] b-carriage-return ::=     #xD    /* CR */
// [3]  c-byte-order-mark ::=     #xFEFF
function isNsChar(c) {
    return isPrintable(c) && !isWhitespace(c) && c !== 0xFEFF && c !== CHAR_CARRIAGE_RETURN && c !== CHAR_LINE_FEED;
}
// Simplified test for values allowed after the first character in plain style.
function isPlainSafe(c, prev) {
    // Uses a subset of nb-char - c-flow-indicator - ":" - "#"
    // where nb-char ::= c-printable - b-char - c-byte-order-mark.
    return isPrintable(c) && c !== 0xFEFF && c !== CHAR_COMMA && c !== CHAR_LEFT_SQUARE_BRACKET && c !== CHAR_RIGHT_SQUARE_BRACKET && c !== CHAR_LEFT_CURLY_BRACKET && c !== CHAR_RIGHT_CURLY_BRACKET && c !== CHAR_COLON && (c !== CHAR_SHARP || prev && isNsChar(prev));
}
// Simplified test for values allowed as the first character in plain style.
function isPlainSafeFirst(c) {
    // Uses a subset of ns-char - c-indicator
    // where ns-char = nb-char - s-white.
    return isPrintable(c) && c !== 0xFEFF && !isWhitespace(c) // - s-white
     && c !== CHAR_MINUS && c !== CHAR_QUESTION && c !== CHAR_COLON && c !== CHAR_COMMA && c !== CHAR_LEFT_SQUARE_BRACKET && c !== CHAR_RIGHT_SQUARE_BRACKET && c !== CHAR_LEFT_CURLY_BRACKET && c !== CHAR_RIGHT_CURLY_BRACKET && c !== CHAR_SHARP && c !== CHAR_AMPERSAND && c !== CHAR_ASTERISK && c !== CHAR_EXCLAMATION && c !== CHAR_VERTICAL_LINE && c !== CHAR_EQUALS && c !== CHAR_GREATER_THAN && c !== CHAR_SINGLE_QUOTE && c !== CHAR_DOUBLE_QUOTE && c !== CHAR_PERCENT && c !== CHAR_COMMERCIAL_AT && c !== CHAR_GRAVE_ACCENT;
}
// Determines whether block indentation indicator is required.
function needIndentIndicator(string) {
    var leadingSpaceRe = /^\n* /;
    return leadingSpaceRe.test(string);
}
var STYLE_PLAIN = 1, STYLE_SINGLE = 2, STYLE_LITERAL = 3, STYLE_FOLDED = 4, STYLE_DOUBLE = 5;
// Determines which scalar styles are possible and returns the preferred style.
// lineWidth = -1 => no limit.
// Pre-conditions: str.length > 0.
// Post-conditions:
//    STYLE_PLAIN or STYLE_SINGLE => no \n are in the string.
//    STYLE_LITERAL => no lines are suitable for folding (or lineWidth is -1).
//    STYLE_FOLDED => a line > lineWidth and can be folded (and lineWidth != -1).
function chooseScalarStyle(string, singleLineOnly, indentPerLevel, lineWidth, testAmbiguousType) {
    var i;
    var char, prev_char;
    var hasLineBreak = false;
    var hasFoldableLine = false; // only checked if shouldTrackWidth
    var shouldTrackWidth = lineWidth !== -1;
    var previousLineBreak = -1; // count the first line correctly
    var plain = isPlainSafeFirst(string.charCodeAt(0)) && !isWhitespace(string.charCodeAt(string.length - 1));
    if (singleLineOnly) {
        // Case: no block styles.
        // Check for disallowed characters to rule out plain and single.
        for(i = 0; i < string.length; i++){
            char = string.charCodeAt(i);
            if (!isPrintable(char)) {
                return STYLE_DOUBLE;
            }
            prev_char = i > 0 ? string.charCodeAt(i - 1) : null;
            plain = plain && isPlainSafe(char, prev_char);
        }
    } else {
        // Case: block styles permitted.
        for(i = 0; i < string.length; i++){
            char = string.charCodeAt(i);
            if (char === CHAR_LINE_FEED) {
                hasLineBreak = true;
                // Check if any line can be folded.
                if (shouldTrackWidth) {
                    hasFoldableLine = hasFoldableLine || i - previousLineBreak - 1 > lineWidth && string[previousLineBreak + 1] !== ' ';
                    previousLineBreak = i;
                }
            } else if (!isPrintable(char)) {
                return STYLE_DOUBLE;
            }
            prev_char = i > 0 ? string.charCodeAt(i - 1) : null;
            plain = plain && isPlainSafe(char, prev_char);
        }
        // in case the end is missing a \n
        hasFoldableLine = hasFoldableLine || shouldTrackWidth && i - previousLineBreak - 1 > lineWidth && string[previousLineBreak + 1] !== ' ';
    }
    // Although every style can represent \n without escaping, prefer block styles
    // for multiline, since they're more readable and they don't add empty lines.
    // Also prefer folding a super-long line.
    if (!hasLineBreak && !hasFoldableLine) {
        // Strings interpretable as another type have to be quoted;
        // e.g. the string 'true' vs. the boolean true.
        return plain && !testAmbiguousType(string) ? STYLE_PLAIN : STYLE_SINGLE;
    }
    // Edge case: block indentation indicator can only have one digit.
    if (indentPerLevel > 9 && needIndentIndicator(string)) {
        return STYLE_DOUBLE;
    }
    // At this point we know block styles are valid.
    // Prefer literal style unless we want to fold.
    return hasFoldableLine ? STYLE_FOLDED : STYLE_LITERAL;
}
// Note: line breaking/folding is implemented for only the folded style.
// NB. We drop the last trailing newline (if any) of a returned block scalar
//  since the dumper adds its own newline. This always works:
//    • No ending newline => unaffected; already using strip "-" chomping.
//    • Ending newline    => removed then restored.
//  Importantly, this keeps the "+" chomp indicator from gaining an extra line.
function writeScalar(state, string, level, iskey) {
    state.dump = function() {
        if (string.length === 0) {
            return "''";
        }
        if (!state.noCompatMode && DEPRECATED_BOOLEANS_SYNTAX.indexOf(string) !== -1) {
            return "'" + string + "'";
        }
        var indent = state.indent * Math.max(1, level); // no 0-indent scalars
        // As indentation gets deeper, let the width decrease monotonically
        // to the lower bound min(state.lineWidth, 40).
        // Note that this implies
        //  state.lineWidth ≤ 40 + state.indent: width is fixed at the lower bound.
        //  state.lineWidth > 40 + state.indent: width decreases until the lower bound.
        // This behaves better than a constant minimum width which disallows narrower options,
        // or an indent threshold which causes the width to suddenly increase.
        var lineWidth = state.lineWidth === -1 ? -1 : Math.max(Math.min(state.lineWidth, 40), state.lineWidth - indent);
        // Without knowing if keys are implicit/explicit, assume implicit for safety.
        var singleLineOnly = iskey || state.flowLevel > -1 && level >= state.flowLevel;
        function testAmbiguity(string) {
            return testImplicitResolving(state, string);
        }
        switch(chooseScalarStyle(string, singleLineOnly, state.indent, lineWidth, testAmbiguity)){
            case STYLE_PLAIN:
                return string;
            case STYLE_SINGLE:
                return "'" + string.replace(/'/g, "''") + "'";
            case STYLE_LITERAL:
                return '|' + blockHeader(string, state.indent) + dropEndingNewline(indentString(string, indent));
            case STYLE_FOLDED:
                return '>' + blockHeader(string, state.indent) + dropEndingNewline(indentString(foldString(string, lineWidth), indent));
            case STYLE_DOUBLE:
                return '"' + escapeString(string, lineWidth) + '"';
            default:
                throw new YAMLException('impossible error: invalid scalar style');
        }
    }();
}
// Pre-conditions: string is valid for a block scalar, 1 <= indentPerLevel <= 9.
function blockHeader(string, indentPerLevel) {
    var indentIndicator = needIndentIndicator(string) ? String(indentPerLevel) : '';
    // note the special case: the string '\n' counts as a "trailing" empty line.
    var clip = string[string.length - 1] === '\n';
    var keep = clip && (string[string.length - 2] === '\n' || string === '\n');
    var chomp = keep ? '+' : clip ? '' : '-';
    return indentIndicator + chomp + '\n';
}
// (See the note for writeScalar.)
function dropEndingNewline(string) {
    return string[string.length - 1] === '\n' ? string.slice(0, -1) : string;
}
// Note: a long line without a suitable break point will exceed the width limit.
// Pre-conditions: every char in str isPrintable, str.length > 0, width > 0.
function foldString(string, width) {
    // In folded style, $k$ consecutive newlines output as $k+1$ newlines—
    // unless they're before or after a more-indented line, or at the very
    // beginning or end, in which case $k$ maps to $k$.
    // Therefore, parse each chunk as newline(s) followed by a content line.
    var lineRe = /(\n+)([^\n]*)/g;
    // first line (possibly an empty line)
    var result = function() {
        var nextLF = string.indexOf('\n');
        nextLF = nextLF !== -1 ? nextLF : string.length;
        lineRe.lastIndex = nextLF;
        return foldLine(string.slice(0, nextLF), width);
    }();
    // If we haven't reached the first content line yet, don't add an extra \n.
    var prevMoreIndented = string[0] === '\n' || string[0] === ' ';
    var moreIndented;
    // rest of the lines
    var match;
    while(match = lineRe.exec(string)){
        var prefix = match[1], line = match[2];
        moreIndented = line[0] === ' ';
        result += prefix + (!prevMoreIndented && !moreIndented && line !== '' ? '\n' : '') + foldLine(line, width);
        prevMoreIndented = moreIndented;
    }
    return result;
}
// Greedy line breaking.
// Picks the longest line under the limit each time,
// otherwise settles for the shortest line over the limit.
// NB. More-indented lines *cannot* be folded, as that would add an extra \n.
function foldLine(line, width) {
    if (line === '' || line[0] === ' ') return line;
    // Since a more-indented line adds a \n, breaks can't be followed by a space.
    var breakRe = / [^ ]/g; // note: the match index will always be <= length-2.
    var match;
    // start is an inclusive index. end, curr, and next are exclusive.
    var start = 0, end, curr = 0, next = 0;
    var result = '';
    // Invariants: 0 <= start <= length-1.
    //   0 <= curr <= next <= max(0, length-2). curr - start <= width.
    // Inside the loop:
    //   A match implies length >= 2, so curr and next are <= length-2.
    while(match = breakRe.exec(line)){
        next = match.index;
        // maintain invariant: curr - start <= width
        if (next - start > width) {
            end = curr > start ? curr : next; // derive end <= length-2
            result += '\n' + line.slice(start, end);
            // skip the space that was output as \n
            start = end + 1; // derive start <= length-1
        }
        curr = next;
    }
    // By the invariants, start <= length-1, so there is something left over.
    // It is either the whole string or a part starting from non-whitespace.
    result += '\n';
    // Insert a break if the remainder is too long and there is a break available.
    if (line.length - start > width && curr > start) {
        result += line.slice(start, curr) + '\n' + line.slice(curr + 1);
    } else {
        result += line.slice(start);
    }
    return result.slice(1); // drop extra \n joiner
}
// Escapes a double-quoted string.
function escapeString(string) {
    var result = '';
    var char, nextChar;
    var escapeSeq;
    for(var i = 0; i < string.length; i++){
        char = string.charCodeAt(i);
        // Check for surrogate pairs (reference Unicode 3.0 section "3.7 Surrogates").
        if (char >= 0xD800 && char <= 0xDBFF /* high surrogate */ ) {
            nextChar = string.charCodeAt(i + 1);
            if (nextChar >= 0xDC00 && nextChar <= 0xDFFF /* low surrogate */ ) {
                // Combine the surrogate pair and store it escaped.
                result += encodeHex((char - 0xD800) * 0x400 + nextChar - 0xDC00 + 0x10000);
                // Advance index one extra since we already used that char here.
                i++;
                continue;
            }
        }
        escapeSeq = ESCAPE_SEQUENCES[char];
        result += !escapeSeq && isPrintable(char) ? string[i] : escapeSeq || encodeHex(char);
    }
    return result;
}
function writeFlowSequence(state, level, object) {
    var _result = '', _tag = state.tag, index, length;
    for(index = 0, length = object.length; index < length; index += 1){
        // Write only valid elements.
        if (writeNode(state, level, object[index], false, false)) {
            if (index !== 0) _result += ',' + (!state.condenseFlow ? ' ' : '');
            _result += state.dump;
        }
    }
    state.tag = _tag;
    state.dump = '[' + _result + ']';
}
function writeBlockSequence(state, level, object, compact) {
    var _result = '', _tag = state.tag, index, length;
    for(index = 0, length = object.length; index < length; index += 1){
        // Write only valid elements.
        if (writeNode(state, level + 1, object[index], true, true)) {
            if (!compact || index !== 0) {
                _result += generateNextLine(state, level);
            }
            if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
                _result += '-';
            } else {
                _result += '- ';
            }
            _result += state.dump;
        }
    }
    state.tag = _tag;
    state.dump = _result || '[]'; // Empty sequence if no valid values.
}
function writeFlowMapping(state, level, object) {
    var _result = '', _tag = state.tag, objectKeyList = Object.keys(object), index, length, objectKey, objectValue, pairBuffer;
    for(index = 0, length = objectKeyList.length; index < length; index += 1){
        pairBuffer = '';
        if (index !== 0) pairBuffer += ', ';
        if (state.condenseFlow) pairBuffer += '"';
        objectKey = objectKeyList[index];
        objectValue = object[objectKey];
        if (!writeNode(state, level, objectKey, false, false)) {
            continue; // Skip this pair because of invalid key;
        }
        if (state.dump.length > 1024) pairBuffer += '? ';
        pairBuffer += state.dump + (state.condenseFlow ? '"' : '') + ':' + (state.condenseFlow ? '' : ' ');
        if (!writeNode(state, level, objectValue, false, false)) {
            continue; // Skip this pair because of invalid value.
        }
        pairBuffer += state.dump;
        // Both key and value are valid.
        _result += pairBuffer;
    }
    state.tag = _tag;
    state.dump = '{' + _result + '}';
}
function writeBlockMapping(state, level, object, compact) {
    var _result = '', _tag = state.tag, objectKeyList = Object.keys(object), index, length, objectKey, objectValue, explicitPair, pairBuffer;
    // Allow sorting keys so that the output file is deterministic
    if (state.sortKeys === true) {
        // Default sorting
        objectKeyList.sort();
    } else if (typeof state.sortKeys === 'function') {
        // Custom sort function
        objectKeyList.sort(state.sortKeys);
    } else if (state.sortKeys) {
        // Something is wrong
        throw new YAMLException('sortKeys must be a boolean or a function');
    }
    for(index = 0, length = objectKeyList.length; index < length; index += 1){
        pairBuffer = '';
        if (!compact || index !== 0) {
            pairBuffer += generateNextLine(state, level);
        }
        objectKey = objectKeyList[index];
        objectValue = object[objectKey];
        if (!writeNode(state, level + 1, objectKey, true, true, true)) {
            continue; // Skip this pair because of invalid key.
        }
        explicitPair = state.tag !== null && state.tag !== '?' || state.dump && state.dump.length > 1024;
        if (explicitPair) {
            if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
                pairBuffer += '?';
            } else {
                pairBuffer += '? ';
            }
        }
        pairBuffer += state.dump;
        if (explicitPair) {
            pairBuffer += generateNextLine(state, level);
        }
        if (!writeNode(state, level + 1, objectValue, true, explicitPair)) {
            continue; // Skip this pair because of invalid value.
        }
        if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
            pairBuffer += ':';
        } else {
            pairBuffer += ': ';
        }
        pairBuffer += state.dump;
        // Both key and value are valid.
        _result += pairBuffer;
    }
    state.tag = _tag;
    state.dump = _result || '{}'; // Empty mapping if no valid pairs.
}
function detectType(state, object, explicit) {
    var _result, typeList, index, length, type, style;
    typeList = explicit ? state.explicitTypes : state.implicitTypes;
    for(index = 0, length = typeList.length; index < length; index += 1){
        type = typeList[index];
        if ((type.instanceOf || type.predicate) && (!type.instanceOf || typeof object === 'object' && object instanceof type.instanceOf) && (!type.predicate || type.predicate(object))) {
            state.tag = explicit ? type.tag : '?';
            if (type.represent) {
                style = state.styleMap[type.tag] || type.defaultStyle;
                if (_toString.call(type.represent) === '[object Function]') {
                    _result = type.represent(object, style);
                } else if (_hasOwnProperty.call(type.represent, style)) {
                    _result = type.represent[style](object, style);
                } else {
                    throw new YAMLException('!<' + type.tag + '> tag resolver accepts not "' + style + '" style');
                }
                state.dump = _result;
            }
            return true;
        }
    }
    return false;
}
// Serializes `object` and writes it to global `result`.
// Returns true on success, or false on invalid object.
//
function writeNode(state, level, object, block, compact, iskey) {
    state.tag = null;
    state.dump = object;
    if (!detectType(state, object, false)) {
        detectType(state, object, true);
    }
    var type = _toString.call(state.dump);
    if (block) {
        block = state.flowLevel < 0 || state.flowLevel > level;
    }
    var objectOrArray = type === '[object Object]' || type === '[object Array]', duplicateIndex, duplicate;
    if (objectOrArray) {
        duplicateIndex = state.duplicates.indexOf(object);
        duplicate = duplicateIndex !== -1;
    }
    if (state.tag !== null && state.tag !== '?' || duplicate || state.indent !== 2 && level > 0) {
        compact = false;
    }
    if (duplicate && state.usedDuplicates[duplicateIndex]) {
        state.dump = '*ref_' + duplicateIndex;
    } else {
        if (objectOrArray && duplicate && !state.usedDuplicates[duplicateIndex]) {
            state.usedDuplicates[duplicateIndex] = true;
        }
        if (type === '[object Object]') {
            if (block && Object.keys(state.dump).length !== 0) {
                writeBlockMapping(state, level, state.dump, compact);
                if (duplicate) {
                    state.dump = '&ref_' + duplicateIndex + state.dump;
                }
            } else {
                writeFlowMapping(state, level, state.dump);
                if (duplicate) {
                    state.dump = '&ref_' + duplicateIndex + ' ' + state.dump;
                }
            }
        } else if (type === '[object Array]') {
            var arrayLevel = state.noArrayIndent && level > 0 ? level - 1 : level;
            if (block && state.dump.length !== 0) {
                writeBlockSequence(state, arrayLevel, state.dump, compact);
                if (duplicate) {
                    state.dump = '&ref_' + duplicateIndex + state.dump;
                }
            } else {
                writeFlowSequence(state, arrayLevel, state.dump);
                if (duplicate) {
                    state.dump = '&ref_' + duplicateIndex + ' ' + state.dump;
                }
            }
        } else if (type === '[object String]') {
            if (state.tag !== '?') {
                writeScalar(state, state.dump, level, iskey);
            }
        } else {
            if (state.skipInvalid) return false;
            throw new YAMLException('unacceptable kind of an object to dump ' + type);
        }
        if (state.tag !== null && state.tag !== '?') {
            state.dump = '!<' + state.tag + '> ' + state.dump;
        }
    }
    return true;
}
function getDuplicateReferences(object, state) {
    var objects = [], duplicatesIndexes = [], index, length;
    inspectNode(object, objects, duplicatesIndexes);
    for(index = 0, length = duplicatesIndexes.length; index < length; index += 1){
        state.duplicates.push(objects[duplicatesIndexes[index]]);
    }
    state.usedDuplicates = new Array(length);
}
function inspectNode(object, objects, duplicatesIndexes) {
    var objectKeyList, index, length;
    if (object !== null && typeof object === 'object') {
        index = objects.indexOf(object);
        if (index !== -1) {
            if (duplicatesIndexes.indexOf(index) === -1) {
                duplicatesIndexes.push(index);
            }
        } else {
            objects.push(object);
            if (Array.isArray(object)) {
                for(index = 0, length = object.length; index < length; index += 1){
                    inspectNode(object[index], objects, duplicatesIndexes);
                }
            } else {
                objectKeyList = Object.keys(object);
                for(index = 0, length = objectKeyList.length; index < length; index += 1){
                    inspectNode(object[objectKeyList[index]], objects, duplicatesIndexes);
                }
            }
        }
    }
}
function dump(input, options) {
    options = options || {};
    var state = new State(options);
    if (!state.noRefs) getDuplicateReferences(input, state);
    if (writeNode(state, 0, input, true, true)) return state.dump + '\n';
    return '';
}
function safeDump(input, options) {
    return dump(input, common.extend({
        schema: DEFAULT_SAFE_SCHEMA
    }, options));
}
module.exports.dump = dump;
module.exports.safeDump = safeDump;
}),
"[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var loader = __turbopack_context__.r("[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/loader.js [app-rsc] (ecmascript)");
var dumper = __turbopack_context__.r("[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/dumper.js [app-rsc] (ecmascript)");
function deprecated(name) {
    return function() {
        throw new Error('Function ' + name + ' is deprecated and cannot be used.');
    };
}
module.exports.Type = __turbopack_context__.r("[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type.js [app-rsc] (ecmascript)");
module.exports.Schema = __turbopack_context__.r("[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/schema.js [app-rsc] (ecmascript)");
module.exports.FAILSAFE_SCHEMA = __turbopack_context__.r("[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/schema/failsafe.js [app-rsc] (ecmascript)");
module.exports.JSON_SCHEMA = __turbopack_context__.r("[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/schema/json.js [app-rsc] (ecmascript)");
module.exports.CORE_SCHEMA = __turbopack_context__.r("[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/schema/core.js [app-rsc] (ecmascript)");
module.exports.DEFAULT_SAFE_SCHEMA = __turbopack_context__.r("[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/schema/default_safe.js [app-rsc] (ecmascript)");
module.exports.DEFAULT_FULL_SCHEMA = __turbopack_context__.r("[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/schema/default_full.js [app-rsc] (ecmascript)");
module.exports.load = loader.load;
module.exports.loadAll = loader.loadAll;
module.exports.safeLoad = loader.safeLoad;
module.exports.safeLoadAll = loader.safeLoadAll;
module.exports.dump = dumper.dump;
module.exports.safeDump = dumper.safeDump;
module.exports.YAMLException = __turbopack_context__.r("[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/exception.js [app-rsc] (ecmascript)");
// Deprecated schema names from JS-YAML 2.0.x
module.exports.MINIMAL_SCHEMA = __turbopack_context__.r("[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/schema/failsafe.js [app-rsc] (ecmascript)");
module.exports.SAFE_SCHEMA = __turbopack_context__.r("[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/schema/default_safe.js [app-rsc] (ecmascript)");
module.exports.DEFAULT_SCHEMA = __turbopack_context__.r("[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/schema/default_full.js [app-rsc] (ecmascript)");
// Deprecated functions from JS-YAML 1.x.x
module.exports.scan = deprecated('scan');
module.exports.parse = deprecated('parse');
module.exports.compose = deprecated('compose');
module.exports.addConstructor = deprecated('addConstructor');
}),
"[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var yaml = __turbopack_context__.r("[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml.js [app-rsc] (ecmascript)");
module.exports = yaml;
}),
"[project]/cafekit-web/node_modules/gray-matter/lib/engines.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const yaml = __turbopack_context__.r("[project]/cafekit-web/node_modules/gray-matter/node_modules/js-yaml/index.js [app-rsc] (ecmascript)");
/**
 * Default engines
 */ const engines = exports = module.exports;
/**
 * YAML
 */ engines.yaml = {
    parse: yaml.safeLoad.bind(yaml),
    stringify: yaml.safeDump.bind(yaml)
};
/**
 * JSON
 */ engines.json = {
    parse: JSON.parse.bind(JSON),
    stringify: function(obj, options) {
        const opts = Object.assign({
            replacer: null,
            space: 2
        }, options);
        return JSON.stringify(obj, opts.replacer, opts.space);
    }
};
/**
 * JavaScript
 */ engines.javascript = {
    parse: function parse(str, options, wrap) {
        /* eslint no-eval: 0 */ try {
            if (wrap !== false) {
                str = '(function() {\nreturn ' + str.trim() + ';\n}());';
            }
            return eval(str) || {};
        } catch (err) {
            if (wrap !== false && /(unexpected|identifier)/i.test(err.message)) {
                return parse(str, options, false);
            }
            throw new SyntaxError(err);
        }
    },
    stringify: function() {
        throw new Error('stringifying JavaScript is not supported');
    }
};
}),
"[project]/cafekit-web/node_modules/gray-matter/lib/utils.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const stripBom = __turbopack_context__.r("[project]/cafekit-web/node_modules/strip-bom-string/index.js [app-rsc] (ecmascript)");
const typeOf = __turbopack_context__.r("[project]/cafekit-web/node_modules/kind-of/index.js [app-rsc] (ecmascript)");
exports.define = function(obj, key, val) {
    Reflect.defineProperty(obj, key, {
        enumerable: false,
        configurable: true,
        writable: true,
        value: val
    });
};
/**
 * Returns true if `val` is a buffer
 */ exports.isBuffer = function(val) {
    return typeOf(val) === 'buffer';
};
/**
 * Returns true if `val` is an object
 */ exports.isObject = function(val) {
    return typeOf(val) === 'object';
};
/**
 * Cast `input` to a buffer
 */ exports.toBuffer = function(input) {
    return typeof input === 'string' ? Buffer.from(input) : input;
};
/**
 * Cast `val` to a string.
 */ exports.toString = function(input) {
    if (exports.isBuffer(input)) return stripBom(String(input));
    if (typeof input !== 'string') {
        throw new TypeError('expected input to be a string or buffer');
    }
    return stripBom(input);
};
/**
 * Cast `val` to an array.
 */ exports.arrayify = function(val) {
    return val ? Array.isArray(val) ? val : [
        val
    ] : [];
};
/**
 * Returns true if `str` starts with `substr`.
 */ exports.startsWith = function(str, substr, len) {
    if (typeof len !== 'number') len = substr.length;
    return str.slice(0, len) === substr;
};
}),
"[project]/cafekit-web/node_modules/gray-matter/lib/defaults.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const engines = __turbopack_context__.r("[project]/cafekit-web/node_modules/gray-matter/lib/engines.js [app-rsc] (ecmascript)");
const utils = __turbopack_context__.r("[project]/cafekit-web/node_modules/gray-matter/lib/utils.js [app-rsc] (ecmascript)");
module.exports = function(options) {
    const opts = Object.assign({}, options);
    // ensure that delimiters are an array
    opts.delimiters = utils.arrayify(opts.delims || opts.delimiters || '---');
    if (opts.delimiters.length === 1) {
        opts.delimiters.push(opts.delimiters[0]);
    }
    opts.language = (opts.language || opts.lang || 'yaml').toLowerCase();
    opts.engines = Object.assign({}, engines, opts.parsers, opts.engines);
    return opts;
};
}),
"[project]/cafekit-web/node_modules/gray-matter/lib/engine.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = function(name, options) {
    let engine = options.engines[name] || options.engines[aliase(name)];
    if (typeof engine === 'undefined') {
        throw new Error('gray-matter engine "' + name + '" is not registered');
    }
    if (typeof engine === 'function') {
        engine = {
            parse: engine
        };
    }
    return engine;
};
function aliase(name) {
    switch(name.toLowerCase()){
        case 'js':
        case 'javascript':
            return 'javascript';
        case 'coffee':
        case 'coffeescript':
        case 'cson':
            return 'coffee';
        case 'yaml':
        case 'yml':
            return 'yaml';
        default:
            {
                return name;
            }
    }
}
}),
"[project]/cafekit-web/node_modules/gray-matter/lib/stringify.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const typeOf = __turbopack_context__.r("[project]/cafekit-web/node_modules/kind-of/index.js [app-rsc] (ecmascript)");
const getEngine = __turbopack_context__.r("[project]/cafekit-web/node_modules/gray-matter/lib/engine.js [app-rsc] (ecmascript)");
const defaults = __turbopack_context__.r("[project]/cafekit-web/node_modules/gray-matter/lib/defaults.js [app-rsc] (ecmascript)");
module.exports = function(file, data, options) {
    if (data == null && options == null) {
        switch(typeOf(file)){
            case 'object':
                data = file.data;
                options = {};
                break;
            case 'string':
                return file;
            default:
                {
                    throw new TypeError('expected file to be a string or object');
                }
        }
    }
    const str = file.content;
    const opts = defaults(options);
    if (data == null) {
        if (!opts.data) return file;
        data = opts.data;
    }
    const language = file.language || opts.language;
    const engine = getEngine(language, opts);
    if (typeof engine.stringify !== 'function') {
        throw new TypeError('expected "' + language + '.stringify" to be a function');
    }
    data = Object.assign({}, file.data, data);
    const open = opts.delimiters[0];
    const close = opts.delimiters[1];
    const matter = engine.stringify(data, options).trim();
    let buf = '';
    if (matter !== '{}') {
        buf = newline(open) + newline(matter) + newline(close);
    }
    if (typeof file.excerpt === 'string' && file.excerpt !== '') {
        if (str.indexOf(file.excerpt.trim()) === -1) {
            buf += newline(file.excerpt) + newline(close);
        }
    }
    return buf + newline(str);
};
function newline(str) {
    return str.slice(-1) !== '\n' ? str + '\n' : str;
}
}),
"[project]/cafekit-web/node_modules/gray-matter/lib/excerpt.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const defaults = __turbopack_context__.r("[project]/cafekit-web/node_modules/gray-matter/lib/defaults.js [app-rsc] (ecmascript)");
module.exports = function(file, options) {
    const opts = defaults(options);
    if (file.data == null) {
        file.data = {};
    }
    if (typeof opts.excerpt === 'function') {
        return opts.excerpt(file, opts);
    }
    const sep = file.data.excerpt_separator || opts.excerpt_separator;
    if (sep == null && (opts.excerpt === false || opts.excerpt == null)) {
        return file;
    }
    const delimiter = typeof opts.excerpt === 'string' ? opts.excerpt : sep || opts.delimiters[0];
    // if enabled, get the excerpt defined after front-matter
    const idx = file.content.indexOf(delimiter);
    if (idx !== -1) {
        file.excerpt = file.content.slice(0, idx);
    }
    return file;
};
}),
"[project]/cafekit-web/node_modules/gray-matter/lib/to-file.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const typeOf = __turbopack_context__.r("[project]/cafekit-web/node_modules/kind-of/index.js [app-rsc] (ecmascript)");
const stringify = __turbopack_context__.r("[project]/cafekit-web/node_modules/gray-matter/lib/stringify.js [app-rsc] (ecmascript)");
const utils = __turbopack_context__.r("[project]/cafekit-web/node_modules/gray-matter/lib/utils.js [app-rsc] (ecmascript)");
/**
 * Normalize the given value to ensure an object is returned
 * with the expected properties.
 */ module.exports = function(file) {
    if (typeOf(file) !== 'object') {
        file = {
            content: file
        };
    }
    if (typeOf(file.data) !== 'object') {
        file.data = {};
    }
    // if file was passed as an object, ensure that
    // "file.content" is set
    if (file.contents && file.content == null) {
        file.content = file.contents;
    }
    // set non-enumerable properties on the file object
    utils.define(file, 'orig', utils.toBuffer(file.content));
    utils.define(file, 'language', file.language || '');
    utils.define(file, 'matter', file.matter || '');
    utils.define(file, 'stringify', function(data, options) {
        if (options && options.language) {
            file.language = options.language;
        }
        return stringify(file, data, options);
    });
    // strip BOM and ensure that "file.content" is a string
    file.content = utils.toString(file.content);
    file.isEmpty = false;
    file.excerpt = '';
    return file;
};
}),
"[project]/cafekit-web/node_modules/gray-matter/lib/parse.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const getEngine = __turbopack_context__.r("[project]/cafekit-web/node_modules/gray-matter/lib/engine.js [app-rsc] (ecmascript)");
const defaults = __turbopack_context__.r("[project]/cafekit-web/node_modules/gray-matter/lib/defaults.js [app-rsc] (ecmascript)");
module.exports = function(language, str, options) {
    const opts = defaults(options);
    const engine = getEngine(language, opts);
    if (typeof engine.parse !== 'function') {
        throw new TypeError('expected "' + language + '.parse" to be a function');
    }
    return engine.parse(str, opts);
};
}),
"[project]/cafekit-web/node_modules/gray-matter/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const fs = __turbopack_context__.r("[externals]/fs [external] (fs, cjs)");
const sections = __turbopack_context__.r("[project]/cafekit-web/node_modules/section-matter/index.js [app-rsc] (ecmascript)");
const defaults = __turbopack_context__.r("[project]/cafekit-web/node_modules/gray-matter/lib/defaults.js [app-rsc] (ecmascript)");
const stringify = __turbopack_context__.r("[project]/cafekit-web/node_modules/gray-matter/lib/stringify.js [app-rsc] (ecmascript)");
const excerpt = __turbopack_context__.r("[project]/cafekit-web/node_modules/gray-matter/lib/excerpt.js [app-rsc] (ecmascript)");
const engines = __turbopack_context__.r("[project]/cafekit-web/node_modules/gray-matter/lib/engines.js [app-rsc] (ecmascript)");
const toFile = __turbopack_context__.r("[project]/cafekit-web/node_modules/gray-matter/lib/to-file.js [app-rsc] (ecmascript)");
const parse = __turbopack_context__.r("[project]/cafekit-web/node_modules/gray-matter/lib/parse.js [app-rsc] (ecmascript)");
const utils = __turbopack_context__.r("[project]/cafekit-web/node_modules/gray-matter/lib/utils.js [app-rsc] (ecmascript)");
/**
 * Takes a string or object with `content` property, extracts
 * and parses front-matter from the string, then returns an object
 * with `data`, `content` and other [useful properties](#returned-object).
 *
 * ```js
 * const matter = require('gray-matter');
 * console.log(matter('---\ntitle: Home\n---\nOther stuff'));
 * //=> { data: { title: 'Home'}, content: 'Other stuff' }
 * ```
 * @param {Object|String} `input` String, or object with `content` string
 * @param {Object} `options`
 * @return {Object}
 * @api public
 */ function matter(input, options) {
    if (input === '') {
        return {
            data: {},
            content: input,
            excerpt: '',
            orig: input
        };
    }
    let file = toFile(input);
    const cached = matter.cache[file.content];
    if (!options) {
        if (cached) {
            file = Object.assign({}, cached);
            file.orig = cached.orig;
            return file;
        }
        // only cache if there are no options passed. if we cache when options
        // are passed, we would need to also cache options values, which would
        // negate any performance benefits of caching
        matter.cache[file.content] = file;
    }
    return parseMatter(file, options);
}
/**
 * Parse front matter
 */ function parseMatter(file, options) {
    const opts = defaults(options);
    const open = opts.delimiters[0];
    const close = '\n' + opts.delimiters[1];
    let str = file.content;
    if (opts.language) {
        file.language = opts.language;
    }
    // get the length of the opening delimiter
    const openLen = open.length;
    if (!utils.startsWith(str, open, openLen)) {
        excerpt(file, opts);
        return file;
    }
    // if the next character after the opening delimiter is
    // a character from the delimiter, then it's not a front-
    // matter delimiter
    if (str.charAt(openLen) === open.slice(-1)) {
        return file;
    }
    // strip the opening delimiter
    str = str.slice(openLen);
    const len = str.length;
    // use the language defined after first delimiter, if it exists
    const language = matter.language(str, opts);
    if (language.name) {
        file.language = language.name;
        str = str.slice(language.raw.length);
    }
    // get the index of the closing delimiter
    let closeIndex = str.indexOf(close);
    if (closeIndex === -1) {
        closeIndex = len;
    }
    // get the raw front-matter block
    file.matter = str.slice(0, closeIndex);
    const block = file.matter.replace(/^\s*#[^\n]+/gm, '').trim();
    if (block === '') {
        file.isEmpty = true;
        file.empty = file.content;
        file.data = {};
    } else {
        // create file.data by parsing the raw file.matter block
        file.data = parse(file.language, file.matter, opts);
    }
    // update file.content
    if (closeIndex === len) {
        file.content = '';
    } else {
        file.content = str.slice(closeIndex + close.length);
        if (file.content[0] === '\r') {
            file.content = file.content.slice(1);
        }
        if (file.content[0] === '\n') {
            file.content = file.content.slice(1);
        }
    }
    excerpt(file, opts);
    if (opts.sections === true || typeof opts.section === 'function') {
        sections(file, opts.section);
    }
    return file;
}
/**
 * Expose engines
 */ matter.engines = engines;
/**
 * Stringify an object to YAML or the specified language, and
 * append it to the given string. By default, only YAML and JSON
 * can be stringified. See the [engines](#engines) section to learn
 * how to stringify other languages.
 *
 * ```js
 * console.log(matter.stringify('foo bar baz', {title: 'Home'}));
 * // results in:
 * // ---
 * // title: Home
 * // ---
 * // foo bar baz
 * ```
 * @param {String|Object} `file` The content string to append to stringified front-matter, or a file object with `file.content` string.
 * @param {Object} `data` Front matter to stringify.
 * @param {Object} `options` [Options](#options) to pass to gray-matter and [js-yaml].
 * @return {String} Returns a string created by wrapping stringified yaml with delimiters, and appending that to the given string.
 * @api public
 */ matter.stringify = function(file, data, options) {
    if (typeof file === 'string') file = matter(file, options);
    return stringify(file, data, options);
};
/**
 * Synchronously read a file from the file system and parse
 * front matter. Returns the same object as the [main function](#matter).
 *
 * ```js
 * const file = matter.read('./content/blog-post.md');
 * ```
 * @param {String} `filepath` file path of the file to read.
 * @param {Object} `options` [Options](#options) to pass to gray-matter.
 * @return {Object} Returns [an object](#returned-object) with `data` and `content`
 * @api public
 */ matter.read = function(filepath, options) {
    const str = fs.readFileSync(filepath, 'utf8');
    const file = matter(str, options);
    file.path = filepath;
    return file;
};
/**
 * Returns true if the given `string` has front matter.
 * @param  {String} `string`
 * @param  {Object} `options`
 * @return {Boolean} True if front matter exists.
 * @api public
 */ matter.test = function(str, options) {
    return utils.startsWith(str, defaults(options).delimiters[0]);
};
/**
 * Detect the language to use, if one is defined after the
 * first front-matter delimiter.
 * @param  {String} `string`
 * @param  {Object} `options`
 * @return {Object} Object with `raw` (actual language string), and `name`, the language with whitespace trimmed
 */ matter.language = function(str, options) {
    const opts = defaults(options);
    const open = opts.delimiters[0];
    if (matter.test(str)) {
        str = str.slice(open.length);
    }
    const language = str.slice(0, str.search(/\r?\n/));
    return {
        raw: language,
        name: language ? language.trim() : ''
    };
};
/**
 * Expose `matter`
 */ matter.cache = {};
matter.clearCache = function() {
    matter.cache = {};
};
module.exports = matter;
}),
"[project]/cafekit-web/node_modules/strip-bom-string/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/*!
 * strip-bom-string <https://github.com/jonschlinkert/strip-bom-string>
 *
 * Copyright (c) 2015, 2017, Jon Schlinkert.
 * Released under the MIT License.
 */ module.exports = function(str) {
    if (typeof str === 'string' && str.charAt(0) === '\ufeff') {
        return str.slice(1);
    }
    return str;
};
}),
"[externals]/next-mdx-remote/rsc [external] (next-mdx-remote/rsc, esm_import, [project]/cafekit-web/node_modules/next-mdx-remote)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("next-mdx-remote-daf1dbb5e15e09b6/rsc");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[project]/cafekit-web/node_modules/unist-util-is/lib/index.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @import {Node, Parent} from 'unist'
 */ /**
 * @template Fn
 * @template Fallback
 * @typedef {Fn extends (value: any) => value is infer Thing ? Thing : Fallback} Predicate
 */ /**
 * @callback Check
 *   Check that an arbitrary value is a node.
 * @param {unknown} this
 *   The given context.
 * @param {unknown} [node]
 *   Anything (typically a node).
 * @param {number | null | undefined} [index]
 *   The node’s position in its parent.
 * @param {Parent | null | undefined} [parent]
 *   The node’s parent.
 * @returns {boolean}
 *   Whether this is a node and passes a test.
 *
 * @typedef {Record<string, unknown> | Node} Props
 *   Object to check for equivalence.
 *
 *   Note: `Node` is included as it is common but is not indexable.
 *
 * @typedef {Array<Props | TestFunction | string> | ReadonlyArray<Props | TestFunction | string> | Props | TestFunction | string | null | undefined} Test
 *   Check for an arbitrary node.
 *
 * @callback TestFunction
 *   Check if a node passes a test.
 * @param {unknown} this
 *   The given context.
 * @param {Node} node
 *   A node.
 * @param {number | undefined} [index]
 *   The node’s position in its parent.
 * @param {Parent | undefined} [parent]
 *   The node’s parent.
 * @returns {boolean | undefined | void}
 *   Whether this node passes the test.
 *
 *   Note: `void` is included until TS sees no return as `undefined`.
 */ /**
 * Check if `node` is a `Node` and whether it passes the given test.
 *
 * @param {unknown} node
 *   Thing to check, typically `Node`.
 * @param {Test} test
 *   A check for a specific node.
 * @param {number | null | undefined} index
 *   The node’s position in its parent.
 * @param {Parent | null | undefined} parent
 *   The node’s parent.
 * @param {unknown} context
 *   Context object (`this`) to pass to `test` functions.
 * @returns {boolean}
 *   Whether `node` is a node and passes a test.
 */ __turbopack_context__.s([
    "convert",
    ()=>convert,
    "is",
    ()=>is
]);
const is = /**
     * @param {unknown} [node]
     * @param {Test} [test]
     * @param {number | null | undefined} [index]
     * @param {Parent | null | undefined} [parent]
     * @param {unknown} [context]
     * @returns {boolean}
     */ // eslint-disable-next-line max-params
function(node, test, index, parent, context) {
    const check = convert(test);
    if (index !== undefined && index !== null && (typeof index !== 'number' || index < 0 || index === Number.POSITIVE_INFINITY)) {
        throw new Error('Expected positive finite index');
    }
    if (parent !== undefined && parent !== null && (!is(parent) || !parent.children)) {
        throw new Error('Expected parent node');
    }
    if ((parent === undefined || parent === null) !== (index === undefined || index === null)) {
        throw new Error('Expected both parent and index');
    }
    return looksLikeANode(node) ? check.call(context, node, index, parent) : false;
};
const convert = /**
     * @param {Test} [test]
     * @returns {Check}
     */ function(test) {
    if (test === null || test === undefined) {
        return ok;
    }
    if (typeof test === 'function') {
        return castFactory(test);
    }
    if (typeof test === 'object') {
        return Array.isArray(test) ? anyFactory(test) : // narrows to `Array`.
        propertiesFactory(test);
    }
    if (typeof test === 'string') {
        return typeFactory(test);
    }
    throw new Error('Expected function, string, or object as test');
};
/**
 * @param {Array<Props | TestFunction | string>} tests
 * @returns {Check}
 */ function anyFactory(tests) {
    /** @type {Array<Check>} */ const checks = [];
    let index = -1;
    while(++index < tests.length){
        checks[index] = convert(tests[index]);
    }
    return castFactory(any);
    //TURBOPACK unreachable
    ;
    /**
   * @this {unknown}
   * @type {TestFunction}
   */ function any(...parameters) {
        let index = -1;
        while(++index < checks.length){
            if (checks[index].apply(this, parameters)) return true;
        }
        return false;
    }
}
/**
 * Turn an object into a test for a node with a certain fields.
 *
 * @param {Props} check
 * @returns {Check}
 */ function propertiesFactory(check) {
    const checkAsRecord = check;
    return castFactory(all);
    //TURBOPACK unreachable
    ;
    /**
   * @param {Node} node
   * @returns {boolean}
   */ function all(node) {
        const nodeAsRecord = node;
        /** @type {string} */ let key;
        for(key in check){
            if (nodeAsRecord[key] !== checkAsRecord[key]) return false;
        }
        return true;
    }
}
/**
 * Turn a string into a test for a node with a certain type.
 *
 * @param {string} check
 * @returns {Check}
 */ function typeFactory(check) {
    return castFactory(type);
    //TURBOPACK unreachable
    ;
    /**
   * @param {Node} node
   */ function type(node) {
        return node && node.type === check;
    }
}
/**
 * Turn a custom test into a test for a node that passes that test.
 *
 * @param {TestFunction} testFunction
 * @returns {Check}
 */ function castFactory(testFunction) {
    return check;
    //TURBOPACK unreachable
    ;
    /**
   * @this {unknown}
   * @type {Check}
   */ function check(value, index, parent) {
        return Boolean(looksLikeANode(value) && testFunction.call(this, value, typeof index === 'number' ? index : undefined, parent || undefined));
    }
}
function ok() {
    return true;
}
/**
 * @param {unknown} value
 * @returns {value is Node}
 */ function looksLikeANode(value) {
    return value !== null && typeof value === 'object' && 'type' in value;
}
}),
"[project]/cafekit-web/node_modules/unist-util-find-after/lib/index.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "findAfter",
    ()=>findAfter
]);
/**
 * @typedef {import('unist').Node} UnistNode
 * @typedef {import('unist').Parent} UnistParent
 */ /**
 * @typedef {Exclude<import('unist-util-is').Test, undefined> | undefined} Test
 *   Test from `unist-util-is`.
 *
 *   Note: we have remove and add `undefined`, because otherwise when generating
 *   automatic `.d.ts` files, TS tries to flatten paths from a local perspective,
 *   which doesn’t work when publishing on npm.
 */ /**
 * @typedef {(
 *   Fn extends (value: any) => value is infer Thing
 *   ? Thing
 *   : Fallback
 * )} Predicate
 *   Get the value of a type guard `Fn`.
 * @template Fn
 *   Value; typically function that is a type guard (such as `(x): x is Y`).
 * @template Fallback
 *   Value to yield if `Fn` is not a type guard.
 */ /**
 * @typedef {(
 *   Check extends null | undefined // No test.
 *   ? Value
 *   : Value extends {type: Check} // String (type) test.
 *   ? Value
 *   : Value extends Check // Partial test.
 *   ? Value
 *   : Check extends Function // Function test.
 *   ? Predicate<Check, Value> extends Value
 *     ? Predicate<Check, Value>
 *     : never
 *   : never // Some other test?
 * )} MatchesOne
 *   Check whether a node matches a primitive check in the type system.
 * @template Value
 *   Value; typically unist `Node`.
 * @template Check
 *   Value; typically `unist-util-is`-compatible test, but not arrays.
 */ /**
 * @typedef {(
 *   Check extends Array<any>
 *   ? MatchesOne<Value, Check[keyof Check]>
 *   : MatchesOne<Value, Check>
 * )} Matches
 *   Check whether a node matches a check in the type system.
 * @template Value
 *   Value; typically unist `Node`.
 * @template Check
 *   Value; typically `unist-util-is`-compatible test.
 */ /**
 * @typedef {(
 *   Kind extends {children: Array<infer Child>}
 *   ? Child
 *   : never
 * )} Child
 *   Collect nodes that can be parents of `Child`.
 * @template {UnistNode} Kind
 *   All node types.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$unist$2d$util$2d$is$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/unist-util-is/lib/index.js [app-rsc] (ecmascript)");
;
const findAfter = /**
     * @param {UnistParent} parent
     * @param {UnistNode | number} index
     * @param {Test} [test]
     * @returns {UnistNode | undefined}
     */ function(parent, index, test) {
    const is = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$unist$2d$util$2d$is$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["convert"])(test);
    if (!parent || !parent.type || !parent.children) {
        throw new Error('Expected parent node');
    }
    if (typeof index === 'number') {
        if (index < 0 || index === Number.POSITIVE_INFINITY) {
            throw new Error('Expected positive finite number as index');
        }
    } else {
        index = parent.children.indexOf(index);
        if (index < 0) {
            throw new Error('Expected child node or index');
        }
    }
    while(++index < parent.children.length){
        if (is(parent.children[index], index, parent)) {
            return parent.children[index];
        }
    }
    return undefined;
};
}),
"[project]/cafekit-web/node_modules/hast-util-is-element/lib/index.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @typedef {import('hast').Element} Element
 * @typedef {import('hast').Parents} Parents
 */ /**
 * @template Fn
 * @template Fallback
 * @typedef {Fn extends (value: any) => value is infer Thing ? Thing : Fallback} Predicate
 */ /**
 * @callback Check
 *   Check that an arbitrary value is an element.
 * @param {unknown} this
 *   Context object (`this`) to call `test` with
 * @param {unknown} [element]
 *   Anything (typically a node).
 * @param {number | null | undefined} [index]
 *   Position of `element` in its parent.
 * @param {Parents | null | undefined} [parent]
 *   Parent of `element`.
 * @returns {boolean}
 *   Whether this is an element and passes a test.
 *
 * @typedef {Array<TestFunction | string> | TestFunction | string | null | undefined} Test
 *   Check for an arbitrary element.
 *
 *   * when `string`, checks that the element has that tag name
 *   * when `function`, see `TestFunction`
 *   * when `Array`, checks if one of the subtests pass
 *
 * @callback TestFunction
 *   Check if an element passes a test.
 * @param {unknown} this
 *   The given context.
 * @param {Element} element
 *   An element.
 * @param {number | undefined} [index]
 *   Position of `element` in its parent.
 * @param {Parents | undefined} [parent]
 *   Parent of `element`.
 * @returns {boolean | undefined | void}
 *   Whether this element passes the test.
 *
 *   Note: `void` is included until TS sees no return as `undefined`.
 */ /**
 * Check if `element` is an `Element` and whether it passes the given test.
 *
 * @param element
 *   Thing to check, typically `element`.
 * @param test
 *   Check for a specific element.
 * @param index
 *   Position of `element` in its parent.
 * @param parent
 *   Parent of `element`.
 * @param context
 *   Context object (`this`) to call `test` with.
 * @returns
 *   Whether `element` is an `Element` and passes a test.
 * @throws
 *   When an incorrect `test`, `index`, or `parent` is given; there is no error
 *   thrown when `element` is not a node or not an element.
 */ __turbopack_context__.s([
    "convertElement",
    ()=>convertElement,
    "isElement",
    ()=>isElement
]);
const isElement = /**
     * @param {unknown} [element]
     * @param {Test | undefined} [test]
     * @param {number | null | undefined} [index]
     * @param {Parents | null | undefined} [parent]
     * @param {unknown} [context]
     * @returns {boolean}
     */ // eslint-disable-next-line max-params
function(element, test, index, parent, context) {
    const check = convertElement(test);
    if (index !== null && index !== undefined && (typeof index !== 'number' || index < 0 || index === Number.POSITIVE_INFINITY)) {
        throw new Error('Expected positive finite `index`');
    }
    if (parent !== null && parent !== undefined && (!parent.type || !parent.children)) {
        throw new Error('Expected valid `parent`');
    }
    if ((index === null || index === undefined) !== (parent === null || parent === undefined)) {
        throw new Error('Expected both `index` and `parent`');
    }
    return looksLikeAnElement(element) ? check.call(context, element, index, parent) : false;
};
const convertElement = /**
     * @param {Test | null | undefined} [test]
     * @returns {Check}
     */ function(test) {
    if (test === null || test === undefined) {
        return element;
    }
    if (typeof test === 'string') {
        return tagNameFactory(test);
    }
    // Assume array.
    if (typeof test === 'object') {
        return anyFactory(test);
    }
    if (typeof test === 'function') {
        return castFactory(test);
    }
    throw new Error('Expected function, string, or array as `test`');
};
/**
 * Handle multiple tests.
 *
 * @param {Array<TestFunction | string>} tests
 * @returns {Check}
 */ function anyFactory(tests) {
    /** @type {Array<Check>} */ const checks = [];
    let index = -1;
    while(++index < tests.length){
        checks[index] = convertElement(tests[index]);
    }
    return castFactory(any);
    //TURBOPACK unreachable
    ;
    /**
   * @this {unknown}
   * @type {TestFunction}
   */ function any(...parameters) {
        let index = -1;
        while(++index < checks.length){
            if (checks[index].apply(this, parameters)) return true;
        }
        return false;
    }
}
/**
 * Turn a string into a test for an element with a certain type.
 *
 * @param {string} check
 * @returns {Check}
 */ function tagNameFactory(check) {
    return castFactory(tagName);
    //TURBOPACK unreachable
    ;
    /**
   * @param {Element} element
   * @returns {boolean}
   */ function tagName(element) {
        return element.tagName === check;
    }
}
/**
 * Turn a custom test into a test for an element that passes that test.
 *
 * @param {TestFunction} testFunction
 * @returns {Check}
 */ function castFactory(testFunction) {
    return check;
    //TURBOPACK unreachable
    ;
    /**
   * @this {unknown}
   * @type {Check}
   */ function check(value, index, parent) {
        return Boolean(looksLikeAnElement(value) && testFunction.call(this, value, typeof index === 'number' ? index : undefined, parent || undefined));
    }
}
/**
 * Make sure something is an element.
 *
 * @param {unknown} element
 * @returns {element is Element}
 */ function element(element) {
    return Boolean(element && typeof element === 'object' && 'type' in element && element.type === 'element' && 'tagName' in element && typeof element.tagName === 'string');
}
/**
 * @param {unknown} value
 * @returns {value is Element}
 */ function looksLikeAnElement(value) {
    return value !== null && typeof value === 'object' && 'type' in value && 'tagName' in value;
}
}),
"[project]/cafekit-web/node_modules/hast-util-to-text/lib/index.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "toText",
    ()=>toText
]);
/**
 * @typedef {import('hast').Comment} Comment
 * @typedef {import('hast').Element} Element
 * @typedef {import('hast').Nodes} Nodes
 * @typedef {import('hast').Parents} Parents
 * @typedef {import('hast').Text} Text
 * @typedef {import('hast-util-is-element').TestFunction} TestFunction
 */ /**
 * @typedef {'normal' | 'nowrap' | 'pre' | 'pre-wrap'} Whitespace
 *   Valid and useful whitespace values (from CSS).
 *
 * @typedef {0 | 1 | 2} BreakNumber
 *   Specific break:
 *
 *   *   `0` — space
 *   *   `1` — line ending
 *   *   `2` — blank line
 *
 * @typedef {'\n'} BreakForce
 *   Forced break.
 *
 * @typedef {boolean} BreakValue
 *   Whether there was a break.
 *
 * @typedef {BreakNumber | BreakValue | undefined} BreakBefore
 *   Any value for a break before.
 *
 * @typedef {BreakForce | BreakNumber | BreakValue | undefined} BreakAfter
 *   Any value for a break after.
 *
 * @typedef CollectionInfo
 *   Info on current collection.
 * @property {BreakAfter} breakAfter
 *   Whether there was a break after.
 * @property {BreakBefore} breakBefore
 *   Whether there was a break before.
 * @property {Whitespace} whitespace
 *   Current whitespace setting.
 *
 * @typedef Options
 *   Configuration.
 * @property {Whitespace | null | undefined} [whitespace='normal']
 *   Initial CSS whitespace setting to use (default: `'normal'`).
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$unist$2d$util$2d$find$2d$after$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/unist-util-find-after/lib/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$hast$2d$util$2d$is$2d$element$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/hast-util-is-element/lib/index.js [app-rsc] (ecmascript)");
;
;
const searchLineFeeds = /\n/g;
const searchTabOrSpaces = /[\t ]+/g;
const br = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$hast$2d$util$2d$is$2d$element$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["convertElement"])('br');
const cell = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$hast$2d$util$2d$is$2d$element$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["convertElement"])(isCell);
const p = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$hast$2d$util$2d$is$2d$element$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["convertElement"])('p');
const row = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$hast$2d$util$2d$is$2d$element$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["convertElement"])('tr');
// Note that we don’t need to include void elements here as they don’t have text.
// See: <https://github.com/wooorm/html-void-elements>
const notRendered = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$hast$2d$util$2d$is$2d$element$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["convertElement"])([
    // List from: <https://html.spec.whatwg.org/multipage/rendering.html#hidden-elements>
    'datalist',
    'head',
    'noembed',
    'noframes',
    'noscript',
    'rp',
    'script',
    'style',
    'template',
    'title',
    // Hidden attribute.
    hidden,
    // From: <https://html.spec.whatwg.org/multipage/rendering.html#flow-content-3>
    closedDialog
]);
// See: <https://html.spec.whatwg.org/multipage/rendering.html#the-css-user-agent-style-sheet-and-presentational-hints>
const blockOrCaption = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$hast$2d$util$2d$is$2d$element$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["convertElement"])([
    'address',
    'article',
    'aside',
    'blockquote',
    'body',
    'caption',
    'center',
    'dd',
    'dialog',
    'dir',
    'dl',
    'dt',
    'div',
    'figure',
    'figcaption',
    'footer',
    'form,',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'header',
    'hgroup',
    'hr',
    'html',
    'legend',
    'li',
    'listing',
    'main',
    'menu',
    'nav',
    'ol',
    'p',
    'plaintext',
    'pre',
    'section',
    'ul',
    'xmp' // Flow content (legacy)
]);
function toText(tree, options) {
    const options_ = options || {};
    const children = 'children' in tree ? tree.children : [];
    const block = blockOrCaption(tree);
    const whitespace = inferWhitespace(tree, {
        whitespace: options_.whitespace || 'normal',
        breakBefore: false,
        breakAfter: false
    });
    /** @type {Array<BreakNumber | string>} */ const results = [];
    // Treat `text` and `comment` as having normal white-space.
    // This deviates from the spec as in the DOM the node’s `.data` has to be
    // returned.
    // If you want that behavior use `hast-util-to-string`.
    // All other nodes are later handled as if they are `element`s (so the
    // algorithm also works on a `root`).
    // Nodes without children are treated as a void element, so `doctype` is thus
    // ignored.
    if (tree.type === 'text' || tree.type === 'comment') {
        results.push(...collectText(tree, {
            whitespace,
            breakBefore: true,
            breakAfter: true
        }));
    }
    // 1.  If this element is not being rendered, or if the user agent is a
    //     non-CSS user agent, then return the same value as the textContent IDL
    //     attribute on this element.
    //
    //     Note: we’re not supporting stylesheets so we’re acting as if the node
    //     is rendered.
    //
    //     If you want that behavior use `hast-util-to-string`.
    //     Important: we’ll have to account for this later though.
    // 2.  Let results be a new empty list.
    let index = -1;
    // 3.  For each child node node of this element:
    while(++index < children.length){
        // 3.1. Let current be the list resulting in running the inner text
        //      collection steps with node.
        //      Each item in results will either be a JavaScript string or a
        //      positive integer (a required line break count).
        // 3.2. For each item item in current, append item to results.
        results.push(...renderedTextCollection(children[index], // @ts-expect-error: `tree` is a parent if we’re here.
        tree, {
            whitespace,
            breakBefore: index ? undefined : block,
            breakAfter: index < children.length - 1 ? br(children[index + 1]) : block
        }));
    }
    // 4.  Remove any items from results that are the empty string.
    // 5.  Remove any runs of consecutive required line break count items at the
    //     start or end of results.
    // 6.  Replace each remaining run of consecutive required line break count
    //     items with a string consisting of as many U+000A LINE FEED (LF)
    //     characters as the maximum of the values in the required line break
    //     count items.
    /** @type {Array<string>} */ const result = [];
    /** @type {number | undefined} */ let count;
    index = -1;
    while(++index < results.length){
        const value = results[index];
        if (typeof value === 'number') {
            if (count !== undefined && value > count) count = value;
        } else if (value) {
            if (count !== undefined && count > -1) {
                result.push('\n'.repeat(count) || ' ');
            }
            count = -1;
            result.push(value);
        }
    }
    // 7.  Return the concatenation of the string items in results.
    return result.join('');
}
/**
 * <https://html.spec.whatwg.org/multipage/dom.html#rendered-text-collection-steps>
 *
 * @param {Nodes} node
 * @param {Parents} parent
 * @param {CollectionInfo} info
 * @returns {Array<BreakNumber | string>}
 */ function renderedTextCollection(node, parent, info) {
    if (node.type === 'element') {
        return collectElement(node, parent, info);
    }
    if (node.type === 'text') {
        return info.whitespace === 'normal' ? collectText(node, info) : collectPreText(node);
    }
    return [];
}
/**
 * Collect an element.
 *
 * @param {Element} node
 *   Element node.
 * @param {Parents} parent
 * @param {CollectionInfo} info
 *   Info on current collection.
 * @returns {Array<BreakNumber | string>}
 */ function collectElement(node, parent, info) {
    // First we infer the `white-space` property.
    const whitespace = inferWhitespace(node, info);
    const children = node.children || [];
    let index = -1;
    /** @type {Array<BreakNumber | string>} */ let items = [];
    // We’re ignoring point 3, and exiting without any content here, because we
    // deviated from the spec in `toText` at step 3.
    if (notRendered(node)) {
        return items;
    }
    /** @type {BreakNumber | undefined} */ let prefix;
    /** @type {BreakForce | BreakNumber | undefined} */ let suffix;
    // Note: we first detect if there is going to be a break before or after the
    // contents, as that changes the white-space handling.
    // 2.  If node’s computed value of `visibility` is not `visible`, then return
    //     items.
    //
    //     Note: Ignored, as everything is visible by default user agent styles.
    // 3.  If node is not being rendered, then return items. [...]
    //
    //     Note: We already did this above.
    // See `collectText` for step 4.
    // 5.  If node is a `<br>` element, then append a string containing a single
    //     U+000A LINE FEED (LF) character to items.
    if (br(node)) {
        suffix = '\n';
    } else if (row(node) && // @ts-expect-error: something up with types of parents.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$unist$2d$util$2d$find$2d$after$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["findAfter"])(parent, node, row)) {
        suffix = '\n';
    } else if (p(node)) {
        prefix = 2;
        suffix = 2;
    } else if (blockOrCaption(node)) {
        prefix = 1;
        suffix = 1;
    }
    // 1.  Let items be the result of running the inner text collection steps with
    //     each child node of node in tree order, and then concatenating the
    //     results to a single list.
    while(++index < children.length){
        items = items.concat(renderedTextCollection(children[index], node, {
            whitespace,
            breakBefore: index ? undefined : prefix,
            breakAfter: index < children.length - 1 ? br(children[index + 1]) : suffix
        }));
    }
    // 6.  If node’s computed value of `display` is `table-cell`, and node’s CSS
    //     box is not the last `table-cell` box of its enclosing `table-row` box,
    //     then append a string containing a single U+0009 CHARACTER TABULATION
    //     (tab) character to items.
    //
    //     See: <https://html.spec.whatwg.org/multipage/rendering.html#tables-2>
    if (cell(node) && // @ts-expect-error: something up with types of parents.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$unist$2d$util$2d$find$2d$after$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["findAfter"])(parent, node, cell)) {
        items.push('\t');
    }
    // Add the pre- and suffix.
    if (prefix) items.unshift(prefix);
    if (suffix) items.push(suffix);
    return items;
}
/**
 * 4.  If node is a Text node, then for each CSS text box produced by node,
 *     in content order, compute the text of the box after application of the
 *     CSS `white-space` processing rules and `text-transform` rules, set
 *     items to the list of the resulting strings, and return items.
 *     The CSS `white-space` processing rules are slightly modified:
 *     collapsible spaces at the end of lines are always collapsed, but they
 *     are only removed if the line is the last line of the block, or it ends
 *     with a br element.
 *     Soft hyphens should be preserved.
 *
 *     Note: See `collectText` and `collectPreText`.
 *     Note: we don’t deal with `text-transform`, no element has that by
 *     default.
 *
 * See: <https://drafts.csswg.org/css-text/#white-space-phase-1>
 *
 * @param {Comment | Text} node
 *   Text node.
 * @param {CollectionInfo} info
 *   Info on current collection.
 * @returns {Array<BreakNumber | string>}
 *   Result.
 */ function collectText(node, info) {
    const value = String(node.value);
    /** @type {Array<string>} */ const lines = [];
    /** @type {Array<BreakNumber | string>} */ const result = [];
    let start = 0;
    while(start <= value.length){
        searchLineFeeds.lastIndex = start;
        const match = searchLineFeeds.exec(value);
        const end = match && 'index' in match ? match.index : value.length;
        lines.push(// Any sequence of collapsible spaces and tabs immediately preceding or
        // following a segment break is removed.
        trimAndCollapseSpacesAndTabs(// […] ignoring bidi formatting characters (characters with the
        // Bidi_Control property [UAX9]: ALM, LTR, RTL, LRE-RLO, LRI-PDI) as if
        // they were not there.
        value.slice(start, end).replace(/[\u061C\u200E\u200F\u202A-\u202E\u2066-\u2069]/g, ''), start === 0 ? info.breakBefore : true, end === value.length ? info.breakAfter : true));
        start = end + 1;
    }
    // Collapsible segment breaks are transformed for rendering according to the
    // segment break transformation rules.
    // So here we jump to 4.1.2 of [CSSTEXT]:
    // Any collapsible segment break immediately following another collapsible
    // segment break is removed
    let index = -1;
    /** @type {BreakNumber | undefined} */ let join;
    while(++index < lines.length){
        // *   If the character immediately before or immediately after the segment
        //     break is the zero-width space character (U+200B), then the break is
        //     removed, leaving behind the zero-width space.
        if (lines[index].charCodeAt(lines[index].length - 1) === 0x20_0b /* ZWSP */  || index < lines.length - 1 && lines[index + 1].charCodeAt(0) === 0x20_0b) {
            result.push(lines[index]);
            join = undefined;
        } else if (lines[index]) {
            if (typeof join === 'number') result.push(join);
            result.push(lines[index]);
            join = 0;
        } else if (index === 0 || index === lines.length - 1) {
            // If this line is empty, and it’s the first or last, add a space.
            // Note that this function is only called in normal whitespace, so we
            // don’t worry about `pre`.
            result.push(0);
        }
    }
    return result;
}
/**
 * Collect a text node as “pre” whitespace.
 *
 * @param {Text} node
 *   Text node.
 * @returns {Array<BreakNumber | string>}
 *   Result.
 */ function collectPreText(node) {
    return [
        String(node.value)
    ];
}
/**
 * 3.  Every collapsible tab is converted to a collapsible space (U+0020).
 * 4.  Any collapsible space immediately following another collapsible
 *     space—even one outside the boundary of the inline containing that
 *     space, provided both spaces are within the same inline formatting
 *     context—is collapsed to have zero advance width. (It is invisible,
 *     but retains its soft wrap opportunity, if any.)
 *
 * @param {string} value
 *   Value to collapse.
 * @param {BreakBefore} breakBefore
 *   Whether there was a break before.
 * @param {BreakAfter} breakAfter
 *   Whether there was a break after.
 * @returns {string}
 *   Result.
 */ function trimAndCollapseSpacesAndTabs(value, breakBefore, breakAfter) {
    /** @type {Array<string>} */ const result = [];
    let start = 0;
    /** @type {number | undefined} */ let end;
    while(start < value.length){
        searchTabOrSpaces.lastIndex = start;
        const match = searchTabOrSpaces.exec(value);
        end = match ? match.index : value.length;
        // If we’re not directly after a segment break, but there was white space,
        // add an empty value that will be turned into a space.
        if (!start && !end && match && !breakBefore) {
            result.push('');
        }
        if (start !== end) {
            result.push(value.slice(start, end));
        }
        start = match ? end + match[0].length : end;
    }
    // If we reached the end, there was trailing white space, and there’s no
    // segment break after this node, add an empty value that will be turned
    // into a space.
    if (start !== end && !breakAfter) {
        result.push('');
    }
    return result.join(' ');
}
/**
 * Figure out the whitespace of a node.
 *
 * We don’t support void elements here (so `nobr wbr` -> `normal` is ignored).
 *
 * @param {Nodes} node
 *   Node (typically `Element`).
 * @param {CollectionInfo} info
 *   Info on current collection.
 * @returns {Whitespace}
 *   Applied whitespace.
 */ function inferWhitespace(node, info) {
    if (node.type === 'element') {
        const properties = node.properties || {};
        switch(node.tagName){
            case 'listing':
            case 'plaintext':
            case 'xmp':
                {
                    return 'pre';
                }
            case 'nobr':
                {
                    return 'nowrap';
                }
            case 'pre':
                {
                    return properties.wrap ? 'pre-wrap' : 'pre';
                }
            case 'td':
            case 'th':
                {
                    return properties.noWrap ? 'nowrap' : info.whitespace;
                }
            case 'textarea':
                {
                    return 'pre-wrap';
                }
            default:
        }
    }
    return info.whitespace;
}
/**
 * @type {TestFunction}
 * @param {Element} node
 * @returns {node is {properties: {hidden: true}}}
 */ function hidden(node) {
    return Boolean((node.properties || {}).hidden);
}
/**
 * @type {TestFunction}
 * @param {Element} node
 * @returns {node is {tagName: 'td' | 'th'}}
 */ function isCell(node) {
    return node.tagName === 'td' || node.tagName === 'th';
}
/**
 * @type {TestFunction}
 */ function closedDialog(node) {
    return node.tagName === 'dialog' && !(node.properties || {}).open;
}
}),
"[project]/cafekit-web/node_modules/lowlight/lib/common.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "grammars",
    ()=>grammars
]);
/**
 * @import {LanguageFn} from 'highlight.js'
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$arduino$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/highlight.js/es/languages/arduino.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$bash$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/highlight.js/es/languages/bash.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$c$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/highlight.js/es/languages/c.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$cpp$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/highlight.js/es/languages/cpp.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$csharp$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/highlight.js/es/languages/csharp.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$css$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/highlight.js/es/languages/css.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$diff$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/highlight.js/es/languages/diff.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$go$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/highlight.js/es/languages/go.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$graphql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/highlight.js/es/languages/graphql.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$ini$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/highlight.js/es/languages/ini.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$java$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/highlight.js/es/languages/java.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$javascript$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/highlight.js/es/languages/javascript.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$json$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/highlight.js/es/languages/json.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$kotlin$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/highlight.js/es/languages/kotlin.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$less$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/highlight.js/es/languages/less.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$lua$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/highlight.js/es/languages/lua.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$makefile$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/highlight.js/es/languages/makefile.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$markdown$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/highlight.js/es/languages/markdown.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$objectivec$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/highlight.js/es/languages/objectivec.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$perl$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/highlight.js/es/languages/perl.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$php$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/highlight.js/es/languages/php.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$php$2d$template$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/highlight.js/es/languages/php-template.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$plaintext$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/highlight.js/es/languages/plaintext.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$python$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/highlight.js/es/languages/python.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$python$2d$repl$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/highlight.js/es/languages/python-repl.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$r$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/highlight.js/es/languages/r.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$ruby$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/highlight.js/es/languages/ruby.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$rust$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/highlight.js/es/languages/rust.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$scss$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/highlight.js/es/languages/scss.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$shell$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/highlight.js/es/languages/shell.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/highlight.js/es/languages/sql.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$swift$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/highlight.js/es/languages/swift.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$typescript$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/highlight.js/es/languages/typescript.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$vbnet$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/highlight.js/es/languages/vbnet.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$wasm$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/highlight.js/es/languages/wasm.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$xml$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/highlight.js/es/languages/xml.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$yaml$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/highlight.js/es/languages/yaml.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
const grammars = {
    arduino: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$arduino$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"],
    bash: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$bash$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"],
    c: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$c$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"],
    cpp: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$cpp$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"],
    csharp: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$csharp$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"],
    css: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$css$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"],
    diff: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$diff$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"],
    go: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$go$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"],
    graphql: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$graphql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"],
    ini: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$ini$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"],
    java: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$java$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"],
    javascript: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$javascript$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"],
    json: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$json$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"],
    kotlin: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$kotlin$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"],
    less: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$less$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"],
    lua: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$lua$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"],
    makefile: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$makefile$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"],
    markdown: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$markdown$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"],
    objectivec: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$objectivec$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"],
    perl: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$perl$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"],
    php: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$php$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"],
    'php-template': __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$php$2d$template$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"],
    plaintext: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$plaintext$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"],
    python: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$python$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"],
    'python-repl': __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$python$2d$repl$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"],
    r: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$r$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"],
    ruby: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$ruby$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"],
    rust: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$rust$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"],
    scss: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$scss$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"],
    shell: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$shell$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"],
    sql: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"],
    swift: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$swift$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"],
    typescript: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$typescript$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"],
    vbnet: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$vbnet$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"],
    wasm: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$wasm$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"],
    xml: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$xml$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"],
    yaml: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$yaml$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"]
};
}),
"[project]/cafekit-web/node_modules/lowlight/lib/common.js [app-rsc] (ecmascript) <export grammars as common>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "common",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$lowlight$2f$lib$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["grammars"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$lowlight$2f$lib$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/lowlight/lib/common.js [app-rsc] (ecmascript)");
}),
"[project]/cafekit-web/node_modules/lowlight/lib/index.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createLowlight",
    ()=>createLowlight
]);
/**
 * @import {ElementContent, Element, RootData, Root} from 'hast'
 * @import {Emitter, HLJSOptions as HljsOptions, HighlightResult, LanguageFn} from 'highlight.js'
 */ /**
 * @typedef {Object} ExtraOptions
 *   Extra fields.
 * @property {ReadonlyArray<string> | null | undefined} [subset]
 *   List of allowed languages (default: all registered languages).
 *
 * @typedef Options
 *   Configuration for `highlight`.
 * @property {string | null | undefined} [prefix='hljs-']
 *   Class prefix (default: `'hljs-'`).
 *
 * @typedef {Options & ExtraOptions} AutoOptions
 *   Configuration for `highlightAuto`.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/devlop/lib/development.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$highlight$2e$js$2f$es$2f$core$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/highlight.js/es/core.js [app-rsc] (ecmascript) <locals>");
;
;
/** @type {AutoOptions} */ const emptyOptions = {};
const defaultPrefix = 'hljs-';
function createLowlight(grammars) {
    const high = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$highlight$2e$js$2f$es$2f$core$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].newInstance();
    if (grammars) {
        register(grammars);
    }
    return {
        highlight,
        highlightAuto,
        listLanguages,
        register,
        registerAlias,
        registered
    };
    //TURBOPACK unreachable
    ;
    /**
   * Highlight `value` (code) as `language` (name).
   *
   * @example
   *   ```js
   *   import {common, createLowlight} from 'lowlight'
   *
   *   const lowlight = createLowlight(common)
   *
   *   console.log(lowlight.highlight('css', 'em { color: red }'))
   *   ```
   *
   *   Yields:
   *
   *   ```js
   *   {type: 'root', children: [Array], data: {language: 'css', relevance: 3}}
   *   ```
   *
   * @param {string} language
   *   Programming language name.
   * @param {string} value
   *   Code to highlight.
   * @param {Readonly<Options> | null | undefined} [options={}]
   *   Configuration (optional).
   * @returns {Root}
   *   Tree; with the following `data` fields: `language` (`string`), detected
   *   programming language name; `relevance` (`number`), how sure lowlight is
   *   that the given code is in the language.
   */ function highlight(language, value, options) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ok"])(typeof language === 'string', 'expected `string` as `name`');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ok"])(typeof value === 'string', 'expected `string` as `value`');
        const settings = options || emptyOptions;
        const prefix = typeof settings.prefix === 'string' ? settings.prefix : defaultPrefix;
        if (!high.getLanguage(language)) {
            throw new Error('Unknown language: `' + language + '` is not registered');
        }
        // See: <https://github.com/highlightjs/highlight.js/issues/3621#issuecomment-1528841888>
        high.configure({
            __emitter: HastEmitter,
            classPrefix: prefix
        });
        const result = high.highlight(value, {
            ignoreIllegals: true,
            language
        });
        // `highlight.js` seems to use this (currently) for broken grammars, so let’s
        // keep it in there just to be sure.
        /* c8 ignore next 5 */ if (result.errorRaised) {
            throw new Error('Could not highlight with `Highlight.js`', {
                cause: result.errorRaised
            });
        }
        const root = result._emitter.root;
        // Cast because it is always defined.
        const data = root.data;
        data.language = result.language;
        data.relevance = result.relevance;
        return root;
    }
    /**
   * Highlight `value` (code) and guess its programming language.
   *
   * @example
   *   ```js
   *   import {common, createLowlight} from 'lowlight'
   *
   *   const lowlight = createLowlight(common)
   *
   *   console.log(lowlight.highlightAuto('"hello, " + name + "!"'))
   *   ```
   *
   *   Yields:
   *
   *   ```js
   *   {type: 'root', children: [Array], data: {language: 'arduino', relevance: 2}}
   *   ```
   *
   * @param {string} value
   *   Code to highlight.
   * @param {Readonly<AutoOptions> | null | undefined} [options={}]
   *   Configuration (optional).
   * @returns {Root}
   *   Tree; with the following `data` fields: `language` (`string`), detected
   *   programming language name; `relevance` (`number`), how sure lowlight is
   *   that the given code is in the language.
   */ function highlightAuto(value, options) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ok"])(typeof value === 'string', 'expected `string` as `value`');
        const settings = options || emptyOptions;
        const subset = settings.subset || listLanguages();
        let index = -1;
        let relevance = 0;
        /** @type {Root | undefined} */ let result;
        while(++index < subset.length){
            const name = subset[index];
            if (!high.getLanguage(name)) continue;
            const current = highlight(name, value, options);
            if (current.data && current.data.relevance !== undefined && current.data.relevance > relevance) {
                relevance = current.data.relevance;
                result = current;
            }
        }
        return result || {
            type: 'root',
            children: [],
            data: {
                language: undefined,
                relevance
            }
        };
    }
    /**
   * List registered languages.
   *
   * @example
   *   ```js
   *   import {createLowlight} from 'lowlight'
   *   import markdown from 'highlight.js/lib/languages/markdown'
   *
   *   const lowlight = createLowlight()
   *
   *   console.log(lowlight.listLanguages()) // => []
   *
   *   lowlight.register({markdown})
   *
   *   console.log(lowlight.listLanguages()) // => ['markdown']
   *   ```
   *
   * @returns {Array<string>}
   *   Names of registered language.
   */ function listLanguages() {
        return high.listLanguages();
    }
    /**
   * Register languages.
   *
   * @example
   *   ```js
   *   import {createLowlight} from 'lowlight'
   *   import xml from 'highlight.js/lib/languages/xml'
   *
   *   const lowlight = createLowlight()
   *
   *   lowlight.register({xml})
   *
   *   // Note: `html` is an alias for `xml`.
   *   console.log(lowlight.highlight('html', '<em>Emphasis</em>'))
   *   ```
   *
   *   Yields:
   *
   *   ```js
   *   {type: 'root', children: [Array], data: {language: 'html', relevance: 2}}
   *   ```
   *
   * @overload
   * @param {Readonly<Record<string, LanguageFn>>} grammars
   * @returns {undefined}
   *
   * @overload
   * @param {string} name
   * @param {LanguageFn} grammar
   * @returns {undefined}
   *
   * @param {Readonly<Record<string, LanguageFn>> | string} grammarsOrName
   *   Grammars or programming language name.
   * @param {LanguageFn | undefined} [grammar]
   *   Grammar, if with name.
   * @returns {undefined}
   *   Nothing.
   */ function register(grammarsOrName, grammar) {
        if (typeof grammarsOrName === 'string') {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ok"])(grammar !== undefined, 'expected `grammar`');
            high.registerLanguage(grammarsOrName, grammar);
        } else {
            /** @type {string} */ let name;
            for(name in grammarsOrName){
                if (Object.hasOwn(grammarsOrName, name)) {
                    high.registerLanguage(name, grammarsOrName[name]);
                }
            }
        }
    }
    /**
   * Register aliases.
   *
   * @example
   *   ```js
   *   import {createLowlight} from 'lowlight'
   *   import markdown from 'highlight.js/lib/languages/markdown'
   *
   *   const lowlight = createLowlight()
   *
   *   lowlight.register({markdown})
   *
   *   // lowlight.highlight('mdown', '<em>Emphasis</em>')
   *   // ^ would throw: Error: Unknown language: `mdown` is not registered
   *
   *   lowlight.registerAlias({markdown: ['mdown', 'mkdn', 'mdwn', 'ron']})
   *   lowlight.highlight('mdown', '<em>Emphasis</em>')
   *   // ^ Works!
   *   ```
   *
   * @overload
   * @param {Readonly<Record<string, ReadonlyArray<string> | string>>} aliases
   * @returns {undefined}
   *
   * @overload
   * @param {string} language
   * @param {ReadonlyArray<string> | string} alias
   * @returns {undefined}
   *
   * @param {Readonly<Record<string, ReadonlyArray<string> | string>> | string} aliasesOrName
   *   Map of programming language names to one or more aliases, or programming
   *   language name.
   * @param {ReadonlyArray<string> | string | undefined} [alias]
   *   One or more aliases for the programming language, if with `name`.
   * @returns {undefined}
   *   Nothing.
   */ function registerAlias(aliasesOrName, alias) {
        if (typeof aliasesOrName === 'string') {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ok"])(alias !== undefined);
            high.registerAliases(// Note: copy needed because hljs doesn’t accept readonly arrays yet.
            typeof alias === 'string' ? alias : [
                ...alias
            ], {
                languageName: aliasesOrName
            });
        } else {
            /** @type {string} */ let key;
            for(key in aliasesOrName){
                if (Object.hasOwn(aliasesOrName, key)) {
                    const aliases = aliasesOrName[key];
                    high.registerAliases(// Note: copy needed because hljs doesn’t accept readonly arrays yet.
                    typeof aliases === 'string' ? aliases : [
                        ...aliases
                    ], {
                        languageName: key
                    });
                }
            }
        }
    }
    /**
   * Check whether an alias or name is registered.
   *
   * @example
   *   ```js
   *   import {createLowlight} from 'lowlight'
   *   import javascript from 'highlight.js/lib/languages/javascript'
   *
   *   const lowlight = createLowlight({javascript})
   *
   *   console.log(lowlight.registered('funkyscript')) // => `false`
   *
   *   lowlight.registerAlias({javascript: 'funkyscript'})
   *   console.log(lowlight.registered('funkyscript')) // => `true`
   *   ```
   *
   * @param {string} aliasOrName
   *   Name of a language or alias for one.
   * @returns {boolean}
   *   Whether `aliasOrName` is registered.
   */ function registered(aliasOrName) {
        return Boolean(high.getLanguage(aliasOrName));
    }
}
/** @type {Emitter} */ class HastEmitter {
    /**
   * @param {Readonly<HljsOptions>} options
   *   Configuration.
   * @returns
   *   Instance.
   */ constructor(options){
        /** @type {HljsOptions} */ this.options = options;
        /** @type {Root} */ this.root = {
            type: 'root',
            children: [],
            data: {
                language: undefined,
                relevance: 0
            }
        };
        /** @type {[Root, ...Array<Element>]} */ this.stack = [
            this.root
        ];
    }
    /**
   * @param {string} value
   *   Text to add.
   * @returns {undefined}
   *   Nothing.
   *
   */ addText(value) {
        if (value === '') return;
        const current = this.stack[this.stack.length - 1];
        const tail = current.children[current.children.length - 1];
        if (tail && tail.type === 'text') {
            tail.value += value;
        } else {
            current.children.push({
                type: 'text',
                value
            });
        }
    }
    /**
   *
   * @param {unknown} rawName
   *   Name to add.
   * @returns {undefined}
   *   Nothing.
   */ startScope(rawName) {
        this.openNode(String(rawName));
    }
    /**
   * @returns {undefined}
   *   Nothing.
   */ endScope() {
        this.closeNode();
    }
    /**
   * @param {HastEmitter} other
   *   Other emitter.
   * @param {string} name
   *   Name of the sublanguage.
   * @returns {undefined}
   *   Nothing.
   */ __addSublanguage(other, name) {
        const current = this.stack[this.stack.length - 1];
        // Assume only element content.
        const results = other.root.children;
        if (name) {
            current.children.push({
                type: 'element',
                tagName: 'span',
                properties: {
                    className: [
                        name
                    ]
                },
                children: results
            });
        } else {
            current.children.push(...results);
        }
    }
    /**
   * @param {string} name
   *   Name to add.
   * @returns {undefined}
   *   Nothing.
   */ openNode(name) {
        const self = this;
        // First “class” gets the prefix. Rest gets a repeated underscore suffix.
        // See: <https://github.com/highlightjs/highlight.js/commit/51806aa>
        // See: <https://github.com/wooorm/lowlight/issues/43>
        const className = name.split('.').map(function(d, i) {
            return i ? d + '_'.repeat(i) : self.options.classPrefix + d;
        });
        const current = this.stack[this.stack.length - 1];
        /** @type {Element} */ const child = {
            type: 'element',
            tagName: 'span',
            properties: {
                className
            },
            children: []
        };
        current.children.push(child);
        this.stack.push(child);
    }
    /**
   * @returns {undefined}
   *   Nothing.
   */ closeNode() {
        this.stack.pop();
    }
    /**
   * @returns {undefined}
   *   Nothing.
   */ finalize() {}
    /**
   * @returns {string}
   *   Nothing.
   */ toHTML() {
        return '';
    }
}
}),
"[project]/cafekit-web/node_modules/dequal/dist/index.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "dequal",
    ()=>dequal
]);
var has = Object.prototype.hasOwnProperty;
function find(iter, tar, key) {
    for (key of iter.keys()){
        if (dequal(key, tar)) return key;
    }
}
function dequal(foo, bar) {
    var ctor, len, tmp;
    if (foo === bar) return true;
    if (foo && bar && (ctor = foo.constructor) === bar.constructor) {
        if (ctor === Date) return foo.getTime() === bar.getTime();
        if (ctor === RegExp) return foo.toString() === bar.toString();
        if (ctor === Array) {
            if ((len = foo.length) === bar.length) {
                while(len-- && dequal(foo[len], bar[len]));
            }
            return len === -1;
        }
        if (ctor === Set) {
            if (foo.size !== bar.size) {
                return false;
            }
            for (len of foo){
                tmp = len;
                if (tmp && typeof tmp === 'object') {
                    tmp = find(bar, tmp);
                    if (!tmp) return false;
                }
                if (!bar.has(tmp)) return false;
            }
            return true;
        }
        if (ctor === Map) {
            if (foo.size !== bar.size) {
                return false;
            }
            for (len of foo){
                tmp = len[0];
                if (tmp && typeof tmp === 'object') {
                    tmp = find(bar, tmp);
                    if (!tmp) return false;
                }
                if (!dequal(len[1], bar.get(tmp))) {
                    return false;
                }
            }
            return true;
        }
        if (ctor === ArrayBuffer) {
            foo = new Uint8Array(foo);
            bar = new Uint8Array(bar);
        } else if (ctor === DataView) {
            if ((len = foo.byteLength) === bar.byteLength) {
                while(len-- && foo.getInt8(len) === bar.getInt8(len));
            }
            return len === -1;
        }
        if (ArrayBuffer.isView(foo)) {
            if ((len = foo.byteLength) === bar.byteLength) {
                while(len-- && foo[len] === bar[len]);
            }
            return len === -1;
        }
        if (!ctor || typeof foo === 'object') {
            len = 0;
            for(ctor in foo){
                if (has.call(foo, ctor) && ++len && !has.call(bar, ctor)) return false;
                if (!(ctor in bar) || !dequal(foo[ctor], bar[ctor])) return false;
            }
            return Object.keys(bar).length === len;
        }
    }
    return foo !== foo && bar !== bar;
}
}),
"[project]/cafekit-web/node_modules/devlop/lib/development.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "deprecate",
    ()=>deprecate,
    "equal",
    ()=>equal,
    "ok",
    ()=>ok,
    "unreachable",
    ()=>unreachable
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$dequal$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/dequal/dist/index.mjs [app-rsc] (ecmascript)");
;
/**
 * @type {Set<string>}
 */ const codesWarned = new Set();
class AssertionError extends Error {
    name = 'Assertion';
    code = 'ERR_ASSERTION';
    /**
   * Create an assertion error.
   *
   * @param {string} message
   *   Message explaining error.
   * @param {unknown} actual
   *   Value.
   * @param {unknown} expected
   *   Baseline.
   * @param {string} operator
   *   Name of equality operation.
   * @param {boolean} generated
   *   Whether `message` is a custom message or not
   * @returns
   *   Instance.
   */ // eslint-disable-next-line max-params
    constructor(message, actual, expected, operator, generated){
        super(message);
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
        /**
     * @type {unknown}
     */ this.actual = actual;
        /**
     * @type {unknown}
     */ this.expected = expected;
        /**
     * @type {boolean}
     */ this.generated = generated;
        /**
     * @type {string}
     */ this.operator = operator;
    }
}
class DeprecationError extends Error {
    name = 'DeprecationWarning';
    /**
   * Create a deprecation message.
   *
   * @param {string} message
   *   Message explaining deprecation.
   * @param {string | undefined} code
   *   Deprecation identifier; deprecation messages will be generated only once per code.
   * @returns
   *   Instance.
   */ constructor(message, code){
        super(message);
        /**
     * @type {string | undefined}
     */ this.code = code;
    }
}
function deprecate(fn, message, code) {
    let warned = false;
    // The wrapper will keep the same prototype as fn to maintain prototype chain
    Object.setPrototypeOf(deprecated, fn);
    // @ts-expect-error: it’s perfect, typescript…
    return deprecated;
    //TURBOPACK unreachable
    ;
    /**
   * @this {unknown}
   * @param  {...Array<unknown>} args
   * @returns {unknown}
   */ function deprecated(...args) {
        if (!warned) {
            warned = true;
            if (typeof code === 'string' && codesWarned.has(code)) {
            // Empty.
            } else {
                console.error(new DeprecationError(message, code || undefined));
                if (typeof code === 'string') codesWarned.add(code);
            }
        }
        return new.target ? Reflect.construct(fn, args, new.target) : Reflect.apply(fn, this, args);
    }
}
function equal(actual, expected, message) {
    assert((0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$dequal$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["dequal"])(actual, expected), actual, expected, 'equal', 'Expected values to be deeply equal', message);
}
function ok(value, message) {
    assert(Boolean(value), false, true, 'ok', 'Expected value to be truthy', message);
}
function unreachable(message) {
    assert(false, false, true, 'ok', 'Unreachable', message);
}
/**
 * @param {boolean} bool
 *   Whether to skip this operation.
 * @param {unknown} actual
 *   Actual value.
 * @param {unknown} expected
 *   Expected value.
 * @param {string} operator
 *   Operator.
 * @param {string} defaultMessage
 *   Default message for operation.
 * @param {Error | string | null | undefined} userMessage
 *   User-provided message.
 * @returns {asserts bool}
 *   Nothing; throws when falsey.
 */ // eslint-disable-next-line max-params
function assert(bool, actual, expected, operator, defaultMessage, userMessage) {
    if (!bool) {
        throw userMessage instanceof Error ? userMessage : new AssertionError(userMessage || defaultMessage, actual, expected, operator, !userMessage);
    }
}
}),
"[project]/cafekit-web/node_modules/unist-util-visit/node_modules/unist-util-visit-parents/lib/color.node.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @param {string} d
 * @returns {string}
 */ __turbopack_context__.s([
    "color",
    ()=>color
]);
function color(d) {
    return '\u001B[33m' + d + '\u001B[39m';
}
}),
"[project]/cafekit-web/node_modules/unist-util-visit/node_modules/unist-util-visit-parents/lib/index.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CONTINUE",
    ()=>CONTINUE,
    "EXIT",
    ()=>EXIT,
    "SKIP",
    ()=>SKIP,
    "visitParents",
    ()=>visitParents
]);
/**
 * @import {Node as UnistNode, Parent as UnistParent} from 'unist'
 */ /**
 * @typedef {Exclude<import('unist-util-is').Test, undefined> | undefined} Test
 *   Test from `unist-util-is`.
 *
 *   Note: we have remove and add `undefined`, because otherwise when generating
 *   automatic `.d.ts` files, TS tries to flatten paths from a local perspective,
 *   which doesn’t work when publishing on npm.
 */ /**
 * @typedef {(
 *   Fn extends (value: any) => value is infer Thing
 *   ? Thing
 *   : Fallback
 * )} Predicate
 *   Get the value of a type guard `Fn`.
 * @template Fn
 *   Value; typically function that is a type guard (such as `(x): x is Y`).
 * @template Fallback
 *   Value to yield if `Fn` is not a type guard.
 */ /**
 * @typedef {(
 *   Check extends null | undefined // No test.
 *   ? Value
 *   : Value extends {type: Check} // String (type) test.
 *   ? Value
 *   : Value extends Check // Partial test.
 *   ? Value
 *   : Check extends Function // Function test.
 *   ? Predicate<Check, Value> extends Value
 *     ? Predicate<Check, Value>
 *     : never
 *   : never // Some other test?
 * )} MatchesOne
 *   Check whether a node matches a primitive check in the type system.
 * @template Value
 *   Value; typically unist `Node`.
 * @template Check
 *   Value; typically `unist-util-is`-compatible test, but not arrays.
 */ /**
 * @typedef {(
 *   Check extends ReadonlyArray<infer T>
 *   ? MatchesOne<Value, T>
 *   : Check extends Array<infer T>
 *   ? MatchesOne<Value, T>
 *   : MatchesOne<Value, Check>
 * )} Matches
 *   Check whether a node matches a check in the type system.
 * @template Value
 *   Value; typically unist `Node`.
 * @template Check
 *   Value; typically `unist-util-is`-compatible test.
 */ /**
 * @typedef {0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10} Uint
 *   Number; capped reasonably.
 */ /**
 * @typedef {I extends 0 ? 1 : I extends 1 ? 2 : I extends 2 ? 3 : I extends 3 ? 4 : I extends 4 ? 5 : I extends 5 ? 6 : I extends 6 ? 7 : I extends 7 ? 8 : I extends 8 ? 9 : 10} Increment
 *   Increment a number in the type system.
 * @template {Uint} [I=0]
 *   Index.
 */ /**
 * @typedef {(
 *   Node extends UnistParent
 *   ? Node extends {children: Array<infer Children>}
 *     ? Child extends Children ? Node : never
 *     : never
 *   : never
 * )} InternalParent
 *   Collect nodes that can be parents of `Child`.
 * @template {UnistNode} Node
 *   All node types in a tree.
 * @template {UnistNode} Child
 *   Node to search for.
 */ /**
 * @typedef {InternalParent<InclusiveDescendant<Tree>, Child>} Parent
 *   Collect nodes in `Tree` that can be parents of `Child`.
 * @template {UnistNode} Tree
 *   All node types in a tree.
 * @template {UnistNode} Child
 *   Node to search for.
 */ /**
 * @typedef {(
 *   Depth extends Max
 *   ? never
 *   :
 *     | InternalParent<Node, Child>
 *     | InternalAncestor<Node, InternalParent<Node, Child>, Max, Increment<Depth>>
 * )} InternalAncestor
 *   Collect nodes in `Tree` that can be ancestors of `Child`.
 * @template {UnistNode} Node
 *   All node types in a tree.
 * @template {UnistNode} Child
 *   Node to search for.
 * @template {Uint} [Max=10]
 *   Max; searches up to this depth.
 * @template {Uint} [Depth=0]
 *   Current depth.
 */ /**
 * @typedef {InternalAncestor<InclusiveDescendant<Tree>, Child>} Ancestor
 *   Collect nodes in `Tree` that can be ancestors of `Child`.
 * @template {UnistNode} Tree
 *   All node types in a tree.
 * @template {UnistNode} Child
 *   Node to search for.
 */ /**
 * @typedef {(
 *   Tree extends UnistParent
 *     ? Depth extends Max
 *       ? Tree
 *       : Tree | InclusiveDescendant<Tree['children'][number], Max, Increment<Depth>>
 *     : Tree
 * )} InclusiveDescendant
 *   Collect all (inclusive) descendants of `Tree`.
 *
 *   > 👉 **Note**: for performance reasons, this seems to be the fastest way to
 *   > recurse without actually running into an infinite loop, which the
 *   > previous version did.
 *   >
 *   > Practically, a max of `2` is typically enough assuming a `Root` is
 *   > passed, but it doesn’t improve performance.
 *   > It gets higher with `List > ListItem > Table > TableRow > TableCell`.
 *   > Using up to `10` doesn’t hurt or help either.
 * @template {UnistNode} Tree
 *   Tree type.
 * @template {Uint} [Max=10]
 *   Max; searches up to this depth.
 * @template {Uint} [Depth=0]
 *   Current depth.
 */ /**
 * @typedef {'skip' | boolean} Action
 *   Union of the action types.
 *
 * @typedef {number} Index
 *   Move to the sibling at `index` next (after node itself is completely
 *   traversed).
 *
 *   Useful if mutating the tree, such as removing the node the visitor is
 *   currently on, or any of its previous siblings.
 *   Results less than 0 or greater than or equal to `children.length` stop
 *   traversing the parent.
 *
 * @typedef {[(Action | null | undefined | void)?, (Index | null | undefined)?]} ActionTuple
 *   List with one or two values, the first an action, the second an index.
 *
 * @typedef {Action | ActionTuple | Index | null | undefined | void} VisitorResult
 *   Any value that can be returned from a visitor.
 */ /**
 * @callback Visitor
 *   Handle a node (matching `test`, if given).
 *
 *   Visitors are free to transform `node`.
 *   They can also transform the parent of node (the last of `ancestors`).
 *
 *   Replacing `node` itself, if `SKIP` is not returned, still causes its
 *   descendants to be walked (which is a bug).
 *
 *   When adding or removing previous siblings of `node` (or next siblings, in
 *   case of reverse), the `Visitor` should return a new `Index` to specify the
 *   sibling to traverse after `node` is traversed.
 *   Adding or removing next siblings of `node` (or previous siblings, in case
 *   of reverse) is handled as expected without needing to return a new `Index`.
 *
 *   Removing the children property of an ancestor still results in them being
 *   traversed.
 * @param {Visited} node
 *   Found node.
 * @param {Array<VisitedParents>} ancestors
 *   Ancestors of `node`.
 * @returns {VisitorResult}
 *   What to do next.
 *
 *   An `Index` is treated as a tuple of `[CONTINUE, Index]`.
 *   An `Action` is treated as a tuple of `[Action]`.
 *
 *   Passing a tuple back only makes sense if the `Action` is `SKIP`.
 *   When the `Action` is `EXIT`, that action can be returned.
 *   When the `Action` is `CONTINUE`, `Index` can be returned.
 * @template {UnistNode} [Visited=UnistNode]
 *   Visited node type.
 * @template {UnistParent} [VisitedParents=UnistParent]
 *   Ancestor type.
 */ /**
 * @typedef {Visitor<Matches<InclusiveDescendant<Tree>, Check>, Ancestor<Tree, Matches<InclusiveDescendant<Tree>, Check>>>} BuildVisitor
 *   Build a typed `Visitor` function from a tree and a test.
 *
 *   It will infer which values are passed as `node` and which as `parents`.
 * @template {UnistNode} [Tree=UnistNode]
 *   Tree type.
 * @template {Test} [Check=Test]
 *   Test type.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$unist$2d$util$2d$is$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/unist-util-is/lib/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$unist$2d$util$2d$visit$2f$node_modules$2f$unist$2d$util$2d$visit$2d$parents$2f$lib$2f$color$2e$node$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/unist-util-visit/node_modules/unist-util-visit-parents/lib/color.node.js [app-rsc] (ecmascript)");
;
;
/** @type {Readonly<ActionTuple>} */ const empty = [];
const CONTINUE = true;
const EXIT = false;
const SKIP = 'skip';
function visitParents(tree, test, visitor, reverse) {
    /** @type {Test} */ let check;
    if (typeof test === 'function' && typeof visitor !== 'function') {
        reverse = visitor;
        // @ts-expect-error no visitor given, so `visitor` is test.
        visitor = test;
    } else {
        // @ts-expect-error visitor given, so `test` isn’t a visitor.
        check = test;
    }
    const is = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$unist$2d$util$2d$is$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["convert"])(check);
    const step = reverse ? -1 : 1;
    factory(tree, undefined, [])();
    /**
   * @param {UnistNode} node
   * @param {number | undefined} index
   * @param {Array<UnistParent>} parents
   */ function factory(node, index, parents) {
        const value = node && typeof node === 'object' ? node : {};
        if (typeof value.type === 'string') {
            const name = // `hast`
            typeof value.tagName === 'string' ? value.tagName : typeof value.name === 'string' ? value.name : undefined;
            Object.defineProperty(visit, 'name', {
                value: 'node (' + (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$unist$2d$util$2d$visit$2f$node_modules$2f$unist$2d$util$2d$visit$2d$parents$2f$lib$2f$color$2e$node$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["color"])(node.type + (name ? '<' + name + '>' : '')) + ')'
            });
        }
        return visit;
        //TURBOPACK unreachable
        ;
        function visit() {
            /** @type {Readonly<ActionTuple>} */ let result = empty;
            /** @type {Readonly<ActionTuple>} */ let subresult;
            /** @type {number} */ let offset;
            /** @type {Array<UnistParent>} */ let grandparents;
            if (!test || is(node, index, parents[parents.length - 1] || undefined)) {
                // @ts-expect-error: `visitor` is now a visitor.
                result = toResult(visitor(node, parents));
                if (result[0] === EXIT) {
                    return result;
                }
            }
            if ('children' in node && node.children) {
                const nodeAsParent = node;
                if (nodeAsParent.children && result[0] !== SKIP) {
                    offset = (reverse ? nodeAsParent.children.length : -1) + step;
                    grandparents = parents.concat(nodeAsParent);
                    while(offset > -1 && offset < nodeAsParent.children.length){
                        const child = nodeAsParent.children[offset];
                        subresult = factory(child, offset, grandparents)();
                        if (subresult[0] === EXIT) {
                            return subresult;
                        }
                        offset = typeof subresult[1] === 'number' ? subresult[1] : offset + step;
                    }
                }
            }
            return result;
        }
    }
}
/**
 * Turn a return value into a clean result.
 *
 * @param {VisitorResult} value
 *   Valid return values from visitors.
 * @returns {Readonly<ActionTuple>}
 *   Clean result.
 */ function toResult(value) {
    if (Array.isArray(value)) {
        return value;
    }
    if (typeof value === 'number') {
        return [
            CONTINUE,
            value
        ];
    }
    return value === null || value === undefined ? empty : [
        value
    ];
}
}),
"[project]/cafekit-web/node_modules/mdast-util-find-and-replace/node_modules/unist-util-visit-parents/lib/color.node.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @param {string} d
 * @returns {string}
 */ __turbopack_context__.s([
    "color",
    ()=>color
]);
function color(d) {
    return '\u001B[33m' + d + '\u001B[39m';
}
}),
"[project]/cafekit-web/node_modules/mdast-util-find-and-replace/node_modules/unist-util-visit-parents/lib/index.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CONTINUE",
    ()=>CONTINUE,
    "EXIT",
    ()=>EXIT,
    "SKIP",
    ()=>SKIP,
    "visitParents",
    ()=>visitParents
]);
/**
 * @import {Node as UnistNode, Parent as UnistParent} from 'unist'
 */ /**
 * @typedef {Exclude<import('unist-util-is').Test, undefined> | undefined} Test
 *   Test from `unist-util-is`.
 *
 *   Note: we have remove and add `undefined`, because otherwise when generating
 *   automatic `.d.ts` files, TS tries to flatten paths from a local perspective,
 *   which doesn’t work when publishing on npm.
 */ /**
 * @typedef {(
 *   Fn extends (value: any) => value is infer Thing
 *   ? Thing
 *   : Fallback
 * )} Predicate
 *   Get the value of a type guard `Fn`.
 * @template Fn
 *   Value; typically function that is a type guard (such as `(x): x is Y`).
 * @template Fallback
 *   Value to yield if `Fn` is not a type guard.
 */ /**
 * @typedef {(
 *   Check extends null | undefined // No test.
 *   ? Value
 *   : Value extends {type: Check} // String (type) test.
 *   ? Value
 *   : Value extends Check // Partial test.
 *   ? Value
 *   : Check extends Function // Function test.
 *   ? Predicate<Check, Value> extends Value
 *     ? Predicate<Check, Value>
 *     : never
 *   : never // Some other test?
 * )} MatchesOne
 *   Check whether a node matches a primitive check in the type system.
 * @template Value
 *   Value; typically unist `Node`.
 * @template Check
 *   Value; typically `unist-util-is`-compatible test, but not arrays.
 */ /**
 * @typedef {(
 *   Check extends ReadonlyArray<infer T>
 *   ? MatchesOne<Value, T>
 *   : Check extends Array<infer T>
 *   ? MatchesOne<Value, T>
 *   : MatchesOne<Value, Check>
 * )} Matches
 *   Check whether a node matches a check in the type system.
 * @template Value
 *   Value; typically unist `Node`.
 * @template Check
 *   Value; typically `unist-util-is`-compatible test.
 */ /**
 * @typedef {0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10} Uint
 *   Number; capped reasonably.
 */ /**
 * @typedef {I extends 0 ? 1 : I extends 1 ? 2 : I extends 2 ? 3 : I extends 3 ? 4 : I extends 4 ? 5 : I extends 5 ? 6 : I extends 6 ? 7 : I extends 7 ? 8 : I extends 8 ? 9 : 10} Increment
 *   Increment a number in the type system.
 * @template {Uint} [I=0]
 *   Index.
 */ /**
 * @typedef {(
 *   Node extends UnistParent
 *   ? Node extends {children: Array<infer Children>}
 *     ? Child extends Children ? Node : never
 *     : never
 *   : never
 * )} InternalParent
 *   Collect nodes that can be parents of `Child`.
 * @template {UnistNode} Node
 *   All node types in a tree.
 * @template {UnistNode} Child
 *   Node to search for.
 */ /**
 * @typedef {InternalParent<InclusiveDescendant<Tree>, Child>} Parent
 *   Collect nodes in `Tree` that can be parents of `Child`.
 * @template {UnistNode} Tree
 *   All node types in a tree.
 * @template {UnistNode} Child
 *   Node to search for.
 */ /**
 * @typedef {(
 *   Depth extends Max
 *   ? never
 *   :
 *     | InternalParent<Node, Child>
 *     | InternalAncestor<Node, InternalParent<Node, Child>, Max, Increment<Depth>>
 * )} InternalAncestor
 *   Collect nodes in `Tree` that can be ancestors of `Child`.
 * @template {UnistNode} Node
 *   All node types in a tree.
 * @template {UnistNode} Child
 *   Node to search for.
 * @template {Uint} [Max=10]
 *   Max; searches up to this depth.
 * @template {Uint} [Depth=0]
 *   Current depth.
 */ /**
 * @typedef {InternalAncestor<InclusiveDescendant<Tree>, Child>} Ancestor
 *   Collect nodes in `Tree` that can be ancestors of `Child`.
 * @template {UnistNode} Tree
 *   All node types in a tree.
 * @template {UnistNode} Child
 *   Node to search for.
 */ /**
 * @typedef {(
 *   Tree extends UnistParent
 *     ? Depth extends Max
 *       ? Tree
 *       : Tree | InclusiveDescendant<Tree['children'][number], Max, Increment<Depth>>
 *     : Tree
 * )} InclusiveDescendant
 *   Collect all (inclusive) descendants of `Tree`.
 *
 *   > 👉 **Note**: for performance reasons, this seems to be the fastest way to
 *   > recurse without actually running into an infinite loop, which the
 *   > previous version did.
 *   >
 *   > Practically, a max of `2` is typically enough assuming a `Root` is
 *   > passed, but it doesn’t improve performance.
 *   > It gets higher with `List > ListItem > Table > TableRow > TableCell`.
 *   > Using up to `10` doesn’t hurt or help either.
 * @template {UnistNode} Tree
 *   Tree type.
 * @template {Uint} [Max=10]
 *   Max; searches up to this depth.
 * @template {Uint} [Depth=0]
 *   Current depth.
 */ /**
 * @typedef {'skip' | boolean} Action
 *   Union of the action types.
 *
 * @typedef {number} Index
 *   Move to the sibling at `index` next (after node itself is completely
 *   traversed).
 *
 *   Useful if mutating the tree, such as removing the node the visitor is
 *   currently on, or any of its previous siblings.
 *   Results less than 0 or greater than or equal to `children.length` stop
 *   traversing the parent.
 *
 * @typedef {[(Action | null | undefined | void)?, (Index | null | undefined)?]} ActionTuple
 *   List with one or two values, the first an action, the second an index.
 *
 * @typedef {Action | ActionTuple | Index | null | undefined | void} VisitorResult
 *   Any value that can be returned from a visitor.
 */ /**
 * @callback Visitor
 *   Handle a node (matching `test`, if given).
 *
 *   Visitors are free to transform `node`.
 *   They can also transform the parent of node (the last of `ancestors`).
 *
 *   Replacing `node` itself, if `SKIP` is not returned, still causes its
 *   descendants to be walked (which is a bug).
 *
 *   When adding or removing previous siblings of `node` (or next siblings, in
 *   case of reverse), the `Visitor` should return a new `Index` to specify the
 *   sibling to traverse after `node` is traversed.
 *   Adding or removing next siblings of `node` (or previous siblings, in case
 *   of reverse) is handled as expected without needing to return a new `Index`.
 *
 *   Removing the children property of an ancestor still results in them being
 *   traversed.
 * @param {Visited} node
 *   Found node.
 * @param {Array<VisitedParents>} ancestors
 *   Ancestors of `node`.
 * @returns {VisitorResult}
 *   What to do next.
 *
 *   An `Index` is treated as a tuple of `[CONTINUE, Index]`.
 *   An `Action` is treated as a tuple of `[Action]`.
 *
 *   Passing a tuple back only makes sense if the `Action` is `SKIP`.
 *   When the `Action` is `EXIT`, that action can be returned.
 *   When the `Action` is `CONTINUE`, `Index` can be returned.
 * @template {UnistNode} [Visited=UnistNode]
 *   Visited node type.
 * @template {UnistParent} [VisitedParents=UnistParent]
 *   Ancestor type.
 */ /**
 * @typedef {Visitor<Matches<InclusiveDescendant<Tree>, Check>, Ancestor<Tree, Matches<InclusiveDescendant<Tree>, Check>>>} BuildVisitor
 *   Build a typed `Visitor` function from a tree and a test.
 *
 *   It will infer which values are passed as `node` and which as `parents`.
 * @template {UnistNode} [Tree=UnistNode]
 *   Tree type.
 * @template {Test} [Check=Test]
 *   Test type.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$unist$2d$util$2d$is$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/unist-util-is/lib/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$find$2d$and$2d$replace$2f$node_modules$2f$unist$2d$util$2d$visit$2d$parents$2f$lib$2f$color$2e$node$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/mdast-util-find-and-replace/node_modules/unist-util-visit-parents/lib/color.node.js [app-rsc] (ecmascript)");
;
;
/** @type {Readonly<ActionTuple>} */ const empty = [];
const CONTINUE = true;
const EXIT = false;
const SKIP = 'skip';
function visitParents(tree, test, visitor, reverse) {
    /** @type {Test} */ let check;
    if (typeof test === 'function' && typeof visitor !== 'function') {
        reverse = visitor;
        // @ts-expect-error no visitor given, so `visitor` is test.
        visitor = test;
    } else {
        // @ts-expect-error visitor given, so `test` isn’t a visitor.
        check = test;
    }
    const is = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$unist$2d$util$2d$is$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["convert"])(check);
    const step = reverse ? -1 : 1;
    factory(tree, undefined, [])();
    /**
   * @param {UnistNode} node
   * @param {number | undefined} index
   * @param {Array<UnistParent>} parents
   */ function factory(node, index, parents) {
        const value = node && typeof node === 'object' ? node : {};
        if (typeof value.type === 'string') {
            const name = // `hast`
            typeof value.tagName === 'string' ? value.tagName : typeof value.name === 'string' ? value.name : undefined;
            Object.defineProperty(visit, 'name', {
                value: 'node (' + (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$find$2d$and$2d$replace$2f$node_modules$2f$unist$2d$util$2d$visit$2d$parents$2f$lib$2f$color$2e$node$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["color"])(node.type + (name ? '<' + name + '>' : '')) + ')'
            });
        }
        return visit;
        //TURBOPACK unreachable
        ;
        function visit() {
            /** @type {Readonly<ActionTuple>} */ let result = empty;
            /** @type {Readonly<ActionTuple>} */ let subresult;
            /** @type {number} */ let offset;
            /** @type {Array<UnistParent>} */ let grandparents;
            if (!test || is(node, index, parents[parents.length - 1] || undefined)) {
                // @ts-expect-error: `visitor` is now a visitor.
                result = toResult(visitor(node, parents));
                if (result[0] === EXIT) {
                    return result;
                }
            }
            if ('children' in node && node.children) {
                const nodeAsParent = node;
                if (nodeAsParent.children && result[0] !== SKIP) {
                    offset = (reverse ? nodeAsParent.children.length : -1) + step;
                    grandparents = parents.concat(nodeAsParent);
                    while(offset > -1 && offset < nodeAsParent.children.length){
                        const child = nodeAsParent.children[offset];
                        subresult = factory(child, offset, grandparents)();
                        if (subresult[0] === EXIT) {
                            return subresult;
                        }
                        offset = typeof subresult[1] === 'number' ? subresult[1] : offset + step;
                    }
                }
            }
            return result;
        }
    }
}
/**
 * Turn a return value into a clean result.
 *
 * @param {VisitorResult} value
 *   Valid return values from visitors.
 * @returns {Readonly<ActionTuple>}
 *   Clean result.
 */ function toResult(value) {
    if (Array.isArray(value)) {
        return value;
    }
    if (typeof value === 'number') {
        return [
            CONTINUE,
            value
        ];
    }
    return value === null || value === undefined ? empty : [
        value
    ];
}
}),
"[project]/cafekit-web/node_modules/unist-util-visit/lib/index.js [app-rsc] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "visit",
    ()=>visit
]);
/**
 * @import {Node as UnistNode, Parent as UnistParent} from 'unist'
 * @import {VisitorResult} from 'unist-util-visit-parents'
 */ /**
 * @typedef {Exclude<import('unist-util-is').Test, undefined> | undefined} Test
 *   Test from `unist-util-is`.
 *
 *   Note: we have remove and add `undefined`, because otherwise when generating
 *   automatic `.d.ts` files, TS tries to flatten paths from a local perspective,
 *   which doesn’t work when publishing on npm.
 */ // To do: use types from `unist-util-visit-parents` when it’s released.
/**
 * @typedef {(
 *   Fn extends (value: any) => value is infer Thing
 *   ? Thing
 *   : Fallback
 * )} Predicate
 *   Get the value of a type guard `Fn`.
 * @template Fn
 *   Value; typically function that is a type guard (such as `(x): x is Y`).
 * @template Fallback
 *   Value to yield if `Fn` is not a type guard.
 */ /**
 * @typedef {(
 *   Check extends null | undefined // No test.
 *   ? Value
 *   : Value extends {type: Check} // String (type) test.
 *   ? Value
 *   : Value extends Check // Partial test.
 *   ? Value
 *   : Check extends Function // Function test.
 *   ? Predicate<Check, Value> extends Value
 *     ? Predicate<Check, Value>
 *     : never
 *   : never // Some other test?
 * )} MatchesOne
 *   Check whether a node matches a primitive check in the type system.
 * @template Value
 *   Value; typically unist `Node`.
 * @template Check
 *   Value; typically `unist-util-is`-compatible test, but not arrays.
 */ /**
 * @typedef {(
 *   Check extends ReadonlyArray<any>
 *   ? MatchesOne<Value, Check[number]>
 *   : MatchesOne<Value, Check>
 * )} Matches
 *   Check whether a node matches a check in the type system.
 * @template Value
 *   Value; typically unist `Node`.
 * @template Check
 *   Value; typically `unist-util-is`-compatible test.
 */ /**
 * @typedef {0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10} Uint
 *   Number; capped reasonably.
 */ /**
 * @typedef {I extends 0 ? 1 : I extends 1 ? 2 : I extends 2 ? 3 : I extends 3 ? 4 : I extends 4 ? 5 : I extends 5 ? 6 : I extends 6 ? 7 : I extends 7 ? 8 : I extends 8 ? 9 : 10} Increment
 *   Increment a number in the type system.
 * @template {Uint} [I=0]
 *   Index.
 */ /**
 * @typedef {(
 *   Node extends UnistParent
 *   ? Node extends {children: Array<infer Children>}
 *     ? Child extends Children ? Node : never
 *     : never
 *   : never
 * )} InternalParent
 *   Collect nodes that can be parents of `Child`.
 * @template {UnistNode} Node
 *   All node types in a tree.
 * @template {UnistNode} Child
 *   Node to search for.
 */ /**
 * @typedef {InternalParent<InclusiveDescendant<Tree>, Child>} Parent
 *   Collect nodes in `Tree` that can be parents of `Child`.
 * @template {UnistNode} Tree
 *   All node types in a tree.
 * @template {UnistNode} Child
 *   Node to search for.
 */ /**
 * @typedef {(
 *   Depth extends Max
 *   ? never
 *   :
 *     | InternalParent<Node, Child>
 *     | InternalAncestor<Node, InternalParent<Node, Child>, Max, Increment<Depth>>
 * )} InternalAncestor
 *   Collect nodes in `Tree` that can be ancestors of `Child`.
 * @template {UnistNode} Node
 *   All node types in a tree.
 * @template {UnistNode} Child
 *   Node to search for.
 * @template {Uint} [Max=10]
 *   Max; searches up to this depth.
 * @template {Uint} [Depth=0]
 *   Current depth.
 */ /**
 * @typedef {(
 *   Tree extends UnistParent
 *     ? Depth extends Max
 *       ? Tree
 *       : Tree | InclusiveDescendant<Tree['children'][number], Max, Increment<Depth>>
 *     : Tree
 * )} InclusiveDescendant
 *   Collect all (inclusive) descendants of `Tree`.
 *
 *   > 👉 **Note**: for performance reasons, this seems to be the fastest way to
 *   > recurse without actually running into an infinite loop, which the
 *   > previous version did.
 *   >
 *   > Practically, a max of `2` is typically enough assuming a `Root` is
 *   > passed, but it doesn’t improve performance.
 *   > It gets higher with `List > ListItem > Table > TableRow > TableCell`.
 *   > Using up to `10` doesn’t hurt or help either.
 * @template {UnistNode} Tree
 *   Tree type.
 * @template {Uint} [Max=10]
 *   Max; searches up to this depth.
 * @template {Uint} [Depth=0]
 *   Current depth.
 */ /**
 * @callback Visitor
 *   Handle a node (matching `test`, if given).
 *
 *   Visitors are free to transform `node`.
 *   They can also transform `parent`.
 *
 *   Replacing `node` itself, if `SKIP` is not returned, still causes its
 *   descendants to be walked (which is a bug).
 *
 *   When adding or removing previous siblings of `node` (or next siblings, in
 *   case of reverse), the `Visitor` should return a new `Index` to specify the
 *   sibling to traverse after `node` is traversed.
 *   Adding or removing next siblings of `node` (or previous siblings, in case
 *   of reverse) is handled as expected without needing to return a new `Index`.
 *
 *   Removing the children property of `parent` still results in them being
 *   traversed.
 * @param {Visited} node
 *   Found node.
 * @param {Visited extends UnistNode ? number | undefined : never} index
 *   Index of `node` in `parent`.
 * @param {Ancestor extends UnistParent ? Ancestor | undefined : never} parent
 *   Parent of `node`.
 * @returns {VisitorResult}
 *   What to do next.
 *
 *   An `Index` is treated as a tuple of `[CONTINUE, Index]`.
 *   An `Action` is treated as a tuple of `[Action]`.
 *
 *   Passing a tuple back only makes sense if the `Action` is `SKIP`.
 *   When the `Action` is `EXIT`, that action can be returned.
 *   When the `Action` is `CONTINUE`, `Index` can be returned.
 * @template {UnistNode} [Visited=UnistNode]
 *   Visited node type.
 * @template {UnistParent} [Ancestor=UnistParent]
 *   Ancestor type.
 */ /**
 * @typedef {Visitor<Visited, Parent<Ancestor, Visited>>} BuildVisitorFromMatch
 *   Build a typed `Visitor` function from a node and all possible parents.
 *
 *   It will infer which values are passed as `node` and which as `parent`.
 * @template {UnistNode} Visited
 *   Node type.
 * @template {UnistParent} Ancestor
 *   Parent type.
 */ /**
 * @typedef {(
 *   BuildVisitorFromMatch<
 *     Matches<Descendant, Check>,
 *     Extract<Descendant, UnistParent>
 *   >
 * )} BuildVisitorFromDescendants
 *   Build a typed `Visitor` function from a list of descendants and a test.
 *
 *   It will infer which values are passed as `node` and which as `parent`.
 * @template {UnistNode} Descendant
 *   Node type.
 * @template {Test} Check
 *   Test type.
 */ /**
 * @typedef {(
 *   BuildVisitorFromDescendants<
 *     InclusiveDescendant<Tree>,
 *     Check
 *   >
 * )} BuildVisitor
 *   Build a typed `Visitor` function from a tree and a test.
 *
 *   It will infer which values are passed as `node` and which as `parent`.
 * @template {UnistNode} [Tree=UnistNode]
 *   Node type.
 * @template {Test} [Check=Test]
 *   Test type.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$unist$2d$util$2d$visit$2f$node_modules$2f$unist$2d$util$2d$visit$2d$parents$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/unist-util-visit/node_modules/unist-util-visit-parents/lib/index.js [app-rsc] (ecmascript)");
;
;
function visit(tree, testOrVisitor, visitorOrReverse, maybeReverse) {
    /** @type {boolean | null | undefined} */ let reverse;
    /** @type {Test} */ let test;
    /** @type {Visitor} */ let visitor;
    if (typeof testOrVisitor === 'function' && typeof visitorOrReverse !== 'function') {
        test = undefined;
        visitor = testOrVisitor;
        reverse = visitorOrReverse;
    } else {
        // @ts-expect-error: assume the overload with test was given.
        test = testOrVisitor;
        // @ts-expect-error: assume the overload with test was given.
        visitor = visitorOrReverse;
        reverse = maybeReverse;
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$unist$2d$util$2d$visit$2f$node_modules$2f$unist$2d$util$2d$visit$2d$parents$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["visitParents"])(tree, test, overload, reverse);
    /**
   * @param {UnistNode} node
   * @param {Array<UnistParent>} parents
   */ function overload(node, parents) {
        const parent = parents[parents.length - 1];
        const index = parent ? parent.children.indexOf(node) : undefined;
        return visitor(node, index, parent);
    }
}
}),
"[project]/cafekit-web/node_modules/rehype-highlight/lib/index.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>rehypeHighlight
]);
/**
 * @import {ElementContent, Element, Root} from 'hast'
 * @import {LanguageFn} from 'lowlight'
 * @import {VFile} from 'vfile'
 */ /**
 * @typedef Options
 *   Configuration (optional).
 * @property {Readonly<Record<string, ReadonlyArray<string> | string>> | null | undefined} [aliases={}]
 *   Register more aliases (optional);
 *   passed to `lowlight.registerAlias`.
 * @property {boolean | null | undefined} [detect=false]
 *   Highlight code without language classes by guessing its programming
 *   language (default: `false`).
 * @property {Readonly<Record<string, LanguageFn>> | null | undefined} [languages]
 *   Register languages (default: `common`);
 *   passed to `lowlight.register`.
 * @property {ReadonlyArray<string> | null | undefined} [plainText=[]]
 *   List of language names to not highlight (optional);
 *   note you can also add `no-highlight` classes.
 * @property {string | null | undefined} [prefix='hljs-']
 *   Class prefix (default: `'hljs-'`).
 * @property {ReadonlyArray<string> | null | undefined} [subset]
 *   Names of languages to check when detecting (default: all registered
 *   languages).
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$hast$2d$util$2d$to$2d$text$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/hast-util-to-text/lib/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$lowlight$2f$lib$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__grammars__as__common$3e$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/lowlight/lib/common.js [app-rsc] (ecmascript) <export grammars as common>");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$lowlight$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/lowlight/lib/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$unist$2d$util$2d$visit$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/unist-util-visit/lib/index.js [app-rsc] (ecmascript) <locals>");
;
;
;
/** @type {Options} */ const emptyOptions = {};
function rehypeHighlight(options) {
    const settings = options || emptyOptions;
    const aliases = settings.aliases;
    const detect = settings.detect || false;
    const languages = settings.languages || __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$lowlight$2f$lib$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__grammars__as__common$3e$__["common"];
    const plainText = settings.plainText;
    const prefix = settings.prefix;
    const subset = settings.subset;
    let name = 'hljs';
    const lowlight = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$lowlight$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createLowlight"])(languages);
    if (aliases) {
        lowlight.registerAlias(aliases);
    }
    if (prefix) {
        const pos = prefix.indexOf('-');
        name = pos === -1 ? prefix : prefix.slice(0, pos);
    }
    /**
   * Transform.
   *
   * @param {Root} tree
   *   Tree.
   * @param {VFile} file
   *   File.
   * @returns {undefined}
   *   Nothing.
   */ return function(tree, file) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$unist$2d$util$2d$visit$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["visit"])(tree, 'element', function(node, _, parent) {
            if (node.tagName !== 'code' || !parent || parent.type !== 'element' || parent.tagName !== 'pre') {
                return;
            }
            const lang = language(node);
            if (lang === false || !lang && !detect || lang && plainText && plainText.includes(lang)) {
                return;
            }
            if (!Array.isArray(node.properties.className)) {
                node.properties.className = [];
            }
            if (!node.properties.className.includes(name)) {
                node.properties.className.unshift(name);
            }
            const text = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$hast$2d$util$2d$to$2d$text$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toText"])(node, {
                whitespace: 'pre'
            });
            /** @type {Root} */ let result;
            try {
                result = lang ? lowlight.highlight(lang, text, {
                    prefix
                }) : lowlight.highlightAuto(text, {
                    prefix,
                    subset
                });
            } catch (error) {
                const cause = error;
                if (lang && /Unknown language/.test(cause.message)) {
                    file.message('Cannot highlight as `' + lang + '`, it’s not registered', {
                        ancestors: [
                            parent,
                            node
                        ],
                        cause,
                        place: node.position,
                        ruleId: 'missing-language',
                        source: 'rehype-highlight'
                    });
                    /* c8 ignore next 5 -- throw arbitrary hljs errors */ return;
                }
                throw cause;
            }
            if (!lang && result.data && result.data.language) {
                node.properties.className.push('language-' + result.data.language);
            }
            if (result.children.length > 0) {
                node.children = result.children;
            }
        });
    };
}
/**
 * Get the programming language of `node`.
 *
 * @param {Element} node
 *   Node.
 * @returns {false | string | undefined}
 *   Language or `undefined`, or `false` when an explikcit `no-highlight` class
 *   is used.
 */ function language(node) {
    const list = node.properties.className;
    let index = -1;
    if (!Array.isArray(list)) {
        return;
    }
    /** @type {string | undefined} */ let name;
    while(++index < list.length){
        const value = String(list[index]);
        if (value === 'no-highlight' || value === 'nohighlight') {
            return false;
        }
        if (!name && value.slice(0, 5) === 'lang-') {
            name = value.slice(5);
        }
        if (!name && value.slice(0, 9) === 'language-') {
            name = value.slice(9);
        }
    }
    return name;
}
}),
"[project]/cafekit-web/node_modules/github-slugger/regex.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// This module is generated by `script/`.
/* eslint-disable no-control-regex, no-misleading-character-class, no-useless-escape */ __turbopack_context__.s([
    "regex",
    ()=>regex
]);
const regex = /[\0-\x1F!-,\.\/:-@\[-\^`\{-\xA9\xAB-\xB4\xB6-\xB9\xBB-\xBF\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u0378\u0379\u037E\u0380-\u0385\u0387\u038B\u038D\u03A2\u03F6\u0482\u0530\u0557\u0558\u055A-\u055F\u0589-\u0590\u05BE\u05C0\u05C3\u05C6\u05C8-\u05CF\u05EB-\u05EE\u05F3-\u060F\u061B-\u061F\u066A-\u066D\u06D4\u06DD\u06DE\u06E9\u06FD\u06FE\u0700-\u070F\u074B\u074C\u07B2-\u07BF\u07F6-\u07F9\u07FB\u07FC\u07FE\u07FF\u082E-\u083F\u085C-\u085F\u086B-\u089F\u08B5\u08C8-\u08D2\u08E2\u0964\u0965\u0970\u0984\u098D\u098E\u0991\u0992\u09A9\u09B1\u09B3-\u09B5\u09BA\u09BB\u09C5\u09C6\u09C9\u09CA\u09CF-\u09D6\u09D8-\u09DB\u09DE\u09E4\u09E5\u09F2-\u09FB\u09FD\u09FF\u0A00\u0A04\u0A0B-\u0A0E\u0A11\u0A12\u0A29\u0A31\u0A34\u0A37\u0A3A\u0A3B\u0A3D\u0A43-\u0A46\u0A49\u0A4A\u0A4E-\u0A50\u0A52-\u0A58\u0A5D\u0A5F-\u0A65\u0A76-\u0A80\u0A84\u0A8E\u0A92\u0AA9\u0AB1\u0AB4\u0ABA\u0ABB\u0AC6\u0ACA\u0ACE\u0ACF\u0AD1-\u0ADF\u0AE4\u0AE5\u0AF0-\u0AF8\u0B00\u0B04\u0B0D\u0B0E\u0B11\u0B12\u0B29\u0B31\u0B34\u0B3A\u0B3B\u0B45\u0B46\u0B49\u0B4A\u0B4E-\u0B54\u0B58-\u0B5B\u0B5E\u0B64\u0B65\u0B70\u0B72-\u0B81\u0B84\u0B8B-\u0B8D\u0B91\u0B96-\u0B98\u0B9B\u0B9D\u0BA0-\u0BA2\u0BA5-\u0BA7\u0BAB-\u0BAD\u0BBA-\u0BBD\u0BC3-\u0BC5\u0BC9\u0BCE\u0BCF\u0BD1-\u0BD6\u0BD8-\u0BE5\u0BF0-\u0BFF\u0C0D\u0C11\u0C29\u0C3A-\u0C3C\u0C45\u0C49\u0C4E-\u0C54\u0C57\u0C5B-\u0C5F\u0C64\u0C65\u0C70-\u0C7F\u0C84\u0C8D\u0C91\u0CA9\u0CB4\u0CBA\u0CBB\u0CC5\u0CC9\u0CCE-\u0CD4\u0CD7-\u0CDD\u0CDF\u0CE4\u0CE5\u0CF0\u0CF3-\u0CFF\u0D0D\u0D11\u0D45\u0D49\u0D4F-\u0D53\u0D58-\u0D5E\u0D64\u0D65\u0D70-\u0D79\u0D80\u0D84\u0D97-\u0D99\u0DB2\u0DBC\u0DBE\u0DBF\u0DC7-\u0DC9\u0DCB-\u0DCE\u0DD5\u0DD7\u0DE0-\u0DE5\u0DF0\u0DF1\u0DF4-\u0E00\u0E3B-\u0E3F\u0E4F\u0E5A-\u0E80\u0E83\u0E85\u0E8B\u0EA4\u0EA6\u0EBE\u0EBF\u0EC5\u0EC7\u0ECE\u0ECF\u0EDA\u0EDB\u0EE0-\u0EFF\u0F01-\u0F17\u0F1A-\u0F1F\u0F2A-\u0F34\u0F36\u0F38\u0F3A-\u0F3D\u0F48\u0F6D-\u0F70\u0F85\u0F98\u0FBD-\u0FC5\u0FC7-\u0FFF\u104A-\u104F\u109E\u109F\u10C6\u10C8-\u10CC\u10CE\u10CF\u10FB\u1249\u124E\u124F\u1257\u1259\u125E\u125F\u1289\u128E\u128F\u12B1\u12B6\u12B7\u12BF\u12C1\u12C6\u12C7\u12D7\u1311\u1316\u1317\u135B\u135C\u1360-\u137F\u1390-\u139F\u13F6\u13F7\u13FE-\u1400\u166D\u166E\u1680\u169B-\u169F\u16EB-\u16ED\u16F9-\u16FF\u170D\u1715-\u171F\u1735-\u173F\u1754-\u175F\u176D\u1771\u1774-\u177F\u17D4-\u17D6\u17D8-\u17DB\u17DE\u17DF\u17EA-\u180A\u180E\u180F\u181A-\u181F\u1879-\u187F\u18AB-\u18AF\u18F6-\u18FF\u191F\u192C-\u192F\u193C-\u1945\u196E\u196F\u1975-\u197F\u19AC-\u19AF\u19CA-\u19CF\u19DA-\u19FF\u1A1C-\u1A1F\u1A5F\u1A7D\u1A7E\u1A8A-\u1A8F\u1A9A-\u1AA6\u1AA8-\u1AAF\u1AC1-\u1AFF\u1B4C-\u1B4F\u1B5A-\u1B6A\u1B74-\u1B7F\u1BF4-\u1BFF\u1C38-\u1C3F\u1C4A-\u1C4C\u1C7E\u1C7F\u1C89-\u1C8F\u1CBB\u1CBC\u1CC0-\u1CCF\u1CD3\u1CFB-\u1CFF\u1DFA\u1F16\u1F17\u1F1E\u1F1F\u1F46\u1F47\u1F4E\u1F4F\u1F58\u1F5A\u1F5C\u1F5E\u1F7E\u1F7F\u1FB5\u1FBD\u1FBF-\u1FC1\u1FC5\u1FCD-\u1FCF\u1FD4\u1FD5\u1FDC-\u1FDF\u1FED-\u1FF1\u1FF5\u1FFD-\u203E\u2041-\u2053\u2055-\u2070\u2072-\u207E\u2080-\u208F\u209D-\u20CF\u20F1-\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F-\u215F\u2189-\u24B5\u24EA-\u2BFF\u2C2F\u2C5F\u2CE5-\u2CEA\u2CF4-\u2CFF\u2D26\u2D28-\u2D2C\u2D2E\u2D2F\u2D68-\u2D6E\u2D70-\u2D7E\u2D97-\u2D9F\u2DA7\u2DAF\u2DB7\u2DBF\u2DC7\u2DCF\u2DD7\u2DDF\u2E00-\u2E2E\u2E30-\u3004\u3008-\u3020\u3030\u3036\u3037\u303D-\u3040\u3097\u3098\u309B\u309C\u30A0\u30FB\u3100-\u3104\u3130\u318F-\u319F\u31C0-\u31EF\u3200-\u33FF\u4DC0-\u4DFF\u9FFD-\u9FFF\uA48D-\uA4CF\uA4FE\uA4FF\uA60D-\uA60F\uA62C-\uA63F\uA673\uA67E\uA6F2-\uA716\uA720\uA721\uA789\uA78A\uA7C0\uA7C1\uA7CB-\uA7F4\uA828-\uA82B\uA82D-\uA83F\uA874-\uA87F\uA8C6-\uA8CF\uA8DA-\uA8DF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA954-\uA95F\uA97D-\uA97F\uA9C1-\uA9CE\uA9DA-\uA9DF\uA9FF\uAA37-\uAA3F\uAA4E\uAA4F\uAA5A-\uAA5F\uAA77-\uAA79\uAAC3-\uAADA\uAADE\uAADF\uAAF0\uAAF1\uAAF7-\uAB00\uAB07\uAB08\uAB0F\uAB10\uAB17-\uAB1F\uAB27\uAB2F\uAB5B\uAB6A-\uAB6F\uABEB\uABEE\uABEF\uABFA-\uABFF\uD7A4-\uD7AF\uD7C7-\uD7CA\uD7FC-\uD7FF\uE000-\uF8FF\uFA6E\uFA6F\uFADA-\uFAFF\uFB07-\uFB12\uFB18-\uFB1C\uFB29\uFB37\uFB3D\uFB3F\uFB42\uFB45\uFBB2-\uFBD2\uFD3E-\uFD4F\uFD90\uFD91\uFDC8-\uFDEF\uFDFC-\uFDFF\uFE10-\uFE1F\uFE30-\uFE32\uFE35-\uFE4C\uFE50-\uFE6F\uFE75\uFEFD-\uFF0F\uFF1A-\uFF20\uFF3B-\uFF3E\uFF40\uFF5B-\uFF65\uFFBF-\uFFC1\uFFC8\uFFC9\uFFD0\uFFD1\uFFD8\uFFD9\uFFDD-\uFFFF]|\uD800[\uDC0C\uDC27\uDC3B\uDC3E\uDC4E\uDC4F\uDC5E-\uDC7F\uDCFB-\uDD3F\uDD75-\uDDFC\uDDFE-\uDE7F\uDE9D-\uDE9F\uDED1-\uDEDF\uDEE1-\uDEFF\uDF20-\uDF2C\uDF4B-\uDF4F\uDF7B-\uDF7F\uDF9E\uDF9F\uDFC4-\uDFC7\uDFD0\uDFD6-\uDFFF]|\uD801[\uDC9E\uDC9F\uDCAA-\uDCAF\uDCD4-\uDCD7\uDCFC-\uDCFF\uDD28-\uDD2F\uDD64-\uDDFF\uDF37-\uDF3F\uDF56-\uDF5F\uDF68-\uDFFF]|\uD802[\uDC06\uDC07\uDC09\uDC36\uDC39-\uDC3B\uDC3D\uDC3E\uDC56-\uDC5F\uDC77-\uDC7F\uDC9F-\uDCDF\uDCF3\uDCF6-\uDCFF\uDD16-\uDD1F\uDD3A-\uDD7F\uDDB8-\uDDBD\uDDC0-\uDDFF\uDE04\uDE07-\uDE0B\uDE14\uDE18\uDE36\uDE37\uDE3B-\uDE3E\uDE40-\uDE5F\uDE7D-\uDE7F\uDE9D-\uDEBF\uDEC8\uDEE7-\uDEFF\uDF36-\uDF3F\uDF56-\uDF5F\uDF73-\uDF7F\uDF92-\uDFFF]|\uD803[\uDC49-\uDC7F\uDCB3-\uDCBF\uDCF3-\uDCFF\uDD28-\uDD2F\uDD3A-\uDE7F\uDEAA\uDEAD-\uDEAF\uDEB2-\uDEFF\uDF1D-\uDF26\uDF28-\uDF2F\uDF51-\uDFAF\uDFC5-\uDFDF\uDFF7-\uDFFF]|\uD804[\uDC47-\uDC65\uDC70-\uDC7E\uDCBB-\uDCCF\uDCE9-\uDCEF\uDCFA-\uDCFF\uDD35\uDD40-\uDD43\uDD48-\uDD4F\uDD74\uDD75\uDD77-\uDD7F\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDFF\uDE12\uDE38-\uDE3D\uDE3F-\uDE7F\uDE87\uDE89\uDE8E\uDE9E\uDEA9-\uDEAF\uDEEB-\uDEEF\uDEFA-\uDEFF\uDF04\uDF0D\uDF0E\uDF11\uDF12\uDF29\uDF31\uDF34\uDF3A\uDF45\uDF46\uDF49\uDF4A\uDF4E\uDF4F\uDF51-\uDF56\uDF58-\uDF5C\uDF64\uDF65\uDF6D-\uDF6F\uDF75-\uDFFF]|\uD805[\uDC4B-\uDC4F\uDC5A-\uDC5D\uDC62-\uDC7F\uDCC6\uDCC8-\uDCCF\uDCDA-\uDD7F\uDDB6\uDDB7\uDDC1-\uDDD7\uDDDE-\uDDFF\uDE41-\uDE43\uDE45-\uDE4F\uDE5A-\uDE7F\uDEB9-\uDEBF\uDECA-\uDEFF\uDF1B\uDF1C\uDF2C-\uDF2F\uDF3A-\uDFFF]|\uD806[\uDC3B-\uDC9F\uDCEA-\uDCFE\uDD07\uDD08\uDD0A\uDD0B\uDD14\uDD17\uDD36\uDD39\uDD3A\uDD44-\uDD4F\uDD5A-\uDD9F\uDDA8\uDDA9\uDDD8\uDDD9\uDDE2\uDDE5-\uDDFF\uDE3F-\uDE46\uDE48-\uDE4F\uDE9A-\uDE9C\uDE9E-\uDEBF\uDEF9-\uDFFF]|\uD807[\uDC09\uDC37\uDC41-\uDC4F\uDC5A-\uDC71\uDC90\uDC91\uDCA8\uDCB7-\uDCFF\uDD07\uDD0A\uDD37-\uDD39\uDD3B\uDD3E\uDD48-\uDD4F\uDD5A-\uDD5F\uDD66\uDD69\uDD8F\uDD92\uDD99-\uDD9F\uDDAA-\uDEDF\uDEF7-\uDFAF\uDFB1-\uDFFF]|\uD808[\uDF9A-\uDFFF]|\uD809[\uDC6F-\uDC7F\uDD44-\uDFFF]|[\uD80A\uD80B\uD80E-\uD810\uD812-\uD819\uD824-\uD82B\uD82D\uD82E\uD830-\uD833\uD837\uD839\uD83D\uD83F\uD87B-\uD87D\uD87F\uD885-\uDB3F\uDB41-\uDBFF][\uDC00-\uDFFF]|\uD80D[\uDC2F-\uDFFF]|\uD811[\uDE47-\uDFFF]|\uD81A[\uDE39-\uDE3F\uDE5F\uDE6A-\uDECF\uDEEE\uDEEF\uDEF5-\uDEFF\uDF37-\uDF3F\uDF44-\uDF4F\uDF5A-\uDF62\uDF78-\uDF7C\uDF90-\uDFFF]|\uD81B[\uDC00-\uDE3F\uDE80-\uDEFF\uDF4B-\uDF4E\uDF88-\uDF8E\uDFA0-\uDFDF\uDFE2\uDFE5-\uDFEF\uDFF2-\uDFFF]|\uD821[\uDFF8-\uDFFF]|\uD823[\uDCD6-\uDCFF\uDD09-\uDFFF]|\uD82C[\uDD1F-\uDD4F\uDD53-\uDD63\uDD68-\uDD6F\uDEFC-\uDFFF]|\uD82F[\uDC6B-\uDC6F\uDC7D-\uDC7F\uDC89-\uDC8F\uDC9A-\uDC9C\uDC9F-\uDFFF]|\uD834[\uDC00-\uDD64\uDD6A-\uDD6C\uDD73-\uDD7A\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDE41\uDE45-\uDFFF]|\uD835[\uDC55\uDC9D\uDCA0\uDCA1\uDCA3\uDCA4\uDCA7\uDCA8\uDCAD\uDCBA\uDCBC\uDCC4\uDD06\uDD0B\uDD0C\uDD15\uDD1D\uDD3A\uDD3F\uDD45\uDD47-\uDD49\uDD51\uDEA6\uDEA7\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3\uDFCC\uDFCD]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85-\uDE9A\uDEA0\uDEB0-\uDFFF]|\uD838[\uDC07\uDC19\uDC1A\uDC22\uDC25\uDC2B-\uDCFF\uDD2D-\uDD2F\uDD3E\uDD3F\uDD4A-\uDD4D\uDD4F-\uDEBF\uDEFA-\uDFFF]|\uD83A[\uDCC5-\uDCCF\uDCD7-\uDCFF\uDD4C-\uDD4F\uDD5A-\uDFFF]|\uD83B[\uDC00-\uDDFF\uDE04\uDE20\uDE23\uDE25\uDE26\uDE28\uDE33\uDE38\uDE3A\uDE3C-\uDE41\uDE43-\uDE46\uDE48\uDE4A\uDE4C\uDE50\uDE53\uDE55\uDE56\uDE58\uDE5A\uDE5C\uDE5E\uDE60\uDE63\uDE65\uDE66\uDE6B\uDE73\uDE78\uDE7D\uDE7F\uDE8A\uDE9C-\uDEA0\uDEA4\uDEAA\uDEBC-\uDFFF]|\uD83C[\uDC00-\uDD2F\uDD4A-\uDD4F\uDD6A-\uDD6F\uDD8A-\uDFFF]|\uD83E[\uDC00-\uDFEF\uDFFA-\uDFFF]|\uD869[\uDEDE-\uDEFF]|\uD86D[\uDF35-\uDF3F]|\uD86E[\uDC1E\uDC1F]|\uD873[\uDEA2-\uDEAF]|\uD87A[\uDFE1-\uDFFF]|\uD87E[\uDE1E-\uDFFF]|\uD884[\uDF4B-\uDFFF]|\uDB40[\uDC00-\uDCFF\uDDF0-\uDFFF]/g;
}),
"[project]/cafekit-web/node_modules/github-slugger/index.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BananaSlug,
    "slug",
    ()=>slug
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$github$2d$slugger$2f$regex$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/github-slugger/regex.js [app-rsc] (ecmascript)");
;
const own = Object.hasOwnProperty;
class BananaSlug {
    /**
   * Create a new slug class.
   */ constructor(){
        /** @type {Record<string, number>} */ // eslint-disable-next-line no-unused-expressions
        this.occurrences;
        this.reset();
    }
    /**
   * Generate a unique slug.
  *
  * Tracks previously generated slugs: repeated calls with the same value
  * will result in different slugs.
  * Use the `slug` function to get same slugs.
   *
   * @param  {string} value
   *   String of text to slugify
   * @param  {boolean} [maintainCase=false]
   *   Keep the current case, otherwise make all lowercase
   * @return {string}
   *   A unique slug string
   */ slug(value, maintainCase) {
        const self = this;
        let result = slug(value, maintainCase === true);
        const originalSlug = result;
        while(own.call(self.occurrences, result)){
            self.occurrences[originalSlug]++;
            result = originalSlug + '-' + self.occurrences[originalSlug];
        }
        self.occurrences[result] = 0;
        return result;
    }
    /**
   * Reset - Forget all previous slugs
   *
   * @return void
   */ reset() {
        this.occurrences = Object.create(null);
    }
}
function slug(value, maintainCase) {
    if (typeof value !== 'string') return '';
    if (!maintainCase) value = value.toLowerCase();
    return value.replace(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$github$2d$slugger$2f$regex$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["regex"], '').replace(/ /g, '-');
}
}),
"[project]/cafekit-web/node_modules/hast-util-heading-rank/lib/index.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @typedef {import('hast').Nodes} Nodes
 */ /**
 * Get the rank (`1` to `6`) of headings (`h1` to `h6`).
 *
 * @param {Nodes} node
 *   Node to check.
 * @returns {number | undefined}
 *   Rank of the heading or `undefined` if not a heading.
 */ __turbopack_context__.s([
    "headingRank",
    ()=>headingRank
]);
function headingRank(node) {
    const name = node.type === 'element' ? node.tagName.toLowerCase() : '';
    const code = name.length === 2 && name.charCodeAt(0) === 104 /* `h` */  ? name.charCodeAt(1) : 0;
    return code > 48 /* `0` */  && code < 55 /* `7` */  ? code - 48 /* `0` */  : undefined;
}
}),
"[project]/cafekit-web/node_modules/hast-util-to-string/lib/index.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @import {Nodes, Parents} from 'hast'
 */ /**
 * Get the plain-text value of a hast node.
 *
 * @param {Nodes} node
 *   Node to serialize.
 * @returns {string}
 *   Serialized node.
 */ __turbopack_context__.s([
    "toString",
    ()=>toString
]);
function toString(node) {
    // “The concatenation of data of all the Text node descendants of the context
    // object, in tree order.”
    if ('children' in node) {
        return all(node);
    }
    // “Context object’s data.”
    return 'value' in node ? node.value : '';
}
/**
 * @param {Nodes} node
 *   Node.
 * @returns {string}
 *   Serialized node.
 */ function one(node) {
    if (node.type === 'text') {
        return node.value;
    }
    return 'children' in node ? all(node) : '';
}
/**
 * @param {Parents} node
 *   Node.
 * @returns {string}
 *   Serialized node.
 */ function all(node) {
    let index = -1;
    /** @type {Array<string>} */ const result = [];
    while(++index < node.children.length){
        result[index] = one(node.children[index]);
    }
    return result.join('');
}
}),
"[project]/cafekit-web/node_modules/rehype-slug/lib/index.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>rehypeSlug
]);
/**
 * @typedef {import('hast').Root} Root
 */ /**
 * @typedef Options
 *   Configuration (optional).
 * @property {string} [prefix='']
 *   Prefix to add in front of `id`s (default: `''`).
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$github$2d$slugger$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/github-slugger/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$hast$2d$util$2d$heading$2d$rank$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/hast-util-heading-rank/lib/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$hast$2d$util$2d$to$2d$string$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/hast-util-to-string/lib/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$unist$2d$util$2d$visit$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/unist-util-visit/lib/index.js [app-rsc] (ecmascript) <locals>");
;
;
;
;
/** @type {Options} */ const emptyOptions = {};
const slugs = new __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$github$2d$slugger$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"]();
function rehypeSlug(options) {
    const settings = options || emptyOptions;
    const prefix = settings.prefix || '';
    /**
   * @param {Root} tree
   *   Tree.
   * @returns {undefined}
   *   Nothing.
   */ return function(tree) {
        slugs.reset();
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$unist$2d$util$2d$visit$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["visit"])(tree, 'element', function(node) {
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$hast$2d$util$2d$heading$2d$rank$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["headingRank"])(node) && !node.properties.id) {
                node.properties.id = prefix + slugs.slug((0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$hast$2d$util$2d$to$2d$string$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toString"])(node));
            }
        });
    };
}
}),
"[project]/cafekit-web/node_modules/@ungap/structured-clone/esm/types.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ARRAY",
    ()=>ARRAY,
    "BIGINT",
    ()=>BIGINT,
    "DATE",
    ()=>DATE,
    "ERROR",
    ()=>ERROR,
    "MAP",
    ()=>MAP,
    "OBJECT",
    ()=>OBJECT,
    "PRIMITIVE",
    ()=>PRIMITIVE,
    "REGEXP",
    ()=>REGEXP,
    "SET",
    ()=>SET,
    "VOID",
    ()=>VOID
]);
const VOID = -1;
const PRIMITIVE = 0;
const ARRAY = 1;
const OBJECT = 2;
const DATE = 3;
const REGEXP = 4;
const MAP = 5;
const SET = 6;
const ERROR = 7;
const BIGINT = 8; // export const SYMBOL = 9;
}),
"[project]/cafekit-web/node_modules/@ungap/structured-clone/esm/deserialize.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "deserialize",
    ()=>deserialize
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$ungap$2f$structured$2d$clone$2f$esm$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@ungap/structured-clone/esm/types.js [app-rsc] (ecmascript)");
;
const env = typeof self === 'object' ? self : globalThis;
const deserializer = ($, _)=>{
    const as = (out, index)=>{
        $.set(index, out);
        return out;
    };
    const unpair = (index)=>{
        if ($.has(index)) return $.get(index);
        const [type, value] = _[index];
        switch(type){
            case __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$ungap$2f$structured$2d$clone$2f$esm$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PRIMITIVE"]:
            case __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$ungap$2f$structured$2d$clone$2f$esm$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["VOID"]:
                return as(value, index);
            case __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$ungap$2f$structured$2d$clone$2f$esm$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ARRAY"]:
                {
                    const arr = as([], index);
                    for (const index of value)arr.push(unpair(index));
                    return arr;
                }
            case __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$ungap$2f$structured$2d$clone$2f$esm$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["OBJECT"]:
                {
                    const object = as({}, index);
                    for (const [key, index] of value)object[unpair(key)] = unpair(index);
                    return object;
                }
            case __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$ungap$2f$structured$2d$clone$2f$esm$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DATE"]:
                return as(new Date(value), index);
            case __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$ungap$2f$structured$2d$clone$2f$esm$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["REGEXP"]:
                {
                    const { source, flags } = value;
                    return as(new RegExp(source, flags), index);
                }
            case __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$ungap$2f$structured$2d$clone$2f$esm$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["MAP"]:
                {
                    const map = as(new Map, index);
                    for (const [key, index] of value)map.set(unpair(key), unpair(index));
                    return map;
                }
            case __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$ungap$2f$structured$2d$clone$2f$esm$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SET"]:
                {
                    const set = as(new Set, index);
                    for (const index of value)set.add(unpair(index));
                    return set;
                }
            case __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$ungap$2f$structured$2d$clone$2f$esm$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ERROR"]:
                {
                    const { name, message } = value;
                    return as(new env[name](message), index);
                }
            case __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$ungap$2f$structured$2d$clone$2f$esm$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BIGINT"]:
                return as(BigInt(value), index);
            case 'BigInt':
                return as(Object(BigInt(value)), index);
            case 'ArrayBuffer':
                return as(new Uint8Array(value).buffer, value);
            case 'DataView':
                {
                    const { buffer } = new Uint8Array(value);
                    return as(new DataView(buffer), value);
                }
        }
        return as(new env[type](value), index);
    };
    return unpair;
};
const deserialize = (serialized)=>deserializer(new Map, serialized)(0);
}),
"[project]/cafekit-web/node_modules/@ungap/structured-clone/esm/serialize.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "serialize",
    ()=>serialize
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$ungap$2f$structured$2d$clone$2f$esm$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@ungap/structured-clone/esm/types.js [app-rsc] (ecmascript)");
;
const EMPTY = '';
const { toString } = {};
const { keys } = Object;
const typeOf = (value)=>{
    const type = typeof value;
    if (type !== 'object' || !value) return [
        __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$ungap$2f$structured$2d$clone$2f$esm$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PRIMITIVE"],
        type
    ];
    const asString = toString.call(value).slice(8, -1);
    switch(asString){
        case 'Array':
            return [
                __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$ungap$2f$structured$2d$clone$2f$esm$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ARRAY"],
                EMPTY
            ];
        case 'Object':
            return [
                __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$ungap$2f$structured$2d$clone$2f$esm$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["OBJECT"],
                EMPTY
            ];
        case 'Date':
            return [
                __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$ungap$2f$structured$2d$clone$2f$esm$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DATE"],
                EMPTY
            ];
        case 'RegExp':
            return [
                __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$ungap$2f$structured$2d$clone$2f$esm$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["REGEXP"],
                EMPTY
            ];
        case 'Map':
            return [
                __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$ungap$2f$structured$2d$clone$2f$esm$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["MAP"],
                EMPTY
            ];
        case 'Set':
            return [
                __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$ungap$2f$structured$2d$clone$2f$esm$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SET"],
                EMPTY
            ];
        case 'DataView':
            return [
                __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$ungap$2f$structured$2d$clone$2f$esm$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ARRAY"],
                asString
            ];
    }
    if (asString.includes('Array')) return [
        __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$ungap$2f$structured$2d$clone$2f$esm$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ARRAY"],
        asString
    ];
    if (asString.includes('Error')) return [
        __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$ungap$2f$structured$2d$clone$2f$esm$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ERROR"],
        asString
    ];
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$ungap$2f$structured$2d$clone$2f$esm$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["OBJECT"],
        asString
    ];
};
const shouldSkip = ([TYPE, type])=>TYPE === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$ungap$2f$structured$2d$clone$2f$esm$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PRIMITIVE"] && (type === 'function' || type === 'symbol');
const serializer = (strict, json, $, _)=>{
    const as = (out, value)=>{
        const index = _.push(out) - 1;
        $.set(value, index);
        return index;
    };
    const pair = (value)=>{
        if ($.has(value)) return $.get(value);
        let [TYPE, type] = typeOf(value);
        switch(TYPE){
            case __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$ungap$2f$structured$2d$clone$2f$esm$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PRIMITIVE"]:
                {
                    let entry = value;
                    switch(type){
                        case 'bigint':
                            TYPE = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$ungap$2f$structured$2d$clone$2f$esm$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BIGINT"];
                            entry = value.toString();
                            break;
                        case 'function':
                        case 'symbol':
                            if (strict) throw new TypeError('unable to serialize ' + type);
                            entry = null;
                            break;
                        case 'undefined':
                            return as([
                                __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$ungap$2f$structured$2d$clone$2f$esm$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["VOID"]
                            ], value);
                    }
                    return as([
                        TYPE,
                        entry
                    ], value);
                }
            case __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$ungap$2f$structured$2d$clone$2f$esm$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ARRAY"]:
                {
                    if (type) {
                        let spread = value;
                        if (type === 'DataView') {
                            spread = new Uint8Array(value.buffer);
                        } else if (type === 'ArrayBuffer') {
                            spread = new Uint8Array(value);
                        }
                        return as([
                            type,
                            [
                                ...spread
                            ]
                        ], value);
                    }
                    const arr = [];
                    const index = as([
                        TYPE,
                        arr
                    ], value);
                    for (const entry of value)arr.push(pair(entry));
                    return index;
                }
            case __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$ungap$2f$structured$2d$clone$2f$esm$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["OBJECT"]:
                {
                    if (type) {
                        switch(type){
                            case 'BigInt':
                                return as([
                                    type,
                                    value.toString()
                                ], value);
                            case 'Boolean':
                            case 'Number':
                            case 'String':
                                return as([
                                    type,
                                    value.valueOf()
                                ], value);
                        }
                    }
                    if (json && 'toJSON' in value) return pair(value.toJSON());
                    const entries = [];
                    const index = as([
                        TYPE,
                        entries
                    ], value);
                    for (const key of keys(value)){
                        if (strict || !shouldSkip(typeOf(value[key]))) entries.push([
                            pair(key),
                            pair(value[key])
                        ]);
                    }
                    return index;
                }
            case __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$ungap$2f$structured$2d$clone$2f$esm$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DATE"]:
                return as([
                    TYPE,
                    value.toISOString()
                ], value);
            case __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$ungap$2f$structured$2d$clone$2f$esm$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["REGEXP"]:
                {
                    const { source, flags } = value;
                    return as([
                        TYPE,
                        {
                            source,
                            flags
                        }
                    ], value);
                }
            case __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$ungap$2f$structured$2d$clone$2f$esm$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["MAP"]:
                {
                    const entries = [];
                    const index = as([
                        TYPE,
                        entries
                    ], value);
                    for (const [key, entry] of value){
                        if (strict || !(shouldSkip(typeOf(key)) || shouldSkip(typeOf(entry)))) entries.push([
                            pair(key),
                            pair(entry)
                        ]);
                    }
                    return index;
                }
            case __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$ungap$2f$structured$2d$clone$2f$esm$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SET"]:
                {
                    const entries = [];
                    const index = as([
                        TYPE,
                        entries
                    ], value);
                    for (const entry of value){
                        if (strict || !shouldSkip(typeOf(entry))) entries.push(pair(entry));
                    }
                    return index;
                }
        }
        const { message } = value;
        return as([
            TYPE,
            {
                name: type,
                message
            }
        ], value);
    };
    return pair;
};
const serialize = (value, { json, lossy } = {})=>{
    const _ = [];
    return serializer(!(json || lossy), !!json, new Map, _)(value), _;
};
}),
"[project]/cafekit-web/node_modules/@ungap/structured-clone/esm/index.js [app-rsc] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$ungap$2f$structured$2d$clone$2f$esm$2f$deserialize$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@ungap/structured-clone/esm/deserialize.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$ungap$2f$structured$2d$clone$2f$esm$2f$serialize$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@ungap/structured-clone/esm/serialize.js [app-rsc] (ecmascript)");
;
;
const __TURBOPACK__default__export__ = typeof structuredClone === "function" ? /* c8 ignore start */ (any, options)=>options && ('json' in options || 'lossy' in options) ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$ungap$2f$structured$2d$clone$2f$esm$2f$deserialize$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deserialize"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$ungap$2f$structured$2d$clone$2f$esm$2f$serialize$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["serialize"])(any, options)) : structuredClone(any) : (any, options)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$ungap$2f$structured$2d$clone$2f$esm$2f$deserialize$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deserialize"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$ungap$2f$structured$2d$clone$2f$esm$2f$serialize$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["serialize"])(any, options));
;
}),
"[project]/cafekit-web/node_modules/rehype-autolink-headings/lib/index.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>rehypeAutolinkHeadings
]);
/**
 * @typedef {import('hast').Element} Element
 * @typedef {import('hast').ElementContent} ElementContent
 * @typedef {import('hast').Properties} Properties
 * @typedef {import('hast').Root} Root
 *
 * @typedef {import('hast-util-is-element').Test} Test
 */ /**
 * @typedef {'after' | 'append' | 'before' | 'prepend' | 'wrap'} Behavior
 *   Behavior.
 *
 * @callback Build
 *   Generate content.
 * @param {Readonly<Element>} element
 *   Current heading.
 * @returns {Array<ElementContent> | ElementContent}
 *   Content.
 *
 * @callback BuildProperties
 *   Generate properties.
 * @param {Readonly<Element>} element
 *   Current heading.
 * @returns {Properties}
 *   Properties.
 *
 * @typedef Options
 *   Configuration.
 * @property {Behavior | null | undefined} [behavior='prepend']
 *   How to create links (default: `'prepend'`).
 * @property {Readonly<ElementContent> | ReadonlyArray<ElementContent> | Build | null | undefined} [content]
 *   Content to insert in the link (default: if `'wrap'` then `undefined`,
 *   otherwise `<span class="icon icon-link"></span>`);
 *   if `behavior` is `'wrap'` and `Build` is passed, its result replaces the
 *   existing content, otherwise the content is added after existing content.
 * @property {Readonly<ElementContent> | ReadonlyArray<ElementContent> | Build | null | undefined} [group]
 *   Content to wrap the heading and link with, if `behavior` is `'after'` or
 *   `'before'` (optional).
 * @property {Readonly<Properties> | BuildProperties | null | undefined} [headingProperties]
 *   Extra properties to set on the heading (optional).
 * @property {Readonly<Properties> | BuildProperties | null | undefined} [properties]
 *   Extra properties to set on the link when injecting (default:
 *   `{ariaHidden: true, tabIndex: -1}` if `'append'` or `'prepend'`, otherwise
 *   `undefined`).
 * @property {Test | null | undefined} [test]
 *   Extra test for which headings are linked (optional).
 */ /**
 * @template T
 *   Kind.
 * @typedef {(
 *   T extends Record<any, any>
 *     ? {-readonly [k in keyof T]: Cloneable<T[k]>}
 *     : T
 * )} Cloneable
 *   Deep clone.
 *
 *   See: <https://github.com/microsoft/TypeScript-DOM-lib-generator/issues/1237#issuecomment-1345515448>
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$ungap$2f$structured$2d$clone$2f$esm$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@ungap/structured-clone/esm/index.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$hast$2d$util$2d$heading$2d$rank$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/hast-util-heading-rank/lib/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$hast$2d$util$2d$is$2d$element$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/hast-util-is-element/lib/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$unist$2d$util$2d$visit$2f$node_modules$2f$unist$2d$util$2d$visit$2d$parents$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/unist-util-visit/node_modules/unist-util-visit-parents/lib/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$unist$2d$util$2d$visit$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/unist-util-visit/lib/index.js [app-rsc] (ecmascript) <locals>");
;
;
;
;
/** @type {Element} */ const contentDefaults = {
    type: 'element',
    tagName: 'span',
    properties: {
        className: [
            'icon',
            'icon-link'
        ]
    },
    children: []
};
/** @type {Options} */ const emptyOptions = {};
function rehypeAutolinkHeadings(options) {
    const settings = options || emptyOptions;
    let properties = settings.properties;
    const headingOroperties = settings.headingProperties;
    const behavior = settings.behavior || 'prepend';
    const content = settings.content;
    const group = settings.group;
    const is = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$hast$2d$util$2d$is$2d$element$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["convertElement"])(settings.test);
    /** @type {import('unist-util-visit').Visitor<Element>} */ let method;
    if (behavior === 'after' || behavior === 'before') {
        method = around;
    } else if (behavior === 'wrap') {
        method = wrap;
    } else {
        method = inject;
        if (!properties) {
            properties = {
                ariaHidden: 'true',
                tabIndex: -1
            };
        }
    }
    /**
   * Transform.
   *
   * @param {Root} tree
   *   Tree.
   * @returns {undefined}
   *   Nothing.
   */ return function(tree) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$unist$2d$util$2d$visit$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["visit"])(tree, 'element', function(node, index, parent) {
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$hast$2d$util$2d$heading$2d$rank$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["headingRank"])(node) && node.properties.id && is(node, index, parent)) {
                Object.assign(node.properties, toProperties(headingOroperties, node));
                return method(node, index, parent);
            }
        });
    };
    //TURBOPACK unreachable
    ;
    /** @type {import('unist-util-visit').Visitor<Element>} */ function inject(node) {
        const children = toChildren(content || contentDefaults, node);
        node.children[behavior === 'prepend' ? 'unshift' : 'push'](create(node, toProperties(properties, node), children));
        return [
            __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$unist$2d$util$2d$visit$2f$node_modules$2f$unist$2d$util$2d$visit$2d$parents$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SKIP"]
        ];
    }
    /** @type {import('unist-util-visit').Visitor<Element>} */ function around(node, index, parent) {
        /* c8 ignore next -- uncommon */ if (typeof index !== 'number' || !parent) return;
        const children = toChildren(content || contentDefaults, node);
        const link = create(node, toProperties(properties, node), children);
        let nodes = behavior === 'before' ? [
            link,
            node
        ] : [
            node,
            link
        ];
        if (group) {
            const grouping = toNode(group, node);
            if (grouping && !Array.isArray(grouping) && grouping.type === 'element') {
                grouping.children = nodes;
                nodes = [
                    grouping
                ];
            }
        }
        parent.children.splice(index, 1, ...nodes);
        return [
            __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$unist$2d$util$2d$visit$2f$node_modules$2f$unist$2d$util$2d$visit$2d$parents$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SKIP"],
            index + nodes.length
        ];
    }
    /** @type {import('unist-util-visit').Visitor<Element>} */ function wrap(node) {
        /** @type {Array<ElementContent>} */ let before = node.children;
        /** @type {Array<ElementContent> | ElementContent} */ let after = [];
        if (typeof content === 'function') {
            before = [];
            after = content(node);
        } else if (content) {
            after = clone(content);
        }
        node.children = [
            create(node, toProperties(properties, node), Array.isArray(after) ? [
                ...before,
                ...after
            ] : [
                ...before,
                after
            ])
        ];
        return [
            __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$unist$2d$util$2d$visit$2f$node_modules$2f$unist$2d$util$2d$visit$2d$parents$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SKIP"]
        ];
    }
}
/**
 * Deep clone.
 *
 * @template T
 *   Kind.
 * @param {T} thing
 *   Thing to clone.
 * @returns {Cloneable<T>}
 *   Cloned thing.
 */ function clone(thing) {
    // Cast because it’s mutable now.
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$ungap$2f$structured$2d$clone$2f$esm$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"])(thing);
}
/**
 * Create an `a`.
 *
 * @param {Readonly<Element>} node
 *   Related heading.
 * @param {Properties | undefined} properties
 *   Properties to set on the link.
 * @param {Array<ElementContent>} children
 *   Content.
 * @returns {Element}
 *   Link.
 */ function create(node, properties, children) {
    return {
        type: 'element',
        tagName: 'a',
        properties: {
            ...properties,
            href: '#' + node.properties.id
        },
        children
    };
}
/**
 * Turn into children.
 *
 * @param {Readonly<ElementContent> | ReadonlyArray<ElementContent> | Build} value
 *   Content.
 * @param {Readonly<Element>} node
 *   Related heading.
 * @returns {Array<ElementContent>}
 *   Children.
 */ function toChildren(value, node) {
    const result = toNode(value, node);
    return Array.isArray(result) ? result : [
        result
    ];
}
/**
 * Turn into a node.
 *
 * @param {Readonly<ElementContent> | ReadonlyArray<ElementContent> | Build} value
 *   Content.
 * @param {Readonly<Element>} node
 *   Related heading.
 * @returns {Array<ElementContent> | ElementContent}
 *   Node.
 */ function toNode(value, node) {
    if (typeof value === 'function') return value(node);
    return clone(value);
}
/**
 * Turn into properties.
 *
 * @param {Readonly<Properties> | BuildProperties | null | undefined} value
 *   Properties.
 * @param {Readonly<Element>} node
 *   Related heading.
 * @returns {Properties}
 *   Properties.
 */ function toProperties(value, node) {
    if (typeof value === 'function') return value(node);
    return value ? clone(value) : {};
}
}),
"[project]/cafekit-web/node_modules/ccount/index.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Count how often a character (or substring) is used in a string.
 *
 * @param {string} value
 *   Value to search in.
 * @param {string} character
 *   Character (or substring) to look for.
 * @return {number}
 *   Number of times `character` occurred in `value`.
 */ __turbopack_context__.s([
    "ccount",
    ()=>ccount
]);
function ccount(value, character) {
    const source = String(value);
    if (typeof character !== 'string') {
        throw new TypeError('Expected character');
    }
    let count = 0;
    let index = source.indexOf(character);
    while(index !== -1){
        count++;
        index = source.indexOf(character, index + character.length);
    }
    return count;
}
}),
"[project]/cafekit-web/node_modules/micromark-util-symbol/lib/codes.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Character codes.
 *
 * This module is compiled away!
 *
 * micromark works based on character codes.
 * This module contains constants for the ASCII block and the replacement
 * character.
 * A couple of them are handled in a special way, such as the line endings
 * (CR, LF, and CR+LF, commonly known as end-of-line: EOLs), the tab (horizontal
 * tab) and its expansion based on what column it’s at (virtual space),
 * and the end-of-file (eof) character.
 * As values are preprocessed before handling them, the actual characters LF,
 * CR, HT, and NUL (which is present as the replacement character), are
 * guaranteed to not exist.
 *
 * Unicode basic latin block.
 */ __turbopack_context__.s([
    "codes",
    ()=>codes
]);
const codes = {
    carriageReturn: -5,
    lineFeed: -4,
    carriageReturnLineFeed: -3,
    horizontalTab: -2,
    virtualSpace: -1,
    eof: null,
    nul: 0,
    soh: 1,
    stx: 2,
    etx: 3,
    eot: 4,
    enq: 5,
    ack: 6,
    bel: 7,
    bs: 8,
    ht: 9,
    lf: 10,
    vt: 11,
    ff: 12,
    cr: 13,
    so: 14,
    si: 15,
    dle: 16,
    dc1: 17,
    dc2: 18,
    dc3: 19,
    dc4: 20,
    nak: 21,
    syn: 22,
    etb: 23,
    can: 24,
    em: 25,
    sub: 26,
    esc: 27,
    fs: 28,
    gs: 29,
    rs: 30,
    us: 31,
    space: 32,
    exclamationMark: 33,
    quotationMark: 34,
    numberSign: 35,
    dollarSign: 36,
    percentSign: 37,
    ampersand: 38,
    apostrophe: 39,
    leftParenthesis: 40,
    rightParenthesis: 41,
    asterisk: 42,
    plusSign: 43,
    comma: 44,
    dash: 45,
    dot: 46,
    slash: 47,
    digit0: 48,
    digit1: 49,
    digit2: 50,
    digit3: 51,
    digit4: 52,
    digit5: 53,
    digit6: 54,
    digit7: 55,
    digit8: 56,
    digit9: 57,
    colon: 58,
    semicolon: 59,
    lessThan: 60,
    equalsTo: 61,
    greaterThan: 62,
    questionMark: 63,
    atSign: 64,
    uppercaseA: 65,
    uppercaseB: 66,
    uppercaseC: 67,
    uppercaseD: 68,
    uppercaseE: 69,
    uppercaseF: 70,
    uppercaseG: 71,
    uppercaseH: 72,
    uppercaseI: 73,
    uppercaseJ: 74,
    uppercaseK: 75,
    uppercaseL: 76,
    uppercaseM: 77,
    uppercaseN: 78,
    uppercaseO: 79,
    uppercaseP: 80,
    uppercaseQ: 81,
    uppercaseR: 82,
    uppercaseS: 83,
    uppercaseT: 84,
    uppercaseU: 85,
    uppercaseV: 86,
    uppercaseW: 87,
    uppercaseX: 88,
    uppercaseY: 89,
    uppercaseZ: 90,
    leftSquareBracket: 91,
    backslash: 92,
    rightSquareBracket: 93,
    caret: 94,
    underscore: 95,
    graveAccent: 96,
    lowercaseA: 97,
    lowercaseB: 98,
    lowercaseC: 99,
    lowercaseD: 100,
    lowercaseE: 101,
    lowercaseF: 102,
    lowercaseG: 103,
    lowercaseH: 104,
    lowercaseI: 105,
    lowercaseJ: 106,
    lowercaseK: 107,
    lowercaseL: 108,
    lowercaseM: 109,
    lowercaseN: 110,
    lowercaseO: 111,
    lowercaseP: 112,
    lowercaseQ: 113,
    lowercaseR: 114,
    lowercaseS: 115,
    lowercaseT: 116,
    lowercaseU: 117,
    lowercaseV: 118,
    lowercaseW: 119,
    lowercaseX: 120,
    lowercaseY: 121,
    lowercaseZ: 122,
    leftCurlyBrace: 123,
    verticalBar: 124,
    rightCurlyBrace: 125,
    tilde: 126,
    del: 127,
    // Unicode Specials block.
    byteOrderMarker: 65_279,
    // Unicode Specials block.
    replacementCharacter: 65_533 // `�`
};
}),
"[project]/cafekit-web/node_modules/micromark-util-symbol/lib/values.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * This module is compiled away!
 *
 * While micromark works based on character codes, this module includes the
 * string versions of ’em.
 * The C0 block, except for LF, CR, HT, and w/ the replacement character added,
 * are available here.
 */ __turbopack_context__.s([
    "values",
    ()=>values
]);
const values = {
    ht: '\t',
    lf: '\n',
    cr: '\r',
    space: ' ',
    exclamationMark: '!',
    quotationMark: '"',
    numberSign: '#',
    dollarSign: '$',
    percentSign: '%',
    ampersand: '&',
    apostrophe: "'",
    leftParenthesis: '(',
    rightParenthesis: ')',
    asterisk: '*',
    plusSign: '+',
    comma: ',',
    dash: '-',
    dot: '.',
    slash: '/',
    digit0: '0',
    digit1: '1',
    digit2: '2',
    digit3: '3',
    digit4: '4',
    digit5: '5',
    digit6: '6',
    digit7: '7',
    digit8: '8',
    digit9: '9',
    colon: ':',
    semicolon: ';',
    lessThan: '<',
    equalsTo: '=',
    greaterThan: '>',
    questionMark: '?',
    atSign: '@',
    uppercaseA: 'A',
    uppercaseB: 'B',
    uppercaseC: 'C',
    uppercaseD: 'D',
    uppercaseE: 'E',
    uppercaseF: 'F',
    uppercaseG: 'G',
    uppercaseH: 'H',
    uppercaseI: 'I',
    uppercaseJ: 'J',
    uppercaseK: 'K',
    uppercaseL: 'L',
    uppercaseM: 'M',
    uppercaseN: 'N',
    uppercaseO: 'O',
    uppercaseP: 'P',
    uppercaseQ: 'Q',
    uppercaseR: 'R',
    uppercaseS: 'S',
    uppercaseT: 'T',
    uppercaseU: 'U',
    uppercaseV: 'V',
    uppercaseW: 'W',
    uppercaseX: 'X',
    uppercaseY: 'Y',
    uppercaseZ: 'Z',
    leftSquareBracket: '[',
    backslash: '\\',
    rightSquareBracket: ']',
    caret: '^',
    underscore: '_',
    graveAccent: '`',
    lowercaseA: 'a',
    lowercaseB: 'b',
    lowercaseC: 'c',
    lowercaseD: 'd',
    lowercaseE: 'e',
    lowercaseF: 'f',
    lowercaseG: 'g',
    lowercaseH: 'h',
    lowercaseI: 'i',
    lowercaseJ: 'j',
    lowercaseK: 'k',
    lowercaseL: 'l',
    lowercaseM: 'm',
    lowercaseN: 'n',
    lowercaseO: 'o',
    lowercaseP: 'p',
    lowercaseQ: 'q',
    lowercaseR: 'r',
    lowercaseS: 's',
    lowercaseT: 't',
    lowercaseU: 'u',
    lowercaseV: 'v',
    lowercaseW: 'w',
    lowercaseX: 'x',
    lowercaseY: 'y',
    lowercaseZ: 'z',
    leftCurlyBrace: '{',
    verticalBar: '|',
    rightCurlyBrace: '}',
    tilde: '~',
    replacementCharacter: '�'
};
}),
"[project]/cafekit-web/node_modules/micromark-util-symbol/lib/constants.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * This module is compiled away!
 *
 * Parsing markdown comes with a couple of constants, such as minimum or maximum
 * sizes of certain sequences.
 * Additionally, there are a couple symbols used inside micromark.
 * These are all defined here, but compiled away by scripts.
 */ __turbopack_context__.s([
    "constants",
    ()=>constants
]);
const constants = {
    attentionSideAfter: 2,
    attentionSideBefore: 1,
    atxHeadingOpeningFenceSizeMax: 6,
    autolinkDomainSizeMax: 63,
    autolinkSchemeSizeMax: 32,
    cdataOpeningString: 'CDATA[',
    characterGroupPunctuation: 2,
    characterGroupWhitespace: 1,
    characterReferenceDecimalSizeMax: 7,
    characterReferenceHexadecimalSizeMax: 6,
    characterReferenceNamedSizeMax: 31,
    codeFencedSequenceSizeMin: 3,
    contentTypeContent: 'content',
    contentTypeDocument: 'document',
    contentTypeFlow: 'flow',
    contentTypeString: 'string',
    contentTypeText: 'text',
    hardBreakPrefixSizeMin: 2,
    htmlBasic: 6,
    htmlCdata: 5,
    htmlComment: 2,
    htmlComplete: 7,
    htmlDeclaration: 4,
    htmlInstruction: 3,
    htmlRawSizeMax: 8,
    htmlRaw: 1,
    linkResourceDestinationBalanceMax: 32,
    linkReferenceSizeMax: 999,
    listItemValueSizeMax: 10,
    numericBaseDecimal: 10,
    numericBaseHexadecimal: 0x10,
    tabSize: 4,
    thematicBreakMarkerCountMin: 3,
    v8MaxSafeChunkSize: 10_000 // V8 (and potentially others) have problems injecting giant arrays into other arrays, hence we operate in chunks.
};
}),
"[project]/cafekit-web/node_modules/micromark-util-symbol/lib/types.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * This module is compiled away!
 *
 * Here is the list of all types of tokens exposed by micromark, with a short
 * explanation of what they include and where they are found.
 * In picking names, generally, the rule is to be as explicit as possible
 * instead of reusing names.
 * For example, there is a `definitionDestination` and a `resourceDestination`,
 * instead of one shared name.
 */ // Note: when changing the next record, you must also change `TokenTypeMap`
// in `micromark-util-types/index.d.ts`.
__turbopack_context__.s([
    "types",
    ()=>types
]);
const types = {
    // Generic type for data, such as in a title, a destination, etc.
    data: 'data',
    // Generic type for syntactic whitespace (tabs, virtual spaces, spaces).
    // Such as, between a fenced code fence and an info string.
    whitespace: 'whitespace',
    // Generic type for line endings (line feed, carriage return, carriage return +
    // line feed).
    lineEnding: 'lineEnding',
    // A line ending, but ending a blank line.
    lineEndingBlank: 'lineEndingBlank',
    // Generic type for whitespace (tabs, virtual spaces, spaces) at the start of a
    // line.
    linePrefix: 'linePrefix',
    // Generic type for whitespace (tabs, virtual spaces, spaces) at the end of a
    // line.
    lineSuffix: 'lineSuffix',
    // Whole ATX heading:
    //
    // ```markdown
    // #
    // ## Alpha
    // ### Bravo ###
    // ```
    //
    // Includes `atxHeadingSequence`, `whitespace`, `atxHeadingText`.
    atxHeading: 'atxHeading',
    // Sequence of number signs in an ATX heading (`###`).
    atxHeadingSequence: 'atxHeadingSequence',
    // Content in an ATX heading (`alpha`).
    // Includes text.
    atxHeadingText: 'atxHeadingText',
    // Whole autolink (`<https://example.com>` or `<admin@example.com>`)
    // Includes `autolinkMarker` and `autolinkProtocol` or `autolinkEmail`.
    autolink: 'autolink',
    // Email autolink w/o markers (`admin@example.com`)
    autolinkEmail: 'autolinkEmail',
    // Marker around an `autolinkProtocol` or `autolinkEmail` (`<` or `>`).
    autolinkMarker: 'autolinkMarker',
    // Protocol autolink w/o markers (`https://example.com`)
    autolinkProtocol: 'autolinkProtocol',
    // A whole character escape (`\-`).
    // Includes `escapeMarker` and `characterEscapeValue`.
    characterEscape: 'characterEscape',
    // The escaped character (`-`).
    characterEscapeValue: 'characterEscapeValue',
    // A whole character reference (`&amp;`, `&#8800;`, or `&#x1D306;`).
    // Includes `characterReferenceMarker`, an optional
    // `characterReferenceMarkerNumeric`, in which case an optional
    // `characterReferenceMarkerHexadecimal`, and a `characterReferenceValue`.
    characterReference: 'characterReference',
    // The start or end marker (`&` or `;`).
    characterReferenceMarker: 'characterReferenceMarker',
    // Mark reference as numeric (`#`).
    characterReferenceMarkerNumeric: 'characterReferenceMarkerNumeric',
    // Mark reference as numeric (`x` or `X`).
    characterReferenceMarkerHexadecimal: 'characterReferenceMarkerHexadecimal',
    // Value of character reference w/o markers (`amp`, `8800`, or `1D306`).
    characterReferenceValue: 'characterReferenceValue',
    // Whole fenced code:
    //
    // ````markdown
    // ```js
    // alert(1)
    // ```
    // ````
    codeFenced: 'codeFenced',
    // A fenced code fence, including whitespace, sequence, info, and meta
    // (` ```js `).
    codeFencedFence: 'codeFencedFence',
    // Sequence of grave accent or tilde characters (` ``` `) in a fence.
    codeFencedFenceSequence: 'codeFencedFenceSequence',
    // Info word (`js`) in a fence.
    // Includes string.
    codeFencedFenceInfo: 'codeFencedFenceInfo',
    // Meta words (`highlight="1"`) in a fence.
    // Includes string.
    codeFencedFenceMeta: 'codeFencedFenceMeta',
    // A line of code.
    codeFlowValue: 'codeFlowValue',
    // Whole indented code:
    //
    // ```markdown
    //     alert(1)
    // ```
    //
    // Includes `lineEnding`, `linePrefix`, and `codeFlowValue`.
    codeIndented: 'codeIndented',
    // A text code (``` `alpha` ```).
    // Includes `codeTextSequence`, `codeTextData`, `lineEnding`, and can include
    // `codeTextPadding`.
    codeText: 'codeText',
    codeTextData: 'codeTextData',
    // A space or line ending right after or before a tick.
    codeTextPadding: 'codeTextPadding',
    // A text code fence (` `` `).
    codeTextSequence: 'codeTextSequence',
    // Whole content:
    //
    // ```markdown
    // [a]: b
    // c
    // =
    // d
    // ```
    //
    // Includes `paragraph` and `definition`.
    content: 'content',
    // Whole definition:
    //
    // ```markdown
    // [micromark]: https://github.com/micromark/micromark
    // ```
    //
    // Includes `definitionLabel`, `definitionMarker`, `whitespace`,
    // `definitionDestination`, and optionally `lineEnding` and `definitionTitle`.
    definition: 'definition',
    // Destination of a definition (`https://github.com/micromark/micromark` or
    // `<https://github.com/micromark/micromark>`).
    // Includes `definitionDestinationLiteral` or `definitionDestinationRaw`.
    definitionDestination: 'definitionDestination',
    // Enclosed destination of a definition
    // (`<https://github.com/micromark/micromark>`).
    // Includes `definitionDestinationLiteralMarker` and optionally
    // `definitionDestinationString`.
    definitionDestinationLiteral: 'definitionDestinationLiteral',
    // Markers of an enclosed definition destination (`<` or `>`).
    definitionDestinationLiteralMarker: 'definitionDestinationLiteralMarker',
    // Unenclosed destination of a definition
    // (`https://github.com/micromark/micromark`).
    // Includes `definitionDestinationString`.
    definitionDestinationRaw: 'definitionDestinationRaw',
    // Text in an destination (`https://github.com/micromark/micromark`).
    // Includes string.
    definitionDestinationString: 'definitionDestinationString',
    // Label of a definition (`[micromark]`).
    // Includes `definitionLabelMarker` and `definitionLabelString`.
    definitionLabel: 'definitionLabel',
    // Markers of a definition label (`[` or `]`).
    definitionLabelMarker: 'definitionLabelMarker',
    // Value of a definition label (`micromark`).
    // Includes string.
    definitionLabelString: 'definitionLabelString',
    // Marker between a label and a destination (`:`).
    definitionMarker: 'definitionMarker',
    // Title of a definition (`"x"`, `'y'`, or `(z)`).
    // Includes `definitionTitleMarker` and optionally `definitionTitleString`.
    definitionTitle: 'definitionTitle',
    // Marker around a title of a definition (`"`, `'`, `(`, or `)`).
    definitionTitleMarker: 'definitionTitleMarker',
    // Data without markers in a title (`z`).
    // Includes string.
    definitionTitleString: 'definitionTitleString',
    // Emphasis (`*alpha*`).
    // Includes `emphasisSequence` and `emphasisText`.
    emphasis: 'emphasis',
    // Sequence of emphasis markers (`*` or `_`).
    emphasisSequence: 'emphasisSequence',
    // Emphasis text (`alpha`).
    // Includes text.
    emphasisText: 'emphasisText',
    // The character escape marker (`\`).
    escapeMarker: 'escapeMarker',
    // A hard break created with a backslash (`\\n`).
    // Note: does not include the line ending.
    hardBreakEscape: 'hardBreakEscape',
    // A hard break created with trailing spaces (`  \n`).
    // Does not include the line ending.
    hardBreakTrailing: 'hardBreakTrailing',
    // Flow HTML:
    //
    // ```markdown
    // <div
    // ```
    //
    // Inlcudes `lineEnding`, `htmlFlowData`.
    htmlFlow: 'htmlFlow',
    htmlFlowData: 'htmlFlowData',
    // HTML in text (the tag in `a <i> b`).
    // Includes `lineEnding`, `htmlTextData`.
    htmlText: 'htmlText',
    htmlTextData: 'htmlTextData',
    // Whole image (`![alpha](bravo)`, `![alpha][bravo]`, `![alpha][]`, or
    // `![alpha]`).
    // Includes `label` and an optional `resource` or `reference`.
    image: 'image',
    // Whole link label (`[*alpha*]`).
    // Includes `labelLink` or `labelImage`, `labelText`, and `labelEnd`.
    label: 'label',
    // Text in an label (`*alpha*`).
    // Includes text.
    labelText: 'labelText',
    // Start a link label (`[`).
    // Includes a `labelMarker`.
    labelLink: 'labelLink',
    // Start an image label (`![`).
    // Includes `labelImageMarker` and `labelMarker`.
    labelImage: 'labelImage',
    // Marker of a label (`[` or `]`).
    labelMarker: 'labelMarker',
    // Marker to start an image (`!`).
    labelImageMarker: 'labelImageMarker',
    // End a label (`]`).
    // Includes `labelMarker`.
    labelEnd: 'labelEnd',
    // Whole link (`[alpha](bravo)`, `[alpha][bravo]`, `[alpha][]`, or `[alpha]`).
    // Includes `label` and an optional `resource` or `reference`.
    link: 'link',
    // Whole paragraph:
    //
    // ```markdown
    // alpha
    // bravo.
    // ```
    //
    // Includes text.
    paragraph: 'paragraph',
    // A reference (`[alpha]` or `[]`).
    // Includes `referenceMarker` and an optional `referenceString`.
    reference: 'reference',
    // A reference marker (`[` or `]`).
    referenceMarker: 'referenceMarker',
    // Reference text (`alpha`).
    // Includes string.
    referenceString: 'referenceString',
    // A resource (`(https://example.com "alpha")`).
    // Includes `resourceMarker`, an optional `resourceDestination` with an optional
    // `whitespace` and `resourceTitle`.
    resource: 'resource',
    // A resource destination (`https://example.com`).
    // Includes `resourceDestinationLiteral` or `resourceDestinationRaw`.
    resourceDestination: 'resourceDestination',
    // A literal resource destination (`<https://example.com>`).
    // Includes `resourceDestinationLiteralMarker` and optionally
    // `resourceDestinationString`.
    resourceDestinationLiteral: 'resourceDestinationLiteral',
    // A resource destination marker (`<` or `>`).
    resourceDestinationLiteralMarker: 'resourceDestinationLiteralMarker',
    // A raw resource destination (`https://example.com`).
    // Includes `resourceDestinationString`.
    resourceDestinationRaw: 'resourceDestinationRaw',
    // Resource destination text (`https://example.com`).
    // Includes string.
    resourceDestinationString: 'resourceDestinationString',
    // A resource marker (`(` or `)`).
    resourceMarker: 'resourceMarker',
    // A resource title (`"alpha"`, `'alpha'`, or `(alpha)`).
    // Includes `resourceTitleMarker` and optionally `resourceTitleString`.
    resourceTitle: 'resourceTitle',
    // A resource title marker (`"`, `'`, `(`, or `)`).
    resourceTitleMarker: 'resourceTitleMarker',
    // Resource destination title (`alpha`).
    // Includes string.
    resourceTitleString: 'resourceTitleString',
    // Whole setext heading:
    //
    // ```markdown
    // alpha
    // bravo
    // =====
    // ```
    //
    // Includes `setextHeadingText`, `lineEnding`, `linePrefix`, and
    // `setextHeadingLine`.
    setextHeading: 'setextHeading',
    // Content in a setext heading (`alpha\nbravo`).
    // Includes text.
    setextHeadingText: 'setextHeadingText',
    // Underline in a setext heading, including whitespace suffix (`==`).
    // Includes `setextHeadingLineSequence`.
    setextHeadingLine: 'setextHeadingLine',
    // Sequence of equals or dash characters in underline in a setext heading (`-`).
    setextHeadingLineSequence: 'setextHeadingLineSequence',
    // Strong (`**alpha**`).
    // Includes `strongSequence` and `strongText`.
    strong: 'strong',
    // Sequence of strong markers (`**` or `__`).
    strongSequence: 'strongSequence',
    // Strong text (`alpha`).
    // Includes text.
    strongText: 'strongText',
    // Whole thematic break:
    //
    // ```markdown
    // * * *
    // ```
    //
    // Includes `thematicBreakSequence` and `whitespace`.
    thematicBreak: 'thematicBreak',
    // A sequence of one or more thematic break markers (`***`).
    thematicBreakSequence: 'thematicBreakSequence',
    // Whole block quote:
    //
    // ```markdown
    // > a
    // >
    // > b
    // ```
    //
    // Includes `blockQuotePrefix` and flow.
    blockQuote: 'blockQuote',
    // The `>` or `> ` of a block quote.
    blockQuotePrefix: 'blockQuotePrefix',
    // The `>` of a block quote prefix.
    blockQuoteMarker: 'blockQuoteMarker',
    // The optional ` ` of a block quote prefix.
    blockQuotePrefixWhitespace: 'blockQuotePrefixWhitespace',
    // Whole ordered list:
    //
    // ```markdown
    // 1. a
    //    b
    // ```
    //
    // Includes `listItemPrefix`, flow, and optionally  `listItemIndent` on further
    // lines.
    listOrdered: 'listOrdered',
    // Whole unordered list:
    //
    // ```markdown
    // - a
    //   b
    // ```
    //
    // Includes `listItemPrefix`, flow, and optionally  `listItemIndent` on further
    // lines.
    listUnordered: 'listUnordered',
    // The indent of further list item lines.
    listItemIndent: 'listItemIndent',
    // A marker, as in, `*`, `+`, `-`, `.`, or `)`.
    listItemMarker: 'listItemMarker',
    // The thing that starts a list item, such as `1. `.
    // Includes `listItemValue` if ordered, `listItemMarker`, and
    // `listItemPrefixWhitespace` (unless followed by a line ending).
    listItemPrefix: 'listItemPrefix',
    // The whitespace after a marker.
    listItemPrefixWhitespace: 'listItemPrefixWhitespace',
    // The numerical value of an ordered item.
    listItemValue: 'listItemValue',
    // Internal types used for subtokenizers, compiled away
    chunkDocument: 'chunkDocument',
    chunkContent: 'chunkContent',
    chunkFlow: 'chunkFlow',
    chunkText: 'chunkText',
    chunkString: 'chunkString'
};
}),
"[project]/cafekit-web/node_modules/micromark-util-character/dev/index.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "asciiAlpha",
    ()=>asciiAlpha,
    "asciiAlphanumeric",
    ()=>asciiAlphanumeric,
    "asciiAtext",
    ()=>asciiAtext,
    "asciiControl",
    ()=>asciiControl,
    "asciiDigit",
    ()=>asciiDigit,
    "asciiHexDigit",
    ()=>asciiHexDigit,
    "asciiPunctuation",
    ()=>asciiPunctuation,
    "markdownLineEnding",
    ()=>markdownLineEnding,
    "markdownLineEndingOrSpace",
    ()=>markdownLineEndingOrSpace,
    "markdownSpace",
    ()=>markdownSpace,
    "unicodePunctuation",
    ()=>unicodePunctuation,
    "unicodeWhitespace",
    ()=>unicodeWhitespace
]);
/**
 * @import {Code} from 'micromark-util-types'
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/micromark-util-symbol/lib/codes.js [app-rsc] (ecmascript)");
;
const asciiAlpha = regexCheck(/[A-Za-z]/);
const asciiAlphanumeric = regexCheck(/[\dA-Za-z]/);
const asciiAtext = regexCheck(/[#-'*+\--9=?A-Z^-~]/);
function asciiControl(code) {
    return(// Special whitespace codes (which have negative values), C0 and Control
    // character DEL
    code !== null && (code < __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].space || code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].del));
}
const asciiDigit = regexCheck(/\d/);
const asciiHexDigit = regexCheck(/[\dA-Fa-f]/);
const asciiPunctuation = regexCheck(/[!-/:-@[-`{-~]/);
function markdownLineEnding(code) {
    return code !== null && code < __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].horizontalTab;
}
function markdownLineEndingOrSpace(code) {
    return code !== null && (code < __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].nul || code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].space);
}
function markdownSpace(code) {
    return code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].horizontalTab || code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].virtualSpace || code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].space;
}
const unicodePunctuation = regexCheck(/\p{P}|\p{S}/u);
const unicodeWhitespace = regexCheck(/\s/);
/**
 * Create a code check from a regex.
 *
 * @param {RegExp} regex
 *   Expression.
 * @returns {(code: Code) => boolean}
 *   Check.
 */ function regexCheck(regex) {
    return check;
    //TURBOPACK unreachable
    ;
    /**
   * Check whether a code matches the bound regex.
   *
   * @param {Code} code
   *   Character code.
   * @returns {boolean}
   *   Whether the character code matches the bound regex.
   */ function check(code) {
        return code !== null && code > -1 && regex.test(String.fromCharCode(code));
    }
}
}),
"[project]/cafekit-web/node_modules/mdast-util-find-and-replace/node_modules/escape-string-regexp/index.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>escapeStringRegexp
]);
function escapeStringRegexp(string) {
    if (typeof string !== 'string') {
        throw new TypeError('Expected a string');
    }
    // Escape characters with special meaning either inside or outside character sets.
    // Use a simple backslash escape when it’s always valid, and a `\xnn` escape when the simpler form would be disallowed by Unicode patterns’ stricter grammar.
    return string.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&').replace(/-/g, '\\x2d');
}
}),
"[project]/cafekit-web/node_modules/mdast-util-find-and-replace/lib/index.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "findAndReplace",
    ()=>findAndReplace
]);
/**
 * @import {Nodes, Parents, PhrasingContent, Root, Text} from 'mdast'
 * @import {BuildVisitor, Test, VisitorResult} from 'unist-util-visit-parents'
 */ /**
 * @typedef RegExpMatchObject
 *   Info on the match.
 * @property {number} index
 *   The index of the search at which the result was found.
 * @property {string} input
 *   A copy of the search string in the text node.
 * @property {[...Array<Parents>, Text]} stack
 *   All ancestors of the text node, where the last node is the text itself.
 *
 * @typedef {RegExp | string} Find
 *   Pattern to find.
 *
 *   Strings are escaped and then turned into global expressions.
 *
 * @typedef {Array<FindAndReplaceTuple>} FindAndReplaceList
 *   Several find and replaces, in array form.
 *
 * @typedef {[Find, Replace?]} FindAndReplaceTuple
 *   Find and replace in tuple form.
 *
 * @typedef {ReplaceFunction | string | null | undefined} Replace
 *   Thing to replace with.
 *
 * @callback ReplaceFunction
 *   Callback called when a search matches.
 * @param {...any} parameters
 *   The parameters are the result of corresponding search expression:
 *
 *   * `value` (`string`) — whole match
 *   * `...capture` (`Array<string>`) — matches from regex capture groups
 *   * `match` (`RegExpMatchObject`) — info on the match
 * @returns {Array<PhrasingContent> | PhrasingContent | string | false | null | undefined}
 *   Thing to replace with.
 *
 *   * when `null`, `undefined`, `''`, remove the match
 *   * …or when `false`, do not replace at all
 *   * …or when `string`, replace with a text node of that value
 *   * …or when `Node` or `Array<Node>`, replace with those nodes
 *
 * @typedef {[RegExp, ReplaceFunction]} Pair
 *   Normalized find and replace.
 *
 * @typedef {Array<Pair>} Pairs
 *   All find and replaced.
 *
 * @typedef Options
 *   Configuration.
 * @property {Test | null | undefined} [ignore]
 *   Test for which nodes to ignore (optional).
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$find$2d$and$2d$replace$2f$node_modules$2f$escape$2d$string$2d$regexp$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/mdast-util-find-and-replace/node_modules/escape-string-regexp/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$find$2d$and$2d$replace$2f$node_modules$2f$unist$2d$util$2d$visit$2d$parents$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/mdast-util-find-and-replace/node_modules/unist-util-visit-parents/lib/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$unist$2d$util$2d$is$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/unist-util-is/lib/index.js [app-rsc] (ecmascript)");
;
;
;
function findAndReplace(tree, list, options) {
    const settings = options || {};
    const ignored = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$unist$2d$util$2d$is$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["convert"])(settings.ignore || []);
    const pairs = toPairs(list);
    let pairIndex = -1;
    while(++pairIndex < pairs.length){
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$find$2d$and$2d$replace$2f$node_modules$2f$unist$2d$util$2d$visit$2d$parents$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["visitParents"])(tree, 'text', visitor);
    }
    /** @type {BuildVisitor<Root, 'text'>} */ function visitor(node, parents) {
        let index = -1;
        /** @type {Parents | undefined} */ let grandparent;
        while(++index < parents.length){
            const parent = parents[index];
            /** @type {Array<Nodes> | undefined} */ const siblings = grandparent ? grandparent.children : undefined;
            if (ignored(parent, siblings ? siblings.indexOf(parent) : undefined, grandparent)) {
                return;
            }
            grandparent = parent;
        }
        if (grandparent) {
            return handler(node, parents);
        }
    }
    /**
   * Handle a text node which is not in an ignored parent.
   *
   * @param {Text} node
   *   Text node.
   * @param {Array<Parents>} parents
   *   Parents.
   * @returns {VisitorResult}
   *   Result.
   */ function handler(node, parents) {
        const parent = parents[parents.length - 1];
        const find = pairs[pairIndex][0];
        const replace = pairs[pairIndex][1];
        let start = 0;
        /** @type {Array<Nodes>} */ const siblings = parent.children;
        const index = siblings.indexOf(node);
        let change = false;
        /** @type {Array<PhrasingContent>} */ let nodes = [];
        find.lastIndex = 0;
        let match = find.exec(node.value);
        while(match){
            const position = match.index;
            /** @type {RegExpMatchObject} */ const matchObject = {
                index: match.index,
                input: match.input,
                stack: [
                    ...parents,
                    node
                ]
            };
            let value = replace(...match, matchObject);
            if (typeof value === 'string') {
                value = value.length > 0 ? {
                    type: 'text',
                    value
                } : undefined;
            }
            // It wasn’t a match after all.
            if (value === false) {
                // False acts as if there was no match.
                // So we need to reset `lastIndex`, which currently being at the end of
                // the current match, to the beginning.
                find.lastIndex = position + 1;
            } else {
                if (start !== position) {
                    nodes.push({
                        type: 'text',
                        value: node.value.slice(start, position)
                    });
                }
                if (Array.isArray(value)) {
                    nodes.push(...value);
                } else if (value) {
                    nodes.push(value);
                }
                start = position + match[0].length;
                change = true;
            }
            if (!find.global) {
                break;
            }
            match = find.exec(node.value);
        }
        if (change) {
            if (start < node.value.length) {
                nodes.push({
                    type: 'text',
                    value: node.value.slice(start)
                });
            }
            parent.children.splice(index, 1, ...nodes);
        } else {
            nodes = [
                node
            ];
        }
        return index + nodes.length;
    }
}
/**
 * Turn a tuple or a list of tuples into pairs.
 *
 * @param {FindAndReplaceList | FindAndReplaceTuple} tupleOrList
 *   Schema.
 * @returns {Pairs}
 *   Clean pairs.
 */ function toPairs(tupleOrList) {
    /** @type {Pairs} */ const result = [];
    if (!Array.isArray(tupleOrList)) {
        throw new TypeError('Expected find and replace tuple or list of tuples');
    }
    /** @type {FindAndReplaceList} */ // @ts-expect-error: correct.
    const list = !tupleOrList[0] || Array.isArray(tupleOrList[0]) ? tupleOrList : [
        tupleOrList
    ];
    let index = -1;
    while(++index < list.length){
        const tuple = list[index];
        result.push([
            toExpression(tuple[0]),
            toFunction(tuple[1])
        ]);
    }
    return result;
}
/**
 * Turn a find into an expression.
 *
 * @param {Find} find
 *   Find.
 * @returns {RegExp}
 *   Expression.
 */ function toExpression(find) {
    return typeof find === 'string' ? new RegExp((0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$find$2d$and$2d$replace$2f$node_modules$2f$escape$2d$string$2d$regexp$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])(find), 'g') : find;
}
/**
 * Turn a replace into a function.
 *
 * @param {Replace} replace
 *   Replace.
 * @returns {ReplaceFunction}
 *   Function.
 */ function toFunction(replace) {
    return typeof replace === 'function' ? replace : function() {
        return replace;
    };
}
}),
"[project]/cafekit-web/node_modules/mdast-util-gfm-autolink-literal/lib/index.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "gfmAutolinkLiteralFromMarkdown",
    ()=>gfmAutolinkLiteralFromMarkdown,
    "gfmAutolinkLiteralToMarkdown",
    ()=>gfmAutolinkLiteralToMarkdown
]);
/**
 * @import {RegExpMatchObject, ReplaceFunction} from 'mdast-util-find-and-replace'
 * @import {CompileContext, Extension as FromMarkdownExtension, Handle as FromMarkdownHandle, Transform as FromMarkdownTransform} from 'mdast-util-from-markdown'
 * @import {ConstructName, Options as ToMarkdownExtension} from 'mdast-util-to-markdown'
 * @import {Link, PhrasingContent} from 'mdast'
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$ccount$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/ccount/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/devlop/lib/development.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/micromark-util-character/dev/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$find$2d$and$2d$replace$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/mdast-util-find-and-replace/lib/index.js [app-rsc] (ecmascript)");
;
;
;
;
/** @type {ConstructName} */ const inConstruct = 'phrasing';
/** @type {Array<ConstructName>} */ const notInConstruct = [
    'autolink',
    'link',
    'image',
    'label'
];
function gfmAutolinkLiteralFromMarkdown() {
    return {
        transforms: [
            transformGfmAutolinkLiterals
        ],
        enter: {
            literalAutolink: enterLiteralAutolink,
            literalAutolinkEmail: enterLiteralAutolinkValue,
            literalAutolinkHttp: enterLiteralAutolinkValue,
            literalAutolinkWww: enterLiteralAutolinkValue
        },
        exit: {
            literalAutolink: exitLiteralAutolink,
            literalAutolinkEmail: exitLiteralAutolinkEmail,
            literalAutolinkHttp: exitLiteralAutolinkHttp,
            literalAutolinkWww: exitLiteralAutolinkWww
        }
    };
}
function gfmAutolinkLiteralToMarkdown() {
    return {
        unsafe: [
            {
                character: '@',
                before: '[+\\-.\\w]',
                after: '[\\-.\\w]',
                inConstruct,
                notInConstruct
            },
            {
                character: '.',
                before: '[Ww]',
                after: '[\\-.\\w]',
                inConstruct,
                notInConstruct
            },
            {
                character: ':',
                before: '[ps]',
                after: '\\/',
                inConstruct,
                notInConstruct
            }
        ]
    };
}
/**
 * @this {CompileContext}
 * @type {FromMarkdownHandle}
 */ function enterLiteralAutolink(token) {
    this.enter({
        type: 'link',
        title: null,
        url: '',
        children: []
    }, token);
}
/**
 * @this {CompileContext}
 * @type {FromMarkdownHandle}
 */ function enterLiteralAutolinkValue(token) {
    this.config.enter.autolinkProtocol.call(this, token);
}
/**
 * @this {CompileContext}
 * @type {FromMarkdownHandle}
 */ function exitLiteralAutolinkHttp(token) {
    this.config.exit.autolinkProtocol.call(this, token);
}
/**
 * @this {CompileContext}
 * @type {FromMarkdownHandle}
 */ function exitLiteralAutolinkWww(token) {
    this.config.exit.data.call(this, token);
    const node = this.stack[this.stack.length - 1];
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ok"])(node.type === 'link');
    node.url = 'http://' + this.sliceSerialize(token);
}
/**
 * @this {CompileContext}
 * @type {FromMarkdownHandle}
 */ function exitLiteralAutolinkEmail(token) {
    this.config.exit.autolinkEmail.call(this, token);
}
/**
 * @this {CompileContext}
 * @type {FromMarkdownHandle}
 */ function exitLiteralAutolink(token) {
    this.exit(token);
}
/** @type {FromMarkdownTransform} */ function transformGfmAutolinkLiterals(tree) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$find$2d$and$2d$replace$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["findAndReplace"])(tree, [
        [
            /(https?:\/\/|www(?=\.))([-.\w]+)([^ \t\r\n]*)/gi,
            findUrl
        ],
        [
            /(?<=^|\s|\p{P}|\p{S})([-.\w+]+)@([-\w]+(?:\.[-\w]+)+)/gu,
            findEmail
        ]
    ], {
        ignore: [
            'link',
            'linkReference'
        ]
    });
}
/**
 * @type {ReplaceFunction}
 * @param {string} _
 * @param {string} protocol
 * @param {string} domain
 * @param {string} path
 * @param {RegExpMatchObject} match
 * @returns {Array<PhrasingContent> | Link | false}
 */ // eslint-disable-next-line max-params
function findUrl(_, protocol, domain, path, match) {
    let prefix = '';
    // Not an expected previous character.
    if (!previous(match)) {
        return false;
    }
    // Treat `www` as part of the domain.
    if (/^w/i.test(protocol)) {
        domain = protocol + domain;
        protocol = '';
        prefix = 'http://';
    }
    if (!isCorrectDomain(domain)) {
        return false;
    }
    const parts = splitUrl(domain + path);
    if (!parts[0]) return false;
    /** @type {Link} */ const result = {
        type: 'link',
        title: null,
        url: prefix + protocol + parts[0],
        children: [
            {
                type: 'text',
                value: protocol + parts[0]
            }
        ]
    };
    if (parts[1]) {
        return [
            result,
            {
                type: 'text',
                value: parts[1]
            }
        ];
    }
    return result;
}
/**
 * @type {ReplaceFunction}
 * @param {string} _
 * @param {string} atext
 * @param {string} label
 * @param {RegExpMatchObject} match
 * @returns {Link | false}
 */ function findEmail(_, atext, label, match) {
    if (// Not an expected previous character.
    !previous(match, true) || // Label ends in not allowed character.
    /[-\d_]$/.test(label)) {
        return false;
    }
    return {
        type: 'link',
        title: null,
        url: 'mailto:' + atext + '@' + label,
        children: [
            {
                type: 'text',
                value: atext + '@' + label
            }
        ]
    };
}
/**
 * @param {string} domain
 * @returns {boolean}
 */ function isCorrectDomain(domain) {
    const parts = domain.split('.');
    if (parts.length < 2 || parts[parts.length - 1] && (/_/.test(parts[parts.length - 1]) || !/[a-zA-Z\d]/.test(parts[parts.length - 1])) || parts[parts.length - 2] && (/_/.test(parts[parts.length - 2]) || !/[a-zA-Z\d]/.test(parts[parts.length - 2]))) {
        return false;
    }
    return true;
}
/**
 * @param {string} url
 * @returns {[string, string | undefined]}
 */ function splitUrl(url) {
    const trailExec = /[!"&'),.:;<>?\]}]+$/.exec(url);
    if (!trailExec) {
        return [
            url,
            undefined
        ];
    }
    url = url.slice(0, trailExec.index);
    let trail = trailExec[0];
    let closingParenIndex = trail.indexOf(')');
    const openingParens = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$ccount$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ccount"])(url, '(');
    let closingParens = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$ccount$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ccount"])(url, ')');
    while(closingParenIndex !== -1 && openingParens > closingParens){
        url += trail.slice(0, closingParenIndex + 1);
        trail = trail.slice(closingParenIndex + 1);
        closingParenIndex = trail.indexOf(')');
        closingParens++;
    }
    return [
        url,
        trail
    ];
}
/**
 * @param {RegExpMatchObject} match
 * @param {boolean | null | undefined} [email=false]
 * @returns {boolean}
 */ function previous(match, email) {
    const code = match.input.charCodeAt(match.index - 1);
    return (match.index === 0 || (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["unicodeWhitespace"])(code) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["unicodePunctuation"])(code)) && // If it’s an email, the previous character should not be a slash.
    (!email || code !== 47);
}
}),
"[project]/cafekit-web/node_modules/micromark-util-normalize-identifier/dev/index.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "normalizeIdentifier",
    ()=>normalizeIdentifier
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$values$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/micromark-util-symbol/lib/values.js [app-rsc] (ecmascript)");
;
function normalizeIdentifier(value) {
    return value// Collapse markdown whitespace.
    .replace(/[\t\n\r ]+/g, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$values$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["values"].space)// Trim.
    .replace(/^ | $/g, '')// Some characters are considered “uppercase”, but if their lowercase
    // counterpart is uppercased will result in a different uppercase
    // character.
    // Hence, to get that form, we perform both lower- and uppercase.
    // Upper case makes sure keys will not interact with default prototypal
    // methods: no method is uppercase.
    .toLowerCase().toUpperCase();
}
}),
"[project]/cafekit-web/node_modules/mdast-util-gfm-footnote/lib/index.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "gfmFootnoteFromMarkdown",
    ()=>gfmFootnoteFromMarkdown,
    "gfmFootnoteToMarkdown",
    ()=>gfmFootnoteToMarkdown
]);
/**
 * @import {
 *   CompileContext,
 *   Extension as FromMarkdownExtension,
 *   Handle as FromMarkdownHandle
 * } from 'mdast-util-from-markdown'
 * @import {ToMarkdownOptions} from 'mdast-util-gfm-footnote'
 * @import {
 *   Handle as ToMarkdownHandle,
 *   Map,
 *   Options as ToMarkdownExtension
 * } from 'mdast-util-to-markdown'
 * @import {FootnoteDefinition, FootnoteReference} from 'mdast'
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/devlop/lib/development.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$normalize$2d$identifier$2f$dev$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/micromark-util-normalize-identifier/dev/index.js [app-rsc] (ecmascript)");
;
;
footnoteReference.peek = footnoteReferencePeek;
/**
 * @this {CompileContext}
 * @type {FromMarkdownHandle}
 */ function enterFootnoteCallString() {
    this.buffer();
}
/**
 * @this {CompileContext}
 * @type {FromMarkdownHandle}
 */ function enterFootnoteCall(token) {
    this.enter({
        type: 'footnoteReference',
        identifier: '',
        label: ''
    }, token);
}
/**
 * @this {CompileContext}
 * @type {FromMarkdownHandle}
 */ function enterFootnoteDefinitionLabelString() {
    this.buffer();
}
/**
 * @this {CompileContext}
 * @type {FromMarkdownHandle}
 */ function enterFootnoteDefinition(token) {
    this.enter({
        type: 'footnoteDefinition',
        identifier: '',
        label: '',
        children: []
    }, token);
}
/**
 * @this {CompileContext}
 * @type {FromMarkdownHandle}
 */ function exitFootnoteCallString(token) {
    const label = this.resume();
    const node = this.stack[this.stack.length - 1];
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ok"])(node.type === 'footnoteReference');
    node.identifier = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$normalize$2d$identifier$2f$dev$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["normalizeIdentifier"])(this.sliceSerialize(token)).toLowerCase();
    node.label = label;
}
/**
 * @this {CompileContext}
 * @type {FromMarkdownHandle}
 */ function exitFootnoteCall(token) {
    this.exit(token);
}
/**
 * @this {CompileContext}
 * @type {FromMarkdownHandle}
 */ function exitFootnoteDefinitionLabelString(token) {
    const label = this.resume();
    const node = this.stack[this.stack.length - 1];
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ok"])(node.type === 'footnoteDefinition');
    node.identifier = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$normalize$2d$identifier$2f$dev$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["normalizeIdentifier"])(this.sliceSerialize(token)).toLowerCase();
    node.label = label;
}
/**
 * @this {CompileContext}
 * @type {FromMarkdownHandle}
 */ function exitFootnoteDefinition(token) {
    this.exit(token);
}
/** @type {ToMarkdownHandle} */ function footnoteReferencePeek() {
    return '[';
}
/**
 * @type {ToMarkdownHandle}
 * @param {FootnoteReference} node
 */ function footnoteReference(node, _, state, info) {
    const tracker = state.createTracker(info);
    let value = tracker.move('[^');
    const exit = state.enter('footnoteReference');
    const subexit = state.enter('reference');
    value += tracker.move(state.safe(state.associationId(node), {
        after: ']',
        before: value
    }));
    subexit();
    exit();
    value += tracker.move(']');
    return value;
}
function gfmFootnoteFromMarkdown() {
    return {
        enter: {
            gfmFootnoteCallString: enterFootnoteCallString,
            gfmFootnoteCall: enterFootnoteCall,
            gfmFootnoteDefinitionLabelString: enterFootnoteDefinitionLabelString,
            gfmFootnoteDefinition: enterFootnoteDefinition
        },
        exit: {
            gfmFootnoteCallString: exitFootnoteCallString,
            gfmFootnoteCall: exitFootnoteCall,
            gfmFootnoteDefinitionLabelString: exitFootnoteDefinitionLabelString,
            gfmFootnoteDefinition: exitFootnoteDefinition
        }
    };
}
function gfmFootnoteToMarkdown(options) {
    // To do: next major: change default.
    let firstLineBlank = false;
    if (options && options.firstLineBlank) {
        firstLineBlank = true;
    }
    return {
        handlers: {
            footnoteDefinition,
            footnoteReference
        },
        // This is on by default already.
        unsafe: [
            {
                character: '[',
                inConstruct: [
                    'label',
                    'phrasing',
                    'reference'
                ]
            }
        ]
    };
    //TURBOPACK unreachable
    ;
    /**
   * @type {ToMarkdownHandle}
   * @param {FootnoteDefinition} node
   */ function footnoteDefinition(node, _, state, info) {
        const tracker = state.createTracker(info);
        let value = tracker.move('[^');
        const exit = state.enter('footnoteDefinition');
        const subexit = state.enter('label');
        value += tracker.move(state.safe(state.associationId(node), {
            before: value,
            after: ']'
        }));
        subexit();
        value += tracker.move(']:');
        if (node.children && node.children.length > 0) {
            tracker.shift(4);
            value += tracker.move((firstLineBlank ? '\n' : ' ') + state.indentLines(state.containerFlow(node, tracker.current()), firstLineBlank ? mapAll : mapExceptFirst));
        }
        exit();
        return value;
    }
}
/** @type {Map} */ function mapExceptFirst(line, index, blank) {
    return index === 0 ? line : mapAll(line, index, blank);
}
/** @type {Map} */ function mapAll(line, index, blank) {
    return (blank ? '' : '    ') + line;
}
}),
"[project]/cafekit-web/node_modules/mdast-util-gfm-strikethrough/lib/index.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "gfmStrikethroughFromMarkdown",
    ()=>gfmStrikethroughFromMarkdown,
    "gfmStrikethroughToMarkdown",
    ()=>gfmStrikethroughToMarkdown
]);
/**
 * @typedef {import('mdast').Delete} Delete
 *
 * @typedef {import('mdast-util-from-markdown').CompileContext} CompileContext
 * @typedef {import('mdast-util-from-markdown').Extension} FromMarkdownExtension
 * @typedef {import('mdast-util-from-markdown').Handle} FromMarkdownHandle
 *
 * @typedef {import('mdast-util-to-markdown').ConstructName} ConstructName
 * @typedef {import('mdast-util-to-markdown').Handle} ToMarkdownHandle
 * @typedef {import('mdast-util-to-markdown').Options} ToMarkdownExtension
 */ /**
 * List of constructs that occur in phrasing (paragraphs, headings), but cannot
 * contain strikethrough.
 * So they sort of cancel each other out.
 * Note: could use a better name.
 *
 * Note: keep in sync with: <https://github.com/syntax-tree/mdast-util-to-markdown/blob/8ce8dbf/lib/unsafe.js#L14>
 *
 * @type {Array<ConstructName>}
 */ const constructsWithoutStrikethrough = [
    'autolink',
    'destinationLiteral',
    'destinationRaw',
    'reference',
    'titleQuote',
    'titleApostrophe'
];
handleDelete.peek = peekDelete;
function gfmStrikethroughFromMarkdown() {
    return {
        canContainEols: [
            'delete'
        ],
        enter: {
            strikethrough: enterStrikethrough
        },
        exit: {
            strikethrough: exitStrikethrough
        }
    };
}
function gfmStrikethroughToMarkdown() {
    return {
        unsafe: [
            {
                character: '~',
                inConstruct: 'phrasing',
                notInConstruct: constructsWithoutStrikethrough
            }
        ],
        handlers: {
            delete: handleDelete
        }
    };
}
/**
 * @this {CompileContext}
 * @type {FromMarkdownHandle}
 */ function enterStrikethrough(token) {
    this.enter({
        type: 'delete',
        children: []
    }, token);
}
/**
 * @this {CompileContext}
 * @type {FromMarkdownHandle}
 */ function exitStrikethrough(token) {
    this.exit(token);
}
/**
 * @type {ToMarkdownHandle}
 * @param {Delete} node
 */ function handleDelete(node, _, state, info) {
    const tracker = state.createTracker(info);
    const exit = state.enter('strikethrough');
    let value = tracker.move('~~');
    value += state.containerPhrasing(node, {
        ...tracker.current(),
        before: value,
        after: '~'
    });
    value += tracker.move('~~');
    exit();
    return value;
}
/** @type {ToMarkdownHandle} */ function peekDelete() {
    return '~';
}
}),
"[project]/cafekit-web/node_modules/markdown-table/index.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "markdownTable",
    ()=>markdownTable
]);
// To do: next major: remove.
/**
 * @typedef {Options} MarkdownTableOptions
 *   Configuration.
 */ /**
 * @typedef Options
 *   Configuration.
 * @property {boolean | null | undefined} [alignDelimiters=true]
 *   Whether to align the delimiters (default: `true`);
 *   they are aligned by default:
 *
 *   ```markdown
 *   | Alpha | B     |
 *   | ----- | ----- |
 *   | C     | Delta |
 *   ```
 *
 *   Pass `false` to make them staggered:
 *
 *   ```markdown
 *   | Alpha | B |
 *   | - | - |
 *   | C | Delta |
 *   ```
 * @property {ReadonlyArray<string | null | undefined> | string | null | undefined} [align]
 *   How to align columns (default: `''`);
 *   one style for all columns or styles for their respective columns;
 *   each style is either `'l'` (left), `'r'` (right), or `'c'` (center);
 *   other values are treated as `''`, which doesn’t place the colon in the
 *   alignment row but does align left;
 *   *only the lowercased first character is used, so `Right` is fine.*
 * @property {boolean | null | undefined} [delimiterEnd=true]
 *   Whether to end each row with the delimiter (default: `true`).
 *
 *   > 👉 **Note**: please don’t use this: it could create fragile structures
 *   > that aren’t understandable to some markdown parsers.
 *
 *   When `true`, there are ending delimiters:
 *
 *   ```markdown
 *   | Alpha | B     |
 *   | ----- | ----- |
 *   | C     | Delta |
 *   ```
 *
 *   When `false`, there are no ending delimiters:
 *
 *   ```markdown
 *   | Alpha | B
 *   | ----- | -----
 *   | C     | Delta
 *   ```
 * @property {boolean | null | undefined} [delimiterStart=true]
 *   Whether to begin each row with the delimiter (default: `true`).
 *
 *   > 👉 **Note**: please don’t use this: it could create fragile structures
 *   > that aren’t understandable to some markdown parsers.
 *
 *   When `true`, there are starting delimiters:
 *
 *   ```markdown
 *   | Alpha | B     |
 *   | ----- | ----- |
 *   | C     | Delta |
 *   ```
 *
 *   When `false`, there are no starting delimiters:
 *
 *   ```markdown
 *   Alpha | B     |
 *   ----- | ----- |
 *   C     | Delta |
 *   ```
 * @property {boolean | null | undefined} [padding=true]
 *   Whether to add a space of padding between delimiters and cells
 *   (default: `true`).
 *
 *   When `true`, there is padding:
 *
 *   ```markdown
 *   | Alpha | B     |
 *   | ----- | ----- |
 *   | C     | Delta |
 *   ```
 *
 *   When `false`, there is no padding:
 *
 *   ```markdown
 *   |Alpha|B    |
 *   |-----|-----|
 *   |C    |Delta|
 *   ```
 * @property {((value: string) => number) | null | undefined} [stringLength]
 *   Function to detect the length of table cell content (optional);
 *   this is used when aligning the delimiters (`|`) between table cells;
 *   full-width characters and emoji mess up delimiter alignment when viewing
 *   the markdown source;
 *   to fix this, you can pass this function,
 *   which receives the cell content and returns its “visible” size;
 *   note that what is and isn’t visible depends on where the text is displayed.
 *
 *   Without such a function, the following:
 *
 *   ```js
 *   markdownTable([
 *     ['Alpha', 'Bravo'],
 *     ['中文', 'Charlie'],
 *     ['👩‍❤️‍👩', 'Delta']
 *   ])
 *   ```
 *
 *   Yields:
 *
 *   ```markdown
 *   | Alpha | Bravo |
 *   | - | - |
 *   | 中文 | Charlie |
 *   | 👩‍❤️‍👩 | Delta |
 *   ```
 *
 *   With [`string-width`](https://github.com/sindresorhus/string-width):
 *
 *   ```js
 *   import stringWidth from 'string-width'
 *
 *   markdownTable(
 *     [
 *       ['Alpha', 'Bravo'],
 *       ['中文', 'Charlie'],
 *       ['👩‍❤️‍👩', 'Delta']
 *     ],
 *     {stringLength: stringWidth}
 *   )
 *   ```
 *
 *   Yields:
 *
 *   ```markdown
 *   | Alpha | Bravo   |
 *   | ----- | ------- |
 *   | 中文  | Charlie |
 *   | 👩‍❤️‍👩    | Delta   |
 *   ```
 */ /**
 * @param {string} value
 *   Cell value.
 * @returns {number}
 *   Cell size.
 */ function defaultStringLength(value) {
    return value.length;
}
function markdownTable(table, options) {
    const settings = options || {};
    // To do: next major: change to spread.
    const align = (settings.align || []).concat();
    const stringLength = settings.stringLength || defaultStringLength;
    /** @type {Array<number>} Character codes as symbols for alignment per column. */ const alignments = [];
    /** @type {Array<Array<string>>} Cells per row. */ const cellMatrix = [];
    /** @type {Array<Array<number>>} Sizes of each cell per row. */ const sizeMatrix = [];
    /** @type {Array<number>} */ const longestCellByColumn = [];
    let mostCellsPerRow = 0;
    let rowIndex = -1;
    // This is a superfluous loop if we don’t align delimiters, but otherwise we’d
    // do superfluous work when aligning, so optimize for aligning.
    while(++rowIndex < table.length){
        /** @type {Array<string>} */ const row = [];
        /** @type {Array<number>} */ const sizes = [];
        let columnIndex = -1;
        if (table[rowIndex].length > mostCellsPerRow) {
            mostCellsPerRow = table[rowIndex].length;
        }
        while(++columnIndex < table[rowIndex].length){
            const cell = serialize(table[rowIndex][columnIndex]);
            if (settings.alignDelimiters !== false) {
                const size = stringLength(cell);
                sizes[columnIndex] = size;
                if (longestCellByColumn[columnIndex] === undefined || size > longestCellByColumn[columnIndex]) {
                    longestCellByColumn[columnIndex] = size;
                }
            }
            row.push(cell);
        }
        cellMatrix[rowIndex] = row;
        sizeMatrix[rowIndex] = sizes;
    }
    // Figure out which alignments to use.
    let columnIndex = -1;
    if (typeof align === 'object' && 'length' in align) {
        while(++columnIndex < mostCellsPerRow){
            alignments[columnIndex] = toAlignment(align[columnIndex]);
        }
    } else {
        const code = toAlignment(align);
        while(++columnIndex < mostCellsPerRow){
            alignments[columnIndex] = code;
        }
    }
    // Inject the alignment row.
    columnIndex = -1;
    /** @type {Array<string>} */ const row = [];
    /** @type {Array<number>} */ const sizes = [];
    while(++columnIndex < mostCellsPerRow){
        const code = alignments[columnIndex];
        let before = '';
        let after = '';
        if (code === 99 /* `c` */ ) {
            before = ':';
            after = ':';
        } else if (code === 108 /* `l` */ ) {
            before = ':';
        } else if (code === 114 /* `r` */ ) {
            after = ':';
        }
        // There *must* be at least one hyphen-minus in each alignment cell.
        let size = settings.alignDelimiters === false ? 1 : Math.max(1, longestCellByColumn[columnIndex] - before.length - after.length);
        const cell = before + '-'.repeat(size) + after;
        if (settings.alignDelimiters !== false) {
            size = before.length + size + after.length;
            if (size > longestCellByColumn[columnIndex]) {
                longestCellByColumn[columnIndex] = size;
            }
            sizes[columnIndex] = size;
        }
        row[columnIndex] = cell;
    }
    // Inject the alignment row.
    cellMatrix.splice(1, 0, row);
    sizeMatrix.splice(1, 0, sizes);
    rowIndex = -1;
    /** @type {Array<string>} */ const lines = [];
    while(++rowIndex < cellMatrix.length){
        const row = cellMatrix[rowIndex];
        const sizes = sizeMatrix[rowIndex];
        columnIndex = -1;
        /** @type {Array<string>} */ const line = [];
        while(++columnIndex < mostCellsPerRow){
            const cell = row[columnIndex] || '';
            let before = '';
            let after = '';
            if (settings.alignDelimiters !== false) {
                const size = longestCellByColumn[columnIndex] - (sizes[columnIndex] || 0);
                const code = alignments[columnIndex];
                if (code === 114 /* `r` */ ) {
                    before = ' '.repeat(size);
                } else if (code === 99 /* `c` */ ) {
                    if (size % 2) {
                        before = ' '.repeat(size / 2 + 0.5);
                        after = ' '.repeat(size / 2 - 0.5);
                    } else {
                        before = ' '.repeat(size / 2);
                        after = before;
                    }
                } else {
                    after = ' '.repeat(size);
                }
            }
            if (settings.delimiterStart !== false && !columnIndex) {
                line.push('|');
            }
            if (settings.padding !== false && // Don’t add the opening space if we’re not aligning and the cell is
            // empty: there will be a closing space.
            !(settings.alignDelimiters === false && cell === '') && (settings.delimiterStart !== false || columnIndex)) {
                line.push(' ');
            }
            if (settings.alignDelimiters !== false) {
                line.push(before);
            }
            line.push(cell);
            if (settings.alignDelimiters !== false) {
                line.push(after);
            }
            if (settings.padding !== false) {
                line.push(' ');
            }
            if (settings.delimiterEnd !== false || columnIndex !== mostCellsPerRow - 1) {
                line.push('|');
            }
        }
        lines.push(settings.delimiterEnd === false ? line.join('').replace(/ +$/, '') : line.join(''));
    }
    return lines.join('\n');
}
/**
 * @param {string | null | undefined} [value]
 *   Value to serialize.
 * @returns {string}
 *   Result.
 */ function serialize(value) {
    return value === null || value === undefined ? '' : String(value);
}
/**
 * @param {string | null | undefined} value
 *   Value.
 * @returns {number}
 *   Alignment.
 */ function toAlignment(value) {
    const code = typeof value === 'string' ? value.codePointAt(0) : 0;
    return code === 67 /* `C` */  || code === 99 /* `c` */  ? 99 /* `c` */  : code === 76 /* `L` */  || code === 108 /* `l` */  ? 108 /* `l` */  : code === 82 /* `R` */  || code === 114 /* `r` */  ? 114 /* `r` */  : 0;
}
}),
"[project]/cafekit-web/node_modules/mdast-util-to-markdown/lib/handle/blockquote.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @import {Blockquote, Parents} from 'mdast'
 * @import {Info, Map, State} from 'mdast-util-to-markdown'
 */ /**
 * @param {Blockquote} node
 * @param {Parents | undefined} _
 * @param {State} state
 * @param {Info} info
 * @returns {string}
 */ __turbopack_context__.s([
    "blockquote",
    ()=>blockquote
]);
function blockquote(node, _, state, info) {
    const exit = state.enter('blockquote');
    const tracker = state.createTracker(info);
    tracker.move('> ');
    tracker.shift(2);
    const value = state.indentLines(state.containerFlow(node, tracker.current()), map);
    exit();
    return value;
}
/** @type {Map} */ function map(line, _, blank) {
    return '>' + (blank ? '' : ' ') + line;
}
}),
"[project]/cafekit-web/node_modules/mdast-util-to-markdown/lib/util/pattern-in-scope.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @import {ConstructName, Unsafe} from 'mdast-util-to-markdown'
 */ /**
 * @param {Array<ConstructName>} stack
 * @param {Unsafe} pattern
 * @returns {boolean}
 */ __turbopack_context__.s([
    "patternInScope",
    ()=>patternInScope
]);
function patternInScope(stack, pattern) {
    return listInScope(stack, pattern.inConstruct, true) && !listInScope(stack, pattern.notInConstruct, false);
}
/**
 * @param {Array<ConstructName>} stack
 * @param {Unsafe['inConstruct']} list
 * @param {boolean} none
 * @returns {boolean}
 */ function listInScope(stack, list, none) {
    if (typeof list === 'string') {
        list = [
            list
        ];
    }
    if (!list || list.length === 0) {
        return none;
    }
    let index = -1;
    while(++index < list.length){
        if (stack.includes(list[index])) {
            return true;
        }
    }
    return false;
}
}),
"[project]/cafekit-web/node_modules/mdast-util-to-markdown/lib/handle/break.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "hardBreak",
    ()=>hardBreak
]);
/**
 * @import {Break, Parents} from 'mdast'
 * @import {Info, State} from 'mdast-util-to-markdown'
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$markdown$2f$lib$2f$util$2f$pattern$2d$in$2d$scope$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/mdast-util-to-markdown/lib/util/pattern-in-scope.js [app-rsc] (ecmascript)");
;
function hardBreak(_, _1, state, info) {
    let index = -1;
    while(++index < state.unsafe.length){
        // If we can’t put eols in this construct (setext headings, tables), use a
        // space instead.
        if (state.unsafe[index].character === '\n' && (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$markdown$2f$lib$2f$util$2f$pattern$2d$in$2d$scope$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["patternInScope"])(state.stack, state.unsafe[index])) {
            return /[ \t]/.test(info.before) ? '' : ' ';
        }
    }
    return '\\\n';
}
}),
"[project]/cafekit-web/node_modules/mdast-util-to-markdown/lib/util/format-code-as-indented.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @import {State} from 'mdast-util-to-markdown'
 * @import {Code} from 'mdast'
 */ /**
 * @param {Code} node
 * @param {State} state
 * @returns {boolean}
 */ __turbopack_context__.s([
    "formatCodeAsIndented",
    ()=>formatCodeAsIndented
]);
function formatCodeAsIndented(node, state) {
    return Boolean(state.options.fences === false && node.value && // If there’s no info…
    !node.lang && // And there’s a non-whitespace character…
    /[^ \r\n]/.test(node.value) && // And the value doesn’t start or end in a blank…
    !/^[\t ]*(?:[\r\n]|$)|(?:^|[\r\n])[\t ]*$/.test(node.value));
}
}),
"[project]/cafekit-web/node_modules/mdast-util-to-markdown/lib/util/check-fence.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @import {Options, State} from 'mdast-util-to-markdown'
 */ /**
 * @param {State} state
 * @returns {Exclude<Options['fence'], null | undefined>}
 */ __turbopack_context__.s([
    "checkFence",
    ()=>checkFence
]);
function checkFence(state) {
    const marker = state.options.fence || '`';
    if (marker !== '`' && marker !== '~') {
        throw new Error('Cannot serialize code with `' + marker + '` for `options.fence`, expected `` ` `` or `~`');
    }
    return marker;
}
}),
"[project]/cafekit-web/node_modules/mdast-util-to-markdown/lib/handle/code.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "code",
    ()=>code
]);
/**
 * @import {Info, Map, State} from 'mdast-util-to-markdown'
 * @import {Code, Parents} from 'mdast'
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$longest$2d$streak$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/longest-streak/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$markdown$2f$lib$2f$util$2f$format$2d$code$2d$as$2d$indented$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/mdast-util-to-markdown/lib/util/format-code-as-indented.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$markdown$2f$lib$2f$util$2f$check$2d$fence$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/mdast-util-to-markdown/lib/util/check-fence.js [app-rsc] (ecmascript)");
;
;
;
function code(node, _, state, info) {
    const marker = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$markdown$2f$lib$2f$util$2f$check$2d$fence$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["checkFence"])(state);
    const raw = node.value || '';
    const suffix = marker === '`' ? 'GraveAccent' : 'Tilde';
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$markdown$2f$lib$2f$util$2f$format$2d$code$2d$as$2d$indented$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["formatCodeAsIndented"])(node, state)) {
        const exit = state.enter('codeIndented');
        const value = state.indentLines(raw, map);
        exit();
        return value;
    }
    const tracker = state.createTracker(info);
    const sequence = marker.repeat(Math.max((0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$longest$2d$streak$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["longestStreak"])(raw, marker) + 1, 3));
    const exit = state.enter('codeFenced');
    let value = tracker.move(sequence);
    if (node.lang) {
        const subexit = state.enter(`codeFencedLang${suffix}`);
        value += tracker.move(state.safe(node.lang, {
            before: value,
            after: ' ',
            encode: [
                '`'
            ],
            ...tracker.current()
        }));
        subexit();
    }
    if (node.lang && node.meta) {
        const subexit = state.enter(`codeFencedMeta${suffix}`);
        value += tracker.move(' ');
        value += tracker.move(state.safe(node.meta, {
            before: value,
            after: '\n',
            encode: [
                '`'
            ],
            ...tracker.current()
        }));
        subexit();
    }
    value += tracker.move('\n');
    if (raw) {
        value += tracker.move(raw + '\n');
    }
    value += tracker.move(sequence);
    exit();
    return value;
}
/** @type {Map} */ function map(line, _, blank) {
    return (blank ? '' : '    ') + line;
}
}),
"[project]/cafekit-web/node_modules/mdast-util-to-markdown/lib/util/check-quote.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @import {Options, State} from 'mdast-util-to-markdown'
 */ /**
 * @param {State} state
 * @returns {Exclude<Options['quote'], null | undefined>}
 */ __turbopack_context__.s([
    "checkQuote",
    ()=>checkQuote
]);
function checkQuote(state) {
    const marker = state.options.quote || '"';
    if (marker !== '"' && marker !== "'") {
        throw new Error('Cannot serialize title with `' + marker + '` for `options.quote`, expected `"`, or `\'`');
    }
    return marker;
}
}),
"[project]/cafekit-web/node_modules/mdast-util-to-markdown/lib/handle/definition.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "definition",
    ()=>definition
]);
/**
 * @import {Info, State} from 'mdast-util-to-markdown'
 * @import {Definition, Parents} from 'mdast'
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$markdown$2f$lib$2f$util$2f$check$2d$quote$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/mdast-util-to-markdown/lib/util/check-quote.js [app-rsc] (ecmascript)");
;
function definition(node, _, state, info) {
    const quote = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$markdown$2f$lib$2f$util$2f$check$2d$quote$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["checkQuote"])(state);
    const suffix = quote === '"' ? 'Quote' : 'Apostrophe';
    const exit = state.enter('definition');
    let subexit = state.enter('label');
    const tracker = state.createTracker(info);
    let value = tracker.move('[');
    value += tracker.move(state.safe(state.associationId(node), {
        before: value,
        after: ']',
        ...tracker.current()
    }));
    value += tracker.move(']: ');
    subexit();
    if (// If there’s no url, or…
    !node.url || // If there are control characters or whitespace.
    /[\0- \u007F]/.test(node.url)) {
        subexit = state.enter('destinationLiteral');
        value += tracker.move('<');
        value += tracker.move(state.safe(node.url, {
            before: value,
            after: '>',
            ...tracker.current()
        }));
        value += tracker.move('>');
    } else {
        // No whitespace, raw is prettier.
        subexit = state.enter('destinationRaw');
        value += tracker.move(state.safe(node.url, {
            before: value,
            after: node.title ? ' ' : '\n',
            ...tracker.current()
        }));
    }
    subexit();
    if (node.title) {
        subexit = state.enter(`title${suffix}`);
        value += tracker.move(' ' + quote);
        value += tracker.move(state.safe(node.title, {
            before: value,
            after: quote,
            ...tracker.current()
        }));
        value += tracker.move(quote);
        subexit();
    }
    exit();
    return value;
}
}),
"[project]/cafekit-web/node_modules/mdast-util-to-markdown/lib/util/check-emphasis.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @import {Options, State} from 'mdast-util-to-markdown'
 */ /**
 * @param {State} state
 * @returns {Exclude<Options['emphasis'], null | undefined>}
 */ __turbopack_context__.s([
    "checkEmphasis",
    ()=>checkEmphasis
]);
function checkEmphasis(state) {
    const marker = state.options.emphasis || '*';
    if (marker !== '*' && marker !== '_') {
        throw new Error('Cannot serialize emphasis with `' + marker + '` for `options.emphasis`, expected `*`, or `_`');
    }
    return marker;
}
}),
"[project]/cafekit-web/node_modules/mdast-util-to-markdown/lib/util/encode-character-reference.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Encode a code point as a character reference.
 *
 * @param {number} code
 *   Code point to encode.
 * @returns {string}
 *   Encoded character reference.
 */ __turbopack_context__.s([
    "encodeCharacterReference",
    ()=>encodeCharacterReference
]);
function encodeCharacterReference(code) {
    return '&#x' + code.toString(16).toUpperCase() + ';';
}
}),
"[project]/cafekit-web/node_modules/mdast-util-to-markdown/lib/util/encode-info.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "encodeInfo",
    ()=>encodeInfo
]);
/**
 * @import {EncodeSides} from '../types.js'
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$classify$2d$character$2f$dev$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/micromark-util-classify-character/dev/index.js [app-rsc] (ecmascript)");
;
function encodeInfo(outside, inside, marker) {
    const outsideKind = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$classify$2d$character$2f$dev$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["classifyCharacter"])(outside);
    const insideKind = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$classify$2d$character$2f$dev$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["classifyCharacter"])(inside);
    // Letter outside:
    if (outsideKind === undefined) {
        return insideKind === undefined ? // we have to encode *both* letters for `_` as it is looser.
        // it already forms for `*` (and GFMs `~`).
        marker === '_' ? {
            inside: true,
            outside: true
        } : {
            inside: false,
            outside: false
        } : insideKind === 1 ? {
            inside: true,
            outside: true
        } : {
            inside: false,
            outside: true
        };
    }
    // Whitespace outside:
    if (outsideKind === 1) {
        return insideKind === undefined ? {
            inside: false,
            outside: false
        } : insideKind === 1 ? {
            inside: true,
            outside: true
        } : {
            inside: false,
            outside: false
        };
    }
    // Punctuation outside:
    return insideKind === undefined ? {
        inside: false,
        outside: false
    } : insideKind === 1 ? {
        inside: true,
        outside: false
    } : {
        inside: false,
        outside: false
    };
}
}),
"[project]/cafekit-web/node_modules/mdast-util-to-markdown/lib/handle/emphasis.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "emphasis",
    ()=>emphasis
]);
/**
 * @import {Info, State} from 'mdast-util-to-markdown'
 * @import {Emphasis, Parents} from 'mdast'
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$markdown$2f$lib$2f$util$2f$check$2d$emphasis$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/mdast-util-to-markdown/lib/util/check-emphasis.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$markdown$2f$lib$2f$util$2f$encode$2d$character$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/mdast-util-to-markdown/lib/util/encode-character-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$markdown$2f$lib$2f$util$2f$encode$2d$info$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/mdast-util-to-markdown/lib/util/encode-info.js [app-rsc] (ecmascript)");
;
;
;
emphasis.peek = emphasisPeek;
function emphasis(node, _, state, info) {
    const marker = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$markdown$2f$lib$2f$util$2f$check$2d$emphasis$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["checkEmphasis"])(state);
    const exit = state.enter('emphasis');
    const tracker = state.createTracker(info);
    const before = tracker.move(marker);
    let between = tracker.move(state.containerPhrasing(node, {
        after: marker,
        before,
        ...tracker.current()
    }));
    const betweenHead = between.charCodeAt(0);
    const open = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$markdown$2f$lib$2f$util$2f$encode$2d$info$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["encodeInfo"])(info.before.charCodeAt(info.before.length - 1), betweenHead, marker);
    if (open.inside) {
        between = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$markdown$2f$lib$2f$util$2f$encode$2d$character$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["encodeCharacterReference"])(betweenHead) + between.slice(1);
    }
    const betweenTail = between.charCodeAt(between.length - 1);
    const close = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$markdown$2f$lib$2f$util$2f$encode$2d$info$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["encodeInfo"])(info.after.charCodeAt(0), betweenTail, marker);
    if (close.inside) {
        between = between.slice(0, -1) + (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$markdown$2f$lib$2f$util$2f$encode$2d$character$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["encodeCharacterReference"])(betweenTail);
    }
    const after = tracker.move(marker);
    exit();
    state.attentionEncodeSurroundingInfo = {
        after: close.outside,
        before: open.outside
    };
    return before + between + after;
}
/**
 * @param {Emphasis} _
 * @param {Parents | undefined} _1
 * @param {State} state
 * @returns {string}
 */ function emphasisPeek(_, _1, state) {
    return state.options.emphasis || '*';
}
}),
"[project]/cafekit-web/node_modules/mdast-util-to-markdown/lib/util/format-heading-as-setext.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "formatHeadingAsSetext",
    ()=>formatHeadingAsSetext
]);
/**
 * @import {State} from 'mdast-util-to-markdown'
 * @import {Heading} from 'mdast'
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$unist$2d$util$2d$visit$2f$node_modules$2f$unist$2d$util$2d$visit$2d$parents$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/unist-util-visit/node_modules/unist-util-visit-parents/lib/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$unist$2d$util$2d$visit$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/unist-util-visit/lib/index.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$string$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/mdast-util-to-string/lib/index.js [app-rsc] (ecmascript)");
;
;
function formatHeadingAsSetext(node, state) {
    let literalWithBreak = false;
    // Look for literals with a line break.
    // Note that this also
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$unist$2d$util$2d$visit$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["visit"])(node, function(node) {
        if ('value' in node && /\r?\n|\r/.test(node.value) || node.type === 'break') {
            literalWithBreak = true;
            return __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$unist$2d$util$2d$visit$2f$node_modules$2f$unist$2d$util$2d$visit$2d$parents$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["EXIT"];
        }
    });
    return Boolean((!node.depth || node.depth < 3) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$string$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toString"])(node) && (state.options.setext || literalWithBreak));
}
}),
"[project]/cafekit-web/node_modules/mdast-util-to-markdown/lib/handle/heading.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "heading",
    ()=>heading
]);
/**
 * @import {Info, State} from 'mdast-util-to-markdown'
 * @import {Heading, Parents} from 'mdast'
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$markdown$2f$lib$2f$util$2f$encode$2d$character$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/mdast-util-to-markdown/lib/util/encode-character-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$markdown$2f$lib$2f$util$2f$format$2d$heading$2d$as$2d$setext$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/mdast-util-to-markdown/lib/util/format-heading-as-setext.js [app-rsc] (ecmascript)");
;
;
function heading(node, _, state, info) {
    const rank = Math.max(Math.min(6, node.depth || 1), 1);
    const tracker = state.createTracker(info);
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$markdown$2f$lib$2f$util$2f$format$2d$heading$2d$as$2d$setext$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["formatHeadingAsSetext"])(node, state)) {
        const exit = state.enter('headingSetext');
        const subexit = state.enter('phrasing');
        const value = state.containerPhrasing(node, {
            ...tracker.current(),
            before: '\n',
            after: '\n'
        });
        subexit();
        exit();
        return value + '\n' + (rank === 1 ? '=' : '-').repeat(// The whole size…
        value.length - // Minus the position of the character after the last EOL (or
        // 0 if there is none)…
        (Math.max(value.lastIndexOf('\r'), value.lastIndexOf('\n')) + 1));
    }
    const sequence = '#'.repeat(rank);
    const exit = state.enter('headingAtx');
    const subexit = state.enter('phrasing');
    // Note: for proper tracking, we should reset the output positions when there
    // is no content returned, because then the space is not output.
    // Practically, in that case, there is no content, so it doesn’t matter that
    // we’ve tracked one too many characters.
    tracker.move(sequence + ' ');
    let value = state.containerPhrasing(node, {
        before: '# ',
        after: '\n',
        ...tracker.current()
    });
    if (/^[\t ]/.test(value)) {
        // To do: what effect has the character reference on tracking?
        value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$markdown$2f$lib$2f$util$2f$encode$2d$character$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["encodeCharacterReference"])(value.charCodeAt(0)) + value.slice(1);
    }
    value = value ? sequence + ' ' + value : sequence;
    if (state.options.closeAtx) {
        value += ' ' + sequence;
    }
    subexit();
    exit();
    return value;
}
}),
"[project]/cafekit-web/node_modules/mdast-util-to-markdown/lib/handle/html.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "html",
    ()=>html
]);
/**
 * @import {Html} from 'mdast'
 */ html.peek = htmlPeek;
function html(node) {
    return node.value || '';
}
/**
 * @returns {string}
 */ function htmlPeek() {
    return '<';
}
}),
"[project]/cafekit-web/node_modules/mdast-util-to-markdown/lib/handle/image.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "image",
    ()=>image
]);
/**
 * @import {Info, State} from 'mdast-util-to-markdown'
 * @import {Image, Parents} from 'mdast'
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$markdown$2f$lib$2f$util$2f$check$2d$quote$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/mdast-util-to-markdown/lib/util/check-quote.js [app-rsc] (ecmascript)");
;
image.peek = imagePeek;
function image(node, _, state, info) {
    const quote = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$markdown$2f$lib$2f$util$2f$check$2d$quote$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["checkQuote"])(state);
    const suffix = quote === '"' ? 'Quote' : 'Apostrophe';
    const exit = state.enter('image');
    let subexit = state.enter('label');
    const tracker = state.createTracker(info);
    let value = tracker.move('![');
    value += tracker.move(state.safe(node.alt, {
        before: value,
        after: ']',
        ...tracker.current()
    }));
    value += tracker.move('](');
    subexit();
    if (// If there’s no url but there is a title…
    !node.url && node.title || // If there are control characters or whitespace.
    /[\0- \u007F]/.test(node.url)) {
        subexit = state.enter('destinationLiteral');
        value += tracker.move('<');
        value += tracker.move(state.safe(node.url, {
            before: value,
            after: '>',
            ...tracker.current()
        }));
        value += tracker.move('>');
    } else {
        // No whitespace, raw is prettier.
        subexit = state.enter('destinationRaw');
        value += tracker.move(state.safe(node.url, {
            before: value,
            after: node.title ? ' ' : ')',
            ...tracker.current()
        }));
    }
    subexit();
    if (node.title) {
        subexit = state.enter(`title${suffix}`);
        value += tracker.move(' ' + quote);
        value += tracker.move(state.safe(node.title, {
            before: value,
            after: quote,
            ...tracker.current()
        }));
        value += tracker.move(quote);
        subexit();
    }
    value += tracker.move(')');
    exit();
    return value;
}
/**
 * @returns {string}
 */ function imagePeek() {
    return '!';
}
}),
"[project]/cafekit-web/node_modules/mdast-util-to-markdown/lib/handle/image-reference.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "imageReference",
    ()=>imageReference
]);
/**
 * @import {Info, State} from 'mdast-util-to-markdown'
 * @import {ImageReference, Parents} from 'mdast'
 */ imageReference.peek = imageReferencePeek;
function imageReference(node, _, state, info) {
    const type = node.referenceType;
    const exit = state.enter('imageReference');
    let subexit = state.enter('label');
    const tracker = state.createTracker(info);
    let value = tracker.move('![');
    const alt = state.safe(node.alt, {
        before: value,
        after: ']',
        ...tracker.current()
    });
    value += tracker.move(alt + '][');
    subexit();
    // Hide the fact that we’re in phrasing, because escapes don’t work.
    const stack = state.stack;
    state.stack = [];
    subexit = state.enter('reference');
    // Note: for proper tracking, we should reset the output positions when we end
    // up making a `shortcut` reference, because then there is no brace output.
    // Practically, in that case, there is no content, so it doesn’t matter that
    // we’ve tracked one too many characters.
    const reference = state.safe(state.associationId(node), {
        before: value,
        after: ']',
        ...tracker.current()
    });
    subexit();
    state.stack = stack;
    exit();
    if (type === 'full' || !alt || alt !== reference) {
        value += tracker.move(reference + ']');
    } else if (type === 'shortcut') {
        // Remove the unwanted `[`.
        value = value.slice(0, -1);
    } else {
        value += tracker.move(']');
    }
    return value;
}
/**
 * @returns {string}
 */ function imageReferencePeek() {
    return '!';
}
}),
"[project]/cafekit-web/node_modules/mdast-util-to-markdown/lib/handle/inline-code.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "inlineCode",
    ()=>inlineCode
]);
/**
 * @import {State} from 'mdast-util-to-markdown'
 * @import {InlineCode, Parents} from 'mdast'
 */ inlineCode.peek = inlineCodePeek;
function inlineCode(node, _, state) {
    let value = node.value || '';
    let sequence = '`';
    let index = -1;
    // If there is a single grave accent on its own in the code, use a fence of
    // two.
    // If there are two in a row, use one.
    while(new RegExp('(^|[^`])' + sequence + '([^`]|$)').test(value)){
        sequence += '`';
    }
    // If this is not just spaces or eols (tabs don’t count), and either the
    // first or last character are a space, eol, or tick, then pad with spaces.
    if (/[^ \r\n]/.test(value) && (/^[ \r\n]/.test(value) && /[ \r\n]$/.test(value) || /^`|`$/.test(value))) {
        value = ' ' + value + ' ';
    }
    // We have a potential problem: certain characters after eols could result in
    // blocks being seen.
    // For example, if someone injected the string `'\n# b'`, then that would
    // result in an ATX heading.
    // We can’t escape characters in `inlineCode`, but because eols are
    // transformed to spaces when going from markdown to HTML anyway, we can swap
    // them out.
    while(++index < state.unsafe.length){
        const pattern = state.unsafe[index];
        const expression = state.compilePattern(pattern);
        /** @type {RegExpExecArray | null} */ let match;
        // Only look for `atBreak`s.
        // Btw: note that `atBreak` patterns will always start the regex at LF or
        // CR.
        if (!pattern.atBreak) continue;
        while(match = expression.exec(value)){
            let position = match.index;
            // Support CRLF (patterns only look for one of the characters).
            if (value.charCodeAt(position) === 10 /* `\n` */  && value.charCodeAt(position - 1) === 13 /* `\r` */ ) {
                position--;
            }
            value = value.slice(0, position) + ' ' + value.slice(match.index + 1);
        }
    }
    return sequence + value + sequence;
}
/**
 * @returns {string}
 */ function inlineCodePeek() {
    return '`';
}
}),
"[project]/cafekit-web/node_modules/mdast-util-to-markdown/lib/util/format-link-as-autolink.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "formatLinkAsAutolink",
    ()=>formatLinkAsAutolink
]);
/**
 * @import {State} from 'mdast-util-to-markdown'
 * @import {Link} from 'mdast'
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$string$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/mdast-util-to-string/lib/index.js [app-rsc] (ecmascript)");
;
function formatLinkAsAutolink(node, state) {
    const raw = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$string$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toString"])(node);
    return Boolean(!state.options.resourceLink && // If there’s a url…
    node.url && // And there’s a no title…
    !node.title && // And the content of `node` is a single text node…
    node.children && node.children.length === 1 && node.children[0].type === 'text' && // And if the url is the same as the content…
    (raw === node.url || 'mailto:' + raw === node.url) && // And that starts w/ a protocol…
    /^[a-z][a-z+.-]+:/i.test(node.url) && // And that doesn’t contain ASCII control codes (character escapes and
    // references don’t work), space, or angle brackets…
    !/[\0- <>\u007F]/.test(node.url));
}
}),
"[project]/cafekit-web/node_modules/mdast-util-to-markdown/lib/handle/link.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "link",
    ()=>link
]);
/**
 * @import {Info, State} from 'mdast-util-to-markdown'
 * @import {Link, Parents} from 'mdast'
 * @import {Exit} from '../types.js'
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$markdown$2f$lib$2f$util$2f$check$2d$quote$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/mdast-util-to-markdown/lib/util/check-quote.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$markdown$2f$lib$2f$util$2f$format$2d$link$2d$as$2d$autolink$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/mdast-util-to-markdown/lib/util/format-link-as-autolink.js [app-rsc] (ecmascript)");
;
;
link.peek = linkPeek;
function link(node, _, state, info) {
    const quote = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$markdown$2f$lib$2f$util$2f$check$2d$quote$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["checkQuote"])(state);
    const suffix = quote === '"' ? 'Quote' : 'Apostrophe';
    const tracker = state.createTracker(info);
    /** @type {Exit} */ let exit;
    /** @type {Exit} */ let subexit;
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$markdown$2f$lib$2f$util$2f$format$2d$link$2d$as$2d$autolink$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["formatLinkAsAutolink"])(node, state)) {
        // Hide the fact that we’re in phrasing, because escapes don’t work.
        const stack = state.stack;
        state.stack = [];
        exit = state.enter('autolink');
        let value = tracker.move('<');
        value += tracker.move(state.containerPhrasing(node, {
            before: value,
            after: '>',
            ...tracker.current()
        }));
        value += tracker.move('>');
        exit();
        state.stack = stack;
        return value;
    }
    exit = state.enter('link');
    subexit = state.enter('label');
    let value = tracker.move('[');
    value += tracker.move(state.containerPhrasing(node, {
        before: value,
        after: '](',
        ...tracker.current()
    }));
    value += tracker.move('](');
    subexit();
    if (// If there’s no url but there is a title…
    !node.url && node.title || // If there are control characters or whitespace.
    /[\0- \u007F]/.test(node.url)) {
        subexit = state.enter('destinationLiteral');
        value += tracker.move('<');
        value += tracker.move(state.safe(node.url, {
            before: value,
            after: '>',
            ...tracker.current()
        }));
        value += tracker.move('>');
    } else {
        // No whitespace, raw is prettier.
        subexit = state.enter('destinationRaw');
        value += tracker.move(state.safe(node.url, {
            before: value,
            after: node.title ? ' ' : ')',
            ...tracker.current()
        }));
    }
    subexit();
    if (node.title) {
        subexit = state.enter(`title${suffix}`);
        value += tracker.move(' ' + quote);
        value += tracker.move(state.safe(node.title, {
            before: value,
            after: quote,
            ...tracker.current()
        }));
        value += tracker.move(quote);
        subexit();
    }
    value += tracker.move(')');
    exit();
    return value;
}
/**
 * @param {Link} node
 * @param {Parents | undefined} _
 * @param {State} state
 * @returns {string}
 */ function linkPeek(node, _, state) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$markdown$2f$lib$2f$util$2f$format$2d$link$2d$as$2d$autolink$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["formatLinkAsAutolink"])(node, state) ? '<' : '[';
}
}),
"[project]/cafekit-web/node_modules/mdast-util-to-markdown/lib/handle/link-reference.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "linkReference",
    ()=>linkReference
]);
/**
 * @import {Info, State} from 'mdast-util-to-markdown'
 * @import {LinkReference, Parents} from 'mdast'
 */ linkReference.peek = linkReferencePeek;
function linkReference(node, _, state, info) {
    const type = node.referenceType;
    const exit = state.enter('linkReference');
    let subexit = state.enter('label');
    const tracker = state.createTracker(info);
    let value = tracker.move('[');
    const text = state.containerPhrasing(node, {
        before: value,
        after: ']',
        ...tracker.current()
    });
    value += tracker.move(text + '][');
    subexit();
    // Hide the fact that we’re in phrasing, because escapes don’t work.
    const stack = state.stack;
    state.stack = [];
    subexit = state.enter('reference');
    // Note: for proper tracking, we should reset the output positions when we end
    // up making a `shortcut` reference, because then there is no brace output.
    // Practically, in that case, there is no content, so it doesn’t matter that
    // we’ve tracked one too many characters.
    const reference = state.safe(state.associationId(node), {
        before: value,
        after: ']',
        ...tracker.current()
    });
    subexit();
    state.stack = stack;
    exit();
    if (type === 'full' || !text || text !== reference) {
        value += tracker.move(reference + ']');
    } else if (type === 'shortcut') {
        // Remove the unwanted `[`.
        value = value.slice(0, -1);
    } else {
        value += tracker.move(']');
    }
    return value;
}
/**
 * @returns {string}
 */ function linkReferencePeek() {
    return '[';
}
}),
"[project]/cafekit-web/node_modules/mdast-util-to-markdown/lib/util/check-bullet.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @import {Options, State} from 'mdast-util-to-markdown'
 */ /**
 * @param {State} state
 * @returns {Exclude<Options['bullet'], null | undefined>}
 */ __turbopack_context__.s([
    "checkBullet",
    ()=>checkBullet
]);
function checkBullet(state) {
    const marker = state.options.bullet || '*';
    if (marker !== '*' && marker !== '+' && marker !== '-') {
        throw new Error('Cannot serialize items with `' + marker + '` for `options.bullet`, expected `*`, `+`, or `-`');
    }
    return marker;
}
}),
"[project]/cafekit-web/node_modules/mdast-util-to-markdown/lib/util/check-bullet-other.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "checkBulletOther",
    ()=>checkBulletOther
]);
/**
 * @import {Options, State} from 'mdast-util-to-markdown'
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$markdown$2f$lib$2f$util$2f$check$2d$bullet$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/mdast-util-to-markdown/lib/util/check-bullet.js [app-rsc] (ecmascript)");
;
function checkBulletOther(state) {
    const bullet = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$markdown$2f$lib$2f$util$2f$check$2d$bullet$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["checkBullet"])(state);
    const bulletOther = state.options.bulletOther;
    if (!bulletOther) {
        return bullet === '*' ? '-' : '*';
    }
    if (bulletOther !== '*' && bulletOther !== '+' && bulletOther !== '-') {
        throw new Error('Cannot serialize items with `' + bulletOther + '` for `options.bulletOther`, expected `*`, `+`, or `-`');
    }
    if (bulletOther === bullet) {
        throw new Error('Expected `bullet` (`' + bullet + '`) and `bulletOther` (`' + bulletOther + '`) to be different');
    }
    return bulletOther;
}
}),
"[project]/cafekit-web/node_modules/mdast-util-to-markdown/lib/util/check-bullet-ordered.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @import {Options, State} from 'mdast-util-to-markdown'
 */ /**
 * @param {State} state
 * @returns {Exclude<Options['bulletOrdered'], null | undefined>}
 */ __turbopack_context__.s([
    "checkBulletOrdered",
    ()=>checkBulletOrdered
]);
function checkBulletOrdered(state) {
    const marker = state.options.bulletOrdered || '.';
    if (marker !== '.' && marker !== ')') {
        throw new Error('Cannot serialize items with `' + marker + '` for `options.bulletOrdered`, expected `.` or `)`');
    }
    return marker;
}
}),
"[project]/cafekit-web/node_modules/mdast-util-to-markdown/lib/util/check-rule.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @import {Options, State} from 'mdast-util-to-markdown'
 */ /**
 * @param {State} state
 * @returns {Exclude<Options['rule'], null | undefined>}
 */ __turbopack_context__.s([
    "checkRule",
    ()=>checkRule
]);
function checkRule(state) {
    const marker = state.options.rule || '*';
    if (marker !== '*' && marker !== '-' && marker !== '_') {
        throw new Error('Cannot serialize rules with `' + marker + '` for `options.rule`, expected `*`, `-`, or `_`');
    }
    return marker;
}
}),
"[project]/cafekit-web/node_modules/mdast-util-to-markdown/lib/handle/list.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "list",
    ()=>list
]);
/**
 * @import {Info, State} from 'mdast-util-to-markdown'
 * @import {List, Parents} from 'mdast'
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$markdown$2f$lib$2f$util$2f$check$2d$bullet$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/mdast-util-to-markdown/lib/util/check-bullet.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$markdown$2f$lib$2f$util$2f$check$2d$bullet$2d$other$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/mdast-util-to-markdown/lib/util/check-bullet-other.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$markdown$2f$lib$2f$util$2f$check$2d$bullet$2d$ordered$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/mdast-util-to-markdown/lib/util/check-bullet-ordered.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$markdown$2f$lib$2f$util$2f$check$2d$rule$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/mdast-util-to-markdown/lib/util/check-rule.js [app-rsc] (ecmascript)");
;
;
;
;
function list(node, parent, state, info) {
    const exit = state.enter('list');
    const bulletCurrent = state.bulletCurrent;
    /** @type {string} */ let bullet = node.ordered ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$markdown$2f$lib$2f$util$2f$check$2d$bullet$2d$ordered$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["checkBulletOrdered"])(state) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$markdown$2f$lib$2f$util$2f$check$2d$bullet$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["checkBullet"])(state);
    /** @type {string} */ const bulletOther = node.ordered ? bullet === '.' ? ')' : '.' : (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$markdown$2f$lib$2f$util$2f$check$2d$bullet$2d$other$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["checkBulletOther"])(state);
    let useDifferentMarker = parent && state.bulletLastUsed ? bullet === state.bulletLastUsed : false;
    if (!node.ordered) {
        const firstListItem = node.children ? node.children[0] : undefined;
        // If there’s an empty first list item directly in two list items,
        // we have to use a different bullet:
        //
        // ```markdown
        // * - *
        // ```
        //
        // …because otherwise it would become one big thematic break.
        if (// Bullet could be used as a thematic break marker:
        (bullet === '*' || bullet === '-') && // Empty first list item:
        firstListItem && (!firstListItem.children || !firstListItem.children[0]) && // Directly in two other list items:
        state.stack[state.stack.length - 1] === 'list' && state.stack[state.stack.length - 2] === 'listItem' && state.stack[state.stack.length - 3] === 'list' && state.stack[state.stack.length - 4] === 'listItem' && // That are each the first child.
        state.indexStack[state.indexStack.length - 1] === 0 && state.indexStack[state.indexStack.length - 2] === 0 && state.indexStack[state.indexStack.length - 3] === 0) {
            useDifferentMarker = true;
        }
        // If there’s a thematic break at the start of the first list item,
        // we have to use a different bullet:
        //
        // ```markdown
        // * ---
        // ```
        //
        // …because otherwise it would become one big thematic break.
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$markdown$2f$lib$2f$util$2f$check$2d$rule$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["checkRule"])(state) === bullet && firstListItem) {
            let index = -1;
            while(++index < node.children.length){
                const item = node.children[index];
                if (item && item.type === 'listItem' && item.children && item.children[0] && item.children[0].type === 'thematicBreak') {
                    useDifferentMarker = true;
                    break;
                }
            }
        }
    }
    if (useDifferentMarker) {
        bullet = bulletOther;
    }
    state.bulletCurrent = bullet;
    const value = state.containerFlow(node, info);
    state.bulletLastUsed = bullet;
    state.bulletCurrent = bulletCurrent;
    exit();
    return value;
}
}),
"[project]/cafekit-web/node_modules/mdast-util-to-markdown/lib/util/check-list-item-indent.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @import {Options, State} from 'mdast-util-to-markdown'
 */ /**
 * @param {State} state
 * @returns {Exclude<Options['listItemIndent'], null | undefined>}
 */ __turbopack_context__.s([
    "checkListItemIndent",
    ()=>checkListItemIndent
]);
function checkListItemIndent(state) {
    const style = state.options.listItemIndent || 'one';
    if (style !== 'tab' && style !== 'one' && style !== 'mixed') {
        throw new Error('Cannot serialize items with `' + style + '` for `options.listItemIndent`, expected `tab`, `one`, or `mixed`');
    }
    return style;
}
}),
"[project]/cafekit-web/node_modules/mdast-util-to-markdown/lib/handle/list-item.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "listItem",
    ()=>listItem
]);
/**
 * @import {Info, Map, State} from 'mdast-util-to-markdown'
 * @import {ListItem, Parents} from 'mdast'
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$markdown$2f$lib$2f$util$2f$check$2d$bullet$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/mdast-util-to-markdown/lib/util/check-bullet.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$markdown$2f$lib$2f$util$2f$check$2d$list$2d$item$2d$indent$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/mdast-util-to-markdown/lib/util/check-list-item-indent.js [app-rsc] (ecmascript)");
;
;
function listItem(node, parent, state, info) {
    const listItemIndent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$markdown$2f$lib$2f$util$2f$check$2d$list$2d$item$2d$indent$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["checkListItemIndent"])(state);
    let bullet = state.bulletCurrent || (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$markdown$2f$lib$2f$util$2f$check$2d$bullet$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["checkBullet"])(state);
    // Add the marker value for ordered lists.
    if (parent && parent.type === 'list' && parent.ordered) {
        bullet = (typeof parent.start === 'number' && parent.start > -1 ? parent.start : 1) + (state.options.incrementListMarker === false ? 0 : parent.children.indexOf(node)) + bullet;
    }
    let size = bullet.length + 1;
    if (listItemIndent === 'tab' || listItemIndent === 'mixed' && (parent && parent.type === 'list' && parent.spread || node.spread)) {
        size = Math.ceil(size / 4) * 4;
    }
    const tracker = state.createTracker(info);
    tracker.move(bullet + ' '.repeat(size - bullet.length));
    tracker.shift(size);
    const exit = state.enter('listItem');
    const value = state.indentLines(state.containerFlow(node, tracker.current()), map);
    exit();
    return value;
    //TURBOPACK unreachable
    ;
    /** @type {Map} */ function map(line, index, blank) {
        if (index) {
            return (blank ? '' : ' '.repeat(size)) + line;
        }
        return (blank ? bullet : bullet + ' '.repeat(size - bullet.length)) + line;
    }
}
}),
"[project]/cafekit-web/node_modules/mdast-util-to-markdown/lib/handle/paragraph.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @import {Info, State} from 'mdast-util-to-markdown'
 * @import {Paragraph, Parents} from 'mdast'
 */ /**
 * @param {Paragraph} node
 * @param {Parents | undefined} _
 * @param {State} state
 * @param {Info} info
 * @returns {string}
 */ __turbopack_context__.s([
    "paragraph",
    ()=>paragraph
]);
function paragraph(node, _, state, info) {
    const exit = state.enter('paragraph');
    const subexit = state.enter('phrasing');
    const value = state.containerPhrasing(node, info);
    subexit();
    exit();
    return value;
}
}),
"[project]/cafekit-web/node_modules/mdast-util-to-markdown/lib/handle/root.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "root",
    ()=>root
]);
/**
 * @import {Info, State} from 'mdast-util-to-markdown'
 * @import {Parents, Root} from 'mdast'
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$phrasing$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/mdast-util-phrasing/lib/index.js [app-rsc] (ecmascript)");
;
function root(node, _, state, info) {
    // Note: `html` nodes are ambiguous.
    const hasPhrasing = node.children.some(function(d) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$phrasing$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["phrasing"])(d);
    });
    const container = hasPhrasing ? state.containerPhrasing : state.containerFlow;
    return container.call(state, node, info);
}
}),
"[project]/cafekit-web/node_modules/mdast-util-to-markdown/lib/util/check-strong.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @import {Options, State} from 'mdast-util-to-markdown'
 */ /**
 * @param {State} state
 * @returns {Exclude<Options['strong'], null | undefined>}
 */ __turbopack_context__.s([
    "checkStrong",
    ()=>checkStrong
]);
function checkStrong(state) {
    const marker = state.options.strong || '*';
    if (marker !== '*' && marker !== '_') {
        throw new Error('Cannot serialize strong with `' + marker + '` for `options.strong`, expected `*`, or `_`');
    }
    return marker;
}
}),
"[project]/cafekit-web/node_modules/mdast-util-to-markdown/lib/handle/strong.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "strong",
    ()=>strong
]);
/**
 * @import {Info, State} from 'mdast-util-to-markdown'
 * @import {Parents, Strong} from 'mdast'
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$markdown$2f$lib$2f$util$2f$check$2d$strong$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/mdast-util-to-markdown/lib/util/check-strong.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$markdown$2f$lib$2f$util$2f$encode$2d$character$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/mdast-util-to-markdown/lib/util/encode-character-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$markdown$2f$lib$2f$util$2f$encode$2d$info$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/mdast-util-to-markdown/lib/util/encode-info.js [app-rsc] (ecmascript)");
;
;
;
strong.peek = strongPeek;
function strong(node, _, state, info) {
    const marker = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$markdown$2f$lib$2f$util$2f$check$2d$strong$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["checkStrong"])(state);
    const exit = state.enter('strong');
    const tracker = state.createTracker(info);
    const before = tracker.move(marker + marker);
    let between = tracker.move(state.containerPhrasing(node, {
        after: marker,
        before,
        ...tracker.current()
    }));
    const betweenHead = between.charCodeAt(0);
    const open = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$markdown$2f$lib$2f$util$2f$encode$2d$info$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["encodeInfo"])(info.before.charCodeAt(info.before.length - 1), betweenHead, marker);
    if (open.inside) {
        between = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$markdown$2f$lib$2f$util$2f$encode$2d$character$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["encodeCharacterReference"])(betweenHead) + between.slice(1);
    }
    const betweenTail = between.charCodeAt(between.length - 1);
    const close = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$markdown$2f$lib$2f$util$2f$encode$2d$info$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["encodeInfo"])(info.after.charCodeAt(0), betweenTail, marker);
    if (close.inside) {
        between = between.slice(0, -1) + (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$markdown$2f$lib$2f$util$2f$encode$2d$character$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["encodeCharacterReference"])(betweenTail);
    }
    const after = tracker.move(marker + marker);
    exit();
    state.attentionEncodeSurroundingInfo = {
        after: close.outside,
        before: open.outside
    };
    return before + between + after;
}
/**
 * @param {Strong} _
 * @param {Parents | undefined} _1
 * @param {State} state
 * @returns {string}
 */ function strongPeek(_, _1, state) {
    return state.options.strong || '*';
}
}),
"[project]/cafekit-web/node_modules/mdast-util-to-markdown/lib/handle/text.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @import {Info, State} from 'mdast-util-to-markdown'
 * @import {Parents, Text} from 'mdast'
 */ /**
 * @param {Text} node
 * @param {Parents | undefined} _
 * @param {State} state
 * @param {Info} info
 * @returns {string}
 */ __turbopack_context__.s([
    "text",
    ()=>text
]);
function text(node, _, state, info) {
    return state.safe(node.value, info);
}
}),
"[project]/cafekit-web/node_modules/mdast-util-to-markdown/lib/util/check-rule-repetition.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @import {Options, State} from 'mdast-util-to-markdown'
 */ /**
 * @param {State} state
 * @returns {Exclude<Options['ruleRepetition'], null | undefined>}
 */ __turbopack_context__.s([
    "checkRuleRepetition",
    ()=>checkRuleRepetition
]);
function checkRuleRepetition(state) {
    const repetition = state.options.ruleRepetition || 3;
    if (repetition < 3) {
        throw new Error('Cannot serialize rules with repetition `' + repetition + '` for `options.ruleRepetition`, expected `3` or more');
    }
    return repetition;
}
}),
"[project]/cafekit-web/node_modules/mdast-util-to-markdown/lib/handle/thematic-break.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "thematicBreak",
    ()=>thematicBreak
]);
/**
 * @import {State} from 'mdast-util-to-markdown'
 * @import {Parents, ThematicBreak} from 'mdast'
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$markdown$2f$lib$2f$util$2f$check$2d$rule$2d$repetition$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/mdast-util-to-markdown/lib/util/check-rule-repetition.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$markdown$2f$lib$2f$util$2f$check$2d$rule$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/mdast-util-to-markdown/lib/util/check-rule.js [app-rsc] (ecmascript)");
;
;
function thematicBreak(_, _1, state) {
    const value = ((0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$markdown$2f$lib$2f$util$2f$check$2d$rule$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["checkRule"])(state) + (state.options.ruleSpaces ? ' ' : '')).repeat((0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$markdown$2f$lib$2f$util$2f$check$2d$rule$2d$repetition$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["checkRuleRepetition"])(state));
    return state.options.ruleSpaces ? value.slice(0, -1) : value;
}
}),
"[project]/cafekit-web/node_modules/mdast-util-to-markdown/lib/handle/index.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "handle",
    ()=>handle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$markdown$2f$lib$2f$handle$2f$blockquote$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/mdast-util-to-markdown/lib/handle/blockquote.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$markdown$2f$lib$2f$handle$2f$break$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/mdast-util-to-markdown/lib/handle/break.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$markdown$2f$lib$2f$handle$2f$code$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/mdast-util-to-markdown/lib/handle/code.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$markdown$2f$lib$2f$handle$2f$definition$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/mdast-util-to-markdown/lib/handle/definition.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$markdown$2f$lib$2f$handle$2f$emphasis$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/mdast-util-to-markdown/lib/handle/emphasis.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$markdown$2f$lib$2f$handle$2f$heading$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/mdast-util-to-markdown/lib/handle/heading.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$markdown$2f$lib$2f$handle$2f$html$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/mdast-util-to-markdown/lib/handle/html.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$markdown$2f$lib$2f$handle$2f$image$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/mdast-util-to-markdown/lib/handle/image.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$markdown$2f$lib$2f$handle$2f$image$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/mdast-util-to-markdown/lib/handle/image-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$markdown$2f$lib$2f$handle$2f$inline$2d$code$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/mdast-util-to-markdown/lib/handle/inline-code.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$markdown$2f$lib$2f$handle$2f$link$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/mdast-util-to-markdown/lib/handle/link.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$markdown$2f$lib$2f$handle$2f$link$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/mdast-util-to-markdown/lib/handle/link-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$markdown$2f$lib$2f$handle$2f$list$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/mdast-util-to-markdown/lib/handle/list.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$markdown$2f$lib$2f$handle$2f$list$2d$item$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/mdast-util-to-markdown/lib/handle/list-item.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$markdown$2f$lib$2f$handle$2f$paragraph$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/mdast-util-to-markdown/lib/handle/paragraph.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$markdown$2f$lib$2f$handle$2f$root$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/mdast-util-to-markdown/lib/handle/root.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$markdown$2f$lib$2f$handle$2f$strong$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/mdast-util-to-markdown/lib/handle/strong.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$markdown$2f$lib$2f$handle$2f$text$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/mdast-util-to-markdown/lib/handle/text.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$markdown$2f$lib$2f$handle$2f$thematic$2d$break$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/mdast-util-to-markdown/lib/handle/thematic-break.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
const handle = {
    blockquote: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$markdown$2f$lib$2f$handle$2f$blockquote$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["blockquote"],
    break: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$markdown$2f$lib$2f$handle$2f$break$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["hardBreak"],
    code: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$markdown$2f$lib$2f$handle$2f$code$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["code"],
    definition: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$markdown$2f$lib$2f$handle$2f$definition$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["definition"],
    emphasis: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$markdown$2f$lib$2f$handle$2f$emphasis$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["emphasis"],
    hardBreak: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$markdown$2f$lib$2f$handle$2f$break$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["hardBreak"],
    heading: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$markdown$2f$lib$2f$handle$2f$heading$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["heading"],
    html: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$markdown$2f$lib$2f$handle$2f$html$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["html"],
    image: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$markdown$2f$lib$2f$handle$2f$image$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["image"],
    imageReference: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$markdown$2f$lib$2f$handle$2f$image$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["imageReference"],
    inlineCode: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$markdown$2f$lib$2f$handle$2f$inline$2d$code$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["inlineCode"],
    link: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$markdown$2f$lib$2f$handle$2f$link$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["link"],
    linkReference: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$markdown$2f$lib$2f$handle$2f$link$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["linkReference"],
    list: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$markdown$2f$lib$2f$handle$2f$list$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["list"],
    listItem: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$markdown$2f$lib$2f$handle$2f$list$2d$item$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["listItem"],
    paragraph: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$markdown$2f$lib$2f$handle$2f$paragraph$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["paragraph"],
    root: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$markdown$2f$lib$2f$handle$2f$root$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["root"],
    strong: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$markdown$2f$lib$2f$handle$2f$strong$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["strong"],
    text: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$markdown$2f$lib$2f$handle$2f$text$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["text"],
    thematicBreak: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$markdown$2f$lib$2f$handle$2f$thematic$2d$break$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["thematicBreak"]
};
}),
"[project]/cafekit-web/node_modules/mdast-util-to-markdown/lib/handle/index.js [app-rsc] (ecmascript) <export handle as defaultHandlers>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "defaultHandlers",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$markdown$2f$lib$2f$handle$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["handle"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$markdown$2f$lib$2f$handle$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/mdast-util-to-markdown/lib/handle/index.js [app-rsc] (ecmascript)");
}),
"[project]/cafekit-web/node_modules/longest-streak/index.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Get the count of the longest repeating streak of `substring` in `value`.
 *
 * @param {string} value
 *   Content to search in.
 * @param {string} substring
 *   Substring to look for, typically one character.
 * @returns {number}
 *   Count of most frequent adjacent `substring`s in `value`.
 */ __turbopack_context__.s([
    "longestStreak",
    ()=>longestStreak
]);
function longestStreak(value, substring) {
    const source = String(value);
    let index = source.indexOf(substring);
    let expected = index;
    let count = 0;
    let max = 0;
    if (typeof substring !== 'string') {
        throw new TypeError('Expected substring');
    }
    while(index !== -1){
        if (index === expected) {
            if (++count > max) {
                max = count;
            }
        } else {
            count = 1;
        }
        expected = index + substring.length;
        index = source.indexOf(substring, expected);
    }
    return max;
}
}),
"[project]/cafekit-web/node_modules/micromark-util-classify-character/dev/index.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "classifyCharacter",
    ()=>classifyCharacter
]);
/**
 * @import {Code} from 'micromark-util-types'
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/micromark-util-character/dev/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/micromark-util-symbol/lib/codes.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/micromark-util-symbol/lib/constants.js [app-rsc] (ecmascript)");
;
;
function classifyCharacter(code) {
    if (code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].eof || (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["markdownLineEndingOrSpace"])(code) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["unicodeWhitespace"])(code)) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["constants"].characterGroupWhitespace;
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["unicodePunctuation"])(code)) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["constants"].characterGroupPunctuation;
    }
}
}),
"[project]/cafekit-web/node_modules/mdast-util-to-string/lib/index.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "toString",
    ()=>toString
]);
/**
 * @typedef {import('mdast').Nodes} Nodes
 *
 * @typedef Options
 *   Configuration (optional).
 * @property {boolean | null | undefined} [includeImageAlt=true]
 *   Whether to use `alt` for `image`s (default: `true`).
 * @property {boolean | null | undefined} [includeHtml=true]
 *   Whether to use `value` of HTML (default: `true`).
 */ /** @type {Options} */ const emptyOptions = {};
function toString(value, options) {
    const settings = options || emptyOptions;
    const includeImageAlt = typeof settings.includeImageAlt === 'boolean' ? settings.includeImageAlt : true;
    const includeHtml = typeof settings.includeHtml === 'boolean' ? settings.includeHtml : true;
    return one(value, includeImageAlt, includeHtml);
}
/**
 * One node or several nodes.
 *
 * @param {unknown} value
 *   Thing to serialize.
 * @param {boolean} includeImageAlt
 *   Include image `alt`s.
 * @param {boolean} includeHtml
 *   Include HTML.
 * @returns {string}
 *   Serialized node.
 */ function one(value, includeImageAlt, includeHtml) {
    if (node(value)) {
        if ('value' in value) {
            return value.type === 'html' && !includeHtml ? '' : value.value;
        }
        if (includeImageAlt && 'alt' in value && value.alt) {
            return value.alt;
        }
        if ('children' in value) {
            return all(value.children, includeImageAlt, includeHtml);
        }
    }
    if (Array.isArray(value)) {
        return all(value, includeImageAlt, includeHtml);
    }
    return '';
}
/**
 * Serialize a list of nodes.
 *
 * @param {Array<unknown>} values
 *   Thing to serialize.
 * @param {boolean} includeImageAlt
 *   Include image `alt`s.
 * @param {boolean} includeHtml
 *   Include HTML.
 * @returns {string}
 *   Serialized nodes.
 */ function all(values, includeImageAlt, includeHtml) {
    /** @type {Array<string>} */ const result = [];
    let index = -1;
    while(++index < values.length){
        result[index] = one(values[index], includeImageAlt, includeHtml);
    }
    return result.join('');
}
/**
 * Check if `value` looks like a node.
 *
 * @param {unknown} value
 *   Thing.
 * @returns {value is Nodes}
 *   Whether `value` is a node.
 */ function node(value) {
    return Boolean(value && typeof value === 'object');
}
}),
"[project]/cafekit-web/node_modules/mdast-util-phrasing/lib/index.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "phrasing",
    ()=>phrasing
]);
/**
 * @typedef {import('mdast').Html} Html
 * @typedef {import('mdast').PhrasingContent} PhrasingContent
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$unist$2d$util$2d$is$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/unist-util-is/lib/index.js [app-rsc] (ecmascript)");
;
const phrasing = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$unist$2d$util$2d$is$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["convert"])([
    'break',
    'delete',
    'emphasis',
    // To do: next major: removed since footnotes were added to GFM.
    'footnote',
    'footnoteReference',
    'image',
    'imageReference',
    'inlineCode',
    // Enabled by `mdast-util-math`:
    'inlineMath',
    'link',
    'linkReference',
    // Enabled by `mdast-util-mdx`:
    'mdxJsxTextElement',
    // Enabled by `mdast-util-mdx`:
    'mdxTextExpression',
    'strong',
    'text',
    // Enabled by `mdast-util-directive`:
    'textDirective'
]);
}),
"[project]/cafekit-web/node_modules/mdast-util-gfm-table/lib/index.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "gfmTableFromMarkdown",
    ()=>gfmTableFromMarkdown,
    "gfmTableToMarkdown",
    ()=>gfmTableToMarkdown
]);
/**
 * @typedef {import('mdast').InlineCode} InlineCode
 * @typedef {import('mdast').Table} Table
 * @typedef {import('mdast').TableCell} TableCell
 * @typedef {import('mdast').TableRow} TableRow
 *
 * @typedef {import('markdown-table').Options} MarkdownTableOptions
 *
 * @typedef {import('mdast-util-from-markdown').CompileContext} CompileContext
 * @typedef {import('mdast-util-from-markdown').Extension} FromMarkdownExtension
 * @typedef {import('mdast-util-from-markdown').Handle} FromMarkdownHandle
 *
 * @typedef {import('mdast-util-to-markdown').Options} ToMarkdownExtension
 * @typedef {import('mdast-util-to-markdown').Handle} ToMarkdownHandle
 * @typedef {import('mdast-util-to-markdown').State} State
 * @typedef {import('mdast-util-to-markdown').Info} Info
 */ /**
 * @typedef Options
 *   Configuration.
 * @property {boolean | null | undefined} [tableCellPadding=true]
 *   Whether to add a space of padding between delimiters and cells (default:
 *   `true`).
 * @property {boolean | null | undefined} [tablePipeAlign=true]
 *   Whether to align the delimiters (default: `true`).
 * @property {MarkdownTableOptions['stringLength'] | null | undefined} [stringLength]
 *   Function to detect the length of table cell content, used when aligning
 *   the delimiters between cells (optional).
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/devlop/lib/development.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$markdown$2d$table$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/markdown-table/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$markdown$2f$lib$2f$handle$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__handle__as__defaultHandlers$3e$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/mdast-util-to-markdown/lib/handle/index.js [app-rsc] (ecmascript) <export handle as defaultHandlers>");
;
;
;
function gfmTableFromMarkdown() {
    return {
        enter: {
            table: enterTable,
            tableData: enterCell,
            tableHeader: enterCell,
            tableRow: enterRow
        },
        exit: {
            codeText: exitCodeText,
            table: exitTable,
            tableData: exit,
            tableHeader: exit,
            tableRow: exit
        }
    };
}
/**
 * @this {CompileContext}
 * @type {FromMarkdownHandle}
 */ function enterTable(token) {
    const align = token._align;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ok"])(align, 'expected `_align` on table');
    this.enter({
        type: 'table',
        align: align.map(function(d) {
            return d === 'none' ? null : d;
        }),
        children: []
    }, token);
    this.data.inTable = true;
}
/**
 * @this {CompileContext}
 * @type {FromMarkdownHandle}
 */ function exitTable(token) {
    this.exit(token);
    this.data.inTable = undefined;
}
/**
 * @this {CompileContext}
 * @type {FromMarkdownHandle}
 */ function enterRow(token) {
    this.enter({
        type: 'tableRow',
        children: []
    }, token);
}
/**
 * @this {CompileContext}
 * @type {FromMarkdownHandle}
 */ function exit(token) {
    this.exit(token);
}
/**
 * @this {CompileContext}
 * @type {FromMarkdownHandle}
 */ function enterCell(token) {
    this.enter({
        type: 'tableCell',
        children: []
    }, token);
}
// Overwrite the default code text data handler to unescape escaped pipes when
// they are in tables.
/**
 * @this {CompileContext}
 * @type {FromMarkdownHandle}
 */ function exitCodeText(token) {
    let value = this.resume();
    if (this.data.inTable) {
        value = value.replace(/\\([\\|])/g, replace);
    }
    const node = this.stack[this.stack.length - 1];
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ok"])(node.type === 'inlineCode');
    node.value = value;
    this.exit(token);
}
/**
 * @param {string} $0
 * @param {string} $1
 * @returns {string}
 */ function replace($0, $1) {
    // Pipes work, backslashes don’t (but can’t escape pipes).
    return $1 === '|' ? $1 : $0;
}
function gfmTableToMarkdown(options) {
    const settings = options || {};
    const padding = settings.tableCellPadding;
    const alignDelimiters = settings.tablePipeAlign;
    const stringLength = settings.stringLength;
    const around = padding ? ' ' : '|';
    return {
        unsafe: [
            {
                character: '\r',
                inConstruct: 'tableCell'
            },
            {
                character: '\n',
                inConstruct: 'tableCell'
            },
            // A pipe, when followed by a tab or space (padding), or a dash or colon
            // (unpadded delimiter row), could result in a table.
            {
                atBreak: true,
                character: '|',
                after: '[\t :-]'
            },
            // A pipe in a cell must be encoded.
            {
                character: '|',
                inConstruct: 'tableCell'
            },
            // A colon must be followed by a dash, in which case it could start a
            // delimiter row.
            {
                atBreak: true,
                character: ':',
                after: '-'
            },
            // A delimiter row can also start with a dash, when followed by more
            // dashes, a colon, or a pipe.
            // This is a stricter version than the built in check for lists, thematic
            // breaks, and setex heading underlines though:
            // <https://github.com/syntax-tree/mdast-util-to-markdown/blob/51a2038/lib/unsafe.js#L57>
            {
                atBreak: true,
                character: '-',
                after: '[:|-]'
            }
        ],
        handlers: {
            inlineCode: inlineCodeWithTable,
            table: handleTable,
            tableCell: handleTableCell,
            tableRow: handleTableRow
        }
    };
    //TURBOPACK unreachable
    ;
    /**
   * @type {ToMarkdownHandle}
   * @param {Table} node
   */ function handleTable(node, _, state, info) {
        return serializeData(handleTableAsData(node, state, info), node.align);
    }
    /**
   * This function isn’t really used normally, because we handle rows at the
   * table level.
   * But, if someone passes in a table row, this ensures we make somewhat sense.
   *
   * @type {ToMarkdownHandle}
   * @param {TableRow} node
   */ function handleTableRow(node, _, state, info) {
        const row = handleTableRowAsData(node, state, info);
        const value = serializeData([
            row
        ]);
        // `markdown-table` will always add an align row
        return value.slice(0, value.indexOf('\n'));
    }
    /**
   * @type {ToMarkdownHandle}
   * @param {TableCell} node
   */ function handleTableCell(node, _, state, info) {
        const exit = state.enter('tableCell');
        const subexit = state.enter('phrasing');
        const value = state.containerPhrasing(node, {
            ...info,
            before: around,
            after: around
        });
        subexit();
        exit();
        return value;
    }
    /**
   * @param {Array<Array<string>>} matrix
   * @param {Array<string | null | undefined> | null | undefined} [align]
   */ function serializeData(matrix, align) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$markdown$2d$table$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["markdownTable"])(matrix, {
            align,
            // @ts-expect-error: `markdown-table` types should support `null`.
            alignDelimiters,
            // @ts-expect-error: `markdown-table` types should support `null`.
            padding,
            // @ts-expect-error: `markdown-table` types should support `null`.
            stringLength
        });
    }
    /**
   * @param {Table} node
   * @param {State} state
   * @param {Info} info
   */ function handleTableAsData(node, state, info) {
        const children = node.children;
        let index = -1;
        /** @type {Array<Array<string>>} */ const result = [];
        const subexit = state.enter('table');
        while(++index < children.length){
            result[index] = handleTableRowAsData(children[index], state, info);
        }
        subexit();
        return result;
    }
    /**
   * @param {TableRow} node
   * @param {State} state
   * @param {Info} info
   */ function handleTableRowAsData(node, state, info) {
        const children = node.children;
        let index = -1;
        /** @type {Array<string>} */ const result = [];
        const subexit = state.enter('tableRow');
        while(++index < children.length){
            // Note: the positional info as used here is incorrect.
            // Making it correct would be impossible due to aligning cells?
            // And it would need copy/pasting `markdown-table` into this project.
            result[index] = handleTableCell(children[index], node, state, info);
        }
        subexit();
        return result;
    }
    /**
   * @type {ToMarkdownHandle}
   * @param {InlineCode} node
   */ function inlineCodeWithTable(node, parent, state) {
        let value = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$markdown$2f$lib$2f$handle$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__handle__as__defaultHandlers$3e$__["defaultHandlers"].inlineCode(node, parent, state);
        if (state.stack.includes('tableCell')) {
            value = value.replace(/\|/g, '\\$&');
        }
        return value;
    }
}
}),
"[project]/cafekit-web/node_modules/mdast-util-gfm-task-list-item/lib/index.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "gfmTaskListItemFromMarkdown",
    ()=>gfmTaskListItemFromMarkdown,
    "gfmTaskListItemToMarkdown",
    ()=>gfmTaskListItemToMarkdown
]);
/**
 * @typedef {import('mdast').ListItem} ListItem
 * @typedef {import('mdast').Paragraph} Paragraph
 * @typedef {import('mdast-util-from-markdown').CompileContext} CompileContext
 * @typedef {import('mdast-util-from-markdown').Extension} FromMarkdownExtension
 * @typedef {import('mdast-util-from-markdown').Handle} FromMarkdownHandle
 * @typedef {import('mdast-util-to-markdown').Options} ToMarkdownExtension
 * @typedef {import('mdast-util-to-markdown').Handle} ToMarkdownHandle
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/devlop/lib/development.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$markdown$2f$lib$2f$handle$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__handle__as__defaultHandlers$3e$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/mdast-util-to-markdown/lib/handle/index.js [app-rsc] (ecmascript) <export handle as defaultHandlers>");
;
;
function gfmTaskListItemFromMarkdown() {
    return {
        exit: {
            taskListCheckValueChecked: exitCheck,
            taskListCheckValueUnchecked: exitCheck,
            paragraph: exitParagraphWithTaskListItem
        }
    };
}
function gfmTaskListItemToMarkdown() {
    return {
        unsafe: [
            {
                atBreak: true,
                character: '-',
                after: '[:|-]'
            }
        ],
        handlers: {
            listItem: listItemWithTaskListItem
        }
    };
}
/**
 * @this {CompileContext}
 * @type {FromMarkdownHandle}
 */ function exitCheck(token) {
    // We’re always in a paragraph, in a list item.
    const node = this.stack[this.stack.length - 2];
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ok"])(node.type === 'listItem');
    node.checked = token.type === 'taskListCheckValueChecked';
}
/**
 * @this {CompileContext}
 * @type {FromMarkdownHandle}
 */ function exitParagraphWithTaskListItem(token) {
    const parent = this.stack[this.stack.length - 2];
    if (parent && parent.type === 'listItem' && typeof parent.checked === 'boolean') {
        const node = this.stack[this.stack.length - 1];
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ok"])(node.type === 'paragraph');
        const head = node.children[0];
        if (head && head.type === 'text') {
            const siblings = parent.children;
            let index = -1;
            /** @type {Paragraph | undefined} */ let firstParaghraph;
            while(++index < siblings.length){
                const sibling = siblings[index];
                if (sibling.type === 'paragraph') {
                    firstParaghraph = sibling;
                    break;
                }
            }
            if (firstParaghraph === node) {
                // Must start with a space or a tab.
                head.value = head.value.slice(1);
                if (head.value.length === 0) {
                    node.children.shift();
                } else if (node.position && head.position && typeof head.position.start.offset === 'number') {
                    head.position.start.column++;
                    head.position.start.offset++;
                    node.position.start = Object.assign({}, head.position.start);
                }
            }
        }
    }
    this.exit(token);
}
/**
 * @type {ToMarkdownHandle}
 * @param {ListItem} node
 */ function listItemWithTaskListItem(node, parent, state, info) {
    const head = node.children[0];
    const checkable = typeof node.checked === 'boolean' && head && head.type === 'paragraph';
    const checkbox = '[' + (node.checked ? 'x' : ' ') + '] ';
    const tracker = state.createTracker(info);
    if (checkable) {
        tracker.move(checkbox);
    }
    let value = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$to$2d$markdown$2f$lib$2f$handle$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__handle__as__defaultHandlers$3e$__["defaultHandlers"].listItem(node, parent, state, {
        ...info,
        ...tracker.current()
    });
    if (checkable) {
        value = value.replace(/^(?:[*+-]|\d+\.)([\r\n]| {1,3})/, check);
    }
    return value;
    //TURBOPACK unreachable
    ;
    /**
   * @param {string} $0
   * @returns {string}
   */ function check($0) {
        return $0 + checkbox;
    }
}
}),
"[project]/cafekit-web/node_modules/mdast-util-gfm/lib/index.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "gfmFromMarkdown",
    ()=>gfmFromMarkdown,
    "gfmToMarkdown",
    ()=>gfmToMarkdown
]);
/**
 * @import {Extension as FromMarkdownExtension} from 'mdast-util-from-markdown'
 * @import {Options} from 'mdast-util-gfm'
 * @import {Options as ToMarkdownExtension} from 'mdast-util-to-markdown'
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$gfm$2d$autolink$2d$literal$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/mdast-util-gfm-autolink-literal/lib/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$gfm$2d$footnote$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/mdast-util-gfm-footnote/lib/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$gfm$2d$strikethrough$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/mdast-util-gfm-strikethrough/lib/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$gfm$2d$table$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/mdast-util-gfm-table/lib/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$gfm$2d$task$2d$list$2d$item$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/mdast-util-gfm-task-list-item/lib/index.js [app-rsc] (ecmascript)");
;
;
;
;
;
function gfmFromMarkdown() {
    return [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$gfm$2d$autolink$2d$literal$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["gfmAutolinkLiteralFromMarkdown"])(),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$gfm$2d$footnote$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["gfmFootnoteFromMarkdown"])(),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$gfm$2d$strikethrough$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["gfmStrikethroughFromMarkdown"])(),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$gfm$2d$table$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["gfmTableFromMarkdown"])(),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$gfm$2d$task$2d$list$2d$item$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["gfmTaskListItemFromMarkdown"])()
    ];
}
function gfmToMarkdown(options) {
    return {
        extensions: [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$gfm$2d$autolink$2d$literal$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["gfmAutolinkLiteralToMarkdown"])(),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$gfm$2d$footnote$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["gfmFootnoteToMarkdown"])(options),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$gfm$2d$strikethrough$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["gfmStrikethroughToMarkdown"])(),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$gfm$2d$table$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["gfmTableToMarkdown"])(options),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$gfm$2d$task$2d$list$2d$item$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["gfmTaskListItemToMarkdown"])()
        ]
    };
}
}),
"[project]/cafekit-web/node_modules/micromark-util-chunked/dev/index.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "push",
    ()=>push,
    "splice",
    ()=>splice
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/micromark-util-symbol/lib/constants.js [app-rsc] (ecmascript)");
;
function splice(list, start, remove, items) {
    const end = list.length;
    let chunkStart = 0;
    /** @type {Array<unknown>} */ let parameters;
    // Make start between zero and `end` (included).
    if (start < 0) {
        start = -start > end ? 0 : end + start;
    } else {
        start = start > end ? end : start;
    }
    remove = remove > 0 ? remove : 0;
    // No need to chunk the items if there’s only a couple (10k) items.
    if (items.length < __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["constants"].v8MaxSafeChunkSize) {
        parameters = Array.from(items);
        parameters.unshift(start, remove);
        // @ts-expect-error Hush, it’s fine.
        list.splice(...parameters);
    } else {
        // Delete `remove` items starting from `start`
        if (remove) list.splice(start, remove);
        // Insert the items in chunks to not cause stack overflows.
        while(chunkStart < items.length){
            parameters = items.slice(chunkStart, chunkStart + __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["constants"].v8MaxSafeChunkSize);
            parameters.unshift(start, 0);
            // @ts-expect-error Hush, it’s fine.
            list.splice(...parameters);
            chunkStart += __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["constants"].v8MaxSafeChunkSize;
            start += __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["constants"].v8MaxSafeChunkSize;
        }
    }
}
function push(list, items) {
    if (list.length > 0) {
        splice(list, list.length, 0, items);
        return list;
    }
    return items;
}
}),
"[project]/cafekit-web/node_modules/micromark-util-combine-extensions/index.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "combineExtensions",
    ()=>combineExtensions,
    "combineHtmlExtensions",
    ()=>combineHtmlExtensions
]);
/**
 * @import {
 *   Extension,
 *   Handles,
 *   HtmlExtension,
 *   NormalizedExtension
 * } from 'micromark-util-types'
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$chunked$2f$dev$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/micromark-util-chunked/dev/index.js [app-rsc] (ecmascript)");
;
const hasOwnProperty = {}.hasOwnProperty;
function combineExtensions(extensions) {
    /** @type {NormalizedExtension} */ const all = {};
    let index = -1;
    while(++index < extensions.length){
        syntaxExtension(all, extensions[index]);
    }
    return all;
}
/**
 * Merge `extension` into `all`.
 *
 * @param {NormalizedExtension} all
 *   Extension to merge into.
 * @param {Extension} extension
 *   Extension to merge.
 * @returns {undefined}
 *   Nothing.
 */ function syntaxExtension(all, extension) {
    /** @type {keyof Extension} */ let hook;
    for(hook in extension){
        const maybe = hasOwnProperty.call(all, hook) ? all[hook] : undefined;
        /** @type {Record<string, unknown>} */ const left = maybe || (all[hook] = {});
        /** @type {Record<string, unknown> | undefined} */ const right = extension[hook];
        /** @type {string} */ let code;
        if (right) {
            for(code in right){
                if (!hasOwnProperty.call(left, code)) left[code] = [];
                const value = right[code];
                constructs(// @ts-expect-error Looks like a list.
                left[code], Array.isArray(value) ? value : value ? [
                    value
                ] : []);
            }
        }
    }
}
/**
 * Merge `list` into `existing` (both lists of constructs).
 * Mutates `existing`.
 *
 * @param {Array<unknown>} existing
 *   List of constructs to merge into.
 * @param {Array<unknown>} list
 *   List of constructs to merge.
 * @returns {undefined}
 *   Nothing.
 */ function constructs(existing, list) {
    let index = -1;
    /** @type {Array<unknown>} */ const before = [];
    while(++index < list.length){
        // @ts-expect-error Looks like an object.
        ;
        (list[index].add === 'after' ? existing : before).push(list[index]);
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$chunked$2f$dev$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["splice"])(existing, 0, 0, before);
}
function combineHtmlExtensions(htmlExtensions) {
    /** @type {HtmlExtension} */ const handlers = {};
    let index = -1;
    while(++index < htmlExtensions.length){
        htmlExtension(handlers, htmlExtensions[index]);
    }
    return handlers;
}
/**
 * Merge `extension` into `all`.
 *
 * @param {HtmlExtension} all
 *   Extension to merge into.
 * @param {HtmlExtension} extension
 *   Extension to merge.
 * @returns {undefined}
 *   Nothing.
 */ function htmlExtension(all, extension) {
    /** @type {keyof HtmlExtension} */ let hook;
    for(hook in extension){
        const maybe = hasOwnProperty.call(all, hook) ? all[hook] : undefined;
        const left = maybe || (all[hook] = {});
        const right = extension[hook];
        /** @type {keyof Handles} */ let type;
        if (right) {
            for(type in right){
                // @ts-expect-error assume document vs regular handler are managed correctly.
                left[type] = right[type];
            }
        }
    }
}
}),
"[project]/cafekit-web/node_modules/micromark-extension-gfm-autolink-literal/dev/lib/syntax.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "gfmAutolinkLiteral",
    ()=>gfmAutolinkLiteral
]);
/**
 * @import {Code, ConstructRecord, Event, Extension, Previous, State, TokenizeContext, Tokenizer} from 'micromark-util-types'
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/micromark-util-character/dev/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/micromark-util-symbol/lib/codes.js [app-rsc] (ecmascript)");
;
;
const wwwPrefix = {
    tokenize: tokenizeWwwPrefix,
    partial: true
};
const domain = {
    tokenize: tokenizeDomain,
    partial: true
};
const path = {
    tokenize: tokenizePath,
    partial: true
};
const trail = {
    tokenize: tokenizeTrail,
    partial: true
};
const emailDomainDotTrail = {
    tokenize: tokenizeEmailDomainDotTrail,
    partial: true
};
const wwwAutolink = {
    name: 'wwwAutolink',
    tokenize: tokenizeWwwAutolink,
    previous: previousWww
};
const protocolAutolink = {
    name: 'protocolAutolink',
    tokenize: tokenizeProtocolAutolink,
    previous: previousProtocol
};
const emailAutolink = {
    name: 'emailAutolink',
    tokenize: tokenizeEmailAutolink,
    previous: previousEmail
};
/** @type {ConstructRecord} */ const text = {};
function gfmAutolinkLiteral() {
    return {
        text
    };
}
/** @type {Code} */ let code = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].digit0;
// Add alphanumerics.
while(code < __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].leftCurlyBrace){
    text[code] = emailAutolink;
    code++;
    if (code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].colon) code = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].uppercaseA;
    else if (code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].leftSquareBracket) code = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].lowercaseA;
}
text[__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].plusSign] = emailAutolink;
text[__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].dash] = emailAutolink;
text[__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].dot] = emailAutolink;
text[__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].underscore] = emailAutolink;
text[__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].uppercaseH] = [
    emailAutolink,
    protocolAutolink
];
text[__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].lowercaseH] = [
    emailAutolink,
    protocolAutolink
];
text[__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].uppercaseW] = [
    emailAutolink,
    wwwAutolink
];
text[__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].lowercaseW] = [
    emailAutolink,
    wwwAutolink
];
// To do: perform email autolink literals on events, afterwards.
// That’s where `markdown-rs` and `cmark-gfm` perform it.
// It should look for `@`, then for atext backwards, and then for a label
// forwards.
// To do: `mailto:`, `xmpp:` protocol as prefix.
/**
 * Email autolink literal.
 *
 * ```markdown
 * > | a contact@example.org b
 *       ^^^^^^^^^^^^^^^^^^^
 * ```
 *
 * @this {TokenizeContext}
 * @type {Tokenizer}
 */ function tokenizeEmailAutolink(effects, ok, nok) {
    const self = this;
    /** @type {boolean | undefined} */ let dot;
    /** @type {boolean} */ let data;
    return start;
    //TURBOPACK unreachable
    ;
    /**
   * Start of email autolink literal.
   *
   * ```markdown
   * > | a contact@example.org b
   *       ^
   * ```
   *
   * @type {State}
   */ function start(code) {
        if (!gfmAtext(code) || !previousEmail.call(self, self.previous) || previousUnbalanced(self.events)) {
            return nok(code);
        }
        effects.enter('literalAutolink');
        effects.enter('literalAutolinkEmail');
        return atext(code);
    }
    /**
   * In email atext.
   *
   * ```markdown
   * > | a contact@example.org b
   *       ^
   * ```
   *
   * @type {State}
   */ function atext(code) {
        if (gfmAtext(code)) {
            effects.consume(code);
            return atext;
        }
        if (code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].atSign) {
            effects.consume(code);
            return emailDomain;
        }
        return nok(code);
    }
    /**
   * In email domain.
   *
   * The reference code is a bit overly complex as it handles the `@`, of which
   * there may be just one.
   * Source: <https://github.com/github/cmark-gfm/blob/ef1cfcb/extensions/autolink.c#L318>
   *
   * ```markdown
   * > | a contact@example.org b
   *               ^
   * ```
   *
   * @type {State}
   */ function emailDomain(code) {
        // Dot followed by alphanumerical (not `-` or `_`).
        if (code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].dot) {
            return effects.check(emailDomainDotTrail, emailDomainAfter, emailDomainDot)(code);
        }
        // Alphanumerical, `-`, and `_`.
        if (code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].dash || code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].underscore || (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["asciiAlphanumeric"])(code)) {
            data = true;
            effects.consume(code);
            return emailDomain;
        }
        // To do: `/` if xmpp.
        // Note: normally we’d truncate trailing punctuation from the link.
        // However, email autolink literals cannot contain any of those markers,
        // except for `.`, but that can only occur if it isn’t trailing.
        // So we can ignore truncating!
        return emailDomainAfter(code);
    }
    /**
   * In email domain, on dot that is not a trail.
   *
   * ```markdown
   * > | a contact@example.org b
   *                      ^
   * ```
   *
   * @type {State}
   */ function emailDomainDot(code) {
        effects.consume(code);
        dot = true;
        return emailDomain;
    }
    /**
   * After email domain.
   *
   * ```markdown
   * > | a contact@example.org b
   *                          ^
   * ```
   *
   * @type {State}
   */ function emailDomainAfter(code) {
        // Domain must not be empty, must include a dot, and must end in alphabetical.
        // Source: <https://github.com/github/cmark-gfm/blob/ef1cfcb/extensions/autolink.c#L332>.
        if (data && dot && (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["asciiAlpha"])(self.previous)) {
            effects.exit('literalAutolinkEmail');
            effects.exit('literalAutolink');
            return ok(code);
        }
        return nok(code);
    }
}
/**
 * `www` autolink literal.
 *
 * ```markdown
 * > | a www.example.org b
 *       ^^^^^^^^^^^^^^^
 * ```
 *
 * @this {TokenizeContext}
 * @type {Tokenizer}
 */ function tokenizeWwwAutolink(effects, ok, nok) {
    const self = this;
    return wwwStart;
    //TURBOPACK unreachable
    ;
    /**
   * Start of www autolink literal.
   *
   * ```markdown
   * > | www.example.com/a?b#c
   *     ^
   * ```
   *
   * @type {State}
   */ function wwwStart(code) {
        if (code !== __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].uppercaseW && code !== __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].lowercaseW || !previousWww.call(self, self.previous) || previousUnbalanced(self.events)) {
            return nok(code);
        }
        effects.enter('literalAutolink');
        effects.enter('literalAutolinkWww');
        // Note: we *check*, so we can discard the `www.` we parsed.
        // If it worked, we consider it as a part of the domain.
        return effects.check(wwwPrefix, effects.attempt(domain, effects.attempt(path, wwwAfter), nok), nok)(code);
    }
    /**
   * After a www autolink literal.
   *
   * ```markdown
   * > | www.example.com/a?b#c
   *                          ^
   * ```
   *
   * @type {State}
   */ function wwwAfter(code) {
        effects.exit('literalAutolinkWww');
        effects.exit('literalAutolink');
        return ok(code);
    }
}
/**
 * Protocol autolink literal.
 *
 * ```markdown
 * > | a https://example.org b
 *       ^^^^^^^^^^^^^^^^^^^
 * ```
 *
 * @this {TokenizeContext}
 * @type {Tokenizer}
 */ function tokenizeProtocolAutolink(effects, ok, nok) {
    const self = this;
    let buffer = '';
    let seen = false;
    return protocolStart;
    //TURBOPACK unreachable
    ;
    /**
   * Start of protocol autolink literal.
   *
   * ```markdown
   * > | https://example.com/a?b#c
   *     ^
   * ```
   *
   * @type {State}
   */ function protocolStart(code) {
        if ((code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].uppercaseH || code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].lowercaseH) && previousProtocol.call(self, self.previous) && !previousUnbalanced(self.events)) {
            effects.enter('literalAutolink');
            effects.enter('literalAutolinkHttp');
            buffer += String.fromCodePoint(code);
            effects.consume(code);
            return protocolPrefixInside;
        }
        return nok(code);
    }
    /**
   * In protocol.
   *
   * ```markdown
   * > | https://example.com/a?b#c
   *     ^^^^^
   * ```
   *
   * @type {State}
   */ function protocolPrefixInside(code) {
        // `5` is size of `https`
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["asciiAlpha"])(code) && buffer.length < 5) {
            // @ts-expect-error: definitely number.
            buffer += String.fromCodePoint(code);
            effects.consume(code);
            return protocolPrefixInside;
        }
        if (code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].colon) {
            const protocol = buffer.toLowerCase();
            if (protocol === 'http' || protocol === 'https') {
                effects.consume(code);
                return protocolSlashesInside;
            }
        }
        return nok(code);
    }
    /**
   * In slashes.
   *
   * ```markdown
   * > | https://example.com/a?b#c
   *           ^^
   * ```
   *
   * @type {State}
   */ function protocolSlashesInside(code) {
        if (code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].slash) {
            effects.consume(code);
            if (seen) {
                return afterProtocol;
            }
            seen = true;
            return protocolSlashesInside;
        }
        return nok(code);
    }
    /**
   * After protocol, before domain.
   *
   * ```markdown
   * > | https://example.com/a?b#c
   *             ^
   * ```
   *
   * @type {State}
   */ function afterProtocol(code) {
        // To do: this is different from `markdown-rs`:
        // https://github.com/wooorm/markdown-rs/blob/b3a921c761309ae00a51fe348d8a43adbc54b518/src/construct/gfm_autolink_literal.rs#L172-L182
        return code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].eof || (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["asciiControl"])(code) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["markdownLineEndingOrSpace"])(code) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["unicodeWhitespace"])(code) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["unicodePunctuation"])(code) ? nok(code) : effects.attempt(domain, effects.attempt(path, protocolAfter), nok)(code);
    }
    /**
   * After a protocol autolink literal.
   *
   * ```markdown
   * > | https://example.com/a?b#c
   *                              ^
   * ```
   *
   * @type {State}
   */ function protocolAfter(code) {
        effects.exit('literalAutolinkHttp');
        effects.exit('literalAutolink');
        return ok(code);
    }
}
/**
 * `www` prefix.
 *
 * ```markdown
 * > | a www.example.org b
 *       ^^^^
 * ```
 *
 * @this {TokenizeContext}
 * @type {Tokenizer}
 */ function tokenizeWwwPrefix(effects, ok, nok) {
    let size = 0;
    return wwwPrefixInside;
    //TURBOPACK unreachable
    ;
    /**
   * In www prefix.
   *
   * ```markdown
   * > | www.example.com
   *     ^^^^
   * ```
   *
   * @type {State}
   */ function wwwPrefixInside(code) {
        if ((code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].uppercaseW || code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].lowercaseW) && size < 3) {
            size++;
            effects.consume(code);
            return wwwPrefixInside;
        }
        if (code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].dot && size === 3) {
            effects.consume(code);
            return wwwPrefixAfter;
        }
        return nok(code);
    }
    /**
   * After www prefix.
   *
   * ```markdown
   * > | www.example.com
   *         ^
   * ```
   *
   * @type {State}
   */ function wwwPrefixAfter(code) {
        // If there is *anything*, we can link.
        return code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].eof ? nok(code) : ok(code);
    }
}
/**
 * Domain.
 *
 * ```markdown
 * > | a https://example.org b
 *               ^^^^^^^^^^^
 * ```
 *
 * @this {TokenizeContext}
 * @type {Tokenizer}
 */ function tokenizeDomain(effects, ok, nok) {
    /** @type {boolean | undefined} */ let underscoreInLastSegment;
    /** @type {boolean | undefined} */ let underscoreInLastLastSegment;
    /** @type {boolean | undefined} */ let seen;
    return domainInside;
    //TURBOPACK unreachable
    ;
    /**
   * In domain.
   *
   * ```markdown
   * > | https://example.com/a
   *             ^^^^^^^^^^^
   * ```
   *
   * @type {State}
   */ function domainInside(code) {
        // Check whether this marker, which is a trailing punctuation
        // marker, optionally followed by more trailing markers, and then
        // followed by an end.
        if (code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].dot || code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].underscore) {
            return effects.check(trail, domainAfter, domainAtPunctuation)(code);
        }
        // GH documents that only alphanumerics (other than `-`, `.`, and `_`) can
        // occur, which sounds like ASCII only, but they also support `www.點看.com`,
        // so that’s Unicode.
        // Instead of some new production for Unicode alphanumerics, markdown
        // already has that for Unicode punctuation and whitespace, so use those.
        // Source: <https://github.com/github/cmark-gfm/blob/ef1cfcb/extensions/autolink.c#L12>.
        if (code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].eof || (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["markdownLineEndingOrSpace"])(code) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["unicodeWhitespace"])(code) || code !== __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].dash && (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["unicodePunctuation"])(code)) {
            return domainAfter(code);
        }
        seen = true;
        effects.consume(code);
        return domainInside;
    }
    /**
   * In domain, at potential trailing punctuation, that was not trailing.
   *
   * ```markdown
   * > | https://example.com
   *                    ^
   * ```
   *
   * @type {State}
   */ function domainAtPunctuation(code) {
        // There is an underscore in the last segment of the domain
        if (code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].underscore) {
            underscoreInLastSegment = true;
        } else {
            underscoreInLastLastSegment = underscoreInLastSegment;
            underscoreInLastSegment = undefined;
        }
        effects.consume(code);
        return domainInside;
    }
    /**
   * After domain.
   *
   * ```markdown
   * > | https://example.com/a
   *                        ^
   * ```
   *
   * @type {State} */ function domainAfter(code) {
        // Note: that’s GH says a dot is needed, but it’s not true:
        // <https://github.com/github/cmark-gfm/issues/279>
        if (underscoreInLastLastSegment || underscoreInLastSegment || !seen) {
            return nok(code);
        }
        return ok(code);
    }
}
/**
 * Path.
 *
 * ```markdown
 * > | a https://example.org/stuff b
 *                          ^^^^^^
 * ```
 *
 * @this {TokenizeContext}
 * @type {Tokenizer}
 */ function tokenizePath(effects, ok) {
    let sizeOpen = 0;
    let sizeClose = 0;
    return pathInside;
    //TURBOPACK unreachable
    ;
    /**
   * In path.
   *
   * ```markdown
   * > | https://example.com/a
   *                        ^^
   * ```
   *
   * @type {State}
   */ function pathInside(code) {
        if (code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].leftParenthesis) {
            sizeOpen++;
            effects.consume(code);
            return pathInside;
        }
        // To do: `markdown-rs` also needs this.
        // If this is a paren, and there are less closings than openings,
        // we don’t check for a trail.
        if (code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].rightParenthesis && sizeClose < sizeOpen) {
            return pathAtPunctuation(code);
        }
        // Check whether this trailing punctuation marker is optionally
        // followed by more trailing markers, and then followed
        // by an end.
        if (code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].exclamationMark || code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].quotationMark || code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].ampersand || code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].apostrophe || code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].rightParenthesis || code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].asterisk || code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].comma || code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].dot || code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].colon || code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].semicolon || code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].lessThan || code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].questionMark || code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].rightSquareBracket || code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].underscore || code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].tilde) {
            return effects.check(trail, ok, pathAtPunctuation)(code);
        }
        if (code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].eof || (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["markdownLineEndingOrSpace"])(code) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["unicodeWhitespace"])(code)) {
            return ok(code);
        }
        effects.consume(code);
        return pathInside;
    }
    /**
   * In path, at potential trailing punctuation, that was not trailing.
   *
   * ```markdown
   * > | https://example.com/a"b
   *                          ^
   * ```
   *
   * @type {State}
   */ function pathAtPunctuation(code) {
        // Count closing parens.
        if (code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].rightParenthesis) {
            sizeClose++;
        }
        effects.consume(code);
        return pathInside;
    }
}
/**
 * Trail.
 *
 * This calls `ok` if this *is* the trail, followed by an end, which means
 * the entire trail is not part of the link.
 * It calls `nok` if this *is* part of the link.
 *
 * ```markdown
 * > | https://example.com").
 *                        ^^^
 * ```
 *
 * @this {TokenizeContext}
 * @type {Tokenizer}
 */ function tokenizeTrail(effects, ok, nok) {
    return trail;
    //TURBOPACK unreachable
    ;
    /**
   * In trail of domain or path.
   *
   * ```markdown
   * > | https://example.com").
   *                        ^
   * ```
   *
   * @type {State}
   */ function trail(code) {
        // Regular trailing punctuation.
        if (code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].exclamationMark || code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].quotationMark || code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].apostrophe || code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].rightParenthesis || code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].asterisk || code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].comma || code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].dot || code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].colon || code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].semicolon || code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].questionMark || code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].underscore || code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].tilde) {
            effects.consume(code);
            return trail;
        }
        // `&` followed by one or more alphabeticals and then a `;`, is
        // as a whole considered as trailing punctuation.
        // In all other cases, it is considered as continuation of the URL.
        if (code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].ampersand) {
            effects.consume(code);
            return trailCharacterReferenceStart;
        }
        // Needed because we allow literals after `[`, as we fix:
        // <https://github.com/github/cmark-gfm/issues/278>.
        // Check that it is not followed by `(` or `[`.
        if (code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].rightSquareBracket) {
            effects.consume(code);
            return trailBracketAfter;
        }
        if (// `<` is an end.
        code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].lessThan || // So is whitespace.
        code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].eof || (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["markdownLineEndingOrSpace"])(code) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["unicodeWhitespace"])(code)) {
            return ok(code);
        }
        return nok(code);
    }
    /**
   * In trail, after `]`.
   *
   * > 👉 **Note**: this deviates from `cmark-gfm` to fix a bug.
   * > See end of <https://github.com/github/cmark-gfm/issues/278> for more.
   *
   * ```markdown
   * > | https://example.com](
   *                         ^
   * ```
   *
   * @type {State}
   */ function trailBracketAfter(code) {
        // Whitespace or something that could start a resource or reference is the end.
        // Switch back to trail otherwise.
        if (code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].eof || code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].leftParenthesis || code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].leftSquareBracket || (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["markdownLineEndingOrSpace"])(code) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["unicodeWhitespace"])(code)) {
            return ok(code);
        }
        return trail(code);
    }
    /**
   * In character-reference like trail, after `&`.
   *
   * ```markdown
   * > | https://example.com&amp;).
   *                         ^
   * ```
   *
   * @type {State}
   */ function trailCharacterReferenceStart(code) {
        // When non-alpha, it’s not a trail.
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["asciiAlpha"])(code) ? trailCharacterReferenceInside(code) : nok(code);
    }
    /**
   * In character-reference like trail.
   *
   * ```markdown
   * > | https://example.com&amp;).
   *                         ^
   * ```
   *
   * @type {State}
   */ function trailCharacterReferenceInside(code) {
        // Switch back to trail if this is well-formed.
        if (code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].semicolon) {
            effects.consume(code);
            return trail;
        }
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["asciiAlpha"])(code)) {
            effects.consume(code);
            return trailCharacterReferenceInside;
        }
        // It’s not a trail.
        return nok(code);
    }
}
/**
 * Dot in email domain trail.
 *
 * This calls `ok` if this *is* the trail, followed by an end, which means
 * the trail is not part of the link.
 * It calls `nok` if this *is* part of the link.
 *
 * ```markdown
 * > | contact@example.org.
 *                        ^
 * ```
 *
 * @this {TokenizeContext}
 * @type {Tokenizer}
 */ function tokenizeEmailDomainDotTrail(effects, ok, nok) {
    return start;
    //TURBOPACK unreachable
    ;
    /**
   * Dot.
   *
   * ```markdown
   * > | contact@example.org.
   *                    ^   ^
   * ```
   *
   * @type {State}
   */ function start(code) {
        // Must be dot.
        effects.consume(code);
        return after;
    }
    /**
   * After dot.
   *
   * ```markdown
   * > | contact@example.org.
   *                     ^   ^
   * ```
   *
   * @type {State}
   */ function after(code) {
        // Not a trail if alphanumeric.
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["asciiAlphanumeric"])(code) ? nok(code) : ok(code);
    }
}
/**
 * See:
 * <https://github.com/github/cmark-gfm/blob/ef1cfcb/extensions/autolink.c#L156>.
 *
 * @type {Previous}
 */ function previousWww(code) {
    return code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].eof || code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].leftParenthesis || code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].asterisk || code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].underscore || code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].leftSquareBracket || code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].rightSquareBracket || code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].tilde || (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["markdownLineEndingOrSpace"])(code);
}
/**
 * See:
 * <https://github.com/github/cmark-gfm/blob/ef1cfcb/extensions/autolink.c#L214>.
 *
 * @type {Previous}
 */ function previousProtocol(code) {
    return !(0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["asciiAlpha"])(code);
}
/**
 * @this {TokenizeContext}
 * @type {Previous}
 */ function previousEmail(code) {
    // Do not allow a slash “inside” atext.
    // The reference code is a bit weird, but that’s what it results in.
    // Source: <https://github.com/github/cmark-gfm/blob/ef1cfcb/extensions/autolink.c#L307>.
    // Other than slash, every preceding character is allowed.
    return !(code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].slash || gfmAtext(code));
}
/**
 * @param {Code} code
 * @returns {boolean}
 */ function gfmAtext(code) {
    return code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].plusSign || code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].dash || code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].dot || code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].underscore || (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["asciiAlphanumeric"])(code);
}
/**
 * @param {Array<Event>} events
 * @returns {boolean}
 */ function previousUnbalanced(events) {
    let index = events.length;
    let result = false;
    while(index--){
        const token = events[index][1];
        if ((token.type === 'labelLink' || token.type === 'labelImage') && !token._balanced) {
            result = true;
            break;
        }
        // If we’ve seen this token, and it was marked as not having any unbalanced
        // bracket before it, we can exit.
        if (token._gfmAutolinkLiteralWalkedInto) {
            result = false;
            break;
        }
    }
    if (events.length > 0 && !result) {
        // Mark the last token as “walked into” w/o finding
        // anything.
        events[events.length - 1][1]._gfmAutolinkLiteralWalkedInto = true;
    }
    return result;
}
}),
"[project]/cafekit-web/node_modules/micromark-extension-gfm-autolink-literal/dev/lib/html.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "gfmAutolinkLiteralHtml",
    ()=>gfmAutolinkLiteralHtml
]);
/**
 * @import {CompileContext, Handle, HtmlExtension, Token} from 'micromark-util-types'
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$sanitize$2d$uri$2f$dev$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/micromark-util-sanitize-uri/dev/index.js [app-rsc] (ecmascript)");
;
function gfmAutolinkLiteralHtml() {
    return {
        exit: {
            literalAutolinkEmail,
            literalAutolinkHttp,
            literalAutolinkWww
        }
    };
}
/**
 * @this {CompileContext}
 * @type {Handle}
 */ function literalAutolinkWww(token) {
    anchorFromToken.call(this, token, 'http://');
}
/**
 * @this {CompileContext}
 * @type {Handle}
 */ function literalAutolinkEmail(token) {
    anchorFromToken.call(this, token, 'mailto:');
}
/**
 * @this {CompileContext}
 * @type {Handle}
 */ function literalAutolinkHttp(token) {
    anchorFromToken.call(this, token);
}
/**
 * @this CompileContext
 * @param {Token} token
 * @param {string | null | undefined} [protocol]
 * @returns {undefined}
 */ function anchorFromToken(token, protocol) {
    const url = this.sliceSerialize(token);
    this.tag('<a href="' + (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$sanitize$2d$uri$2f$dev$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sanitizeUri"])((protocol || '') + url) + '">');
    this.raw(this.encode(url));
    this.tag('</a>');
}
}),
"[project]/cafekit-web/node_modules/micromark-util-encode/index.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "encode",
    ()=>encode
]);
const characterReferences = {
    '"': 'quot',
    '&': 'amp',
    '<': 'lt',
    '>': 'gt'
};
function encode(value) {
    return value.replace(/["&<>]/g, replace);
    //TURBOPACK unreachable
    ;
    /**
   * @param {string} value
   *   Value to replace.
   * @returns {string}
   *   Encoded value.
   */ function replace(value) {
        return '&' + characterReferences[value] + ';';
    }
}
}),
"[project]/cafekit-web/node_modules/micromark-util-sanitize-uri/dev/index.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "normalizeUri",
    ()=>normalizeUri,
    "sanitizeUri",
    ()=>sanitizeUri
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/micromark-util-character/dev/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$encode$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/micromark-util-encode/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/micromark-util-symbol/lib/codes.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$values$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/micromark-util-symbol/lib/values.js [app-rsc] (ecmascript)");
;
;
;
function sanitizeUri(url, protocol) {
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$encode$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["encode"])(normalizeUri(url || ''));
    if (!protocol) {
        return value;
    }
    const colon = value.indexOf(':');
    const questionMark = value.indexOf('?');
    const numberSign = value.indexOf('#');
    const slash = value.indexOf('/');
    if (// If there is no protocol, it’s relative.
    colon < 0 || slash > -1 && colon > slash || questionMark > -1 && colon > questionMark || numberSign > -1 && colon > numberSign || // It is a protocol, it should be allowed.
    protocol.test(value.slice(0, colon))) {
        return value;
    }
    return '';
}
function normalizeUri(value) {
    /** @type {Array<string>} */ const result = [];
    let index = -1;
    let start = 0;
    let skip = 0;
    while(++index < value.length){
        const code = value.charCodeAt(index);
        /** @type {string} */ let replace = '';
        // A correct percent encoded value.
        if (code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].percentSign && (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["asciiAlphanumeric"])(value.charCodeAt(index + 1)) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["asciiAlphanumeric"])(value.charCodeAt(index + 2))) {
            skip = 2;
        } else if (code < 128) {
            if (!/[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(code))) {
                replace = String.fromCharCode(code);
            }
        } else if (code > 55_295 && code < 57_344) {
            const next = value.charCodeAt(index + 1);
            // A correct surrogate pair.
            if (code < 56_320 && next > 56_319 && next < 57_344) {
                replace = String.fromCharCode(code, next);
                skip = 1;
            } else {
                replace = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$values$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["values"].replacementCharacter;
            }
        } else {
            replace = String.fromCharCode(code);
        }
        if (replace) {
            result.push(value.slice(start, index), encodeURIComponent(replace));
            start = index + skip + 1;
            replace = '';
        }
        if (skip) {
            index += skip;
            skip = 0;
        }
    }
    return result.join('') + value.slice(start);
}
}),
"[project]/cafekit-web/node_modules/micromark-factory-space/dev/index.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "factorySpace",
    ()=>factorySpace
]);
/**
 * @import {Effects, State, TokenType} from 'micromark-util-types'
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/micromark-util-character/dev/index.js [app-rsc] (ecmascript)");
;
function factorySpace(effects, ok, type, max) {
    const limit = max ? max - 1 : Number.POSITIVE_INFINITY;
    let size = 0;
    return start;
    //TURBOPACK unreachable
    ;
    /** @type {State} */ function start(code) {
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["markdownSpace"])(code)) {
            effects.enter(type);
            return prefix(code);
        }
        return ok(code);
    }
    /** @type {State} */ function prefix(code) {
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["markdownSpace"])(code) && size++ < limit) {
            effects.consume(code);
            return prefix;
        }
        effects.exit(type);
        return ok(code);
    }
}
}),
"[project]/cafekit-web/node_modules/micromark-core-commonmark/dev/lib/blank-line.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "blankLine",
    ()=>blankLine
]);
/**
 * @import {
 *   Construct,
 *   State,
 *   TokenizeContext,
 *   Tokenizer
 * } from 'micromark-util-types'
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$factory$2d$space$2f$dev$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/micromark-factory-space/dev/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/micromark-util-character/dev/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/micromark-util-symbol/lib/codes.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/micromark-util-symbol/lib/types.js [app-rsc] (ecmascript)");
;
;
;
const blankLine = {
    partial: true,
    tokenize: tokenizeBlankLine
};
/**
 * @this {TokenizeContext}
 *   Context.
 * @type {Tokenizer}
 */ function tokenizeBlankLine(effects, ok, nok) {
    return start;
    //TURBOPACK unreachable
    ;
    /**
   * Start of blank line.
   *
   * > 👉 **Note**: `␠` represents a space character.
   *
   * ```markdown
   * > | ␠␠␊
   *     ^
   * > | ␊
   *     ^
   * ```
   *
   * @type {State}
   */ function start(code) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["markdownSpace"])(code) ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$factory$2d$space$2f$dev$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["factorySpace"])(effects, after, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["types"].linePrefix)(code) : after(code);
    }
    /**
   * At eof/eol, after optional whitespace.
   *
   * > 👉 **Note**: `␠` represents a space character.
   *
   * ```markdown
   * > | ␠␠␊
   *       ^
   * > | ␊
   *     ^
   * ```
   *
   * @type {State}
   */ function after(code) {
        return code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].eof || (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["markdownLineEnding"])(code) ? ok(code) : nok(code);
    }
}
}),
"[project]/cafekit-web/node_modules/micromark-extension-gfm-footnote/dev/lib/syntax.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "gfmFootnote",
    ()=>gfmFootnote
]);
/**
 * @import {Event, Exiter, Extension, Resolver, State, Token, TokenizeContext, Tokenizer} from 'micromark-util-types'
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/devlop/lib/development.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$blank$2d$line$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/micromark-core-commonmark/dev/lib/blank-line.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$factory$2d$space$2f$dev$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/micromark-factory-space/dev/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/micromark-util-character/dev/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$normalize$2d$identifier$2f$dev$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/micromark-util-normalize-identifier/dev/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/micromark-util-symbol/lib/codes.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/micromark-util-symbol/lib/constants.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/micromark-util-symbol/lib/types.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
const indent = {
    tokenize: tokenizeIndent,
    partial: true
};
function gfmFootnote() {
    /** @type {Extension} */ return {
        document: {
            [__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].leftSquareBracket]: {
                name: 'gfmFootnoteDefinition',
                tokenize: tokenizeDefinitionStart,
                continuation: {
                    tokenize: tokenizeDefinitionContinuation
                },
                exit: gfmFootnoteDefinitionEnd
            }
        },
        text: {
            [__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].leftSquareBracket]: {
                name: 'gfmFootnoteCall',
                tokenize: tokenizeGfmFootnoteCall
            },
            [__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].rightSquareBracket]: {
                name: 'gfmPotentialFootnoteCall',
                add: 'after',
                tokenize: tokenizePotentialGfmFootnoteCall,
                resolveTo: resolveToPotentialGfmFootnoteCall
            }
        }
    };
}
// To do: remove after micromark update.
/**
 * @this {TokenizeContext}
 * @type {Tokenizer}
 */ function tokenizePotentialGfmFootnoteCall(effects, ok, nok) {
    const self = this;
    let index = self.events.length;
    const defined = self.parser.gfmFootnotes || (self.parser.gfmFootnotes = []);
    /** @type {Token} */ let labelStart;
    // Find an opening.
    while(index--){
        const token = self.events[index][1];
        if (token.type === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["types"].labelImage) {
            labelStart = token;
            break;
        }
        // Exit if we’ve walked far enough.
        if (token.type === 'gfmFootnoteCall' || token.type === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["types"].labelLink || token.type === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["types"].label || token.type === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["types"].image || token.type === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["types"].link) {
            break;
        }
    }
    return start;
    //TURBOPACK unreachable
    ;
    /**
   * @type {State}
   */ function start(code) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ok"])(code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].rightSquareBracket, 'expected `]`');
        if (!labelStart || !labelStart._balanced) {
            return nok(code);
        }
        const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$normalize$2d$identifier$2f$dev$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["normalizeIdentifier"])(self.sliceSerialize({
            start: labelStart.end,
            end: self.now()
        }));
        if (id.codePointAt(0) !== __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].caret || !defined.includes(id.slice(1))) {
            return nok(code);
        }
        effects.enter('gfmFootnoteCallLabelMarker');
        effects.consume(code);
        effects.exit('gfmFootnoteCallLabelMarker');
        return ok(code);
    }
}
// To do: remove after micromark update.
/** @type {Resolver} */ function resolveToPotentialGfmFootnoteCall(events, context) {
    let index = events.length;
    /** @type {Token | undefined} */ let labelStart;
    // Find an opening.
    while(index--){
        if (events[index][1].type === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["types"].labelImage && events[index][0] === 'enter') {
            labelStart = events[index][1];
            break;
        }
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ok"])(labelStart, 'expected `labelStart` to resolve');
    // Change the `labelImageMarker` to a `data`.
    events[index + 1][1].type = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["types"].data;
    events[index + 3][1].type = 'gfmFootnoteCallLabelMarker';
    // The whole (without `!`):
    /** @type {Token} */ const call = {
        type: 'gfmFootnoteCall',
        start: Object.assign({}, events[index + 3][1].start),
        end: Object.assign({}, events[events.length - 1][1].end)
    };
    // The `^` marker
    /** @type {Token} */ const marker = {
        type: 'gfmFootnoteCallMarker',
        start: Object.assign({}, events[index + 3][1].end),
        end: Object.assign({}, events[index + 3][1].end)
    };
    // Increment the end 1 character.
    marker.end.column++;
    marker.end.offset++;
    marker.end._bufferIndex++;
    /** @type {Token} */ const string = {
        type: 'gfmFootnoteCallString',
        start: Object.assign({}, marker.end),
        end: Object.assign({}, events[events.length - 1][1].start)
    };
    /** @type {Token} */ const chunk = {
        type: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["types"].chunkString,
        contentType: 'string',
        start: Object.assign({}, string.start),
        end: Object.assign({}, string.end)
    };
    /** @type {Array<Event>} */ const replacement = [
        // Take the `labelImageMarker` (now `data`, the `!`)
        events[index + 1],
        events[index + 2],
        [
            'enter',
            call,
            context
        ],
        // The `[`
        events[index + 3],
        events[index + 4],
        // The `^`.
        [
            'enter',
            marker,
            context
        ],
        [
            'exit',
            marker,
            context
        ],
        // Everything in between.
        [
            'enter',
            string,
            context
        ],
        [
            'enter',
            chunk,
            context
        ],
        [
            'exit',
            chunk,
            context
        ],
        [
            'exit',
            string,
            context
        ],
        // The ending (`]`, properly parsed and labelled).
        events[events.length - 2],
        events[events.length - 1],
        [
            'exit',
            call,
            context
        ]
    ];
    events.splice(index, events.length - index + 1, ...replacement);
    return events;
}
/**
 * @this {TokenizeContext}
 * @type {Tokenizer}
 */ function tokenizeGfmFootnoteCall(effects, ok, nok) {
    const self = this;
    const defined = self.parser.gfmFootnotes || (self.parser.gfmFootnotes = []);
    let size = 0;
    /** @type {boolean} */ let data;
    // Note: the implementation of `markdown-rs` is different, because it houses
    // core *and* extensions in one project.
    // Therefore, it can include footnote logic inside `label-end`.
    // We can’t do that, but luckily, we can parse footnotes in a simpler way than
    // needed for labels.
    return start;
    //TURBOPACK unreachable
    ;
    /**
   * Start of footnote label.
   *
   * ```markdown
   * > | a [^b] c
   *       ^
   * ```
   *
   * @type {State}
   */ function start(code) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ok"])(code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].leftSquareBracket, 'expected `[`');
        effects.enter('gfmFootnoteCall');
        effects.enter('gfmFootnoteCallLabelMarker');
        effects.consume(code);
        effects.exit('gfmFootnoteCallLabelMarker');
        return callStart;
    }
    /**
   * After `[`, at `^`.
   *
   * ```markdown
   * > | a [^b] c
   *        ^
   * ```
   *
   * @type {State}
   */ function callStart(code) {
        if (code !== __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].caret) return nok(code);
        effects.enter('gfmFootnoteCallMarker');
        effects.consume(code);
        effects.exit('gfmFootnoteCallMarker');
        effects.enter('gfmFootnoteCallString');
        effects.enter('chunkString').contentType = 'string';
        return callData;
    }
    /**
   * In label.
   *
   * ```markdown
   * > | a [^b] c
   *         ^
   * ```
   *
   * @type {State}
   */ function callData(code) {
        if (// Too long.
        size > __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["constants"].linkReferenceSizeMax || code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].rightSquareBracket && !data || // Space or tab is not supported by GFM for some reason.
        // `\n` and `[` not being supported makes sense.
        code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].eof || code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].leftSquareBracket || (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["markdownLineEndingOrSpace"])(code)) {
            return nok(code);
        }
        if (code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].rightSquareBracket) {
            effects.exit('chunkString');
            const token = effects.exit('gfmFootnoteCallString');
            if (!defined.includes((0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$normalize$2d$identifier$2f$dev$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["normalizeIdentifier"])(self.sliceSerialize(token)))) {
                return nok(code);
            }
            effects.enter('gfmFootnoteCallLabelMarker');
            effects.consume(code);
            effects.exit('gfmFootnoteCallLabelMarker');
            effects.exit('gfmFootnoteCall');
            return ok;
        }
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["markdownLineEndingOrSpace"])(code)) {
            data = true;
        }
        size++;
        effects.consume(code);
        return code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].backslash ? callEscape : callData;
    }
    /**
   * On character after escape.
   *
   * ```markdown
   * > | a [^b\c] d
   *           ^
   * ```
   *
   * @type {State}
   */ function callEscape(code) {
        if (code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].leftSquareBracket || code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].backslash || code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].rightSquareBracket) {
            effects.consume(code);
            size++;
            return callData;
        }
        return callData(code);
    }
}
/**
 * @this {TokenizeContext}
 * @type {Tokenizer}
 */ function tokenizeDefinitionStart(effects, ok, nok) {
    const self = this;
    const defined = self.parser.gfmFootnotes || (self.parser.gfmFootnotes = []);
    /** @type {string} */ let identifier;
    let size = 0;
    /** @type {boolean | undefined} */ let data;
    return start;
    //TURBOPACK unreachable
    ;
    /**
   * Start of GFM footnote definition.
   *
   * ```markdown
   * > | [^a]: b
   *     ^
   * ```
   *
   * @type {State}
   */ function start(code) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ok"])(code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].leftSquareBracket, 'expected `[`');
        effects.enter('gfmFootnoteDefinition')._container = true;
        effects.enter('gfmFootnoteDefinitionLabel');
        effects.enter('gfmFootnoteDefinitionLabelMarker');
        effects.consume(code);
        effects.exit('gfmFootnoteDefinitionLabelMarker');
        return labelAtMarker;
    }
    /**
   * In label, at caret.
   *
   * ```markdown
   * > | [^a]: b
   *      ^
   * ```
   *
   * @type {State}
   */ function labelAtMarker(code) {
        if (code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].caret) {
            effects.enter('gfmFootnoteDefinitionMarker');
            effects.consume(code);
            effects.exit('gfmFootnoteDefinitionMarker');
            effects.enter('gfmFootnoteDefinitionLabelString');
            effects.enter('chunkString').contentType = 'string';
            return labelInside;
        }
        return nok(code);
    }
    /**
   * In label.
   *
   * > 👉 **Note**: `cmark-gfm` prevents whitespace from occurring in footnote
   * > definition labels.
   *
   * ```markdown
   * > | [^a]: b
   *       ^
   * ```
   *
   * @type {State}
   */ function labelInside(code) {
        if (// Too long.
        size > __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["constants"].linkReferenceSizeMax || code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].rightSquareBracket && !data || // Space or tab is not supported by GFM for some reason.
        // `\n` and `[` not being supported makes sense.
        code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].eof || code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].leftSquareBracket || (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["markdownLineEndingOrSpace"])(code)) {
            return nok(code);
        }
        if (code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].rightSquareBracket) {
            effects.exit('chunkString');
            const token = effects.exit('gfmFootnoteDefinitionLabelString');
            identifier = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$normalize$2d$identifier$2f$dev$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["normalizeIdentifier"])(self.sliceSerialize(token));
            effects.enter('gfmFootnoteDefinitionLabelMarker');
            effects.consume(code);
            effects.exit('gfmFootnoteDefinitionLabelMarker');
            effects.exit('gfmFootnoteDefinitionLabel');
            return labelAfter;
        }
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["markdownLineEndingOrSpace"])(code)) {
            data = true;
        }
        size++;
        effects.consume(code);
        return code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].backslash ? labelEscape : labelInside;
    }
    /**
   * After `\`, at a special character.
   *
   * > 👉 **Note**: `cmark-gfm` currently does not support escaped brackets:
   * > <https://github.com/github/cmark-gfm/issues/240>
   *
   * ```markdown
   * > | [^a\*b]: c
   *         ^
   * ```
   *
   * @type {State}
   */ function labelEscape(code) {
        if (code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].leftSquareBracket || code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].backslash || code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].rightSquareBracket) {
            effects.consume(code);
            size++;
            return labelInside;
        }
        return labelInside(code);
    }
    /**
   * After definition label.
   *
   * ```markdown
   * > | [^a]: b
   *         ^
   * ```
   *
   * @type {State}
   */ function labelAfter(code) {
        if (code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].colon) {
            effects.enter('definitionMarker');
            effects.consume(code);
            effects.exit('definitionMarker');
            if (!defined.includes(identifier)) {
                defined.push(identifier);
            }
            // Any whitespace after the marker is eaten, forming indented code
            // is not possible.
            // No space is also fine, just like a block quote marker.
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$factory$2d$space$2f$dev$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["factorySpace"])(effects, whitespaceAfter, 'gfmFootnoteDefinitionWhitespace');
        }
        return nok(code);
    }
    /**
   * After definition prefix.
   *
   * ```markdown
   * > | [^a]: b
   *           ^
   * ```
   *
   * @type {State}
   */ function whitespaceAfter(code) {
        // `markdown-rs` has a wrapping token for the prefix that is closed here.
        return ok(code);
    }
}
/**
 * @this {TokenizeContext}
 * @type {Tokenizer}
 */ function tokenizeDefinitionContinuation(effects, ok, nok) {
    /// Start of footnote definition continuation.
    ///
    /// ```markdown
    ///   | [^a]: b
    /// > |     c
    ///     ^
    /// ```
    //
    // Either a blank line, which is okay, or an indented thing.
    return effects.check(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$blank$2d$line$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["blankLine"], ok, effects.attempt(indent, ok, nok));
}
/** @type {Exiter} */ function gfmFootnoteDefinitionEnd(effects) {
    effects.exit('gfmFootnoteDefinition');
}
/**
 * @this {TokenizeContext}
 * @type {Tokenizer}
 */ function tokenizeIndent(effects, ok, nok) {
    const self = this;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$factory$2d$space$2f$dev$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["factorySpace"])(effects, afterPrefix, 'gfmFootnoteDefinitionIndent', __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["constants"].tabSize + 1);
    //TURBOPACK unreachable
    ;
    /**
   * @type {State}
   */ function afterPrefix(code) {
        const tail = self.events[self.events.length - 1];
        return tail && tail[1].type === 'gfmFootnoteDefinitionIndent' && tail[2].sliceSerialize(tail[1], true).length === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["constants"].tabSize ? ok(code) : nok(code);
    }
}
}),
"[project]/cafekit-web/node_modules/micromark-extension-gfm-footnote/dev/lib/html.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "defaultBackLabel",
    ()=>defaultBackLabel,
    "gfmFootnoteHtml",
    ()=>gfmFootnoteHtml
]);
/**
 * @import {HtmlOptions as Options} from 'micromark-extension-gfm-footnote'
 * @import {HtmlExtension} from 'micromark-util-types'
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/devlop/lib/development.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$normalize$2d$identifier$2f$dev$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/micromark-util-normalize-identifier/dev/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$sanitize$2d$uri$2f$dev$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/micromark-util-sanitize-uri/dev/index.js [app-rsc] (ecmascript)");
;
;
;
const own = {}.hasOwnProperty;
/** @type {Options} */ const emptyOptions = {};
function defaultBackLabel(referenceIndex, rereferenceIndex) {
    return 'Back to reference ' + (referenceIndex + 1) + (rereferenceIndex > 1 ? '-' + rereferenceIndex : '');
}
function gfmFootnoteHtml(options) {
    const config = options || emptyOptions;
    const label = config.label || 'Footnotes';
    const labelTagName = config.labelTagName || 'h2';
    const labelAttributes = config.labelAttributes === null || config.labelAttributes === undefined ? 'class="sr-only"' : config.labelAttributes;
    const backLabel = config.backLabel || defaultBackLabel;
    const clobberPrefix = config.clobberPrefix === null || config.clobberPrefix === undefined ? 'user-content-' : config.clobberPrefix;
    return {
        enter: {
            gfmFootnoteDefinition () {
                const stack = this.getData('tightStack');
                stack.push(false);
            },
            gfmFootnoteDefinitionLabelString () {
                this.buffer();
            },
            gfmFootnoteCallString () {
                this.buffer();
            }
        },
        exit: {
            gfmFootnoteDefinition () {
                let definitions = this.getData('gfmFootnoteDefinitions');
                const footnoteStack = this.getData('gfmFootnoteDefinitionStack');
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ok"])(footnoteStack, 'expected `footnoteStack`');
                const tightStack = this.getData('tightStack');
                const current = footnoteStack.pop();
                const value = this.resume();
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ok"])(current, 'expected to be in a footnote');
                if (!definitions) {
                    this.setData('gfmFootnoteDefinitions', definitions = {});
                }
                if (!own.call(definitions, current)) definitions[current] = value;
                tightStack.pop();
                this.setData('slurpOneLineEnding', true);
                // “Hack” to prevent a line ending from showing up if we’re in a definition in
                // an empty list item.
                this.setData('lastWasTag');
            },
            gfmFootnoteDefinitionLabelString (token) {
                let footnoteStack = this.getData('gfmFootnoteDefinitionStack');
                if (!footnoteStack) {
                    this.setData('gfmFootnoteDefinitionStack', footnoteStack = []);
                }
                footnoteStack.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$normalize$2d$identifier$2f$dev$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["normalizeIdentifier"])(this.sliceSerialize(token)));
                this.resume(); // Drop the label.
                this.buffer(); // Get ready for a value.
            },
            gfmFootnoteCallString (token) {
                let calls = this.getData('gfmFootnoteCallOrder');
                let counts = this.getData('gfmFootnoteCallCounts');
                const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$normalize$2d$identifier$2f$dev$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["normalizeIdentifier"])(this.sliceSerialize(token));
                /** @type {number} */ let counter;
                this.resume();
                if (!calls) this.setData('gfmFootnoteCallOrder', calls = []);
                if (!counts) this.setData('gfmFootnoteCallCounts', counts = {});
                const index = calls.indexOf(id);
                const safeId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$sanitize$2d$uri$2f$dev$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sanitizeUri"])(id.toLowerCase());
                if (index === -1) {
                    calls.push(id);
                    counts[id] = 1;
                    counter = calls.length;
                } else {
                    counts[id]++;
                    counter = index + 1;
                }
                const reuseCounter = counts[id];
                this.tag('<sup><a href="#' + clobberPrefix + 'fn-' + safeId + '" id="' + clobberPrefix + 'fnref-' + safeId + (reuseCounter > 1 ? '-' + reuseCounter : '') + '" data-footnote-ref="" aria-describedby="footnote-label">' + String(counter) + '</a></sup>');
            },
            null () {
                const calls = this.getData('gfmFootnoteCallOrder') || [];
                const counts = this.getData('gfmFootnoteCallCounts') || {};
                const definitions = this.getData('gfmFootnoteDefinitions') || {};
                let index = -1;
                if (calls.length > 0) {
                    this.lineEndingIfNeeded();
                    this.tag('<section data-footnotes="" class="footnotes"><' + labelTagName + ' id="footnote-label"' + (labelAttributes ? ' ' + labelAttributes : '') + '>');
                    this.raw(this.encode(label));
                    this.tag('</' + labelTagName + '>');
                    this.lineEndingIfNeeded();
                    this.tag('<ol>');
                }
                while(++index < calls.length){
                    // Called definitions are always defined.
                    const id = calls[index];
                    const safeId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$sanitize$2d$uri$2f$dev$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sanitizeUri"])(id.toLowerCase());
                    let referenceIndex = 0;
                    /** @type {Array<string>} */ const references = [];
                    while(++referenceIndex <= counts[id]){
                        references.push('<a href="#' + clobberPrefix + 'fnref-' + safeId + (referenceIndex > 1 ? '-' + referenceIndex : '') + '" data-footnote-backref="" aria-label="' + this.encode(typeof backLabel === 'string' ? backLabel : backLabel(index, referenceIndex)) + '" class="data-footnote-backref">↩' + (referenceIndex > 1 ? '<sup>' + referenceIndex + '</sup>' : '') + '</a>');
                    }
                    const reference = references.join(' ');
                    let injected = false;
                    this.lineEndingIfNeeded();
                    this.tag('<li id="' + clobberPrefix + 'fn-' + safeId + '">');
                    this.lineEndingIfNeeded();
                    this.tag(definitions[id].replace(/<\/p>(?:\r?\n|\r)?$/, function($0) {
                        injected = true;
                        return ' ' + reference + $0;
                    }));
                    if (!injected) {
                        this.lineEndingIfNeeded();
                        this.tag(reference);
                    }
                    this.lineEndingIfNeeded();
                    this.tag('</li>');
                }
                if (calls.length > 0) {
                    this.lineEndingIfNeeded();
                    this.tag('</ol>');
                    this.lineEndingIfNeeded();
                    this.tag('</section>');
                }
            }
        }
    };
}
}),
"[project]/cafekit-web/node_modules/micromark-util-resolve-all/index.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @import {Event, Resolver, TokenizeContext} from 'micromark-util-types'
 */ /**
 * Call all `resolveAll`s.
 *
 * @param {ReadonlyArray<{resolveAll?: Resolver | undefined}>} constructs
 *   List of constructs, optionally with `resolveAll`s.
 * @param {Array<Event>} events
 *   List of events.
 * @param {TokenizeContext} context
 *   Context used by `tokenize`.
 * @returns {Array<Event>}
 *   Changed events.
 */ __turbopack_context__.s([
    "resolveAll",
    ()=>resolveAll
]);
function resolveAll(constructs, events, context) {
    /** @type {Array<Resolver>} */ const called = [];
    let index = -1;
    while(++index < constructs.length){
        const resolve = constructs[index].resolveAll;
        if (resolve && !called.includes(resolve)) {
            events = resolve(events, context);
            called.push(resolve);
        }
    }
    return events;
}
}),
"[project]/cafekit-web/node_modules/micromark-extension-gfm-strikethrough/dev/lib/syntax.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "gfmStrikethrough",
    ()=>gfmStrikethrough
]);
/**
 * @import {Options} from 'micromark-extension-gfm-strikethrough'
 * @import {Event, Extension, Resolver, State, Token, TokenizeContext, Tokenizer} from 'micromark-util-types'
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/devlop/lib/development.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$chunked$2f$dev$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/micromark-util-chunked/dev/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$classify$2d$character$2f$dev$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/micromark-util-classify-character/dev/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$resolve$2d$all$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/micromark-util-resolve-all/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/micromark-util-symbol/lib/codes.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/micromark-util-symbol/lib/constants.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/micromark-util-symbol/lib/types.js [app-rsc] (ecmascript)");
;
;
;
;
;
function gfmStrikethrough(options) {
    const options_ = options || {};
    let single = options_.singleTilde;
    const tokenizer = {
        name: 'strikethrough',
        tokenize: tokenizeStrikethrough,
        resolveAll: resolveAllStrikethrough
    };
    if (single === null || single === undefined) {
        single = true;
    }
    return {
        text: {
            [__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].tilde]: tokenizer
        },
        insideSpan: {
            null: [
                tokenizer
            ]
        },
        attentionMarkers: {
            null: [
                __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].tilde
            ]
        }
    };
    //TURBOPACK unreachable
    ;
    /**
   * Take events and resolve strikethrough.
   *
   * @type {Resolver}
   */ function resolveAllStrikethrough(events, context) {
        let index = -1;
        // Walk through all events.
        while(++index < events.length){
            // Find a token that can close.
            if (events[index][0] === 'enter' && events[index][1].type === 'strikethroughSequenceTemporary' && events[index][1]._close) {
                let open = index;
                // Now walk back to find an opener.
                while(open--){
                    // Find a token that can open the closer.
                    if (events[open][0] === 'exit' && events[open][1].type === 'strikethroughSequenceTemporary' && events[open][1]._open && // If the sizes are the same:
                    events[index][1].end.offset - events[index][1].start.offset === events[open][1].end.offset - events[open][1].start.offset) {
                        events[index][1].type = 'strikethroughSequence';
                        events[open][1].type = 'strikethroughSequence';
                        /** @type {Token} */ const strikethrough = {
                            type: 'strikethrough',
                            start: Object.assign({}, events[open][1].start),
                            end: Object.assign({}, events[index][1].end)
                        };
                        /** @type {Token} */ const text = {
                            type: 'strikethroughText',
                            start: Object.assign({}, events[open][1].end),
                            end: Object.assign({}, events[index][1].start)
                        };
                        // Opening.
                        /** @type {Array<Event>} */ const nextEvents = [
                            [
                                'enter',
                                strikethrough,
                                context
                            ],
                            [
                                'enter',
                                events[open][1],
                                context
                            ],
                            [
                                'exit',
                                events[open][1],
                                context
                            ],
                            [
                                'enter',
                                text,
                                context
                            ]
                        ];
                        const insideSpan = context.parser.constructs.insideSpan.null;
                        if (insideSpan) {
                            // Between.
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$chunked$2f$dev$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["splice"])(nextEvents, nextEvents.length, 0, (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$resolve$2d$all$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["resolveAll"])(insideSpan, events.slice(open + 1, index), context));
                        }
                        // Closing.
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$chunked$2f$dev$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["splice"])(nextEvents, nextEvents.length, 0, [
                            [
                                'exit',
                                text,
                                context
                            ],
                            [
                                'enter',
                                events[index][1],
                                context
                            ],
                            [
                                'exit',
                                events[index][1],
                                context
                            ],
                            [
                                'exit',
                                strikethrough,
                                context
                            ]
                        ]);
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$chunked$2f$dev$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["splice"])(events, open - 1, index - open + 3, nextEvents);
                        index = open + nextEvents.length - 2;
                        break;
                    }
                }
            }
        }
        index = -1;
        while(++index < events.length){
            if (events[index][1].type === 'strikethroughSequenceTemporary') {
                events[index][1].type = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["types"].data;
            }
        }
        return events;
    }
    /**
   * @this {TokenizeContext}
   * @type {Tokenizer}
   */ function tokenizeStrikethrough(effects, ok, nok) {
        const previous = this.previous;
        const events = this.events;
        let size = 0;
        return start;
        //TURBOPACK unreachable
        ;
        /** @type {State} */ function start(code) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ok"])(code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].tilde, 'expected `~`');
            if (previous === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].tilde && events[events.length - 1][1].type !== __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["types"].characterEscape) {
                return nok(code);
            }
            effects.enter('strikethroughSequenceTemporary');
            return more(code);
        }
        /** @type {State} */ function more(code) {
            const before = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$classify$2d$character$2f$dev$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["classifyCharacter"])(previous);
            if (code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].tilde) {
                // If this is the third marker, exit.
                if (size > 1) return nok(code);
                effects.consume(code);
                size++;
                return more;
            }
            if (size < 2 && !single) return nok(code);
            const token = effects.exit('strikethroughSequenceTemporary');
            const after = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$classify$2d$character$2f$dev$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["classifyCharacter"])(code);
            token._open = !after || after === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["constants"].attentionSideAfter && Boolean(before);
            token._close = !before || before === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["constants"].attentionSideAfter && Boolean(after);
            return ok(code);
        }
    }
}
}),
"[project]/cafekit-web/node_modules/micromark-extension-gfm-strikethrough/dev/lib/html.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @import {HtmlExtension} from 'micromark-util-types'
 */ /**
 * Create an HTML extension for `micromark` to support GFM strikethrough when
 * serializing to HTML.
 *
 * @returns {HtmlExtension}
 *   Extension for `micromark` that can be passed in `htmlExtensions`, to
 *   support GFM strikethrough when serializing to HTML.
 */ __turbopack_context__.s([
    "gfmStrikethroughHtml",
    ()=>gfmStrikethroughHtml
]);
function gfmStrikethroughHtml() {
    return {
        enter: {
            strikethrough () {
                this.tag('<del>');
            }
        },
        exit: {
            strikethrough () {
                this.tag('</del>');
            }
        }
    };
}
}),
"[project]/cafekit-web/node_modules/micromark-extension-gfm-table/dev/lib/edit-map.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @import {Event} from 'micromark-util-types'
 */ // Port of `edit_map.rs` from `markdown-rs`.
// This should move to `markdown-js` later.
// Deal with several changes in events, batching them together.
//
// Preferably, changes should be kept to a minimum.
// Sometimes, it’s needed to change the list of events, because parsing can be
// messy, and it helps to expose a cleaner interface of events to the compiler
// and other users.
// It can also help to merge many adjacent similar events.
// And, in other cases, it’s needed to parse subcontent: pass some events
// through another tokenizer and inject the result.
/**
 * @typedef {[number, number, Array<Event>]} Change
 * @typedef {[number, number, number]} Jump
 */ /**
 * Tracks a bunch of edits.
 */ __turbopack_context__.s([
    "EditMap",
    ()=>EditMap
]);
class EditMap {
    /**
   * Create a new edit map.
   */ constructor(){
        /**
     * Record of changes.
     *
     * @type {Array<Change>}
     */ this.map = [];
    }
    /**
   * Create an edit: a remove and/or add at a certain place.
   *
   * @param {number} index
   * @param {number} remove
   * @param {Array<Event>} add
   * @returns {undefined}
   */ add(index, remove, add) {
        addImplementation(this, index, remove, add);
    }
    // To do: add this when moving to `micromark`.
    // /**
    //  * Create an edit: but insert `add` before existing additions.
    //  *
    //  * @param {number} index
    //  * @param {number} remove
    //  * @param {Array<Event>} add
    //  * @returns {undefined}
    //  */
    // addBefore(index, remove, add) {
    //   addImplementation(this, index, remove, add, true)
    // }
    /**
   * Done, change the events.
   *
   * @param {Array<Event>} events
   * @returns {undefined}
   */ consume(events) {
        this.map.sort(function(a, b) {
            return a[0] - b[0];
        });
        /* c8 ignore next 3 -- `resolve` is never called without tables, so without edits. */ if (this.map.length === 0) {
            return;
        }
        // To do: if links are added in events, like they are in `markdown-rs`,
        // this is needed.
        // // Calculate jumps: where items in the current list move to.
        // /** @type {Array<Jump>} */
        // const jumps = []
        // let index = 0
        // let addAcc = 0
        // let removeAcc = 0
        // while (index < this.map.length) {
        //   const [at, remove, add] = this.map[index]
        //   removeAcc += remove
        //   addAcc += add.length
        //   jumps.push([at, removeAcc, addAcc])
        //   index += 1
        // }
        //
        // . shiftLinks(events, jumps)
        let index = this.map.length;
        /** @type {Array<Array<Event>>} */ const vecs = [];
        while(index > 0){
            index -= 1;
            vecs.push(events.slice(this.map[index][0] + this.map[index][1]), this.map[index][2]);
            // Truncate rest.
            events.length = this.map[index][0];
        }
        vecs.push(events.slice());
        events.length = 0;
        let slice = vecs.pop();
        while(slice){
            for (const element of slice){
                events.push(element);
            }
            slice = vecs.pop();
        }
        // Truncate everything.
        this.map.length = 0;
    }
}
/**
 * Create an edit.
 *
 * @param {EditMap} editMap
 * @param {number} at
 * @param {number} remove
 * @param {Array<Event>} add
 * @returns {undefined}
 */ function addImplementation(editMap, at, remove, add) {
    let index = 0;
    /* c8 ignore next 3 -- `resolve` is never called without tables, so without edits. */ if (remove === 0 && add.length === 0) {
        return;
    }
    while(index < editMap.map.length){
        if (editMap.map[index][0] === at) {
            editMap.map[index][1] += remove;
            // To do: before not used by tables, use when moving to micromark.
            // if (before) {
            //   add.push(...editMap.map[index][2])
            //   editMap.map[index][2] = add
            // } else {
            editMap.map[index][2].push(...add);
            // }
            return;
        }
        index += 1;
    }
    editMap.map.push([
        at,
        remove,
        add
    ]);
} // /**
 //  * Shift `previous` and `next` links according to `jumps`.
 //  *
 //  * This fixes links in case there are events removed or added between them.
 //  *
 //  * @param {Array<Event>} events
 //  * @param {Array<Jump>} jumps
 //  */
 // function shiftLinks(events, jumps) {
 //   let jumpIndex = 0
 //   let index = 0
 //   let add = 0
 //   let rm = 0
 //   while (index < events.length) {
 //     const rmCurr = rm
 //     while (jumpIndex < jumps.length && jumps[jumpIndex][0] <= index) {
 //       add = jumps[jumpIndex][2]
 //       rm = jumps[jumpIndex][1]
 //       jumpIndex += 1
 //     }
 //     // Ignore items that will be removed.
 //     if (rm > rmCurr) {
 //       index += rm - rmCurr
 //     } else {
 //       // ?
 //       // if let Some(link) = &events[index].link {
 //       //     if let Some(next) = link.next {
 //       //         events[next].link.as_mut().unwrap().previous = Some(index + add - rm);
 //       //         while jumpIndex < jumps.len() && jumps[jumpIndex].0 <= next {
 //       //             add = jumps[jumpIndex].2;
 //       //             rm = jumps[jumpIndex].1;
 //       //             jumpIndex += 1;
 //       //         }
 //       //         events[index].link.as_mut().unwrap().next = Some(next + add - rm);
 //       //         index = next;
 //       //         continue;
 //       //     }
 //       // }
 //       index += 1
 //     }
 //   }
 // }
}),
"[project]/cafekit-web/node_modules/micromark-extension-gfm-table/dev/lib/infer.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "gfmTableAlign",
    ()=>gfmTableAlign
]);
/**
 * @import {Event} from 'micromark-util-types'
 */ /**
 * @typedef {'center' | 'left' | 'none' | 'right'} Align
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/devlop/lib/development.js [app-rsc] (ecmascript)");
;
function gfmTableAlign(events, index) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ok"])(events[index][1].type === 'table', 'expected table');
    let inDelimiterRow = false;
    /** @type {Array<Align>} */ const align = [];
    while(index < events.length){
        const event = events[index];
        if (inDelimiterRow) {
            if (event[0] === 'enter') {
                // Start of alignment value: set a new column.
                // To do: `markdown-rs` uses `tableDelimiterCellValue`.
                if (event[1].type === 'tableContent') {
                    align.push(events[index + 1][1].type === 'tableDelimiterMarker' ? 'left' : 'none');
                }
            } else if (event[1].type === 'tableContent') {
                if (events[index - 1][1].type === 'tableDelimiterMarker') {
                    const alignIndex = align.length - 1;
                    align[alignIndex] = align[alignIndex] === 'left' ? 'center' : 'right';
                }
            } else if (event[1].type === 'tableDelimiterRow') {
                break;
            }
        } else if (event[0] === 'enter' && event[1].type === 'tableDelimiterRow') {
            inDelimiterRow = true;
        }
        index += 1;
    }
    return align;
}
}),
"[project]/cafekit-web/node_modules/micromark-extension-gfm-table/dev/lib/syntax.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "gfmTable",
    ()=>gfmTable
]);
/**
 * @import {Event, Extension, Point, Resolver, State, Token, TokenizeContext, Tokenizer} from 'micromark-util-types'
 */ /**
 * @typedef {[number, number, number, number]} Range
 *   Cell info.
 *
 * @typedef {0 | 1 | 2 | 3} RowKind
 *   Where we are: `1` for head row, `2` for delimiter row, `3` for body row.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/devlop/lib/development.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$factory$2d$space$2f$dev$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/micromark-factory-space/dev/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/micromark-util-character/dev/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/micromark-util-symbol/lib/codes.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/micromark-util-symbol/lib/constants.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/micromark-util-symbol/lib/types.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$extension$2d$gfm$2d$table$2f$dev$2f$lib$2f$edit$2d$map$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/micromark-extension-gfm-table/dev/lib/edit-map.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$extension$2d$gfm$2d$table$2f$dev$2f$lib$2f$infer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/micromark-extension-gfm-table/dev/lib/infer.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
function gfmTable() {
    return {
        flow: {
            null: {
                name: 'table',
                tokenize: tokenizeTable,
                resolveAll: resolveTable
            }
        }
    };
}
/**
 * @this {TokenizeContext}
 * @type {Tokenizer}
 */ function tokenizeTable(effects, ok, nok) {
    const self = this;
    let size = 0;
    let sizeB = 0;
    /** @type {boolean | undefined} */ let seen;
    return start;
    //TURBOPACK unreachable
    ;
    /**
   * Start of a GFM table.
   *
   * If there is a valid table row or table head before, then we try to parse
   * another row.
   * Otherwise, we try to parse a head.
   *
   * ```markdown
   * > | | a |
   *     ^
   *   | | - |
   * > | | b |
   *     ^
   * ```
   * @type {State}
   */ function start(code) {
        let index = self.events.length - 1;
        while(index > -1){
            const type = self.events[index][1].type;
            if (type === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["types"].lineEnding || // Note: markdown-rs uses `whitespace` instead of `linePrefix`
            type === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["types"].linePrefix) index--;
            else break;
        }
        const tail = index > -1 ? self.events[index][1].type : null;
        const next = tail === 'tableHead' || tail === 'tableRow' ? bodyRowStart : headRowBefore;
        // Don’t allow lazy body rows.
        if (next === bodyRowStart && self.parser.lazy[self.now().line]) {
            return nok(code);
        }
        return next(code);
    }
    /**
   * Before table head row.
   *
   * ```markdown
   * > | | a |
   *     ^
   *   | | - |
   *   | | b |
   * ```
   *
   * @type {State}
   */ function headRowBefore(code) {
        effects.enter('tableHead');
        effects.enter('tableRow');
        return headRowStart(code);
    }
    /**
   * Before table head row, after whitespace.
   *
   * ```markdown
   * > | | a |
   *     ^
   *   | | - |
   *   | | b |
   * ```
   *
   * @type {State}
   */ function headRowStart(code) {
        if (code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].verticalBar) {
            return headRowBreak(code);
        }
        // To do: micromark-js should let us parse our own whitespace in extensions,
        // like `markdown-rs`:
        //
        // ```js
        // // 4+ spaces.
        // if (markdownSpace(code)) {
        //   return nok(code)
        // }
        // ```
        seen = true;
        // Count the first character, that isn’t a pipe, double.
        sizeB += 1;
        return headRowBreak(code);
    }
    /**
   * At break in table head row.
   *
   * ```markdown
   * > | | a |
   *     ^
   *       ^
   *         ^
   *   | | - |
   *   | | b |
   * ```
   *
   * @type {State}
   */ function headRowBreak(code) {
        if (code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].eof) {
            // Note: in `markdown-rs`, we need to reset, in `micromark-js` we don‘t.
            return nok(code);
        }
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["markdownLineEnding"])(code)) {
            // If anything other than one pipe (ignoring whitespace) was used, it’s fine.
            if (sizeB > 1) {
                sizeB = 0;
                // To do: check if this works.
                // Feel free to interrupt:
                self.interrupt = true;
                effects.exit('tableRow');
                effects.enter(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["types"].lineEnding);
                effects.consume(code);
                effects.exit(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["types"].lineEnding);
                return headDelimiterStart;
            }
            // Note: in `markdown-rs`, we need to reset, in `micromark-js` we don‘t.
            return nok(code);
        }
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["markdownSpace"])(code)) {
            // To do: check if this is fine.
            // effects.attempt(State::Next(StateName::GfmTableHeadRowBreak), State::Nok)
            // State::Retry(space_or_tab(tokenizer))
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$factory$2d$space$2f$dev$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["factorySpace"])(effects, headRowBreak, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["types"].whitespace)(code);
        }
        sizeB += 1;
        if (seen) {
            seen = false;
            // Header cell count.
            size += 1;
        }
        if (code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].verticalBar) {
            effects.enter('tableCellDivider');
            effects.consume(code);
            effects.exit('tableCellDivider');
            // Whether a delimiter was seen.
            seen = true;
            return headRowBreak;
        }
        // Anything else is cell data.
        effects.enter(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["types"].data);
        return headRowData(code);
    }
    /**
   * In table head row data.
   *
   * ```markdown
   * > | | a |
   *       ^
   *   | | - |
   *   | | b |
   * ```
   *
   * @type {State}
   */ function headRowData(code) {
        if (code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].eof || code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].verticalBar || (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["markdownLineEndingOrSpace"])(code)) {
            effects.exit(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["types"].data);
            return headRowBreak(code);
        }
        effects.consume(code);
        return code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].backslash ? headRowEscape : headRowData;
    }
    /**
   * In table head row escape.
   *
   * ```markdown
   * > | | a\-b |
   *         ^
   *   | | ---- |
   *   | | c    |
   * ```
   *
   * @type {State}
   */ function headRowEscape(code) {
        if (code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].backslash || code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].verticalBar) {
            effects.consume(code);
            return headRowData;
        }
        return headRowData(code);
    }
    /**
   * Before delimiter row.
   *
   * ```markdown
   *   | | a |
   * > | | - |
   *     ^
   *   | | b |
   * ```
   *
   * @type {State}
   */ function headDelimiterStart(code) {
        // Reset `interrupt`.
        self.interrupt = false;
        // Note: in `markdown-rs`, we need to handle piercing here too.
        if (self.parser.lazy[self.now().line]) {
            return nok(code);
        }
        effects.enter('tableDelimiterRow');
        // Track if we’ve seen a `:` or `|`.
        seen = false;
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["markdownSpace"])(code)) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ok"])(self.parser.constructs.disable.null, 'expected `disabled.null`');
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$factory$2d$space$2f$dev$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["factorySpace"])(effects, headDelimiterBefore, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["types"].linePrefix, self.parser.constructs.disable.null.includes('codeIndented') ? undefined : __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["constants"].tabSize)(code);
        }
        return headDelimiterBefore(code);
    }
    /**
   * Before delimiter row, after optional whitespace.
   *
   * Reused when a `|` is found later, to parse another cell.
   *
   * ```markdown
   *   | | a |
   * > | | - |
   *     ^
   *   | | b |
   * ```
   *
   * @type {State}
   */ function headDelimiterBefore(code) {
        if (code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].dash || code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].colon) {
            return headDelimiterValueBefore(code);
        }
        if (code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].verticalBar) {
            seen = true;
            // If we start with a pipe, we open a cell marker.
            effects.enter('tableCellDivider');
            effects.consume(code);
            effects.exit('tableCellDivider');
            return headDelimiterCellBefore;
        }
        // More whitespace / empty row not allowed at start.
        return headDelimiterNok(code);
    }
    /**
   * After `|`, before delimiter cell.
   *
   * ```markdown
   *   | | a |
   * > | | - |
   *      ^
   * ```
   *
   * @type {State}
   */ function headDelimiterCellBefore(code) {
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["markdownSpace"])(code)) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$factory$2d$space$2f$dev$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["factorySpace"])(effects, headDelimiterValueBefore, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["types"].whitespace)(code);
        }
        return headDelimiterValueBefore(code);
    }
    /**
   * Before delimiter cell value.
   *
   * ```markdown
   *   | | a |
   * > | | - |
   *       ^
   * ```
   *
   * @type {State}
   */ function headDelimiterValueBefore(code) {
        // Align: left.
        if (code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].colon) {
            sizeB += 1;
            seen = true;
            effects.enter('tableDelimiterMarker');
            effects.consume(code);
            effects.exit('tableDelimiterMarker');
            return headDelimiterLeftAlignmentAfter;
        }
        // Align: none.
        if (code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].dash) {
            sizeB += 1;
            // To do: seems weird that this *isn’t* left aligned, but that state is used?
            return headDelimiterLeftAlignmentAfter(code);
        }
        if (code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].eof || (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["markdownLineEnding"])(code)) {
            return headDelimiterCellAfter(code);
        }
        return headDelimiterNok(code);
    }
    /**
   * After delimiter cell left alignment marker.
   *
   * ```markdown
   *   | | a  |
   * > | | :- |
   *        ^
   * ```
   *
   * @type {State}
   */ function headDelimiterLeftAlignmentAfter(code) {
        if (code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].dash) {
            effects.enter('tableDelimiterFiller');
            return headDelimiterFiller(code);
        }
        // Anything else is not ok after the left-align colon.
        return headDelimiterNok(code);
    }
    /**
   * In delimiter cell filler.
   *
   * ```markdown
   *   | | a |
   * > | | - |
   *       ^
   * ```
   *
   * @type {State}
   */ function headDelimiterFiller(code) {
        if (code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].dash) {
            effects.consume(code);
            return headDelimiterFiller;
        }
        // Align is `center` if it was `left`, `right` otherwise.
        if (code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].colon) {
            seen = true;
            effects.exit('tableDelimiterFiller');
            effects.enter('tableDelimiterMarker');
            effects.consume(code);
            effects.exit('tableDelimiterMarker');
            return headDelimiterRightAlignmentAfter;
        }
        effects.exit('tableDelimiterFiller');
        return headDelimiterRightAlignmentAfter(code);
    }
    /**
   * After delimiter cell right alignment marker.
   *
   * ```markdown
   *   | |  a |
   * > | | -: |
   *         ^
   * ```
   *
   * @type {State}
   */ function headDelimiterRightAlignmentAfter(code) {
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["markdownSpace"])(code)) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$factory$2d$space$2f$dev$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["factorySpace"])(effects, headDelimiterCellAfter, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["types"].whitespace)(code);
        }
        return headDelimiterCellAfter(code);
    }
    /**
   * After delimiter cell.
   *
   * ```markdown
   *   | |  a |
   * > | | -: |
   *          ^
   * ```
   *
   * @type {State}
   */ function headDelimiterCellAfter(code) {
        if (code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].verticalBar) {
            return headDelimiterBefore(code);
        }
        if (code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].eof || (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["markdownLineEnding"])(code)) {
            // Exit when:
            // * there was no `:` or `|` at all (it’s a thematic break or setext
            //   underline instead)
            // * the header cell count is not the delimiter cell count
            if (!seen || size !== sizeB) {
                return headDelimiterNok(code);
            }
            // Note: in markdown-rs`, a reset is needed here.
            effects.exit('tableDelimiterRow');
            effects.exit('tableHead');
            // To do: in `markdown-rs`, resolvers need to be registered manually.
            // effects.register_resolver(ResolveName::GfmTable)
            return ok(code);
        }
        return headDelimiterNok(code);
    }
    /**
   * In delimiter row, at a disallowed byte.
   *
   * ```markdown
   *   | | a |
   * > | | x |
   *       ^
   * ```
   *
   * @type {State}
   */ function headDelimiterNok(code) {
        // Note: in `markdown-rs`, we need to reset, in `micromark-js` we don‘t.
        return nok(code);
    }
    /**
   * Before table body row.
   *
   * ```markdown
   *   | | a |
   *   | | - |
   * > | | b |
   *     ^
   * ```
   *
   * @type {State}
   */ function bodyRowStart(code) {
        // Note: in `markdown-rs` we need to manually take care of a prefix,
        // but in `micromark-js` that is done for us, so if we’re here, we’re
        // never at whitespace.
        effects.enter('tableRow');
        return bodyRowBreak(code);
    }
    /**
   * At break in table body row.
   *
   * ```markdown
   *   | | a |
   *   | | - |
   * > | | b |
   *     ^
   *       ^
   *         ^
   * ```
   *
   * @type {State}
   */ function bodyRowBreak(code) {
        if (code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].verticalBar) {
            effects.enter('tableCellDivider');
            effects.consume(code);
            effects.exit('tableCellDivider');
            return bodyRowBreak;
        }
        if (code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].eof || (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["markdownLineEnding"])(code)) {
            effects.exit('tableRow');
            return ok(code);
        }
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["markdownSpace"])(code)) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$factory$2d$space$2f$dev$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["factorySpace"])(effects, bodyRowBreak, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["types"].whitespace)(code);
        }
        // Anything else is cell content.
        effects.enter(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["types"].data);
        return bodyRowData(code);
    }
    /**
   * In table body row data.
   *
   * ```markdown
   *   | | a |
   *   | | - |
   * > | | b |
   *       ^
   * ```
   *
   * @type {State}
   */ function bodyRowData(code) {
        if (code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].eof || code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].verticalBar || (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["markdownLineEndingOrSpace"])(code)) {
            effects.exit(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["types"].data);
            return bodyRowBreak(code);
        }
        effects.consume(code);
        return code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].backslash ? bodyRowEscape : bodyRowData;
    }
    /**
   * In table body row escape.
   *
   * ```markdown
   *   | | a    |
   *   | | ---- |
   * > | | b\-c |
   *         ^
   * ```
   *
   * @type {State}
   */ function bodyRowEscape(code) {
        if (code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].backslash || code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].verticalBar) {
            effects.consume(code);
            return bodyRowData;
        }
        return bodyRowData(code);
    }
}
/** @type {Resolver} */ function resolveTable(events, context) {
    let index = -1;
    let inFirstCellAwaitingPipe = true;
    /** @type {RowKind} */ let rowKind = 0;
    /** @type {Range} */ let lastCell = [
        0,
        0,
        0,
        0
    ];
    /** @type {Range} */ let cell = [
        0,
        0,
        0,
        0
    ];
    let afterHeadAwaitingFirstBodyRow = false;
    let lastTableEnd = 0;
    /** @type {Token | undefined} */ let currentTable;
    /** @type {Token | undefined} */ let currentBody;
    /** @type {Token | undefined} */ let currentCell;
    const map = new __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$extension$2d$gfm$2d$table$2f$dev$2f$lib$2f$edit$2d$map$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["EditMap"]();
    while(++index < events.length){
        const event = events[index];
        const token = event[1];
        if (event[0] === 'enter') {
            // Start of head.
            if (token.type === 'tableHead') {
                afterHeadAwaitingFirstBodyRow = false;
                // Inject previous (body end and) table end.
                if (lastTableEnd !== 0) {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ok"])(currentTable, 'there should be a table opening');
                    flushTableEnd(map, context, lastTableEnd, currentTable, currentBody);
                    currentBody = undefined;
                    lastTableEnd = 0;
                }
                // Inject table start.
                currentTable = {
                    type: 'table',
                    start: Object.assign({}, token.start),
                    // Note: correct end is set later.
                    end: Object.assign({}, token.end)
                };
                map.add(index, 0, [
                    [
                        'enter',
                        currentTable,
                        context
                    ]
                ]);
            } else if (token.type === 'tableRow' || token.type === 'tableDelimiterRow') {
                inFirstCellAwaitingPipe = true;
                currentCell = undefined;
                lastCell = [
                    0,
                    0,
                    0,
                    0
                ];
                cell = [
                    0,
                    index + 1,
                    0,
                    0
                ];
                // Inject table body start.
                if (afterHeadAwaitingFirstBodyRow) {
                    afterHeadAwaitingFirstBodyRow = false;
                    currentBody = {
                        type: 'tableBody',
                        start: Object.assign({}, token.start),
                        // Note: correct end is set later.
                        end: Object.assign({}, token.end)
                    };
                    map.add(index, 0, [
                        [
                            'enter',
                            currentBody,
                            context
                        ]
                    ]);
                }
                rowKind = token.type === 'tableDelimiterRow' ? 2 : currentBody ? 3 : 1;
            } else if (rowKind && (token.type === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["types"].data || token.type === 'tableDelimiterMarker' || token.type === 'tableDelimiterFiller')) {
                inFirstCellAwaitingPipe = false;
                // First value in cell.
                if (cell[2] === 0) {
                    if (lastCell[1] !== 0) {
                        cell[0] = cell[1];
                        currentCell = flushCell(map, context, lastCell, rowKind, undefined, currentCell);
                        lastCell = [
                            0,
                            0,
                            0,
                            0
                        ];
                    }
                    cell[2] = index;
                }
            } else if (token.type === 'tableCellDivider') {
                if (inFirstCellAwaitingPipe) {
                    inFirstCellAwaitingPipe = false;
                } else {
                    if (lastCell[1] !== 0) {
                        cell[0] = cell[1];
                        currentCell = flushCell(map, context, lastCell, rowKind, undefined, currentCell);
                    }
                    lastCell = cell;
                    cell = [
                        lastCell[1],
                        index,
                        0,
                        0
                    ];
                }
            }
        } else if (token.type === 'tableHead') {
            afterHeadAwaitingFirstBodyRow = true;
            lastTableEnd = index;
        } else if (token.type === 'tableRow' || token.type === 'tableDelimiterRow') {
            lastTableEnd = index;
            if (lastCell[1] !== 0) {
                cell[0] = cell[1];
                currentCell = flushCell(map, context, lastCell, rowKind, index, currentCell);
            } else if (cell[1] !== 0) {
                currentCell = flushCell(map, context, cell, rowKind, index, currentCell);
            }
            rowKind = 0;
        } else if (rowKind && (token.type === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["types"].data || token.type === 'tableDelimiterMarker' || token.type === 'tableDelimiterFiller')) {
            cell[3] = index;
        }
    }
    if (lastTableEnd !== 0) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ok"])(currentTable, 'expected table opening');
        flushTableEnd(map, context, lastTableEnd, currentTable, currentBody);
    }
    map.consume(context.events);
    // To do: move this into `html`, when events are exposed there.
    // That’s what `markdown-rs` does.
    // That needs updates to `mdast-util-gfm-table`.
    index = -1;
    while(++index < context.events.length){
        const event = context.events[index];
        if (event[0] === 'enter' && event[1].type === 'table') {
            event[1]._align = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$extension$2d$gfm$2d$table$2f$dev$2f$lib$2f$infer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["gfmTableAlign"])(context.events, index);
        }
    }
    return events;
}
/**
 * Generate a cell.
 *
 * @param {EditMap} map
 * @param {Readonly<TokenizeContext>} context
 * @param {Readonly<Range>} range
 * @param {RowKind} rowKind
 * @param {number | undefined} rowEnd
 * @param {Token | undefined} previousCell
 * @returns {Token | undefined}
 */ // eslint-disable-next-line max-params
function flushCell(map, context, range, rowKind, rowEnd, previousCell) {
    // `markdown-rs` uses:
    // rowKind === 2 ? 'tableDelimiterCell' : 'tableCell'
    const groupName = rowKind === 1 ? 'tableHeader' : rowKind === 2 ? 'tableDelimiter' : 'tableData';
    // `markdown-rs` uses:
    // rowKind === 2 ? 'tableDelimiterCellValue' : 'tableCellText'
    const valueName = 'tableContent';
    // Insert an exit for the previous cell, if there is one.
    //
    // ```markdown
    // > | | aa | bb | cc |
    //          ^-- exit
    //           ^^^^-- this cell
    // ```
    if (range[0] !== 0) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ok"])(previousCell, 'expected previous cell enter');
        previousCell.end = Object.assign({}, getPoint(context.events, range[0]));
        map.add(range[0], 0, [
            [
                'exit',
                previousCell,
                context
            ]
        ]);
    }
    // Insert enter of this cell.
    //
    // ```markdown
    // > | | aa | bb | cc |
    //           ^-- enter
    //           ^^^^-- this cell
    // ```
    const now = getPoint(context.events, range[1]);
    previousCell = {
        type: groupName,
        start: Object.assign({}, now),
        // Note: correct end is set later.
        end: Object.assign({}, now)
    };
    map.add(range[1], 0, [
        [
            'enter',
            previousCell,
            context
        ]
    ]);
    // Insert text start at first data start and end at last data end, and
    // remove events between.
    //
    // ```markdown
    // > | | aa | bb | cc |
    //            ^-- enter
    //             ^-- exit
    //           ^^^^-- this cell
    // ```
    if (range[2] !== 0) {
        const relatedStart = getPoint(context.events, range[2]);
        const relatedEnd = getPoint(context.events, range[3]);
        /** @type {Token} */ const valueToken = {
            type: valueName,
            start: Object.assign({}, relatedStart),
            end: Object.assign({}, relatedEnd)
        };
        map.add(range[2], 0, [
            [
                'enter',
                valueToken,
                context
            ]
        ]);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ok"])(range[3] !== 0);
        if (rowKind !== 2) {
            // Fix positional info on remaining events
            const start = context.events[range[2]];
            const end = context.events[range[3]];
            start[1].end = Object.assign({}, end[1].end);
            start[1].type = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["types"].chunkText;
            start[1].contentType = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["constants"].contentTypeText;
            // Remove if needed.
            if (range[3] > range[2] + 1) {
                const a = range[2] + 1;
                const b = range[3] - range[2] - 1;
                map.add(a, b, []);
            }
        }
        map.add(range[3] + 1, 0, [
            [
                'exit',
                valueToken,
                context
            ]
        ]);
    }
    // Insert an exit for the last cell, if at the row end.
    //
    // ```markdown
    // > | | aa | bb | cc |
    //                    ^-- exit
    //               ^^^^^^-- this cell (the last one contains two “between” parts)
    // ```
    if (rowEnd !== undefined) {
        previousCell.end = Object.assign({}, getPoint(context.events, rowEnd));
        map.add(rowEnd, 0, [
            [
                'exit',
                previousCell,
                context
            ]
        ]);
        previousCell = undefined;
    }
    return previousCell;
}
/**
 * Generate table end (and table body end).
 *
 * @param {Readonly<EditMap>} map
 * @param {Readonly<TokenizeContext>} context
 * @param {number} index
 * @param {Token} table
 * @param {Token | undefined} tableBody
 */ // eslint-disable-next-line max-params
function flushTableEnd(map, context, index, table, tableBody) {
    /** @type {Array<Event>} */ const exits = [];
    const related = getPoint(context.events, index);
    if (tableBody) {
        tableBody.end = Object.assign({}, related);
        exits.push([
            'exit',
            tableBody,
            context
        ]);
    }
    table.end = Object.assign({}, related);
    exits.push([
        'exit',
        table,
        context
    ]);
    map.add(index + 1, 0, exits);
}
/**
 * @param {Readonly<Array<Event>>} events
 * @param {number} index
 * @returns {Readonly<Point>}
 */ function getPoint(events, index) {
    const event = events[index];
    const side = event[0] === 'enter' ? 'start' : 'end';
    return event[1][side];
}
}),
"[project]/cafekit-web/node_modules/micromark-extension-gfm-table/dev/lib/html.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "gfmTableHtml",
    ()=>gfmTableHtml
]);
/**
 * @import {HtmlExtension} from 'micromark-util-types'
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/devlop/lib/development.js [app-rsc] (ecmascript)");
;
const alignment = {
    none: '',
    left: ' align="left"',
    right: ' align="right"',
    center: ' align="center"'
};
function gfmTableHtml() {
    return {
        enter: {
            table (token) {
                const tableAlign = token._align;
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ok"])(tableAlign, 'expected `_align`');
                this.lineEndingIfNeeded();
                this.tag('<table>');
                this.setData('tableAlign', tableAlign);
            },
            tableBody () {
                this.tag('<tbody>');
            },
            tableData () {
                const tableAlign = this.getData('tableAlign');
                const tableColumn = this.getData('tableColumn');
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ok"])(tableAlign, 'expected `tableAlign`');
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ok"])(typeof tableColumn === 'number', 'expected `tableColumn`');
                const align = alignment[tableAlign[tableColumn]];
                if (align === undefined) {
                    // Capture results to ignore them.
                    this.buffer();
                } else {
                    this.lineEndingIfNeeded();
                    this.tag('<td' + align + '>');
                }
            },
            tableHead () {
                this.lineEndingIfNeeded();
                this.tag('<thead>');
            },
            tableHeader () {
                const tableAlign = this.getData('tableAlign');
                const tableColumn = this.getData('tableColumn');
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ok"])(tableAlign, 'expected `tableAlign`');
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ok"])(typeof tableColumn === 'number', 'expected `tableColumn`');
                const align = alignment[tableAlign[tableColumn]];
                this.lineEndingIfNeeded();
                this.tag('<th' + align + '>');
            },
            tableRow () {
                this.setData('tableColumn', 0);
                this.lineEndingIfNeeded();
                this.tag('<tr>');
            }
        },
        exit: {
            // Overwrite the default code text data handler to unescape escaped pipes when
            // they are in tables.
            codeTextData (token) {
                let value = this.sliceSerialize(token);
                if (this.getData('tableAlign')) {
                    value = value.replace(/\\([\\|])/g, replace);
                }
                this.raw(this.encode(value));
            },
            table () {
                this.setData('tableAlign');
                // Note: we don’t set `slurpAllLineEndings` anymore, in delimiter rows,
                // but we do need to reset it to match a funky newline GH generates for
                // list items combined with tables.
                this.setData('slurpAllLineEndings');
                this.lineEndingIfNeeded();
                this.tag('</table>');
            },
            tableBody () {
                this.lineEndingIfNeeded();
                this.tag('</tbody>');
            },
            tableData () {
                const tableAlign = this.getData('tableAlign');
                const tableColumn = this.getData('tableColumn');
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ok"])(tableAlign, 'expected `tableAlign`');
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ok"])(typeof tableColumn === 'number', 'expected `tableColumn`');
                if (tableColumn in tableAlign) {
                    this.tag('</td>');
                    this.setData('tableColumn', tableColumn + 1);
                } else {
                    // Stop capturing.
                    this.resume();
                }
            },
            tableHead () {
                this.lineEndingIfNeeded();
                this.tag('</thead>');
            },
            tableHeader () {
                const tableColumn = this.getData('tableColumn');
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ok"])(typeof tableColumn === 'number', 'expected `tableColumn`');
                this.tag('</th>');
                this.setData('tableColumn', tableColumn + 1);
            },
            tableRow () {
                const tableAlign = this.getData('tableAlign');
                let tableColumn = this.getData('tableColumn');
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ok"])(tableAlign, 'expected `tableAlign`');
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ok"])(typeof tableColumn === 'number', 'expected `tableColumn`');
                while(tableColumn < tableAlign.length){
                    this.lineEndingIfNeeded();
                    this.tag('<td' + alignment[tableAlign[tableColumn]] + '></td>');
                    tableColumn++;
                }
                this.setData('tableColumn', tableColumn);
                this.lineEndingIfNeeded();
                this.tag('</tr>');
            }
        }
    };
}
/**
 * @param {string} $0
 * @param {string} $1
 * @returns {string}
 */ function replace($0, $1) {
    // Pipes work, backslashes don’t (but can’t escape pipes).
    return $1 === '|' ? $1 : $0;
}
}),
"[project]/cafekit-web/node_modules/micromark-extension-gfm-tagfilter/lib/index.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "gfmTagfilterHtml",
    ()=>gfmTagfilterHtml
]);
/**
 * @typedef {import('micromark-util-types').CompileContext} CompileContext
 * @typedef {import('micromark-util-types').HtmlExtension} HtmlExtension
 * @typedef {import('micromark-util-types').Token} Token
 */ // An opening or closing tag start, followed by a case-insensitive specific tag name,
// followed by HTML whitespace, a greater than, or a slash.
const reFlow = /<(\/?)(iframe|noembed|noframes|plaintext|script|style|title|textarea|xmp)(?=[\t\n\f\r />])/gi;
// As HTML (text) parses tags separately (and very strictly), we don’t need to be
// global.
const reText = new RegExp('^' + reFlow.source, 'i');
function gfmTagfilterHtml() {
    return {
        exit: {
            htmlFlowData (token) {
                exitHtmlData.call(this, token, reFlow);
            },
            htmlTextData (token) {
                exitHtmlData.call(this, token, reText);
            }
        }
    };
}
/**
 * @this {CompileContext}
 * @param {Token} token
 * @param {RegExp} filter
 * @returns {undefined}
 */ function exitHtmlData(token, filter) {
    let value = this.sliceSerialize(token);
    if (this.options.allowDangerousHtml) {
        value = value.replace(filter, '&lt;$1$2');
    }
    this.raw(this.encode(value));
}
}),
"[project]/cafekit-web/node_modules/micromark-extension-gfm-task-list-item/dev/lib/syntax.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "gfmTaskListItem",
    ()=>gfmTaskListItem
]);
/**
 * @import {Extension, State, TokenizeContext, Tokenizer} from 'micromark-util-types'
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/devlop/lib/development.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$factory$2d$space$2f$dev$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/micromark-factory-space/dev/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/micromark-util-character/dev/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/micromark-util-symbol/lib/codes.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/micromark-util-symbol/lib/types.js [app-rsc] (ecmascript)");
;
;
;
;
const tasklistCheck = {
    name: 'tasklistCheck',
    tokenize: tokenizeTasklistCheck
};
function gfmTaskListItem() {
    return {
        text: {
            [__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].leftSquareBracket]: tasklistCheck
        }
    };
}
/**
 * @this {TokenizeContext}
 * @type {Tokenizer}
 */ function tokenizeTasklistCheck(effects, ok, nok) {
    const self = this;
    return open;
    //TURBOPACK unreachable
    ;
    /**
   * At start of task list item check.
   *
   * ```markdown
   * > | * [x] y.
   *       ^
   * ```
   *
   * @type {State}
   */ function open(code) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ok"])(code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].leftSquareBracket, 'expected `[`');
        if (// Exit if there’s stuff before.
        self.previous !== __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].eof || // Exit if not in the first content that is the first child of a list
        // item.
        !self._gfmTasklistFirstContentOfListItem) {
            return nok(code);
        }
        effects.enter('taskListCheck');
        effects.enter('taskListCheckMarker');
        effects.consume(code);
        effects.exit('taskListCheckMarker');
        return inside;
    }
    /**
   * In task list item check.
   *
   * ```markdown
   * > | * [x] y.
   *        ^
   * ```
   *
   * @type {State}
   */ function inside(code) {
        // Currently we match how GH works in files.
        // To match how GH works in comments, use `markdownSpace` (`[\t ]`) instead
        // of `markdownLineEndingOrSpace` (`[\t\n\r ]`).
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["markdownLineEndingOrSpace"])(code)) {
            effects.enter('taskListCheckValueUnchecked');
            effects.consume(code);
            effects.exit('taskListCheckValueUnchecked');
            return close;
        }
        if (code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].uppercaseX || code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].lowercaseX) {
            effects.enter('taskListCheckValueChecked');
            effects.consume(code);
            effects.exit('taskListCheckValueChecked');
            return close;
        }
        return nok(code);
    }
    /**
   * At close of task list item check.
   *
   * ```markdown
   * > | * [x] y.
   *         ^
   * ```
   *
   * @type {State}
   */ function close(code) {
        if (code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].rightSquareBracket) {
            effects.enter('taskListCheckMarker');
            effects.consume(code);
            effects.exit('taskListCheckMarker');
            effects.exit('taskListCheck');
            return after;
        }
        return nok(code);
    }
    /**
   * @type {State}
   */ function after(code) {
        // EOL in paragraph means there must be something else after it.
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["markdownLineEnding"])(code)) {
            return ok(code);
        }
        // Space or tab?
        // Check what comes after.
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["markdownSpace"])(code)) {
            return effects.check({
                tokenize: spaceThenNonSpace
            }, ok, nok)(code);
        }
        // EOF, or non-whitespace, both wrong.
        return nok(code);
    }
}
/**
 * @this {TokenizeContext}
 * @type {Tokenizer}
 */ function spaceThenNonSpace(effects, ok, nok) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$factory$2d$space$2f$dev$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["factorySpace"])(effects, after, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["types"].whitespace);
    //TURBOPACK unreachable
    ;
    /**
   * After whitespace, after task list item check.
   *
   * ```markdown
   * > | * [x] y.
   *           ^
   * ```
   *
   * @type {State}
   */ function after(code) {
        // EOF means there was nothing, so bad.
        // EOL means there’s content after it, so good.
        // Impossible to have more spaces.
        // Anything else is good.
        return code === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["codes"].eof ? nok(code) : ok(code);
    }
}
}),
"[project]/cafekit-web/node_modules/micromark-extension-gfm-task-list-item/dev/lib/html.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @import {HtmlExtension} from 'micromark-util-types'
 */ /**
 * Create an HTML extension for `micromark` to support GFM task list items when
 * serializing to HTML.
 *
 * @returns {HtmlExtension}
 *   Extension for `micromark` that can be passed in `htmlExtensions` to
 *   support GFM task list items when serializing to HTML.
 */ __turbopack_context__.s([
    "gfmTaskListItemHtml",
    ()=>gfmTaskListItemHtml
]);
function gfmTaskListItemHtml() {
    return {
        enter: {
            taskListCheck () {
                this.tag('<input type="checkbox" disabled="" ');
            }
        },
        exit: {
            taskListCheck () {
                this.tag('/>');
            },
            taskListCheckValueChecked () {
                this.tag('checked="" ');
            }
        }
    };
}
}),
"[project]/cafekit-web/node_modules/micromark-extension-gfm/index.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "gfm",
    ()=>gfm,
    "gfmHtml",
    ()=>gfmHtml
]);
/**
 * @typedef {import('micromark-extension-gfm-footnote').HtmlOptions} HtmlOptions
 * @typedef {import('micromark-extension-gfm-strikethrough').Options} Options
 * @typedef {import('micromark-util-types').Extension} Extension
 * @typedef {import('micromark-util-types').HtmlExtension} HtmlExtension
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$combine$2d$extensions$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/micromark-util-combine-extensions/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$extension$2d$gfm$2d$autolink$2d$literal$2f$dev$2f$lib$2f$syntax$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/micromark-extension-gfm-autolink-literal/dev/lib/syntax.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$extension$2d$gfm$2d$autolink$2d$literal$2f$dev$2f$lib$2f$html$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/micromark-extension-gfm-autolink-literal/dev/lib/html.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$extension$2d$gfm$2d$footnote$2f$dev$2f$lib$2f$syntax$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/micromark-extension-gfm-footnote/dev/lib/syntax.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$extension$2d$gfm$2d$footnote$2f$dev$2f$lib$2f$html$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/micromark-extension-gfm-footnote/dev/lib/html.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$extension$2d$gfm$2d$strikethrough$2f$dev$2f$lib$2f$syntax$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/micromark-extension-gfm-strikethrough/dev/lib/syntax.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$extension$2d$gfm$2d$strikethrough$2f$dev$2f$lib$2f$html$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/micromark-extension-gfm-strikethrough/dev/lib/html.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$extension$2d$gfm$2d$table$2f$dev$2f$lib$2f$syntax$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/micromark-extension-gfm-table/dev/lib/syntax.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$extension$2d$gfm$2d$table$2f$dev$2f$lib$2f$html$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/micromark-extension-gfm-table/dev/lib/html.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$extension$2d$gfm$2d$tagfilter$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/micromark-extension-gfm-tagfilter/lib/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$extension$2d$gfm$2d$task$2d$list$2d$item$2f$dev$2f$lib$2f$syntax$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/micromark-extension-gfm-task-list-item/dev/lib/syntax.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$extension$2d$gfm$2d$task$2d$list$2d$item$2f$dev$2f$lib$2f$html$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/micromark-extension-gfm-task-list-item/dev/lib/html.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
function gfm(options) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$combine$2d$extensions$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["combineExtensions"])([
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$extension$2d$gfm$2d$autolink$2d$literal$2f$dev$2f$lib$2f$syntax$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["gfmAutolinkLiteral"])(),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$extension$2d$gfm$2d$footnote$2f$dev$2f$lib$2f$syntax$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["gfmFootnote"])(),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$extension$2d$gfm$2d$strikethrough$2f$dev$2f$lib$2f$syntax$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["gfmStrikethrough"])(options),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$extension$2d$gfm$2d$table$2f$dev$2f$lib$2f$syntax$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["gfmTable"])(),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$extension$2d$gfm$2d$task$2d$list$2d$item$2f$dev$2f$lib$2f$syntax$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["gfmTaskListItem"])()
    ]);
}
function gfmHtml(options) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$util$2d$combine$2d$extensions$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["combineHtmlExtensions"])([
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$extension$2d$gfm$2d$autolink$2d$literal$2f$dev$2f$lib$2f$html$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["gfmAutolinkLiteralHtml"])(),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$extension$2d$gfm$2d$footnote$2f$dev$2f$lib$2f$html$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["gfmFootnoteHtml"])(options),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$extension$2d$gfm$2d$strikethrough$2f$dev$2f$lib$2f$html$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["gfmStrikethroughHtml"])(),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$extension$2d$gfm$2d$table$2f$dev$2f$lib$2f$html$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["gfmTableHtml"])(),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$extension$2d$gfm$2d$tagfilter$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["gfmTagfilterHtml"])(),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$extension$2d$gfm$2d$task$2d$list$2d$item$2f$dev$2f$lib$2f$html$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["gfmTaskListItemHtml"])()
    ]);
}
}),
"[project]/cafekit-web/node_modules/remark-gfm/lib/index.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>remarkGfm
]);
/**
 * @import {Root} from 'mdast'
 * @import {Options} from 'remark-gfm'
 * @import {} from 'remark-parse'
 * @import {} from 'remark-stringify'
 * @import {Processor} from 'unified'
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$gfm$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/mdast-util-gfm/lib/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$extension$2d$gfm$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/micromark-extension-gfm/index.js [app-rsc] (ecmascript)");
;
;
/** @type {Options} */ const emptyOptions = {};
function remarkGfm(options) {
    // @ts-expect-error: TS is wrong about `this`.
    // eslint-disable-next-line unicorn/no-this-assignment
    const self = this;
    const settings = options || emptyOptions;
    const data = self.data();
    const micromarkExtensions = data.micromarkExtensions || (data.micromarkExtensions = []);
    const fromMarkdownExtensions = data.fromMarkdownExtensions || (data.fromMarkdownExtensions = []);
    const toMarkdownExtensions = data.toMarkdownExtensions || (data.toMarkdownExtensions = []);
    micromarkExtensions.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$micromark$2d$extension$2d$gfm$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["gfm"])(settings));
    fromMarkdownExtensions.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$gfm$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["gfmFromMarkdown"])());
    toMarkdownExtensions.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$mdast$2d$util$2d$gfm$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["gfmToMarkdown"])(settings));
}
}),
"[project]/cafekit-web/node_modules/lucide-react/dist/esm/shared/src/utils.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "hasA11yProp",
    ()=>hasA11yProp,
    "mergeClasses",
    ()=>mergeClasses,
    "toCamelCase",
    ()=>toCamelCase,
    "toKebabCase",
    ()=>toKebabCase,
    "toPascalCase",
    ()=>toPascalCase
]);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const toKebabCase = (string)=>string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const toCamelCase = (string)=>string.replace(/^([A-Z])|[\s-_]+(\w)/g, (match, p1, p2)=>p2 ? p2.toUpperCase() : p1.toLowerCase());
const toPascalCase = (string)=>{
    const camelCase = toCamelCase(string);
    return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};
const mergeClasses = (...classes)=>classes.filter((className, index, array)=>{
        return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
    }).join(" ").trim();
const hasA11yProp = (props)=>{
    for(const prop in props){
        if (prop.startsWith("aria-") || prop === "role" || prop === "title") {
            return true;
        }
    }
};
;
 //# sourceMappingURL=utils.js.map
}),
"[project]/cafekit-web/node_modules/lucide-react/dist/esm/defaultAttributes.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>defaultAttributes
]);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var defaultAttributes = {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round"
};
;
 //# sourceMappingURL=defaultAttributes.js.map
}),
"[project]/cafekit-web/node_modules/lucide-react/dist/esm/Icon.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Icon
]);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$defaultAttributes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/lucide-react/dist/esm/defaultAttributes.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/lucide-react/dist/esm/shared/src/utils.js [app-rsc] (ecmascript)");
;
;
;
const Icon = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["forwardRef"])(({ color = "currentColor", size = 24, strokeWidth = 2, absoluteStrokeWidth, className = "", children, iconNode, ...rest }, ref)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createElement"])("svg", {
        ref,
        ...__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$defaultAttributes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"],
        width: size,
        height: size,
        stroke: color,
        strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["mergeClasses"])("lucide", className),
        ...!children && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["hasA11yProp"])(rest) && {
            "aria-hidden": "true"
        },
        ...rest
    }, [
        ...iconNode.map(([tag, attrs])=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createElement"])(tag, attrs)),
        ...Array.isArray(children) ? children : [
            children
        ]
    ]));
;
 //# sourceMappingURL=Icon.js.map
}),
"[project]/cafekit-web/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>createLucideIcon
]);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/lucide-react/dist/esm/shared/src/utils.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$Icon$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/lucide-react/dist/esm/Icon.js [app-rsc] (ecmascript)");
;
;
;
const createLucideIcon = (iconName, iconNode)=>{
    const Component = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["forwardRef"])(({ className, ...props }, ref)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createElement"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$Icon$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
            ref,
            iconNode,
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["mergeClasses"])(`lucide-${(0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toKebabCase"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPascalCase"])(iconName))}`, `lucide-${iconName}`, className),
            ...props
        }));
    Component.displayName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPascalCase"])(iconName);
    return Component;
};
;
 //# sourceMappingURL=createLucideIcon.js.map
}),
"[project]/cafekit-web/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>ChevronRight
]);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-rsc] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "m9 18 6-6-6-6",
            key: "mthhwq"
        }
    ]
];
const ChevronRight = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])("chevron-right", __iconNode);
;
 //# sourceMappingURL=chevron-right.js.map
}),
"[project]/cafekit-web/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-rsc] (ecmascript) <export default as ChevronRight>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChevronRight",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-rsc] (ecmascript)");
}),
"[project]/cafekit-web/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>ChevronLeft
]);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-rsc] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "m15 18-6-6 6-6",
            key: "1wnfg3"
        }
    ]
];
const ChevronLeft = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])("chevron-left", __iconNode);
;
 //# sourceMappingURL=chevron-left.js.map
}),
"[project]/cafekit-web/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-rsc] (ecmascript) <export default as ChevronLeft>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChevronLeft",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-rsc] (ecmascript)");
}),
"[project]/cafekit-web/node_modules/clsx/dist/clsx.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clsx",
    ()=>clsx,
    "default",
    ()=>__TURBOPACK__default__export__
]);
function r(e) {
    var t, f, n = "";
    if ("string" == typeof e || "number" == typeof e) n += e;
    else if ("object" == typeof e) if (Array.isArray(e)) {
        var o = e.length;
        for(t = 0; t < o; t++)e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
    } else for(f in e)e[f] && (n && (n += " "), n += f);
    return n;
}
function clsx() {
    for(var e, t, f = 0, n = "", o = arguments.length; f < o; f++)(e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
    return n;
}
const __TURBOPACK__default__export__ = clsx;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1251dc68._.js.map