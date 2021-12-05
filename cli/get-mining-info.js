const {BurstValue} = require("@burstjs/util");
const {api, handleApiError} = require('./helper');

/*

Response format

  {
    "height": "881611",
    "generationSignature": "f2fe8681cdd1e88605dad92aefc7c101b159fb0989cc4b0db5ff84d43d6f6962",
    "baseTarget": "484510",
    "averageCommitmentNQT": "269241499648",
    "lastBlockReward": "156",
    "requestProcessingTime": 0
  }

  // check here: https://wallet.burstcoin.ro/burst?requestType=getMiningInfo

*/

async function getMiningInfo() {
    try {
        const {averageCommitmentNQT, lastBlockReward} = await api.service.query('getMiningInfo');

        const blockReward = BurstValue.fromBurst(lastBlockReward)
        const avgCommitment = BurstValue.fromPlanck(averageCommitmentNQT)

        console.log("Current Block Reward:", blockReward.toString())
        console.log("Ag. Commitment per TiB:", avgCommitment.toString())
    } catch (e) {
        handleApiError(e)
    }
}

(async () => {
    await getMiningInfo();
})();
