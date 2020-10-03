import React, { useState } from 'react'
import { Meteor } from 'meteor/meteor';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'

const useStyles = makeStyles((theme) => ({
    form: {
      display: 'flex',
      flexDirection: 'column',
      maxWidth: 300,
      margin: 'auto',
      marginTop: 100
    },
}));

const LoginPage = () => {
    const classes = useStyles();
    const history = useHistory();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const submit = e => {
        e.preventDefault();

        Meteor.loginWithPassword(username, password, (err) => {
            if (!err) {
                history.push('/admin')
            } else {
                toast('Authentication failed')
            }
        })
    };

    return (
        <form onSubmit={submit} className={classes.form}>
            <TextField 
                label='Email'
                type="text"
                name="username"
                required
                onChange={e => setUsername(e.target.value)}
            />
    
            <TextField
                label='Password'
                type="password"
                name="password"
                required
                onChange={e => setPassword(e.target.value)}
            />
    
            <Button color='primary' type="submit">Log In</Button>
        </form>
    )
}

export default LoginPage