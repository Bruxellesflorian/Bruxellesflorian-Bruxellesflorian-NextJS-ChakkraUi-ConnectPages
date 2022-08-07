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
  CircularProgress 
} from '@chakra-ui/react'

const Create_login = () => {
  const [input, setInput] = useState(['', ''])

  const isError_email = input[0] === ''
  const isError_password = input[1] === ''

  const [password, set_password] = useState('')
  const [email, set_email] = useState('')

  const [email1, set_email1] = useState('')
  const [pass1, set_pass1] = useState('')
  const [pass2, set_pass2] = useState('')

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handlePasswordVisibility = () => setShowPassword(!showPassword)
  const [showPassword, setShowPassword] = useState(false)
  const [color_to_valid_password1, set_color_to_valid_password1] = useState('')
  const [color_to_valid_password2, set_color_to_valid_password2] = useState('')
  const [color_to_valid_email, set_color_to_valid_email] = useState('')

  const valid_form = (email, mdp1, mdp2) => {
    setInput([email, mdp1])
    let regValid = false
    set_email1(email)
    set_pass1(mdp1)
    set_pass2(mdp2)
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
    const regexEmail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (email1.match(regexEmail)) {
      set_color_to_valid_email('green')
      set_email(email1)
    } else {
      set_color_to_valid_email('red')
    }
    if (mdp1.match(regexPassword)) {
      set_color_to_valid_password1('green')
      regValid = true
      set_pass1(mdp1)
    } else {
      set_color_to_valid_password1('red')
      regValid = false
    }
    if (mdp2 === pass1 && regValid === true) {
      set_color_to_valid_password2('green')
      set_password(mdp2)
    } else {
      set_color_to_valid_password2('red')
      set_password(null)
    }

    if (pass1 === '') {
      set_color_to_valid_password1('none')
    }
    if (pass2 === '') {
      set_color_to_valid_password2('none')
    }
    if (email === '') {
      set_color_to_valid_email('none')
    }
  }

  const handleCreateAccount = async () => {
    setIsLoading(true)
    console.log(email, password)
    if (email && password !== null) {
      try {
        await userLogin({ email, password })
        setIsLoading(false)
      } catch (error) {
        setError('Invalid username or password')
        setIsLoading(false)
        set_email('')
        set_password('')
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
          style={{ background: color_to_valid_email }}
          type="email"
          placeholder="test@test.com"
          defaultValue={email}
          onChange={(event) =>
            valid_form(event.currentTarget.value, pass1, pass2)
          }
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
            style={{ background: color_to_valid_password1 }}
            type={showPassword ? 'text' : 'password'}
            placeholder="*******"
            size="lg"
            defaultValue={pass1}
            onChange={(event) =>
              valid_form(email1, event.currentTarget.value, pass2)
            }
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
            style={{ background: color_to_valid_password2 }}
            type={showPassword ? 'text' : 'password'}
            placeholder="*******"
            size="lg"
            defaultValue={pass2}
            onChange={(event) =>
              valid_form(email1, pass1, event.currentTarget.value)
            }
          />
          <InputRightElement width="3rem">
            <Button h="1.5rem" size="sm" onClick={handlePasswordVisibility}>
              {showPassword ? <ViewIcon /> : <ViewOffIcon />}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        colorScheme="blue"
        mr={3}
        onClick={handleCreateAccount}
      >
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
