import { MuiWidgetBinding } from '@ui-schema/ds-material/widgetsBinding'
import { ColorBaseProps } from '@ui-schema/material-color/Base/ColorBase'
import { WithScalarValue } from '@ui-schema/ui-schema'
import { WidgetProps } from '@ui-schema/ui-schema/Widget'
import React from 'react'
import { convertColor } from '@ui-schema/material-color/Base/transformers'
import merge from 'deepmerge'

export interface ColorStaticBaseProps extends WidgetProps<MuiWidgetBinding<{}>> {
    ColorPicker: ColorBaseProps['ColorPicker']
    styles?: ColorBaseProps['styles']
    pickerProps?: object
}

export const ColorStaticBase = (
    {
        storeKeys, schema, value, onChange, ColorPicker,
        styles: customStyles = {}, required,
        pickerProps = {},
    }: ColorStaticBaseProps & WithScalarValue,
) => {
    const styles = merge({}, customStyles)
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
