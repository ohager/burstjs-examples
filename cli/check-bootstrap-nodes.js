const {readFileSync} = require('fs')
const {join} = require('path')
const propertiesToJSON = require("properties-to-json");
const {api} = require('./helper');
const {SingleBar} = require('cli-progress')

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
                const {version} = await api.network.getPeer(p)
                results.push({ok: '✅', ip: p, version})
            } catch (e) {
                results.push({ok: 'X', ip: p, version: ''})
            }
            progressBar.increment()
        }
        progressBar.stop()
        console.table(results, ['ok', 'ip', 'version'])
        const goodPeers = results.filter(({ok}) => ok !== 'X').map(({ip}) => ip)
        console.log('Good Peers', goodPeers.join(';'))
    } catch (e) {
        console.error(e)
    }
})();
