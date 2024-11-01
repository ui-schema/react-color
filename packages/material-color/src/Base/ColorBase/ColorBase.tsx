import { MuiWidgetBinding } from '@ui-schema/ds-material/widgetsBinding'
import { WithScalarValue } from '@ui-schema/ui-schema'
import { WidgetProps } from '@ui-schema/ui-schema/Widget'
import React from 'react'
import InputAdornment from '@mui/material/InputAdornment'
import Palette from '@mui/icons-material/Palette'
import { StringRenderer } from '@ui-schema/ds-material/Widgets/TextField'
import { convertColor } from '@ui-schema/material-color/Base/transformers'
import merge from 'deepmerge'
import { Classes } from 'reactcss'
import { ColorPickerProps } from 'react-color'

export type PickerContainer = React.ComponentType<React.PropsWithChildren<{
    setFocus: (focus: boolean) => void
    hasFocus: boolean
}>>

/**
 * @todo specify the html element and pass to ColorPickerProps
 * @todo use Picker as generic for stricter typings
 */
export type ColorPicker = React.ComponentType<ColorPickerProps<any> & {
    disableAlpha?: boolean
    [k: string]: any
}>

export interface ColorBaseProps extends WidgetProps<MuiWidgetBinding<{}>> {
    styles?: Partial<Classes<any>>
    refocus?: boolean
    forceIcon?: boolean
    pickerProps?: object
    PickerContainer?: PickerContainer
    ColorPicker: ColorPicker
}

/**
 * To close the picker dialog on blur change
 */
const ColorCloser = ({setHasFocus}: { setHasFocus: (focus: boolean) => void }) => <button
    style={{position: 'fixed', width: '100%', inset: 0, border: 0, zIndex: 1, background: 0}}
    aria-label={'Close Color Picker'}
    title={'Close Color Picker'}
    /* onClick is called when user clicks any where on page */
    onClick={() => setHasFocus(false)}
    /* on Blur is called when changing keyboard focus*/
    onBlur={() => setHasFocus(false)}
/>

const PickerPosition = ({children}) => <div style={{position: 'relative'}}>
    <div
        style={{position: 'absolute', zIndex: 2}}
    >{children}</div>
</div>

export const ColorBase = (
    {
        storeKeys, schema,
        value, onChange,
        required, PickerContainer, ColorPicker,
        styles: customStyles = {}, refocus = true, forceIcon = false,
        pickerProps = {},
        ...props
    }: ColorBaseProps & WithScalarValue,
) => {
    const inputRef = React.useRef<HTMLInputElement | null>(null)
    const [hasFocus, setHasFocus] = React.useState(false)
    const [inputType, setInputType] = React.useState('')
    const stringValue = typeof value === 'string' ? value : undefined

    const InputProps = hasFocus || value || forceIcon || schema.getIn(['view', 'iconOn']) ? {
        startAdornment: <InputAdornment position="start" style={{cursor: 'pointer'}}>
            <Palette style={{fill: stringValue}}/>
        </InputAdornment>,
    } : {}

    const styles = merge({}, customStyles)
    const format = schema.get('format')

    const PickerWrapper = PickerContainer || PickerPosition

    return <React.Fragment>
        {hasFocus ? <ColorCloser setHasFocus={setHasFocus}/> : null}

        <StringRenderer
            schema={schema}
            value={stringValue}
            onChange={onChange}
            storeKeys={storeKeys}
            inputRef={inputRef}
            required={required}
            // no longer setting `focus` on elements `setFocus`, as otherwise e.g. `Dialog` can not be cloased again
            // the dialog is opened because of `onClick`, after closing the dialog, the input is focused automatically
            onClick={() => setHasFocus(true)}
            InputProps={InputProps}
            {...props}
        />

        {hasFocus ? <PickerWrapper
            setFocus={setHasFocus}
            hasFocus={hasFocus}
        >
            <ColorPicker
                // todo: may be object or string, but object would never reach here atm. as requires `extractValue` to get passed down
                color={stringValue || ''}
                disableAlpha={
                    schema.getIn(['view', 'alpha']) !== true ||
                    format === 'hex' ||
                    format === 'rgb'
                }
                onChange={(color, e) => {
                    setInputType(e && e.type)
                    onChange({
                        storeKeys: storeKeys,
                        scopes: ['value'],
                        type: 'set',
                        schema,
                        required,
                        data: {value: convertColor(color, format)},
                    })
                }}
                onChangeComplete={() => {
                    const type = inputType
                    // refocus with input field/dialog could lead to errors
                    // type is empty when e.g. user input/state controlled changes
                    // todo: are change, keydown only needed no-focus events?
                    setInputType('')
                    if(!refocus || type === 'change' || type === 'keydown' || !type) return

                    if(inputRef && inputRef.current) {
                        // refocus the input field, better ux for keyboard, e.g.: color-deletion by keyboard and not page-back
                        inputRef.current.focus()
                    }
                }}
                styles={styles}
                {...pickerProps}
            />
        </PickerWrapper> : null}

        {hasFocus ? <ColorCloser setHasFocus={setHasFocus}/> : null}
    </React.Fragment>
}
