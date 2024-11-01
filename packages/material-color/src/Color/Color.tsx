import { WithScalarValue } from '@ui-schema/ui-schema'
import React from 'react'
import { ChromePicker } from 'react-color'
import merge from 'deepmerge'
import { useTheme } from '@mui/material/styles'
import { ColorBase, ColorBaseProps } from '@ui-schema/material-color/Base/ColorBase'
import { ColorDialogBase, ColorDialogBaseProps } from '@ui-schema/material-color/Base/ColorDialogBase'
import { ColorStaticBase, ColorStaticBaseProps } from '@ui-schema/material-color/Base/ColorStaticBase'

export const Color = (props: Omit<ColorBaseProps, 'ColorPicker' | 'styles'> & WithScalarValue) => {
    const {palette} = useTheme()
    return <ColorBase {...props} ColorPicker={ChromePicker} styles={chromeStyles(palette)}/>
}

const chromeStyles = palette => ({
    'default': {
        picker: {
            background: palette.background.paper,
        },
        alpha: {
            background: '#ffffff',
        },
    },
})

const stylesDialog = palette => merge({
    'default': {
        picker: {
            boxShadow: '0',
        },
    },
}, chromeStyles(palette))

export const ColorDialog = (props: Omit<ColorDialogBaseProps, 'ColorPicker' | 'styles'> & WithScalarValue) => {
    const {palette} = useTheme()
    return <ColorDialogBase {...props} ColorPicker={ChromePicker} styles={stylesDialog(palette)}/>
}

const stylesStatic = palette => merge({
    'default': {
        picker: {
            boxShadow: '0',
            width: '100%',
        },
    },
}, chromeStyles(palette))

export const ColorStatic = (props: Omit<ColorStaticBaseProps, 'ColorPicker' | 'styles'> & WithScalarValue) => {
    const {palette} = useTheme()
    return <ColorStaticBase {...props} ColorPicker={ChromePicker} styles={stylesStatic(palette)}/>
}
