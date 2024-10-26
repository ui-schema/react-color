import * as React from 'react'
import { WidgetProps } from '@ui-schema/ui-schema/Widget'

export type PickerContainer = React.ComponentType<React.PropsWithChildren<{
    setFocus: () => void
    hasFocus: boolean
}>>

export type ColorPicker = React.ComponentType<{
    color?: string
    disableAlpha?: boolean
    onChange?: (color: string) => void
    styles?: React.CSSProperties
    // todo: stricter typings would need to know which Picker is rendered
    [k: string]: any
}>

export interface ColorBaseProps extends WidgetProps {
    styles?: React.CSSProperties
    refocus?: boolean
    forceIcon?: boolean
    pickerProps?: object
    PickerContainer?: PickerContainer
    ColorPicker: ColorPicker
}

export function ColorBase<P extends ColorBaseProps>(props: P): React.ReactElement<P>
