import { useTheme } from '@mui/material/styles'
import { restrictColors } from '@ui-schema/material-color/Base/restrictColors'
import { ColorBase, ColorBaseProps } from '@ui-schema/material-color/Base/ColorBase'
import { CirclePicker } from 'react-color'
import * as React from 'react'
import { ColorStaticBase, ColorStaticBaseProps } from '@ui-schema/material-color/Base/ColorStaticBase'
import { mergeStyles } from '../mergeStyles/index.js'

const styles = ({palette, circleSpacing}) => ({
    'default': {
        card: {
            background: palette.background.paper,
            boxShadow: 'rgba(0, 0, 0, 0.12) 0px 2px 10px, rgba(0, 0, 0, 0.16) 0px 2px 5px',
            paddingTop: circleSpacing,
            paddingLeft: circleSpacing,
            marginLeft: 0,
            marginRight: 0,
            boxSizing: 'content-box',
            justifyContent: 'center',
        },
    },
})

export interface ColorCircleProps extends ColorBaseProps {
    circleSpacing?: number
    circleSize?: number
}

export const ColorCircle = ({circleSpacing = 12, circleSize = 28, ...props}: Omit<ColorCircleProps, 'ColorPicker' | 'styles'>) => {
    const {palette} = useTheme()

    const pickerProps = {circleSpacing, circleSize}
    restrictColors(pickerProps, props.schema)

    return <ColorBase
        {...props}
        ColorPicker={CirclePicker} styles={styles({palette, circleSpacing})}
        pickerProps={pickerProps}
    />
}

const stylesStatic = ({palette, circleSpacing}) => mergeStyles(styles({palette, circleSpacing}), {
    'default': {
        card: {
            boxShadow: 0,
            boxSizing: 'border-box',
        },
    },
})

export interface ColorCircleStaticProps extends ColorStaticBaseProps {
    circleSpacing?: number
    circleSize?: number
}

export const ColorCircleStatic = ({circleSpacing = 12, circleSize = 28, ...props}: Omit<ColorCircleStaticProps, 'ColorPicker' | 'styles'>) => {
    const {palette} = useTheme()

    const pickerProps = {circleSpacing}
    restrictColors(pickerProps, props.schema)

    return <ColorStaticBase {...props} ColorPicker={CirclePicker} styles={stylesStatic({palette, circleSpacing})} pickerProps={{width: '100%', circleSize}}/>
}
