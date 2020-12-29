const inquirer = require('inquirer');
const {convertHexEndianess} = require("@burstjs/util");
const {BurstValue, convertNumericIdToAddress} = require("@burstjs/util");
const {handleApiError, api} = require('./helper');

/**
 * Just a helper function to ask for some info
 */
function askInformation() {
    return inquirer
        .prompt([
            {
                type: 'input',
                name: 'recipient',
                message: 'Please enter the recipients id or address?'
            },
            {
                type: 'input',
                name: 'amount',
                message: 'Please enter the amount in Burst?'
            },
            {
                type: 'input',
                name: 'message',
                message: 'Please enter your message?',
                default: ''
            },
            {
                type: 'confirm',
                name: 'isTextMessage',
                message: 'Is the message a text message (otherwise hex)?'
            }
        ])
}




function mountLegacyDeeplink({recipient, amount, fee, message, isTextMessage = true}) {

    const receiver = recipient.startsWith('BURST-') ? recipient : convertNumericIdToAddress(recipient)
    const amountPlanck = amount.getPlanck()
    const feePlanck = fee.getPlanck()
    let link = `burst://requestBurst?receiver=${receiver}&amountNQT=${amountPlanck}&feeNQT=${feePlanck}&immutable=false`
    if (message) {
        link += `&message=${message}&isTextMessage=${isTextMessage}`
    }
    return link

}

const redirectable = targetUrl => "https://burst-balance-alert.now.sh/api/redirect?url=" + targetUrl

async function createDeeplink(answers) {
    try {
        const {standard} = await api.network.getSuggestedFees()
        const link = mountLegacyDeeplink({
            recipient: answers.recipient,
            amount: BurstValue.fromBurst(answers.amount),

            fee: BurstValue.fromPlanck(standard.toString(10)),
            message: answers.message || undefined,
            messageIsText: answers.messageIsText,
        })

        console.info('Pure deeplink -', link)
        console.info('With browser redirection -', redirectable(link))
    } catch (e) {
        handleApiError(e)
    }
}

function createContractHexMessage() {
    convertHexEndianess(hex)
}


(async () => {
    const answers = await askInformation();
    await createDeeplink(answers)
})();
