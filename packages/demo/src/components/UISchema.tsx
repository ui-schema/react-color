import React from 'react'
import {
    extractValue, memo,
    WidgetProps,
    WidgetsBindingFactory, WithScalarValue, WithValue,
} from '@ui-schema/ui-schema'
import { MuiWidgetsBindingCustom, MuiWidgetsBindingTypes, widgets } from '@ui-schema/ds-material/widgetsBinding'
import {
    Color, ColorDialog,
    ColorSwatches,
    ColorCircle, ColorCompact, ColorMaterial,
    ColorBlock, ColorTwitter, ColorSlider,
    ColorAlpha, ColorHue, ColorSketch,
    ColorSliderStatic, ColorStatic,
    ColorCircleStatic, ColorTwitterStatic,
    ColorSketchStatic, ColorSketchDialog,
} from '@ui-schema/material-color'

import { WidgetColorful } from '@ui-schema/material-colorful'
import {
    HexColorPicker,
    HslaColorPicker,
    RgbaColorPicker,
    RgbaStringColorPicker,
} from 'react-colorful'

export type CustomWidgetsBinding = WidgetsBindingFactory<{}, MuiWidgetsBindingTypes<{}>, MuiWidgetsBindingCustom<{}>>

const ColorfulHex: React.FC<WidgetProps & WithScalarValue> = (props) => <WidgetColorful ColorfulPicker={HexColorPicker} {...props}/>
const ColorfulHslaBase: React.FC<WidgetProps & WithValue> = (props) => <WidgetColorful ColorfulPicker={HslaColorPicker} {...props}/>
const ColorfulHsla = extractValue(memo(ColorfulHslaBase))
const ColorfulRgbaBase: React.FC<WidgetProps & (WithScalarValue | WithValue)> =
    (props) =>
        <WidgetColorful
            // todo: find a way to safely type the inner `ColorfulPicker`, as this is not incorrect per-se,
            //       as the widget handles string vs. object on change / rendering
            // @ts-ignore
            ColorfulPicker={props.schema.get('type') === 'string' ? RgbaStringColorPicker : RgbaColorPicker}
            {...props}
        />
const ColorfulRgba = extractValue(memo(ColorfulRgbaBase))

export const customWidgets: CustomWidgetsBinding = {
    ...widgets,
    types: widgets.types,
    custom: {
        ...widgets.custom,
        Color,
        ColorDialog,
        ColorStatic,
        ColorSwatches,
        ColorCircle,
        ColorCompact,
        ColorMaterial,
        ColorTwitter,
        ColorBlock,
        ColorSlider,
        ColorAlpha,
        ColorHue,
        ColorSketch,
        ColorSliderStatic,
        ColorCircleStatic,
        ColorTwitterStatic,
        ColorSketchStatic,
        ColorSketchDialog,
        Colorful: ColorfulHex,
        ColorfulHsla: ColorfulHsla,
        ColorfulRgba: ColorfulRgba,
    },
}
