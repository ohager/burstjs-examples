<script>
    import AccountBalance from "./AccountBalance.svelte";
    import BurstJSLogo from "./BurstJSLogo.svelte";

    let accountId = null;

    function setAccountId({target}) {
        accountId = target.value
    }

    function handleKeydown({key}) {
        if (key === 'Escape') {
            accountId = null
        }
    }
</script>

<svelte:window on:keydown={handleKeydown}></svelte:window>

<style>
    @import url("https://fonts.googleapis.com/css?family=Raleway&display=swap");

    :global(body) {
        font-family: "Raleway", sans-serif;
        text-align: center;
        background-color: #f6b02a;
        background-repeat: no-repeat;
        background-image: url("./assets/background_decor.png");
        background-attachment: fixed;
        background-position: top right;
    }

    :global(.dropshadow) {
        color: #fff;
        filter: drop-shadow(0 0 0.5rem rgba(0, 0, 0, 1));
    }

    main {
        height: 90vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
    }

    h1 {
        font-size: 48px;
        font-weight: bold;
    }

    input {
        line-height: 2rem;
        font-size: 32px;
        font-weight: bold;
        background-color: rgba(255, 255, 255, 0.5);
        width: 40vw;
        border-radius: 4px;
    }
</style>

<main>
    <h1 class="dropshadow">Howdy, DevCamp 2019</h1>
    {#if !accountId }
        <input type="text" placeholder="Enter Account Id" on:blur={setAccountId}>
    {:else}
        <div>
            <AccountBalance accountId={accountId}></AccountBalance>
            <small>Press &lt;Esc&gt; to return</small>
        </div>
    {/if}
    <BurstJSLogo/>
</main>
