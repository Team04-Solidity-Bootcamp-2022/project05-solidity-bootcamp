// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface IMyERC20Token is IERC20 {
    function mint(address to, uint256 amount) external;
    function burnFrom(address account, uint256 amount) external;
}

contract Lottery is Ownable {
    
    struct Player {
        address userAddress;
        uint256 amount;
    }

    uint256 public _fee;
    uint256 public _targetBlock;
    IMyERC20Token public _tokenContract;
    uint8 public TOKEN_RATIO = 5;
    uint8 public ETH_AVG_BLOCK_TIME = 12;
    Player[] public _userBets;
    uint256 public _totalAmountInBets;

    //FIXME: use duration and define target block too
    constructor(uint256 duration, uint256 fee, address tokenAddress) {
        _targetBlock = block.number + (duration / ETH_AVG_BLOCK_TIME);
        _fee = fee;
        _tokenContract = IMyERC20Token(tokenAddress);
    }

    function buyTokens() public payable {
        uint256 paymentReceived = msg.value;
        uint256 amountToBeGiven = paymentReceived / TOKEN_RATIO;
        _tokenContract.mint(msg.sender, amountToBeGiven);
    }

    function burnTokens(uint256 tokenAmount) public {
        require(
            _tokenContract.balanceOf(msg.sender) >= tokenAmount,
            "Not enough tokens"
        );

        // Check alowance
        require(
            _tokenContract.allowance(msg.sender, address(this)) >= tokenAmount,
            "Tokens were not approved"
        );
        // Calculate amount of Ether
        uint256 etherAmount = tokenAmount * TOKEN_RATIO;
        // Burn Tokens
        _tokenContract.burnFrom(msg.sender, tokenAmount);

        // Transfer Ether to user
        payable(msg.sender).transfer(etherAmount);
    }

    function bet(uint256 tokenAmount) public {
        require(block.number < _targetBlock, "Bet must me placed before Target Block");
        //TODO: Check if user has already betted?
        //Check if user has tokens
        require(
            _tokenContract.balanceOf(msg.sender) >= tokenAmount,
            "Not enough tokens"
        );

        // Check alowance
        require(
            _tokenContract.allowance(msg.sender, address(this)) >= tokenAmount,
            "Tokens were not approved"
        );
        
        //TODO: Transfer tokens to contract
        //TODO: Add entry to Player array? 
    }

    function roll(uint256 amount) public {
        require(block.number >= _targetBlock, "Target Block Number not reached yet");
        // TODO: Generate a random number and make the mod with array size
        // TODO: Transfer prize - fee;
    }

    function withdraw() public onlyOwner {

    }

    function restart() public onlyOwner {

    }
}