import React from 'react'
import Container from '@mui/material/Container'
import { Nav } from '../components/Nav'

export const PageHome: React.ComponentType = () => {
    return <>
        <>
            <title>Color Picker Widgets for UI-Schema</title>
        </>
        <Container maxWidth={'md'} fixed>
            <Nav/>
        </Container>
    </>
}
