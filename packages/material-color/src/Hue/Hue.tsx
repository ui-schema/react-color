import { useTheme } from '@mui/material/styles'
import { ColorBase, ColorBaseProps } from '@ui-schema/material-color/Base/ColorBase'
import React from 'react'
import { styleWrapper } from '@ui-schema/material-color/styleWrapper'
import { HuePicker } from 'react-color'

const WrappedHuePicker = p => {
    const theme = useTheme()
    return <div style={styleWrapper(theme)}><HuePicker {...p}/></div>
}

export const ColorHue = (props: Omit<ColorBaseProps, 'ColorPicker' | 'styles'>) => {
    const styles = {
        'default': {
            picker: {width: '100%'},
        },
    }
    return <ColorBase {...props} ColorPicker={WrappedHuePicker} styles={styles}/>
}
