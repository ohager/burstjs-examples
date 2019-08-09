<script>
    export let accountId;
    import {fade, slide} from "svelte/transition";
    import {composeApi, ApiSettings} from "@burstjs/core";
    import {convertNQTStringToNumber, convertNumericIdToAddress} from "@burstjs/util";

    const apiSettings = new ApiSettings("https://wallet.burstcoin.ro:443", "/burst");
    const api = composeApi(apiSettings);
    const fetchBalance = api.account.getAccountBalance(accountId);
    const toBurst = ({balanceNQT}) => convertNQTStringToNumber(balanceNQT).toFixed(2);

    $: burstAddress = convertNumericIdToAddress(accountId);
</script>

<div class="dropshadow">
    {#await fetchBalance}
        <h1 out:slide={{delay: 0, duration: 300 }}>Checking Blockchain...</h1>
    {:then balance }
        <div in:slide={{delay: 400, duration: 500}}>
            <h1>{burstAddress}</h1>
            <h1>{toBurst(balance)} Burst</h1>
        </div>
    {:catch e}
        <h1>Oh no,...{e.message}</h1>
    {/await}
</div>
