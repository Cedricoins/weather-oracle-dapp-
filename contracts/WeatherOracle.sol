// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract WeatherOracle {
    address public owner;
    
    struct Prediction {
        string description;
        uint256 timestamp;
    }
    
    // Stocke la dernière prédiction (simulée)
    Prediction public lastPrediction;
    
    event NewPrediction(string description, uint256 score);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    // Fonction simulée : on envoie un score de -6 à +6 → prédiction
    function submitPrediction(int8 score) external onlyOwner {
        string memory desc;
        if (score >= 4) desc = "Soleil radieux et ciel bleu !";
        else if (score >= 2) desc = "Beau temps, quelques nuages";
        else if (score >= 0) desc = "Nuageux mais sec";
        else if (score >= -3) desc = "Pluie probable";
        else desc = "Tempete en approche !";

        lastPrediction = Prediction(desc, block.timestamp);
        emit NewPrediction(desc, uint8(score));
    }

    function getLastPrediction() external view returns (string memory, uint256) {
        return (lastPrediction.description, lastPrediction.timestamp);
    }
}
