<script lang="ts">
    import { jwt } from '../stores/jwt';
    import { decode } from '../functions/base64url';
    import JsonView from '../../../shared/components/JsonView.svelte';
    import { addNotification } from '../../../layout/utils/notifications';
    import { NotificationType } from '../../../shared/components/notification';

    $: JWTHeader = decodeSafely($jwt?.split('.')[0] ?? '');
    $: JWTPayload = decodeSafely($jwt?.split('.')[1] ?? '');
    $: JWTSignature = $jwt?.split('.')[2] ?? '';

    function decodeSafely(value: string): string {
        try {
            return decode(value);
        } catch (e) {
            console.error(e);
            addNotification({
                type: NotificationType.Error,
                message: 'Could not decode the JWT'
            });
        }

        return '';
    }
</script>

<span class="label">Header:</span>
<div class="jwt-data jwt-data-header">
    <JsonView json={JWTHeader}/>
</div>

<span class="label">Payload:</span>
<div class="jwt-data jwt-data-payload">
    <JsonView json={JWTPayload}/>
</div>

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
