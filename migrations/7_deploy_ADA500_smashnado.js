/* global artifacts */
require('dotenv').config({ path: '../.env' })
const ERC20Smashcash = artifacts.require('ERC20Smashnado')
const Verifier = artifacts.require('Verifier')
const hasherContract = artifacts.require('Hasher')


module.exports = function(deployer, network, accounts) {
  return deployer.then(async () => {
    const { MERKLE_TREE_HEIGHT, BEP20_TOKEN, TOKEN_AMOUNT_F } = process.env
    const verifier = await Verifier.deployed()
    const hasherInstance = await hasherContract.deployed()
    await ERC20Smashcash.link(hasherContract, hasherInstance.address)
    let token = BEP20_TOKEN
    const smashnado = await deployer.deploy(
      ERC20Smashcash,
      verifier.address,
      TOKEN_AMOUNT_F,
      MERKLE_TREE_HEIGHT,
      accounts[0],
      token,
    )
    console.log('ADASmascash\'s address ', smashnado.address)
  })
}
