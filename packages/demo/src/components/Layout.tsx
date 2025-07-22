import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { PageHome } from '../pages/PageHome.js'
import { PageDemoWidget } from '../pages/PageDemoWidget.js'
import { PageDemoWidgetColorful } from '../pages/PageDemoWidgetColorful.js'

export const Layout: React.ComponentType<{}> = () => {
    const scrollWrapper = React.useRef<HTMLDivElement | null>(null)

    return <div
        ref={scrollWrapper}
        style={{
            display: 'flex',
            flexDirection: 'column',
            maxHeight: '100%',
            position: 'relative',
            color: '#ffffff',
            overflow: 'auto',
            padding: '0 12px',
        }}
    >
        <Routes>
            <Route path={'/'} element={<PageHome/>}/>
            <Route path={'/widget'} element={<PageDemoWidget/>}/>
            <Route path={'/widget-colorful'} element={<PageDemoWidgetColorful/>}/>
        </Routes>
    </div>
}
