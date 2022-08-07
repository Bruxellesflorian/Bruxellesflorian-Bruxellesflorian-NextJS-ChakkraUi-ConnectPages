import React, { useState, useEffect } from 'react'
import { ViewOffIcon, ViewIcon } from '@chakra-ui/icons'

import {
  Button,
  FormLabel,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  CircularProgress,
} from '@chakra-ui/react'

const Connection = () => {
  const handlePasswordVisibility = () => setShowPassword(!showPassword)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const [password, set_password] = useState('')
  const [email, set_email] = useState('')

  const handleSubmit = async () => {
    console.log('test')
    setIsLoading(true)
    console.log(isLoading);
    try {
      await userLogin({ email, password })
      // setIsLoading(false)
    } catch (error) {
      setError('Invalid username or password')
      // setIsLoading(false)
      set_email('')
      set_password('')
    }
  }

  const handleEmail = (email) => {
    set_email(email)
  }

  const handlePassword = (password1) => {
    // set_password(password1)
  }

  return (
    <>
      <FormControl isRequired mt={6}>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          placeholder="test@test.com"
          onChange={(event) => handleEmail(event.currentTarget.value)}
        />
      </FormControl>
      <FormControl isRequired mt={6}>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="*******"
            size="lg"
            onChange={(event) => handlePassword(event.currentTarget.value)}
          />
          <InputRightElement width="3rem">
            <Button h="1.5rem" size="sm" onClick={handlePasswordVisibility}>
              {showPassword ? <ViewIcon /> : <ViewOffIcon />}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
        {isLoading ? (
          <CircularProgress isIndeterminate size="24px" color="teal" />
        ) : (
          'Connect'
        )}
      </Button>
    </>
  )
}

export default Connection
