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

  const [user, setUser] = useState({ email: '', password: '' })

  const handleSubmit = async () => {
    console.log(user);
    setIsLoading(true)
    try {
      await userLogin(user.email, user.password)
      // setIsLoading(false)
    } catch (error) {
      setError('Invalid username or password')
      // setIsLoading(false)
      set_email('')
      set_password('')
    }
  }

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <>
      <FormControl isRequired mt={6}>
        <FormLabel>Email</FormLabel>
        <Input
          name="email"
          type="email"
          placeholder="test@test.com"
          onChange={handleChange}
        />
      </FormControl>
      <FormControl isRequired mt={6}>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="*******"
            size="lg"
            onChange={handleChange}
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
