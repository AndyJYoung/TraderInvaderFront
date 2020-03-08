import React, { } from 'react';
import { List, ListItem, Toolbar, AppBar, TextField, InputAdornment, IconButton, Button, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom';
import { VisibilityOff, Visibility } from '@material-ui/icons'
import templogo from '../../../templogo.png';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DAF96',
    height: '100vh'
  },
  button: {
    background: '#53E121',
    "&:hover": {
      background: '#43AA1F'
    },
    color: 'black',
    padding: '0 30px',
    fontSize: 17,
    borderRadius: 25,
    height: 50,
    width: 150
  },
  text: {
    underline: {
      borderWidth: '3px',
    },
    '&:before': {
      borderWidth: '3px',
      borderColor: 'black',
    },
    '&:after': {
      borderWidth: '3px',
      borderColor: '#53E121',
    }
  },
  toolbar: {
    background: '#0A0708',
    flexFlow: 1,
    height: '150px',
  },
  logo: {
    margin: 'auto',
    textAlign: 'center',
    width: '100px',
    height: '120px',
  },
  logoHorizontallyCenter: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)'
  },
});

function ChangePassVerification(props) {
  const classes = useStyles()

  const [values, setValues] = React.useState({
    showPassword: false,
  })

  const handleClickShowPassword = () => { setValues({ ...values, showPassword: !values.showPassword }) }

  const handleMouseDownPassword = event => { event.preventDefault() }

  const handleSubmit = () => {
    const tok = localStorage.getItem('token')
    
    console.log(tok)
    console.log(props.oldpass)
    console.log(props.password)

    axios.put(`/users/${props.username}/password`, {
      access_token: tok,
      previous_password: props.oldpass,
      proposed_password: props.password,
    })
      .then(function (response) {
        console.log(response)
      }).catch(function (error) {
        console.log(error);
      })
  }

  return (
    <div className={classes.root}>
      <List>
            <List style={{ marginRight: '-40px' }} >
            <ListItem style={{ marginTop: '10px' }}>
                <TextField
                  onChange={e => props.setOldPass(e.target.value)}
                  InputProps={{ classes: { underline: classes.text } }}
                  error={
                    (props.create && props.oldpass === '') ||
                    (props.create && props.oldpass === props.confirm) ||
                    (props.create && props.oldpass === props.password)}
                  name='password'
                  placeholder='Old Password'
                  type={values.showPassword ? 'text' : 'password'} />
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge='end'>
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              </ListItem>
              <ListItem style={{ marginTop: '10px' }}>
                <TextField
                  onChange={e => props.setPassword(e.target.value)}
                  InputProps={{ classes: { underline: classes.text } }}
                  error={
                    (props.create && props.password === '') ||
                    (props.create && props.password !== props.confirm) ||
                    (props.create && props.password === props.oldpass) }
                  name='password'
                  placeholder='New Password'
                  type={values.showPassword ? 'text' : 'password'} />
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge='end'>
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              </ListItem>
              <ListItem style={{ marginTop: '10px' }}>
                <TextField
                  onChange={e => props.setConfirm(e.target.value)}
                  InputProps={{ classes: { underline: classes.text } }}
                  error={
                    (props.create && props.confirm === '') ||
                    (props.create && props.password !== props.confirm) ||
                    (props.create && props.confirm === props.oldpass) }
                  name='confirm'
                  placeholder='Confirm New Password'
                  type={values.showPassword ? 'text' : 'password'} />
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge='end'>
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              </ListItem>
              {props.create && (
                <ListItem>
                  <Typography
                    style={{ fontSize: 12, color: 'red' }} >
                    information entered is incomplete
                  </Typography>
                </ListItem>)}
            </List>
            <ListItem
              style={{ justifyContent: 'center', marginTop: '30px' }}>
              <Link to='/app/profile' style={{ textDecoration: 'none' }}>
                <Button className={classes.button}
                  onClick={handleSubmit}
                  variant='text'>Confirm</Button>
              </Link>
            </ListItem>
          </List>
    </div>
  )
}

export default ChangePassVerification