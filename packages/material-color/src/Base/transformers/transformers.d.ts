export declare const DEFAULT_CONVERTER: string

type ColorValue = any
type ColorFormat = 'rgb' | 'rgba' | 'rgb+a' | 'hex'

export declare const converters: {
    rgba: (color: ColorValue) => string
    rgb: (color: ColorValue) => string
    hex: (color: ColorValue) => string

    rgba_rgb: (color: ColorValue) => string
    rgba_hex: (color: ColorValue) => string
}

export default converters

export declare const convertColor: (color: ColorValue, format: ColorFormat) => string
