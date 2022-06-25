import {CompactPicker} from 'react-color';
import useTheme from '@mui/material/styles/useTheme';
import {ColorBase} from '@ui-schema/material-color/Base';
import React from 'react';

export const ColorCompact = (props) => {
    const {palette} = useTheme();
    const styles = {
        'default': {compact: {background: palette.background.paper}},
    };
    const pickerProps = props.pickerProps || {};
    if(props.schema.getIn(['view', 'colors'])) {
        pickerProps['colors'] = props.schema.getIn(['view', 'colors']).toArray();
    }

    return <ColorBase
        {...props} styles={styles}
        ColorPicker={CompactPicker}
        pickerProps={pickerProps}
    />
};
