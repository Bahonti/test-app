import React from 'react'
import { useHistory, Link } from 'react-router-dom'
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { makeStyles } from '@material-ui/core/styles';
import { toast } from 'react-toastify'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
    title: {
      flexGrow: 1,
      color: '#ffffff',
      textDecoration: 'none'
    },
    links: {
      textDecoration: 'none'
    }
}));

const Header = () => {
    const history = useHistory()
    const classes = useStyles();
    const user = useTracker(() => Meteor.user());
  

    const handleLogout = () => {
        Meteor.logout((err) => {
            if (!err) {
                history.push('/login')
            } else {
                toast('Failed')
            }
        })
    }

    return (
        <AppBar position="static">
            <Toolbar>
            <Link to='/' className={classes.title}>
                <Typography variant="h6">
                Test App
                </Typography>
            </Link>
            {user ? (
                <>
                <Link to='/admin' className={classes.links}>
                <Button color="secondary">Admin panel</Button>
                </Link>
                <Button color="secondary" onClick={handleLogout}>Log out</Button>
                </>
            ) : (
                <>
                <Link to='/login' className={classes.links}>
                    <Button color="secondary">Login</Button>
                </Link>
                <Link to='/register' className={classes.links}>
                    <Button color="secondary">Register</Button>
                </Link>
                </>
            )}
            </Toolbar>
        </AppBar>
    )
}

export default Header