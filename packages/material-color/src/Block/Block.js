import useTheme from "@mui/material/styles/useTheme";
import {restrictColors} from "../Base/restrictColors";
import {ColorBase} from "../Base/ColorBase/ColorBase";
import React from "react";
import {BlockPicker} from 'react-color';

export const ColorBlock = ({hideInput = true, ...props}) => {
    const {palette, shape} = useTheme();
    const styles = {
        'default': {
            body: hideInput ? {padding: '10px 10px 0 10px'} : {},
            card: {
                background: palette.background.paper,
                marginTop: 6,
                boxShadow: 'rgba(0, 0, 0, 0.12) 0px 2px 10px, rgba(0, 0, 0, 0.16) 0px 2px 5px',
                borderRadius: shape.borderRadius,
            },
            input: {display: hideInput ? 'none' : 'block'},
        }
    };

    const pickerProps = props.pickerProps || {};
    restrictColors(pickerProps, props.schema,);

    return <ColorBase
        {...props} styles={styles}
        ColorPicker={BlockPicker}
        pickerProps={pickerProps}
    />
};
