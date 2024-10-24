import React from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Nav } from '../components/Nav'
import {
    createOrderedMap, createStore, injectPluginStack, JsonSchema,
    onChangeHandler, storeUpdater,
    UIStoreProvider,
} from '@ui-schema/ui-schema'
import { OrderedMap } from 'immutable'
import { GridContainer } from '@ui-schema/ds-material/GridContainer'
import Link from '@mui/material/Link'
import { SchemaDebug } from '../components/SchemaDebug'

export const PageDemoWidget: React.ComponentType = () => {
    return <>
        <Container maxWidth={'md'} fixed style={{display: 'flex'}}>
            <Nav/>
            <Box mx={2} py={1} style={{flexGrow: 1}}>
                <Box mb={2}>
                    <Typography variant={'h1'} gutterBottom>UI-Schema Widgets</Typography>
                    <Typography variant={'body1'}>
                        {'Color pickers as UI-Schema widgets using '}
                        <Link
                            href={'https://www.npmjs.com/package/react-color'}
                            target={'_blank'} rel={'noopener noreferrer'}
                        >react-color</Link>
                        .
                    </Typography>
                    <Typography variant={'body1'}>
                        <Link
                            href={'https://github.com/ui-schema/react-color/blob/main/packages/demo/src/pages/PageDemoWidget.tsx'}
                            target={'_blank'} rel={'noopener noreferrer'}
                        >source page</Link>
                        {', '}
                        <Link
                            href={'https://github.com/ui-schema/react-color/blob/main/packages/demo/src/components/UISchema.tsx'}
                            target={'_blank'} rel={'noopener noreferrer'}
                        >ui-schema setup</Link>
                    </Typography>
                </Box>
                <DemoComponent/>
            </Box>
        </Container>
    </>
}

const schema = createOrderedMap({
    type: 'object',
    properties: {
        color: {
            type: 'string',
            widget: 'Color',
            view: {
                sizeXs: 12,
                sizeMd: 6,
            },
        },
        color_2: {
            type: 'string',
            widget: 'Color',
            view: {
                sizeXs: 12,
                sizeMd: 6,
                alpha: true,
            },
        },
        color_3: {
            type: 'string',
            widget: 'Color',
            format: 'rgb',
            view: {
                sizeXs: 12,
                sizeMd: 6,
            },
        },
        color_4: {
            type: 'string',
            widget: 'Color',
            format: 'rgb+a',
            view: {
                sizeXs: 12,
                sizeMd: 6,
                alpha: true,
            },
        },
        color_5: {
            type: 'string',
            widget: 'Color',
            format: 'hex',
            pattern: '^#+([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$',
            view: {
                sizeXs: 12,
                sizeMd: 6,
            },
        },
        color_6: {
            type: 'string',
            widget: 'Color',
            format: 'hex',
            view: {
                sizeXs: 12,
                sizeMd: 6,
                alpha: true,// no effect here
            },
        },
        color_7: {
            type: 'string',
            widget: 'ColorDialog',
            format: 'hex',
            pattern: '^#+([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$',
            view: {
                sizeXs: 12,
                sizeMd: 6,
            },
        },
        color_8: {
            type: 'string',
            widget: 'ColorDialog',
            view: {
                sizeXs: 12,
                sizeMd: 6,
                alpha: true,
            },
        },
        color_swatch_1: {
            type: 'string',
            widget: 'ColorSwatches',
            view: {
                sizeXs: 12,
                sizeMd: 6,
            },
        },
        color_mat: {
            type: 'string',
            widget: 'ColorMaterial',
            view: {
                sizeXs: 12,
                sizeMd: 6,
            },
        },
        color_compact: {
            type: 'string',
            widget: 'ColorCompact',
            view: {
                sizeXs: 12,
                sizeMd: 6,
            },
        },
        color_circle: {
            type: 'string',
            widget: 'ColorCircle',
            view: {
                sizeXs: 12,
                sizeMd: 6,
                iconOn: true,
            },
        },
        color_block: {
            type: 'string',
            widget: 'ColorBlock',
            view: {
                sizeXs: 12,
                sizeMd: 6,
            },
        },
        color_twitter: {
            type: 'string',
            widget: 'ColorTwitter',
            view: {
                sizeXs: 12,
                sizeMd: 6,
            },
        },
        color_slider: {
            type: 'string',
            widget: 'ColorSlider',
            view: {
                sizeXs: 12,
                sizeMd: 6,
            },
        },
        color_sketch: {
            type: 'string',
            widget: 'ColorSketch',
            view: {
                sizeXs: 12,
                sizeMd: 6,
            },
        },
        color_hue: {
            type: 'string',
            widget: 'ColorHue',
            view: {
                sizeXs: 12,
                sizeMd: 6,
            },
        },
        color_alpha: {
            type: 'string',
            widget: 'ColorAlpha',
            view: {
                sizeXs: 12,
                sizeMd: 6,
            },
        },
        color_block_res: {
            type: 'string',
            widget: 'ColorBlock',
            enum: ['#000000', '#000500', '#004000', '#021000'],
            view: {
                sizeXs: 12,
                sizeMd: 6,
            },
        },
        color_swatches_2: {
            type: 'string',
            widget: 'ColorSwatches',
            enum: ['#000000', '#000500', '#004000', '#021000'],
            view: {
                sizeXs: 12,
                sizeMd: 6,
            },
        },
        color_sketch_restricted: {
            type: 'string',
            widget: 'ColorSketch',
            view: {
                colors: ['#000000', '#000500', '#004000', '#021000'],
                sizeXs: 12,
                sizeMd: 6,
            },
        },
        color_static_slider: {
            type: 'string',
            widget: 'ColorSliderStatic',
            view: {
                sizeXs: 12,
                sizeMd: 6,
            },
        },
        color_static: {
            type: 'string',
            widget: 'ColorStatic',
            view: {
                sizeXs: 12,
                sizeMd: 6,
            },
        },
        color_static_circle: {
            type: 'string',
            widget: 'ColorCircleStatic',
            view: {
                sizeXs: 12,
                sizeMd: 6,
            },
        },
        color_static_twitter: {
            type: 'string',
            widget: 'ColorTwitterStatic',
            view: {
                sizeXs: 12,
                sizeMd: 6,
            },
        },
        color_static_sketch: {
            type: 'string',
            widget: 'ColorSketchStatic',
            view: {
                sizeXs: 12,
                sizeMd: 6,
            },
        },
        color_dialog_sketch: {
            type: 'string',
            widget: 'ColorSketchDialog',
            view: {
                sizeXs: 12,
                sizeMd: 6,
            },
        },
    },
    required: ['color_2'],
} as JsonSchema)

const GridStack = injectPluginStack(GridContainer)
const DemoComponent = () => {
    const showValidity = true
    const [store, setStore] = React.useState(() => createStore(OrderedMap({})))

    const onChange: onChangeHandler = React.useCallback(
        (actions) => setStore(storeUpdater(actions)),
        [setStore],
    )

    return <React.Fragment>
        <UIStoreProvider
            store={store}
            onChange={onChange}
            showValidity={showValidity}
        >
            <GridStack
                schema={schema}
                showValidity={showValidity}
                isRoot
            />
            <Box mt={2}>
                <Typography variant={'subtitle1'} gutterBottom>Store & Schema Debug</Typography>
                <SchemaDebug schema={schema}/>
            </Box>
        </UIStoreProvider>
    </React.Fragment>
}
