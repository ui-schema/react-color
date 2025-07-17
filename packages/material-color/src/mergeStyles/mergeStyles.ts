import { Classes } from 'reactcss'

export function mergeStyles(style: Partial<Classes<any>>, ...styles: Partial<Classes<any>>[]): Partial<Classes<any>> {
    const base = {...style}

    for(const styleB of styles) {
        if(!styleB) continue

        for(const variant in styleB) {
            if(!base[variant]) {
                base[variant] = {}
            }

            for(const component in styleB[variant]) {
                const componentStyleB = styleB[variant]![component]
                const componentStyleA = base[variant]![component] ?? {}

                base[variant]![component] = {
                    ...componentStyleA,
                    ...componentStyleB,
                }
            }
        }
    }

    return base
}
