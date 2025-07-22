import { ColorBaseProps } from '@ui-schema/material-color/Base/ColorBase'
import { WidgetProps } from '@ui-schema/react/Widget'
import * as React from 'react'
import { convertColor } from '@ui-schema/material-color/Base/transformers'

export interface ColorStaticBaseProps extends WidgetProps {
    ColorPicker: ColorBaseProps['ColorPicker']
    styles?: ColorBaseProps['styles']
    pickerProps?: object
}

export const ColorStaticBase = (
    {
        storeKeys, schema, value, onChange, ColorPicker,
        styles: customStyles = {}, required,
        pickerProps = {},
    }: ColorStaticBaseProps,
) => {
    const styles = customStyles
    const format = schema.get('format')

    return <ColorPicker
        // todo: may be object or string, but object would never reach here atm. as requires `extractValue` to get passed down
        color={typeof value === 'string' ? value : ''}
        disableAlpha={
            schema.getIn(['view', 'alpha']) !== true ||
            format === 'hex' ||
            format === 'rgb'
        }
        onChange={(color) => {
            onChange({
                storeKeys: storeKeys,
                scopes: ['value'],
                type: 'set',
                schema,
                required,
                data: {value: convertColor(color, format)},
            })
        }}
        styles={styles}
        {...pickerProps}
    />
}
