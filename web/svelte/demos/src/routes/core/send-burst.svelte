<script>
    let recipient='', amount='', passphrase = ''
</script>


<svelte:head>
    <title>Core - Send Burst</title>
</svelte:head>

<h1>Send Burst Example</h1>


<fieldset class="o-fieldset">
    <div class="o-form-element">
        <label class="c-label" for="recipient">Recipient:</label>
        <input name="recipient" placeholder="Numeric Id or Address" class="c-field" bind:value="{recipient}">
    </div>
    <div class="o-form-element">
        <label class="c-label" for="recipient">Amount:</label>
        <input name="amount" type="number" placeholder="Amount in Burst" class="c-field" bind:value="{amount}">
    </div>
    <div class="o-form-element">
        <label class="c-label" for="passphrase">Your Passphrase:</label>
        <div class="c-input-group">
            <div class="o-field">
                <input name="passphrase" placeholder="Your secret passphrase" class="c-field" bind:value="{passphrase}">
            </div>
            <button class="c-button c-button--brand">Send</button>
        </div>
    </div>
</fieldset>
