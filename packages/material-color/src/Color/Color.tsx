import React from 'react'
import { ChromePicker } from 'react-color'
import { useTheme } from '@mui/material/styles'
import { ColorBase, ColorBaseProps } from '@ui-schema/material-color/Base/ColorBase'
import { ColorDialogBase, ColorDialogBaseProps } from '@ui-schema/material-color/Base/ColorDialogBase'
import { ColorStaticBase, ColorStaticBaseProps } from '@ui-schema/material-color/Base/ColorStaticBase'
import { mergeStyles } from '../mergeStyles/index.js'

export const Color = (props: Omit<ColorBaseProps, 'ColorPicker' | 'styles'>) => {
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

const stylesDialog = palette => mergeStyles({
    'default': {
        picker: {
            boxShadow: '0',
        },
    },
}, chromeStyles(palette))

export const ColorDialog = (props: Omit<ColorDialogBaseProps, 'ColorPicker' | 'styles'>) => {
    const {palette} = useTheme()
    return <ColorDialogBase {...props} ColorPicker={ChromePicker} styles={stylesDialog(palette)}/>
}

const stylesStatic = palette => mergeStyles({
    'default': {
        picker: {
            boxShadow: '0',
            width: '100%',
        },
    },
}, chromeStyles(palette))

export const ColorStatic = (props: Omit<ColorStaticBaseProps, 'ColorPicker' | 'styles'>) => {
    const {palette} = useTheme()
    return <ColorStaticBase {...props} ColorPicker={ChromePicker} styles={stylesStatic(palette)}/>
}
