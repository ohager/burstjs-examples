const {readFileSync} = require('fs')
const {join} = require('path')
const propertiesToJSON = require("properties-to-json");
const {api} = require('./helper');
const {SingleBar} = require('cli-progress')
const {HttpClientFactory} = require('@burstjs/http')

function askBrsPropertiesPath() {
    return inquirer
        .prompt([
            {
                type: 'input',
                name: 'path',
                message: 'Enter the path of BRS properties file'
            }
        ])
}

async function checkBoostrapNode(ip) {
    const {version} = await api.network.getPeer(ip)

    if (!version.startsWith('v3')) {
        console.log('Old Peer: ', ip)
    }
}

async function loadBootstrapPeers(path) {
    const data = readFileSync(path, {encoding: "utf-8"})
    const props = propertiesToJSON(data)
    return props['P2P.BootstrapPeers'].replace(/\s/ig, '').split(';')
}


async function getPeerInfoFromP2P(peer) {
    const client = HttpClientFactory.createHttpClient(
        `http://${peer}:8123`,
        {
            timeout: 2000,
            headers: {'User-Agent': 'BRS/3.0.0'}
        })
    const {response} = await client.post('', {protocol: 'B1', requestType: 'getInfo'})
    return response.version
}

(async () => {
    try {
        // const {path} = await askBrsPropertiesPath();

        const path = join(__dirname, '/data', 'brs-default.properties')
        const peers = await loadBootstrapPeers(path)
        const progressBar = new SingleBar()
        const results = []
        progressBar.start(peers.length, 0)
        for (let i = 0; i < peers.length; i++) {
            const p = peers[i];
            try {
                const peerInfo = await api.network.getPeer(p)
                let version = peerInfo.version
                if (!version) {
                    version = await getPeerInfoFromP2P(p)
                }
                results.push({ok: 'X', ip: p, version})
            } catch (e) {
                results.push({ok: '-', ip: p, version: ''})
            }
            progressBar.increment()
        }
        progressBar.stop()
        console.table(results, ['ok', 'ip', 'version'])
        const reachablePeers = results.filter(({ok}) => ok !== '-').map(({ip}) => ip)
        const v3Peers = results.filter(({version}) => version.startsWith('v3')).map(({ip}) => ip)
        console.log('Reachable Peers', reachablePeers.join(';'))
        console.log('V3+ Peers', v3Peers.join(';'))
    } catch (e) {
        console.error(e)
    }
})();
