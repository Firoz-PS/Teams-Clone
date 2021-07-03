import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  callPanel: {
    height: "90%",
  },
  Paper: {
    display: "flex",
    position: "relative"
    //minHeight: "100%",  
  },
  video: {
    maxHeight: "100%",
    maxWidth: "100%",
    borderRadius: theme.shape.borderRadius
  },
  nameOnVideo: {
      position: "absolute",
      top: "0",
      left: "0",
      backgroundColor: "white",
      opacity: ".7",
      borderRadius: "4px 0 4px 0",
      padding: "0 4px"

  }
}));

export default useStyles;
