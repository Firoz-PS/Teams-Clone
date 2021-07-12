import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  cardBody: {
    height: "100%"
  },  
  header: {
    backgroundColor: theme.palette.primary.light,
  },
  chatBoxContent: {
    height: "70vh",
    position: "relative"  
  },
  chatContactsContent: {
    height: "75vh",
    position: "relative"  
  },
  input: {
    display: "flex"  
  },
  chatAvatarContainer: {
   margin: theme.spacing(1)   
  },
  myMessage: {
    display: "flex",
    justifyContent: "flex-end",
    textAlign: "right"
  },
  theirMessage: {
    display: "flex",
    justifyContent: "flex-start"
  },
  myMessageCard: {
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(1),
    color: "white"
  },
  theirMessageCard: {
    backgroundColor: theme.palette.secondary.light,
    padding: theme.spacing(1)
  },
  sendMessageField: {
    marginLeft: theme.spacing(1),
  }

}));
