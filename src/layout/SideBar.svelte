<script lang="ts">
    import { selectedApp } from '../shared/stores/selected-app.js';

    const apps: { appCode: string, label: string }[] = [
        { appCode: 'json_viewer', label: 'Json Viewer' },
        { appCode: 'sha256', label: 'Sha256' },
    ];

    const selectApp = (appCode: string) => {
        selectedApp.set(appCode);
    }
</script>

<main>
    <ul>
        {#each apps as app}
            <li on:click={ () => selectApp(app.appCode) }>{app.label}</li>
        {/each}
    </ul>
</main>
