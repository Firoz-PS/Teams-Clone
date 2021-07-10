import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({ 
  editIcon: {
    backgroundColor: theme.palette.primary.main,
    color: "white",
    "&:hover" : {
        backgroundColor: theme.palette.primary.dark,
    }
  },
  hiddenInput: {
    display: "none"  
  },
  content: {
    height: "75vh",
    position: "relative"  
  },
  userDetailsCard: {
    height: "75vh",
    position: "relative",
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  newChatButton: {
    position: "absolute",
    right: theme.spacing(2),
    bottom: theme.spacing(2)  
  }  
}));
