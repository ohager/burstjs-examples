const inquirer = require('inquirer');
const {convertHexEndianess} = require("@burstjs/util");
const {BurstValue, convertNumericIdToAddress, createDeeplink} = require("@burstjs/util");
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

function mountDeeplink({recipient,amount,fee,message, isTextMessage}){
    const payload = {
        recipient,
        amountPlanck: amount.getPlanck(),
        feePlanck: fee.getPlanck(),
        message,
        messageIsText: isTextMessage,
        immutable: false,
        encrypt: false
    }

    const deeplink = createDeeplink({
        action: 'pay',
        payload
    })
    return encodeURIComponent(deeplink)
}

const redirectable = targetUrl => "https://burst-balance-alert.now.sh/api/redirect?url=" + targetUrl

async function run(answers) {
    try {
        const {standard} = await api.network.getSuggestedFees()
        const link = mountDeeplink({
            recipient: answers.recipient,
            amount: BurstValue.fromBurst(answers.amount),

            fee: BurstValue.fromPlanck(standard.toString(10)),
            message: answers.message || undefined,
            isTextMessage: answers.isTextMessage,
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
    // const answers = await askInformation();

    const  answers = {
        recipient: "BURST-LJRV-9LE8-VJ5B-57W4C",
        amount: "300",
        fee:"0.03",
        message: "ab4c47f00d05",
        isTextMessage: false
    }
    await run(answers)
})();
