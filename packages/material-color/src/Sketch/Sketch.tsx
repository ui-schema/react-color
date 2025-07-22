import { List } from 'immutable'
import { SketchPicker } from 'react-color'
import { useTheme } from '@mui/material/styles'
import * as React from 'react'
import { ColorBase, ColorBaseProps } from '@ui-schema/material-color/Base/ColorBase'
import { ColorStaticBase, ColorStaticBaseProps } from '@ui-schema/material-color/Base/ColorStaticBase'
import { ColorDialogBase, ColorDialogBaseProps } from '@ui-schema/material-color/Base/ColorDialogBase'
import { mergeStyles } from '../mergeStyles/index.js'

const styles = ({palette, spacing}) => ({
    'default': {
        picker: {
            background: palette.background.paper,
            boxShadow: 'rgba(0, 0, 0, 0.12) 0px 2px 10px, rgba(0, 0, 0, 0.16) 0px 2px 5px',
            width: 300,
            padding: spacing(2),
        },
    },
})

export const ColorSketch = (props: Omit<ColorBaseProps, 'ColorPicker' | 'styles'>) => {
    const theme = useTheme()

    const pickerProps = props.pickerProps || {}
    if(props.schema.getIn(['view', 'colors'])) {
        pickerProps['presetColors'] = (props.schema.getIn(['view', 'colors']) as List<string>).toArray()
    }

    return <ColorBase
        {...props} styles={styles(theme)}
        ColorPicker={SketchPicker}
        pickerProps={pickerProps}
    />
}

const stylesDialog = ({palette, spacing}) => mergeStyles(styles({palette, spacing}), ({
    'default': {
        picker: {
            boxShadow: 0,
        },
    },
}))

export const ColorSketchDialog = (props: Omit<ColorDialogBaseProps, 'ColorPicker' | 'styles'>) => {
    const theme = useTheme()

    const pickerProps = props.pickerProps || {}
    if(props.schema.getIn(['view', 'colors'])) {
        pickerProps['presetColors'] = (props.schema.getIn(['view', 'colors']) as List<string>).toArray()
    }

    return <ColorDialogBase
        {...props} ColorPicker={SketchPicker}
        styles={stylesDialog(theme)} pickerProps={pickerProps}
    />
}

const stylesStatic = ({palette, spacing}) => mergeStyles(styles({palette, spacing}), ({
    'default': {
        picker: {
            boxShadow: 0,
            boxSizing: 'border-box',
            width: '100%',
            // would be better for responsive sizing, but SketchPresetColors has negative margin
            // padding: 0
        },
    },
}))

export const ColorSketchStatic = (props: Omit<ColorStaticBaseProps, 'ColorPicker' | 'styles'>) => {
    const theme = useTheme()

    const pickerProps = props.pickerProps || {}
    if(props.schema?.getIn(['view', 'colors'])) {
        pickerProps['presetColors'] = (props.schema?.getIn(['view', 'colors']) as List<string>).toArray()
    }

    return <ColorStaticBase
        {...props} ColorPicker={SketchPicker}
        styles={stylesStatic(theme)} pickerProps={pickerProps}
    />
}
