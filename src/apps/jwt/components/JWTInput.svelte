<script lang="ts">
    import { jwt } from '../stores/jwt';

    let jwtInput = $jwt;

    /**
     * Update JWT store value.
     */
    function updateJWTStore(): void {
        jwt.set(jwtInput.toString());
    }
</script>

<input type="text" class="jwt-input" placeholder="JWT token..." bind:value={jwtInput} on:change={updateJWTStore}/>

<style lang="scss">
    .jwt-input {
        width: 100%;
    }
</style>
