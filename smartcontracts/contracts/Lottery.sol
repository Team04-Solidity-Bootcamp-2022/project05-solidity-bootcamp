// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import {LotteryToken} from "./LotteryToken.sol";

contract Lottery is Ownable {

    uint256 public betFee;
    LotteryToken public paymentToken;
    uint256 public betPrice;
    uint256 public betsClosingTime;
    bool public betsOpen;
    uint16 public purchaseRatio;

    uint256 public prizePool;
    uint256 public ownerPool;

    mapping(address => uint256) public prize;
    address[] public slots;

    constructor(
        string memory tokenName,
        string memory tokenSymbol,
        uint16 _purchaseRatio,
        uint256 _betFee,
        uint256 _betPrice) {
        paymentToken = new LotteryToken(tokenName, tokenSymbol);
        purchaseRatio = _purchaseRatio;
        betFee = _betFee;
        betPrice = _betPrice;
    }

    modifier whenBetsClosed() {
        require(!betsOpen, "Lottery is open");
        _;
    }

    modifier whenBetsOpen() {
        require(betsOpen && block.timestamp < betsClosingTime ,
        "Lottery is closed");
        _;
    }
    /// @param closingTime Time in seconds from epoch time that the bets will close
    function openBets(uint256 closingTime) public onlyOwner whenBetsClosed {
        require(
            closingTime > block.timestamp,
            "Closing time must be in the future"
        );
        betsClosingTime = closingTime;
        betsOpen = true;
    }

    function buyTokens() public payable {
        uint256 paymentReceived = msg.value;
        uint256 amountToBeGiven = paymentReceived * purchaseRatio;
        paymentToken.mint(msg.sender, amountToBeGiven);
    }

    function bet() public whenBetsOpen {
        //Check if user has tokens
        require(
            paymentToken.balanceOf(msg.sender) >= betFee + betPrice,
            "Not enough tokens"
        );
        // Check alowance
        require(
            paymentToken.allowance(msg.sender, address(this)) >= betFee + betPrice,
            "Tokens were not approved"
        );
        ownerPool += betFee;
        prizePool += betPrice;

        slots.push(msg.sender);
        //Transfer tokens to contract
        paymentToken.transferFrom(msg.sender, address(this), betFee + betPrice);
    }
    
    /// @notice Call the bet function `times` times
    function betMany(uint256 times) public {
        require(times > 0);
        while (times > 0) {
            bet();
            times--;
        }
    }
    
    function closeLottery() public {
        require(block.timestamp >= betsClosingTime, "Too soon to close");
        require(betsOpen, "Already closed");
        if (slots.length > 0) {
            uint256 winnerIndex = getRandomNumber() % slots.length;
            address winner = slots[winnerIndex];
            prize[winner] += prizePool;
            prizePool = 0;
            delete (slots);
        }
        betsOpen = false;
    }

    function ownerWithdraw(uint256 amount) public onlyOwner {
        require(amount <= ownerPool, "Not enough fees collected");
        ownerPool -= amount;
        paymentToken.transfer(msg.sender, amount);
    }

    function prizeWithdraw(uint256 amount) public {
        require(amount <= prize[msg.sender], "Not enough prize");
        prize[msg.sender] -= amount;
        paymentToken.transfer(msg.sender, amount);
    }

    /// @notice Burn `amount` tokens and give the equivalent ETH back to user
    function returnTokens(uint256 amount) public {
        paymentToken.burnFrom(msg.sender, amount);
        payable(msg.sender).transfer(amount / purchaseRatio);
    }

    function getRandomNumber()
        public
        view
        returns (uint256 RandomNumber)
    {
        RandomNumber  = block.difficulty;   
    }
}