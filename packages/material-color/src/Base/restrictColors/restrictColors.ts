import { StoreSchemaType } from '@ui-schema/ui-schema/CommonTypings'
import { List } from 'immutable'

const restrictColors = (pickerProps: any, schema: StoreSchemaType, nestedArray?: boolean): void => {
    // todo: nested array should support grouping, needed only for SwatchesPicker
    if(schema.get('enum')) {
        pickerProps['colors'] = schema.get('enum').toArray()
        if(nestedArray) pickerProps['colors'] = [pickerProps['colors']]
    } else if(schema.getIn(['view', 'colors'])) {
        pickerProps['colors'] = (schema.getIn(['view', 'colors']) as List<string>).toArray()
        if(nestedArray) pickerProps['colors'] = [pickerProps['colors']]
    }
}

export { restrictColors }
