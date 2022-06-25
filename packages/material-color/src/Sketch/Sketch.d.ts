import * as React from 'react'
import { ColorBaseProps, ColorDialogBaseProps, ColorStaticBaseProps } from '@ui-schema/material-color/Base'

export function ColorSketch<P extends Omit<ColorBaseProps, 'ColorPicker' | 'styles'>>(props: P): React.ReactElement<P>

export function ColorSketchDialog<P extends Omit<ColorDialogBaseProps, 'ColorPicker' | 'styles'>>(props: P): React.ReactElement<P>

export function ColorSketchStatic<P extends Omit<ColorStaticBaseProps, 'ColorPicker' | 'styles'>>(props: P): React.ReactElement<P>
