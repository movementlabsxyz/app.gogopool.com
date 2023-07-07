import { useToast } from '@chakra-ui/react'

import { Button, ButtonProps } from '@/common/components/Button'
import useTokenGGPContract from '@/hooks/contracts/tokenGGP'
import addToken from '@/utils/addToken'

const AddGGP = (props: ButtonProps) => {
  const toast = useToast()
  const { address } = useTokenGGPContract()

  const handleAddToken = () => {
    addToken(address, 'GGP')
      .then(() => {
        toast({
          title: 'Success',
          description: 'Token added to wallet.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
      })
      .catch(() => {
        toast({
          position: 'top',
          title: 'Error',
          description: 'Could not add token to wallet.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      })
  }

  return (
    <Button {...props} onClick={handleAddToken}>
      Add GGP Token
    </Button>
  )
}

export default AddGGP
