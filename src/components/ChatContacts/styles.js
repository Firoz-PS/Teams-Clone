import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  header: {
    backgroundColor: theme.palette.primary.light,
  },
  content: {
    height: "75vh",
    position: "relative"  
  },
  newChatButton: {
    position: "absolute",
    right: theme.spacing(2),
    bottom: theme.spacing(2)  
  }
}));
