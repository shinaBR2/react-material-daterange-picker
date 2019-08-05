import * as React from "react";
import { Theme, WithStyles } from "@material-ui/core";
interface DayProps extends WithStyles<typeof styles> {
    filled?: boolean;
    outlined?: boolean;
    highlighted?: boolean;
    disabled?: boolean;
    startOfRange?: boolean;
    endOfRange?: boolean;
    onClick?: () => void;
    onHover?: () => void;
    value: number | string;
}
declare const styles: (theme: Theme) => Record<"filled" | "button" | "outlined" | "leftBorderRadius" | "rightBorderRadius" | "buttonContainer" | "buttonText" | "highlighted" | "contrast", import("@material-ui/core/styles/withStyles").CSSProperties>;
declare const _default: React.ComponentType<Pick<React.PropsWithChildren<DayProps>, "filled" | "disabled" | "children" | "onClick" | "value" | "outlined" | "highlighted" | "startOfRange" | "endOfRange" | "onHover"> & import("@material-ui/core").StyledComponentProps<"filled" | "button" | "outlined" | "leftBorderRadius" | "rightBorderRadius" | "buttonContainer" | "buttonText" | "highlighted" | "contrast">>;
export default _default;
