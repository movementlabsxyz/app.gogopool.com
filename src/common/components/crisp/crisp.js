/* eslint-env browser */

import React from 'react'

export class Crisp extends React.Component {
  componentDidMount() {
    // Include the Crisp code here, without the <script></script> tags
    window.$crisp = []
    window.CRISP_WEBSITE_ID = 'fae8388c-6cfc-42c6-813a-38e5b5889aac'

    // window.$crisp.push(["safe", true]);
    ;(function () {
      var d = document
      var s = d.createElement('script')

      s.src = 'https://client.crisp.chat/l.js'
      s.async = 1
      d.getElementsByTagName('head')[0].appendChild(s)
    })()
  }

  render() {
    return null
  }
}

export default Crisp
