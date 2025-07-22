import * as React from 'react'

export const styleWrapper =
    <TPalette extends { background: { paper: string } }>(
        {
            palette, spacing,
        }: {
            palette: TPalette
            spacing: (space: number) => string
        },
    ): React.CSSProperties => ({
        background: palette.background.paper,
        boxShadow: 'rgba(0, 0, 0, 0.12) 0px 2px 10px, rgba(0, 0, 0, 0.16) 0px 2px 5px',
        width: 300,
        padding: spacing(2),
    })
