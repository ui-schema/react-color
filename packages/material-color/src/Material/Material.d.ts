import * as React from 'react'
import { ColorBaseProps } from '@ui-schema/material-color/Base'

export function ColorMaterial<P extends Omit<ColorBaseProps, 'ColorPicker' | 'styles'>>(props: P): React.ReactElement<P>
