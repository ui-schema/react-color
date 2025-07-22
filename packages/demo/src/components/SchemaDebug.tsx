import Typography from '@mui/material/Typography'
import { useUIStore } from '@ui-schema/react/UIStore'
import { SomeSchema } from '@ui-schema/ui-schema/CommonTypings'
import React, { ReactNode } from 'react'
import { List } from 'immutable'
import { useUIStoreActions } from '@ui-schema/react/UIStoreActions'
import { useTheme } from '@mui/material/styles'
import { ImmutableEditor, themeMaterial } from 'react-immutable-editor'
import Paper from '@mui/material/Paper'

const StyledEditor: React.FC<{
    data: any
    onChange: any
    getVal: any
    title?: ReactNode
}> = p => {
    const {data, onChange, getVal, title} = p
    const theme = useTheme()
    return <Paper
        variant={'outlined'}
        sx={{
            mx: 1,
            my: 2,
            px: 1,
        }}
    >
        {title ?
            <Typography variant={'subtitle2'} color={'primary'} sx={{my: 0.5}}>{title}</Typography> : null}

        <ImmutableEditor
            data={data}
            onChange={onChange}
            getVal={getVal}
            invertTheme={theme.palette.mode === 'dark'}
            theme={{
                ...themeMaterial,
                base00: theme.palette.background.paper,
                base0D: theme.palette.text.secondary,
                base0B: theme.palette.text.primary,
            }}
        />
    </Paper>
}

export const SchemaDebug: React.FC<{ schema: SomeSchema }> = ({schema}) => {
    const {store} = useUIStore()
    const {onChange} = useUIStoreActions()

    return <React.Fragment>
        <StyledEditor
            title={<code>UIStore.values</code>}
            data={store?.getValues()}
            onChange={(keys, value) => {
                onChange({
                    storeKeys: List(keys),
                    scopes: ['value'],
                    type: 'update',
                    updater: () => ({value: value}),
                    required: false,
                })
            }}
            getVal={keys => store?.getValues().getIn(keys)}
        />

        <StyledEditor
            title={<code>Schema</code>}
            data={schema}
            onChange={() => console.log('not implemented')}
            getVal={keys => schema.getIn(keys)}
        />
    </React.Fragment>
}
