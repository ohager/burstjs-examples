<script>
    import {fade, slide} from "svelte/transition";

    export let accountId;

    import {ApiSettings, composeApi} from '@burstjs/core'
    import {convertNQTStringToNumber, convertNumericIdToAddress} from '@burstjs/util'

    const apiSettings = new ApiSettings('https://wallet.burstcoin.ro:443', '/burst');
    const api = composeApi(apiSettings);
    const fetchBalance = api.account.getAccountBalance(accountId);

    $: burstAddress = convertNumericIdToAddress(accountId);

    function toBurst(accountInPlancks){
      return convertNQTStringToNumber(accountInPlancks).toFixed(2)
    }

</script>

<div class="dropshadow">
    {#await fetchBalance}
        <h1 out:slide={{delay: 0, duration: 300 }}>Checking Blockchain...</h1>
    {:then balance }
        <div in:slide={{delay: 400, duration: 500}}>
            <h1>{burstAddress}</h1>
            <h1>{toBurst(balance.balanceNQT)} BURST</h1>
        </div>
    {:catch e}
        <h1>Oh no,...{e.message}</h1>
    {/await}
</div>
