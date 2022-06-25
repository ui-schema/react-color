import * as React from 'react'
import { ColorBaseProps, ColorStaticBaseProps } from '@ui-schema/material-color/Base'

export function ColorTwitter<P extends Omit<ColorBaseProps, 'ColorPicker' | 'styles'>>(props: P): React.ReactElement<P>

export function ColorTwitterStatic<P extends Omit<ColorStaticBaseProps, 'ColorPicker' | 'styles'>>(props: P): React.ReactElement<P>
