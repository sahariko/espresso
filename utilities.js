export const validateArg = ({
    value,
    name,
    type
}) => {
    const isValid = type === 'array'
        ? Array.isArray(value)
        : typeof value === type

    if (isValid) return

    throw new Error(`Argument ${name} must be of type ${type}`)
}

export const generateRouteKey = (method, path) => {
    const normalizedMethod = method.toLowerCase()

    return [normalizedMethod, path].join('_')
}
