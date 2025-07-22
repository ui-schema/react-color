import * as React from 'react'
import type { PropsWithChildren } from 'react'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import { ColorBase, ColorBaseProps, PickerContainer } from '@ui-schema/material-color/Base/ColorBase'
import { Translate } from '@ui-schema/react/Translate'

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
    <Button onClick={() => setFocus(false)}><Translate text={'labels.ok'}/></Button>
</Dialog>

// eslint-disable-next-line @typescript-eslint/no-deprecated
export const ColorDialogBase = ({ColorPicker, PickerContainer, CustomDialog, ...props}: PropsWithChildren<ColorDialogBaseProps>) => (
    <ColorBase
        {...props}
        PickerContainer={PickerContainer || CustomDialog || ColorDialogDialog}
        ColorPicker={ColorPicker}
        refocus={false}
    />
)
