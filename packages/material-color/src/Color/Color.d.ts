import * as React from 'react'
import { ColorBaseProps, ColorDialogBaseProps, ColorStaticBaseProps } from '@ui-schema/material-color/Base'

export function Color<P extends Omit<ColorBaseProps, 'ColorPicker' | 'styles'>>(props: P): React.ReactElement<P>

export function ColorDialog<P extends Omit<ColorDialogBaseProps, 'ColorPicker' | 'styles'>>(props: P): React.ReactElement<P>

export function ColorStatic<P extends Omit<ColorStaticBaseProps, 'ColorPicker' | 'styles'>>(props: P): React.ReactElement<P>
