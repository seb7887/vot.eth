import Web3 from 'web3'

const resolveWeb3 = resolve => {
  let { web3 } = window as any
  const alreadyInjected = typeof web3 !== 'undefined' // i.e Mist/Metamask
  const localProvider = 'http://localhost:7545'

  if (alreadyInjected) {
    web3 = new Web3(web3.currentProvider)
  } else {
    const provider = new Web3.providers.HttpProvider(localProvider)
    web3 = new Web3(provider)
  }

  resolve(web3)
}

export const getWeb3 = () =>
  new Promise(resolve => {
    window.addEventListener('load', () => {
      resolveWeb3(resolve)
    })
    if (document.readyState === 'complete') {
      resolveWeb3(resolve)
    }
  })
