<script lang="ts">
    import { jwt } from '../stores/jwt';
    import { decode } from '../functions/base64url';

    $: JWTHeader = decode($jwt.split('.')[0] ?? '');
    $: JWTPayload = decode($jwt.split('.')[1] ?? '');
    $: JWTSignature = $jwt.split('.')[2] ?? '';
</script>

<span class="label">Header:</span>
<div class="jwt-data jwt-data-header">{ JWTHeader }</div>

<span class="label">Payload:</span>
<div class="jwt-data jwt-data-payload">{ JWTPayload }</div>

<span class="label">Signature:</span>
<div class="jwt-data jwt-data-signature">{ JWTSignature }</div>

<style lang="scss">
    @import 'src/shared/styles/variables';

    .jwt-data {
        background: $color-surface;
        padding: 1em;
        color: $color-surface-contrast;
        border-radius: 5px;
        margin: .5em auto 1em auto;
    }
</style>
