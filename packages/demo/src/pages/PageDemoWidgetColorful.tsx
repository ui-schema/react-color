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

export const PageDemoWidgetColorful: React.ComponentType = () => {
    return <>
        <Container maxWidth={'md'} fixed style={{display: 'flex'}}>
            <Nav/>
            <Box mx={2} py={1} style={{flexGrow: 1}}>
                <Box mb={2}>
                    <Typography variant={'h1'} gutterBottom>UI-Schema Widgets</Typography>
                    <Typography variant={'body1'}>
                        {'Color pickers as UI-Schema widgets using '}
                        <Link
                            href={'https://www.npmjs.com/package/react-colorful'}
                            target={'_blank'} rel={'noopener noreferrer'}
                        >react-colorful</Link>
                        .
                    </Typography>
                    <Typography variant={'body1'}>
                        <Link
                            href={'https://github.com/ui-schema/react-color/blob/main/packages/demo/src/pages/PageDemoWidgetColorful.tsx'}
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
            widget: 'Colorful',
            view: {
                sizeXs: 12,
                sizeMd: 6,
            },
        },
        color_2: {
            type: 'string',
            widget: 'Colorful',
            view: {
                sizeXs: 12,
                sizeMd: 6,
            },
        },
        color_hsla: {
            type: 'object',
            widget: 'ColorfulHsla',
            view: {
                sizeXs: 12,
                sizeMd: 6,
            },
        },
        color_hsla2: {
            type: 'object',
            widget: 'ColorfulHsla',
            view: {
                sizeXs: 12,
                sizeMd: 6,
                pickerHeight: 125,
                showValueText: true,
            },
        },
        color_rgba: {
            type: 'object',
            widget: 'ColorfulRgba',
            view: {
                sizeXs: 12,
                sizeMd: 6,
                pickerHeight: 125,
                showValueText: true,
            },
        },
        color_rgba_string: {
            type: 'string',
            widget: 'ColorfulRgba',
            view: {
                sizeXs: 12,
                sizeMd: 6,
                pickerHeight: 125,
                showValueText: true,
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
