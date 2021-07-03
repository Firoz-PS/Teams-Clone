import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  Paper: {
    display: "flex",
    minHeight: "100%",  
  },
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
}));

export default useStyles;