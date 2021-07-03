import React from 'react';
import { Grid } from "@material-ui/core";
import UpdateDetails from '../../components/EditProfile/UpdateDetails';
import UpdateAvatar from '../../components/EditProfile/UpdateAvatar';
import ViewContacts from '../../components/EditProfile/ViewContacts';
import ManageInvites from '../../components/EditProfile/ManageInvites';
import ViewContactDetails from '../../components/EditProfile/ViewContactDetails';

export default function Profile() {
    return (
        <Grid container spacing={2}>
            <Grid item xs={4}>
                <UpdateAvatar />
            </Grid>
            <Grid item xs={8}>
                <UpdateDetails />
            </Grid>
            <Grid item xs={4}>
                <ViewContacts />
            </Grid>
            <Grid item xs={4}>
                <ManageInvites />
            </Grid>
            <Grid item xs={4}>
                <ViewContactDetails />
            </Grid>
        </Grid>
            
    )
}

