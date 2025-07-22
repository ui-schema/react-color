import * as React from 'react'
import { restrictColors } from '@ui-schema/material-color/Base/restrictColors'
import { ColorBase, ColorBaseProps } from '@ui-schema/material-color/Base/ColorBase'
import { useTheme } from '@mui/material/styles'
import { TwitterPicker } from 'react-color'
import { ColorStaticBase, ColorStaticBaseProps } from '@ui-schema/material-color/Base/ColorStaticBase'
import { mergeStyles } from '../mergeStyles/index.js'

const styles = ({palette, value}) => ({
    'default': {
        card: {
            marginTop: 6,
            background: palette.background.paper,
        },
        triangle: {
            borderColor: `transparent transparent ${
                value ||
                palette.divider
            } transparent`,
        },
        hash: {
            background: 'transparent',
            border: '1px solid transparent',
            borderRight: 0,
            marginTop: 2,
            borderBottomColor: palette.grey[500],
        },
        input: {
            background: 'transparent',
            border: '1px solid transparent',
            borderLeft: 0,
            borderBottomColor: palette.grey[500],
            boxShadow: 0,
        },
    },
})

const ColorTwitter = (props: Omit<ColorBaseProps, 'ColorPicker' | 'styles'>) => {
    const {palette} = useTheme()

    const pickerProps = props.pickerProps || {}
    restrictColors(pickerProps, props.schema)

    return <ColorBase
        {...props} styles={styles({palette, value: props.value})}
        ColorPicker={TwitterPicker}
        pickerProps={pickerProps}
    />
}

const stylesStatic = ({palette, value}) => mergeStyles(styles({palette, value}), {
    'default': {
        card: {
            width: '100%',
            marginTop: 6,
            background: palette.background.paper,
            boxShadow: 0,
            padding: 0,
        },
        body: {
            padding: 0,
        },
    },
})

const ColorTwitterStatic = (props: Omit<ColorStaticBaseProps, 'ColorPicker' | 'styles'>) => {
    const {palette} = useTheme()

    const pickerProps = {triangle: 'hide'}
    restrictColors(pickerProps, props.schema)

    return <ColorStaticBase
        {...props} styles={stylesStatic({palette, value: props.value})}
        ColorPicker={TwitterPicker}
        pickerProps={pickerProps}
    />
}

export { ColorTwitter, ColorTwitterStatic }
