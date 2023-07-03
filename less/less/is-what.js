export function getType(payload) {
    return Object.prototype.toString.call(payload).slice(8, -1)
}

export function isUndefined(payload) {
    return getType(payload) === 'Undefined'
}

export function isNull(payload) {
    return getType(payload) === 'Null'
}

export function isPlainObject(payload) {
    if (getType(payload) !== 'Object') return false
    const prototype = Object.getPrototypeOf(payload)
    return prototype.constructor === Object && prototype === Object.prototype
}

export function isObject(payload) {
    return isPlainObject(payload)
}

export function isEmptyObject(payload) {
    return isPlainObject(payload) && Object.keys(payload).length === 0
}

export function isFullObject(payload) {
    return isPlainObject(payload) && Object.keys(payload).length > 0
}

export function isAnyObject(payload) {
    return getType(payload) === 'Object'
}

export function isObjectLike(payload) {
    return isAnyObject(payload)
}

export function isFunction(payload) {
    return typeof payload === 'function'
}

export function isArray(payload) {
    return getType(payload) === 'Array'
}

export function isFullArray(payload) {
    return isArray(payload) && payload.length > 0
}

export function isEmptyArray(payload) {
    return isArray(payload) && payload.length === 0
}

export function isString(payload) {
    return getType(payload) === 'String'
}

export function isFullString(payload) {
    return isString(payload) && payload !== ''
}

export function isEmptyString(payload) {
    return payload === ''
}

export function isNumber(payload) {
    return getType(payload) === 'Number' && !isNaN(payload)
}

export function isPositiveNumber(payload) {
    return isNumber(payload) && payload > 0
}

export function isNegativeNumber(payload) {
    return isNumber(payload) && payload < 0
}

export function isBoolean(payload) {
    return getType(payload) === 'Boolean'
}

export function isRegExp(payload) {
    return getType(payload) === 'RegExp'
}

export function isMap(payload) {
    return getType(payload) === 'Map'
}

export function isWeakMap(payload) {
    return getType(payload) === 'WeakMap'
}

export function isSet(payload) {
    return getType(payload) === 'Set'
}

export function isWeakSet(payload) {
    return getType(payload) === 'WeakSet'
}

export function isSymbol(payload) {
    return getType(payload) === 'Symbol'
}

export function isDate(payload) {
    return getType(payload) === 'Date' && !isNaN(payload)
}

export function isBlob(payload) {
    return getType(payload) === 'Blob'
}

export function isFile(payload) {
    return getType(payload) === 'File'
}

export function isPromise(payload) {
    return getType(payload) === 'Promise'
}

export function isError(payload) {
    return getType(payload) === 'Error'
}

export function isNaNValue(payload) {
    return getType(payload) === 'Number' && isNaN(payload)
}

export function isPrimitive(
    payload
) {
    return (
        isBoolean(payload) ||
        isNull(payload) ||
        isUndefined(payload) ||
        isNumber(payload) ||
        isString(payload) ||
        isSymbol(payload)
    )
}

export const isNullOrUndefined = isOneOf(isNull, isUndefined)

export function isOneOf(
    a,
    b,
    c,
    d,
    e
) {
    return (value) => a(value) || b(value) || (!!c && c(value)) || (!!d && d(value)) || (!!e && e(value))
}

export function isType(payload, type) {
    if (!(type instanceof Function)) {
        throw new TypeError('Type must be a function')
    }
    if (!Object.prototype.hasOwnProperty.call(type, 'prototype')) {
        throw new TypeError('Type is not a class')
    }
    // Classes usually have names (as functions usually have names)
    const name = type.name
    return getType(payload) === name || Boolean(payload && payload.constructor === type)
}