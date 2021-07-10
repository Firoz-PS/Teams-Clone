import { useState, useContext } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Divider,
  Grid,
  TextField,
  Typography,
  Avatar,
  IconButton,
  Input
} from '@material-ui/core';
import {
  Edit as EditIcon ,
} from "@material-ui/icons";

// contexts
import UserContext from "../../context/AuthContext";

// styles
import useStyles from "./styles";
import UserAvatar from '../UserAvatar/UserAvatar';

const ViewContactDetails = () => {
  const classes = useStyles()
  const { user } = useContext(UserContext)

  return (
      <Card>
        <CardHeader
          title="Contact Details"
        />
        <Divider />
        <CardContent className={classes.userDetailsCard}>
        <UserAvatar firstName={user.firstName} lastName={user.lastName} size={`90px`} />
        <Typography
          color="textPrimary"
          gutterBottom
          variant="h3"
        >
          {`${user.firstName} ${user.lastName}`} 
        </Typography>
        <Typography
          color="textSecondary"
          variant="body1"
          gutterBottom
        >
          Email : {user.email}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body1"
          gutterBottom
        >
          Phone Number: {user.phoneNo}
        </Typography>
        <Typography
        color="textSecondary"
        variant="body1"
        gutterBottom
      >
        Organization : {user.organization}
      </Typography>
      <Typography
      color="textSecondary"
      variant="body1"
      gutterBottom
    >
      Date of Birth : {user.dateOfBirth}
    </Typography>
    <Divider />
        <CardActions>
        <Button
          color="secondary"
          type="submit"
          variant="contained"
        >
        Remove from contacts
        </Button>
        </CardActions>
        </CardContent>      
      </Card>
  );
};

export default ViewContactDetails;