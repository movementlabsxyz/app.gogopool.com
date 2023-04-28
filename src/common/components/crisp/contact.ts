declare let $crisp: any

const contact = () => {
  $crisp.push(['do', 'chat:open'])
  $crisp.push(['do', 'message:send', ['text', 'I have a question!']])
}

export default contact
