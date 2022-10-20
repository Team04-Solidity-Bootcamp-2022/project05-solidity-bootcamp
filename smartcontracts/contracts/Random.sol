// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract Random {
    function getRandomNumber()
        public
        view
        returns (uint256 RandomNumber)
    {
        //FIXME: Use RANDAO
        RandomNumber  = uint256(blockhash(block.number - 1));
        
    }

    function tossCoin() public view returns (bool heads) {
        // TODO: make the random number be translated to a boolean
        heads = (this.getRandomNumber() % 2 == 1);
    }
}
