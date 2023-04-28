import { Link } from '@chakra-ui/react'

import contact from '@/common/components/crisp/contact'

const Error404 = (): JSX.Element => {
  return (
    <div className="container bg-white">
      <p className="text-base font-semibold text-gray-800">404: Page not found</p>
      <br></br>
      <Link onClick={contact}>Have questions? Connect with our team through our chatbox!</Link>
    </div>
  )
}

export default Error404
