import { SomeSchema } from '@ui-schema/ui-schema/CommonTypings'
import { List } from 'immutable'

export const restrictColors = (pickerProps: any, schema: SomeSchema, nestedArray?: boolean): void => {
    // todo: nested array should support grouping, needed only for SwatchesPicker
    if(schema.get('enum')) {
        pickerProps['colors'] = schema.get('enum').toArray()
        if(nestedArray) pickerProps['colors'] = [pickerProps['colors']]
    } else if(schema.getIn(['view', 'colors'])) {
        pickerProps['colors'] = (schema.getIn(['view', 'colors']) as List<string>).toArray()
        if(nestedArray) pickerProps['colors'] = [pickerProps['colors']]
    }
}
