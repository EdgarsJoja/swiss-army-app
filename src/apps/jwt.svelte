<script lang="ts">
    import JWTInput from './jwt/components/JWTInput.svelte';
    import JWTViewer from './jwt/components/JWTViewer.svelte';
</script>

<div class="jwt-input">
    <JWTInput/>
</div>

<div class="jwt-viewer">
    <JWTViewer/>
</div>

<style lang="scss">
    .jwt-input {
        margin-bottom: 2em;
    }
</style>
