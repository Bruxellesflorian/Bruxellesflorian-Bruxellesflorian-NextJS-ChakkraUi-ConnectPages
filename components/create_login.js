import React, { useState, useEffect } from 'react'
import { ViewOffIcon, ViewIcon } from '@chakra-ui/icons'

import {
  Button,
  FormLabel,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  FormHelperText,
  FormErrorMessage,
  CircularProgress,
  color,
} from '@chakra-ui/react'

const Create_login = () => {

  const [user, setUser] = useState({
    email: '',
    mdp1: '',
    mdp2: '',
  })

  const isError_email = user.email === ''
  const isError_password = user.mdp1 === ''

  const [validForm, setValidForm] = useState({
    emailOk: false,
    passwordOk: false,
  })

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handlePasswordVisibility = () => setShowPassword(!showPassword)
  const [showPassword, setShowPassword] = useState(false)

  const [colorControl, setcolorControl] = useState({
    colorEmail: '',
    colorMdp1: '',
    colorMdp2: '',
  })

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }
  let regValid = false

  const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
  const regexEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  useEffect(() => {
    if (user.email) {
      if (user.email.match(regexEmail)) {
        setcolorControl({ ...colorControl, colorEmail: 'green' })
        setValidForm({ ...validForm, emailOk: true })
      } else {
        setcolorControl({ ...colorControl, colorEmail: 'red' })
        setValidForm({ ...validForm, emailOk: false })
      }
      if (user.email === '') {
        setcolorControl({ ...colorControl, colorEmail: '' })
        setValidForm({ ...validForm, emailOk: false })
      }
    }
    if (user.mdp1) {
      if (user.mdp1.match(regexPassword)) {
        setcolorControl({ ...colorControl, colorMdp1: 'green' })
        regValid = true
      } else {
        setcolorControl({ ...colorControl, colorMdp1: 'red' })
        regValid = false
      }
      if (user.mdp1 === '') {
        setcolorControl({ ...colorControl, colorMdp1: '' })
      }
    }
    if (user.mdp2) {
      if (user.mdp2 === user.mdp1 && regValid) {
        setcolorControl({ ...colorControl, colorMdp2: 'green' })
        setValidForm({ ...validForm, passwordOk: true })
      } else {
        setcolorControl({ ...colorControl, colorMdp2: 'red' })
        setValidForm({ ...validForm, passwordOk: false })
      }
      if (user.mdp2 === '') {
        setcolorControl({ ...colorControl, colorMdp2: '' })
        setValidForm({ ...validForm, passwordOk: false })
      }
    }
  }, [user])

  const handleCreateAccount = async () => {
    setIsLoading(true)
    if (validForm.emailOk && validForm.passwordOk ) {
      console.log("ok");
      try {
        await userLogin( user.email, user.mdp2 )
        // setIsLoading(false)
      } catch (error) {
        setError('Invalid username or password')
        // setIsLoading(false)
      }
    } else {
      console.log('email or password incorrect')
    }
  }

  return (
    <>
      <FormControl isRequired mt={6} isInvalid={isError_email}>
        <FormLabel>Email</FormLabel>
        <Input
          style={{ background: colorControl.colorEmail }}
          type="email"
          placeholder="test@test.com"
          name="email"
          onChange={handleChange}
        />
        {!isError_email ? (
          <FormHelperText></FormHelperText>
        ) : (
          <FormErrorMessage>Email is required.</FormErrorMessage>
        )}
      </FormControl>
      <FormControl isRequired mt={6} isInvalid={isError_password}>
        <FormLabel>Create password</FormLabel>
        <InputGroup>
          <Input
            style={{ background: colorControl.colorMdp1 }}
            type={showPassword ? 'text' : 'password'}
            placeholder="*******"
            size="lg"
            name="mdp1"
            onChange={handleChange}
          />
          <InputRightElement width="3rem">
            <Button h="1.5rem" size="sm" onClick={handlePasswordVisibility}>
              {showPassword ? <ViewIcon /> : <ViewOffIcon />}
            </Button>
          </InputRightElement>
        </InputGroup>
        {!isError_password ? (
          <FormHelperText></FormHelperText>
        ) : (
          <FormErrorMessage>
            Minimum 7 characters, 1 uppercase letter,
            <br />1 lowercase letter, 1 number.
          </FormErrorMessage>
        )}
      </FormControl>
      <FormControl isRequired mt={6}>
        <FormLabel>Confirm password</FormLabel>
        <InputGroup>
          <Input
            style={{ background: colorControl.colorMdp2 }}
            type={showPassword ? 'text' : 'password'}
            placeholder="*******"
            size="lg"
            name="mdp2"
            onChange={handleChange}
          />
          <InputRightElement width="3rem">
            <Button h="1.5rem" size="sm" onClick={handlePasswordVisibility}>
              {showPassword ? <ViewIcon /> : <ViewOffIcon />}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button colorScheme="blue" mr={3} onClick={handleCreateAccount}>
        {isLoading ? (
          <CircularProgress isIndeterminate size="24px" color="teal" />
        ) : (
          'Confirm'
        )}
      </Button>
    </>
  )
}

export default Create_login
