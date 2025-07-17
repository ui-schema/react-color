import { useTheme } from '@mui/material/styles'
import { ColorBase, ColorBaseProps } from '@ui-schema/material-color/Base/ColorBase'
import React from 'react'
import { styleWrapper } from '@ui-schema/material-color/styleWrapper'
import { AlphaPicker } from 'react-color'

const WrappedAlphaPicker = p => {
    const theme = useTheme()
    return <div style={styleWrapper(theme)}>
        <div style={{background: '#ffffff', borderRadius: 3}}>
            <AlphaPicker {...p} width={'100%'}/>
        </div>
    </div>
}

export const ColorAlpha = (props: Omit<ColorBaseProps, 'ColorPicker' | 'styles'>) => {
    return <ColorBase {...props} ColorPicker={WrappedAlphaPicker}/>
}

