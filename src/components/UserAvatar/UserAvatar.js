import React from "react";
import { useTheme } from "@material-ui/styles";

// styles
import useStyles from "./styles";

// components
import { Typography } from "../Wrappers/Wrappers";

export default function UserAvatar({ color = "primary", ...props }) {
  var classes = useStyles();
  var theme = useTheme();

  var letters =`${props.firstName[0]}  ${props.lastName[0]}`
  console.log(letters)

  return (
    <div
      className={classes.avatar}
      style={{ backgroundColor: theme.palette[color].main, width: props.size, height: props.size }}
    >
      <Typography className={classes.text}>{letters}</Typography>
    </div>
  );
}
