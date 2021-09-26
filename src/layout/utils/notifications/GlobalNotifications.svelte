<script lang="ts">
    import { Notification } from '../../../shared/components/notification';
    import { notifications } from './notifications-store';
    import { removeNotification } from './api';
    import { fly } from 'svelte/transition';

    /**
     * Dismisses specified notification.
     *
     * @param notificationId
     */
    function dismissNotification(notificationId: string): void {
        removeNotification(notificationId);
    }
</script>

<div class="wrapper">
    {#each $notifications as notification}
        <div class="notification"
             on:click={dismissNotification.bind(this, notification.id)}
             transition:fly="{{ x: 1000, duration: 250 }}"
        >
            <Notification title={notification.title} message={notification.message} type={notification.type}/>
        </div>
    {/each}
</div>

<style lang="scss">
    .wrapper {
        display: flex;
        flex-direction: column;

        .notification {
            margin-bottom: 1em;
        }
    }
</style>
