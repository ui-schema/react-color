import { ColorBaseProps, ColorStaticBaseProps } from '@ui-schema/material-color/Base'
import * as React from 'react'

export interface ColorCircleProps extends ColorBaseProps {
    circleSpacing?: number
    circleSize?: number
}

export interface ColorCircleStaticProps extends ColorStaticBaseProps {
    circleSpacing?: number
    circleSize?: number
}

export function ColorCircle<P extends Omit<ColorCircleProps, 'ColorPicker' | 'styles'>>(props: P): React.ReactElement<P>

export function ColorCircleStatic<P extends Omit<ColorCircleStaticProps, 'ColorPicker' | 'styles'>>(props: P): React.ReactElement<P>
