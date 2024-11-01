/**
 * This file was copied from https://github.com/LoicMahieu/material-ui-color-picker/blob/master/src/transformers.js
 * As we don't rely on any other thing from that package, copied and not installed
 *
 * MIT License,
 * Copyright (c) 2017 Loic Mahieu
 * SeeL https://github.com/LoicMahieu/material-ui-color-picker/blob/master/LICENSE
 */

type ColorValue = any
type ColorFormat = 'rgb' | 'rgba' | 'rgb+a' | 'hex'

export const converters = {
    rgba: (color: ColorValue): string => `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`,
    rgb: (color: ColorValue): string => `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`,
    hex: (color: ColorValue): string => color.hex.toUpperCase(),

    rgba_rgb: (color: ColorValue): string => color.rgb.a === 1 ? converters.rgb(color) : converters.rgba(color),
    rgba_hex: (color: ColorValue): string => color.rgb.a === 1 ? converters.hex(color) : converters.rgba(color),
}

export const convertColor = (color: ColorValue, format: ColorFormat): string =>
    format === 'hex' ?
        converters.hex(color) :
        format === 'rgb' ?
            converters.rgb(color) :
            format === 'rgb+a' ?
                converters.rgba_rgb(color) :
                format === 'rgba' ?
                    converters.rgba(color) :
                    converters.rgba_hex(color)
