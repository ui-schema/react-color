import { WithScalarValue } from '@ui-schema/ui-schema'
import React, { PropsWithChildren } from 'react'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import { ColorBase, ColorBaseProps, PickerContainer } from '@ui-schema/material-color/Base/ColorBase'
import { Trans } from '@ui-schema/ui-schema/Translate/Trans'

export interface ColorDialogBaseProps extends ColorBaseProps {
    hasFocus?: boolean
    setFocus?: Function
    /**
     * @deprecated use PickerContainer instead
     */
    CustomDialog?: PickerContainer
}

const ColorDialogDialog: PickerContainer = ({hasFocus, setFocus, children}) => <Dialog
    open={hasFocus} onClose={() => setFocus(false)}
>
    {children}
    <Button onClick={() => setFocus(false)}><Trans text={'labels.ok'}/></Button>
</Dialog>

// eslint-disable-next-line deprecation/deprecation
export const ColorDialogBase = ({ColorPicker, PickerContainer, CustomDialog, ...props}: PropsWithChildren<ColorDialogBaseProps> & WithScalarValue) => (
    <ColorBase
        {...props}
        PickerContainer={PickerContainer || CustomDialog || ColorDialogDialog}
        ColorPicker={ColorPicker}
        refocus={false}
    />
)
