// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./LotteryToken.sol";

contract Lottery is Ownable {

    uint256 public betFee;
    LotteryToken public paymentToken;
    uint8 public TOKEN_RATIO = 5;
    uint256 public betPrice;
    uint256 public betsClosingTime;
    bool public betsOpen;

    uint256 public prizePool;
    uint256 public ownerPool;

    mapping(address => uint256) public prize;
    address[] public slots;

    constructor(
        string memory tokenName,
        string memory tokenSymbol,
        uint256 _betFee,
        uint256 _betPrice) {
        paymentToken = new LotteryToken(tokenName, tokenSymbol);
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
        uint256 amountToBeGiven = paymentReceived / TOKEN_RATIO;
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

        //Transfer tokens to contract
        paymentToken.transferFrom(msg.sender, address(this), betFee + betPrice);
    }

    function closeLottery() public whenBetsOpen {
        require(block.timestamp >= betsClosingTime, "");
        //TODO: Call random to select winner
        betsOpen = false;
    }

    function claimPrize() public {

    }

    function withdrawFees() public onlyOwner {

    }

    function withdrawPrize() public {

    }

    function getRandomNumber()
        public
        view
        returns (uint256 RandomNumber)
    {
        RandomNumber  = block.difficulty;   
    }
}