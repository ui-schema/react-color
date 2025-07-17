import { List } from 'immutable'
import { CompactPicker } from 'react-color'
import { useTheme } from '@mui/material/styles'
import { ColorBase, ColorBaseProps } from '@ui-schema/material-color/Base/ColorBase'
import React from 'react'

export const ColorCompact = (props: Omit<ColorBaseProps, 'ColorPicker' | 'styles'>) => {
    const {palette} = useTheme()
    const styles = {
        'default': {compact: {background: palette.background.paper}},
    }
    const pickerProps = props.pickerProps || {}
    if(props.schema.getIn(['view', 'colors'])) {
        pickerProps['colors'] = (props.schema.getIn(['view', 'colors']) as List<string>).toArray()
    }

    return <ColorBase
        {...props} styles={styles}
        ColorPicker={CompactPicker}
        pickerProps={pickerProps}
    />
}
