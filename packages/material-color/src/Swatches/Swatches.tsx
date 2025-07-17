import { restrictColors } from '@ui-schema/material-color/Base/restrictColors'
import { SwatchesPicker } from 'react-color'
import { ColorBase, ColorBaseProps } from '@ui-schema/material-color/Base/ColorBase'
import React from 'react'
import { useTheme } from '@mui/material/styles'

export const ColorSwatches = (props: Omit<ColorBaseProps, 'ColorPicker' | 'styles'>) => {
    const {palette} = useTheme()
    const styles = {
        'default': {
            overflow: {
                background: palette.background.paper,
            },
        },
    }
    const pickerProps = props.pickerProps || {}
    restrictColors(pickerProps, props.schema, true)

    return <ColorBase
        {...props} styles={styles}
        ColorPicker={SwatchesPicker}
        pickerProps={pickerProps}
    />
}
