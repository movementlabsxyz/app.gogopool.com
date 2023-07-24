import { Button } from '@chakra-ui/react'
import { IconBrandTwitter } from '@tabler/icons'

export interface TweetThisButtonProps {
  text: string
}

const TweetThisButton = ({ text }: TweetThisButtonProps) => {
  text = encodeURIComponent(text)
  const url = `https://twitter.com/share?text=${text}`
  return (
    <Button
      as="a"
      colorScheme="twitter"
      href={url}
      leftIcon={<IconBrandTwitter />}
      rel="noopener noreferrer"
      target="_blank"
      variant="outline"
    >
      Tweet This
    </Button>
  )
}

export default TweetThisButton
