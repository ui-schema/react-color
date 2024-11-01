import React from 'react'
import Helmet from 'react-helmet'
import Container from '@mui/material/Container'
import { Nav } from '../components/Nav'

export const PageHome: React.ComponentType = () => {
    return <>
        <Helmet>
            <title>Color Picker Widgets for UI-Schema</title>
        </Helmet>
        <Container maxWidth={'md'} fixed>
            <Nav/>
        </Container>
    </>
}
