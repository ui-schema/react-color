import React from 'react'
import { fromJSOrdered, WidgetProps, WithScalarValue, WithValue } from '@ui-schema/ui-schema'
import { TransTitle } from '@ui-schema/ui-schema/Translate'
import Box from '@mui/material/Box'
import FormLabel from '@mui/material/FormLabel'
import useTheme from '@mui/material/styles/useTheme'
import { AnyColor, ColorPickerBaseProps } from 'react-colorful/dist/types'
import { ValidityHelperText } from '@ui-schema/ds-material/Component'
import { FormHelperText } from '@mui/material'
import { OrderedMap } from 'immutable'

export type ColorfulComponent<T extends AnyColor> = React.FC<ColorPickerBaseProps<T>>

export interface WidgetColorfulProps<T extends AnyColor> {
    ColorfulPicker: ColorfulComponent<T>
}

export const WidgetColorful = <T extends AnyColor, P extends WidgetProps = WidgetProps>(
    {
        storeKeys, schema, value, onChange,
        showValidity, valid, errors, required,
        ColorfulPicker,
    }: P & (WithScalarValue | WithValue) & WidgetColorfulProps<T>
): React.ReactElement => {
    const handleOnChange = React.useCallback((color: AnyColor) => {
        onChange({
            storeKeys,
            scopes: ['value'],
            type: 'set',
            data: {
                value: typeof color === 'string' ? color : fromJSOrdered(color),
            },
            schema,
            required,
        })
    }, [onChange, storeKeys, schema, required])
    const {palette} = useTheme()

    const hideTitle = schema?.getIn(['view', 'hideTitle'])

    const pickerWidth = schema?.getIn(['view', 'pickerWidth']) as string | number | undefined
    const pickerHeight = schema?.getIn(['view', 'pickerHeight']) as string | number | undefined
    const pickerStyles: React.CSSProperties = React.useMemo(() => ({
        borderColor: valid ? palette.divider : palette.error.main,
        width: pickerWidth || '100%',
        height: pickerHeight,
    }), [palette, pickerWidth, pickerHeight])

    const showValueText = schema?.getIn(['view', 'showValueText']) as boolean
    return <>
        {hideTitle ? null :
            <FormLabel error={(!valid && showValidity)}>
                <TransTitle storeKeys={storeKeys} schema={schema}/>
                {required ? ' *' : null}
            </FormLabel>}

        <Box
            style={{
                display: 'flex',
                width: '100%',
            }}
        >
            <ColorfulPicker
                color={typeof value === 'string' ? value : value?.toJS()}
                onChange={handleOnChange}
                style={pickerStyles}
            />
        </Box>
        {showValueText ?
            <Box ml={1}>
                <FormHelperText>
                    {typeof value === 'string' ? value :
                        (value as OrderedMap<string, number>)?.map((val, k) =>
                            <span key={k}>{k}: {val}{' '}</span>
                        ).valueSeq()}
                </FormHelperText>
            </Box> : null}

        <ValidityHelperText errors={errors} showValidity={showValidity} schema={schema}/>
    </>
}
