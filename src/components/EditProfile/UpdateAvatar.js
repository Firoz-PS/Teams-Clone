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

const UpdateAvatar = () => {
  const classes = useStyles()
  const { user, updateAvatar } = useContext(UserContext)
  const [avatar, setAvatar] = useState(user.avatar)

  const handlePhoto = (event) => {
    console.log(avatar)
    setAvatar(
      event.target.files[0]
    )
  };

  const handleAvatarSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("avatar", `${avatar}`)
    console.log(formData)
    updateAvatar(formData);
  }

  return (
    <form
      autoComplete="off"
      noValidate
      encType="multipart/form-data"
    >
      <Card>
        <CardHeader
          title="Edit Profile"
          subheader="Profile picture can be updated"  
        />
        <Divider />
        <CardContent>
        <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}
        >
        <Avatar
          src={avatar}
          sx={{
            height: 100,
            width: 100
          }}
        />
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
        >
          {user.email}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body1"
        >
          {user.phoneNo}
        </Typography>
        <CardActions>
        <Button
          color="primary"
          fullWidth
          variant="contained"
          component="label"
        >
          Upload picture
          <Input 
            type="file"
            accept="image/*"
            className={classes.hiddenInput}
            onChange={handlePhoto}
          />
        </Button>
        <Button
          color="primary"
          fullWidth
          type="submit"
          onClick={handleAvatarSubmit}
        >
        Confirm Changes
        </Button>
        </CardActions>
        </Box>
        </CardContent>        
      </Card>
    </form>
  );
};

export default UpdateAvatar;