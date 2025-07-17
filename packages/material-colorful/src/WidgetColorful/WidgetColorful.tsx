import { fromJSOrdered } from '@ui-schema/ui-schema/createMap'
import React from 'react'
import { WidgetProps } from '@ui-schema/react/Widget'
import { TranslateTitle } from '@ui-schema/react/TranslateTitle'
import Box from '@mui/material/Box'
import FormLabel from '@mui/material/FormLabel'
import { useTheme } from '@mui/material/styles'
import { ValidityHelperText } from '@ui-schema/ds-material/Component'
import FormHelperText from '@mui/material/FormHelperText'
import { Map, OrderedMap } from 'immutable'
import type { HslaColor, HslColor, HsvaColor, HsvColor, RgbaColor, RgbColor } from 'react-colorful'

type ObjectColor = RgbColor | HslColor | HsvColor | RgbaColor | HslaColor | HsvaColor
type AnyColor = string | ObjectColor

type ColorPickerHTMLAttributes = Omit<React.HTMLAttributes<HTMLDivElement>, 'color' | 'onChange' | 'onChangeCapture'>

interface ColorPickerBaseProps<T extends AnyColor> extends ColorPickerHTMLAttributes {
    color: T
    onChange: (newColor: T) => void
}

export type ColorfulComponent<T extends AnyColor> = React.FC<ColorPickerBaseProps<T>>

export interface WidgetColorfulProps<T extends AnyColor> {
    ColorfulPicker: ColorfulComponent<T>
}

export const WidgetColorful = <T extends AnyColor, P extends WidgetProps = WidgetProps>(
    {
        storeKeys, schema, value, onChange,
        showValidity, valid, errors, required,
        ColorfulPicker,
    }: P & WidgetColorfulProps<T>,
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
    }), [palette, pickerWidth, pickerHeight, valid])

    const showValueText = schema?.getIn(['view', 'showValueText']) as boolean
    return <>
        {hideTitle ? null :
            <FormLabel error={(!valid && showValidity)}>
                <TranslateTitle storeKeys={storeKeys} schema={schema}/>
                {required ? ' *' : null}
            </FormLabel>}

        <Box
            style={{
                display: 'flex',
                width: '100%',
            }}
        >
            <ColorfulPicker
                color={(typeof value === 'string' ? value : Map.isMap(value) ? value?.toJS() : value && typeof value === 'object' ? value : '') as T}
                onChange={handleOnChange}
                style={pickerStyles}
            />
        </Box>
        {showValueText ?
            <Box ml={1}>
                <FormHelperText>
                    {typeof value === 'string' ? value :
                        (value as OrderedMap<string, number>)?.map((val, k) =>
                            <span key={k}>{k}: {val}{' '}</span>,
                        ).valueSeq()}
                </FormHelperText>
            </Box> : null}

        <ValidityHelperText errors={errors} showValidity={showValidity} schema={schema}/>
    </>
}
