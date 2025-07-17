import { baseComponents, bindingExtended, MuiBinding, SchemaGridHandler, typeWidgets } from '@ui-schema/ds-material'
import { requiredPlugin, validatorPlugin } from '@ui-schema/json-schema'
import { DefaultHandler, ValidityReporter } from '@ui-schema/react'
import { schemaPluginsAdapterBuilder } from '@ui-schema/react/SchemaPluginsAdapter'
import { WidgetProps } from '@ui-schema/react/Widget'
import React from 'react'
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

const ColorfulHex: React.FC<WidgetProps> = (props) => <WidgetColorful ColorfulPicker={HexColorPicker} {...props}/>
const ColorfulHslaBase: React.FC<WidgetProps> = (props) => <WidgetColorful ColorfulPicker={HslaColorPicker} {...props}/>
// const ColorfulHsla = extractValue(memo(ColorfulHslaBase))
const ColorfulRgbaBase: React.FC<WidgetProps> =
    (props) =>
        <WidgetColorful
            // todo: find a way to safely type the inner `ColorfulPicker`, as this is not incorrect per-se,
            //       as the widget handles string vs. object on change / rendering
            // @ts-ignore
            ColorfulPicker={props.schema.get('type') === 'string' ? RgbaStringColorPicker : RgbaColorPicker}
            {...props}
        />
// const ColorfulRgba = extractValue(memo(ColorfulRgbaBase))

export const customWidgets: MuiBinding = {
    ...baseComponents,

    // Widget mapping by schema type or custom ID.
    widgets: {
        ...typeWidgets,
        ...bindingExtended,

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
        ColorfulHsla: ColorfulHslaBase,
        ColorfulRgba: ColorfulRgbaBase,
    },

    widgetPlugins: [
        DefaultHandler,
        schemaPluginsAdapterBuilder([
            validatorPlugin,
            requiredPlugin,
        ]),
        SchemaGridHandler,
        ValidityReporter,
    ],
}
