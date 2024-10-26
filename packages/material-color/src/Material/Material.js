import {useTheme} from "@mui/material/styles";
import {MaterialPicker} from 'react-color';
import {ColorBase} from "@ui-schema/material-color/Base/ColorBase";
import React from "react";

export const ColorMaterial = (props) => {
    const {palette} = useTheme();
    const styles = {
        'default': {material: {background: palette.background.paper, width: 160, height: 130},}
    };
    return <ColorBase {...props} ColorPicker={MaterialPicker} styles={styles}/>
};

