import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  callPanel: {
    height: "90%",
    display: "flex",
  },
  Paper: {
    display: "flex",
    position: "relative"
    //minHeight: "100%",  
  },
  callBottomBar: {
    display: "flex",
    position: "absolute",
    bottom: theme.spacing(1),
    flexGrow: 1
  },
  video: {
    maxHeight: "100%",
    maxWidth: "100%",
    borderRadius: theme.shape.borderRadius
  },
  chatDrawer: {
    height: "82vh"
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
