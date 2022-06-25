import * as React from 'react'
import { ColorBaseProps } from '@ui-schema/material-color/Base'

export function ColorBlock<P extends Omit<ColorBaseProps, 'ColorPicker' | 'styles'>>(props: P): React.ReactElement<P>
