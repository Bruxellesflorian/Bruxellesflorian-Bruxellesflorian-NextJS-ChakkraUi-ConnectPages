import React, { useState, useEffect } from 'react'
import Create_login from '../components/create_login'
import Connection from '../components/login'



import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Stack,
} from '@chakra-ui/react'

const Connect_container = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [choiseDirection, setChoiseDirection] = useState('connecting')

  const handleSubmitCreateAccount = () => {
    setChoiseDirection('createAccount')
  }
  const handleSwap = () => {
    setChoiseDirection('connecting')
  }
  useEffect(() => {
    setChoiseDirection('connecting')

  }, [isOpen])
  

  return (
    <>
      <Button onClick={onOpen}>Connect</Button>

      <Modal isOpen={isOpen} onClose={onClose} size="xs">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {choiseDirection === 'connecting' ? (
              <>Connection</>
            ) : (
              <>Create an account</>
            )}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={3}>
              {choiseDirection === 'connecting' ? (
                <>
                  <Connection />
                </>
              ) : (
                <>
                  <Create_login />
                </>
              )}
            </Stack>
          </ModalBody>

          <ModalFooter>
            {choiseDirection !== 'createAccount' ? (
              <>
                <Button variant="ghost" onClick={handleSubmitCreateAccount}>
                  Create account
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" onClick={handleSwap}>
                  Back
                </Button>
              </>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Connect_container
