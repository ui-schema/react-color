import React from "react";
import {ChromePicker} from 'react-color';
import merge from "deepmerge";
import {useTheme} from "@mui/material/styles";
import {ColorBase} from "@ui-schema/material-color/Base/ColorBase";
import {ColorDialogBase} from "@ui-schema/material-color/Base/ColorDialogBase";
import {ColorStaticBase} from "@ui-schema/material-color/Base/ColorStaticBase";

export const Color = (props) => {
    const {palette} = useTheme();
    return <ColorBase {...props} ColorPicker={ChromePicker} styles={chromeStyles(palette)}/>
};

const chromeStyles = palette => ({
    'default': {
        picker: {
            background: palette.background.paper,
        },
        alpha: {
            background: '#ffffff',
        },
    }
});

const stylesDialog = palette => merge({
    'default': {
        picker: {
            boxShadow: '0',
        }
    }
}, chromeStyles(palette));

export const ColorDialog = (props) => {
    const {palette} = useTheme();
    return <ColorDialogBase {...props} ColorPicker={ChromePicker} styles={stylesDialog(palette)}/>
};

const stylesStatic = palette => merge({
    'default': {
        picker: {
            boxShadow: '0',
            width: '100%',
        }
    }
}, chromeStyles(palette));

export const ColorStatic = (props) => {
    const {palette,} = useTheme();
    return <ColorStaticBase {...props} ColorPicker={ChromePicker} styles={stylesStatic(palette)}/>
};
