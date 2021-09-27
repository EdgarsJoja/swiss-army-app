<script lang="ts">
    import { createEventDispatcher, onMount } from 'svelte';
    import SettingsItem from './components/SettingsItem.svelte';
    import { getVersion } from '@tauri-apps/api/app';
    import { addNotification } from '../utils/notifications';
    import { NotificationType } from '../../shared/components/notification';
    import { settings } from './stores/settings';

    const dispatch = createEventDispatcher();
    let appVersion: string;

    let settingWindowMaximized: boolean = $settings['window.maximized'];
    $: updateSetting('window.maximized', settingWindowMaximized);

    onMount(() => {
        if (window.rpc) {
            getVersion().then(version => {
                appVersion = version;
            })
        }

        document.onkeydown = (event) => {
            if (event.key === 'Escape') {
                closeSettings();
            }
        };
    });

    /**
     * Close settings.
     */
    function closeSettings(): void {
        dispatch('closeSettings');
    }

    /**
     * Clears app data (preserving settings and global data).
     */
    function exportAllData(): void {
        const exportData = {};

        Object.keys(localStorage).forEach(key => {
            exportData[key] = localStorage.getItem(key);
        });

        // Setup data URL and download file.
        const dataUrl = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(exportData))}`;
        const link = document.createElement('a');

        link.href = dataUrl;
        link.download = `swiss-army-app_${appVersion || 'UNKNOWN_VERSION'}_${Date.now()}.json`;

        link.click();

        addNotification({
            type: NotificationType.Success,
            title: 'Export success',
            message: 'Application data has been exported & downloaded'
        });
    }

    /**
     * Import data.
     *
     * @param event
     */
    function importData(event): void {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            const data = JSON.parse(e.target.result.toString());

            for (const [key, value] of Object.entries(data)) {
                localStorage.setItem(key, value.toString());
            }

            addNotification({
                type: NotificationType.Success,
                title: 'Import success',
                message: 'Application data has been imported',
            });

            addNotification({
                type: NotificationType.Info,
                title: 'Import note',
                message: 'You may need to re-open application to see data change',
                duration: 10000
            });

            dispatch('dataUpdate');
        };

        reader.readAsText(file);
    }

    /**
     * Update specific setting.
     *
     * @param key
     * @param value
     */
    function updateSetting(key: string, value: any): void {
        settings.update((currentSettings) => {
            return { ...currentSettings, [key]: value }
        });
    }
</script>

<div class="wrapper">
    <div class="close" on:click={closeSettings}>&#10005;</div>

    <div class="settings">
        <div class="settings-group">
            <h3 class="settings-group-header">Window</h3>
            <hr class="divider"/>

            <SettingsItem label="Start application maximized">
                <input slot="value"
                       type="checkbox"
                       bind:checked={settingWindowMaximized}
                />
            </SettingsItem>
        </div>

        <div class="settings-group">
            <h3 class="settings-group-header">Data</h3>
            <hr class="divider"/>

            <SettingsItem label="Export all data">
                <button slot="value" on:click={exportAllData}>Export</button>
            </SettingsItem>

            <SettingsItem label="Import data">
                <input slot="value" type="file" accept="application/json" on:change={importData}/>
            </SettingsItem>
        </div>

        <div class="settings-group">
            <h3 class="settings-group-header">About</h3>
            <hr class="divider"/>

            <SettingsItem label="App version">
                <span slot="value">{appVersion}</span>
            </SettingsItem>
            <SettingsItem label="Developer">
                <span slot="value">Edgars Joja</span>
            </SettingsItem>
        </div>
    </div>
</div>

<style lang="scss">
    @import 'src/shared/styles/variables';

    .wrapper {
        .close {
            position: absolute;
            top: .25em;
            left: .25em;
            font-size: 3em;
            width: 1em;
            text-align: center;
            cursor: pointer;
        }

        .settings {
            margin: 2em auto 0 auto;
            max-width: 75%;

            &-group-header {
                margin-bottom: .5em;
            }

            .divider {
                border-color: $color-surface;
                opacity: .5;
            }
        }
    }
</style>
