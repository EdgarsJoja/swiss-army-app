<script lang="ts">
    import { NotificationType } from './notification-type';

    export let type: NotificationType = NotificationType.Info;
    export let title: string = '';
    export let message: string = '';
</script>

<div class="notification"
     class:info={type === NotificationType.Info}
     class:success={type === NotificationType.Success}
     class:warning={type === NotificationType.Warning}
     class:error={type === NotificationType.Error}
>
    <div class="notification-content">
        {#if title}
            <div class="notification-title" class:no-margin={!message}><strong>{title}</strong></div>
        {/if}

        {#if message}
            <div class="notification-message">{message}</div>
        {/if}
    </div>
</div>

<style lang="scss">
    @import '../../styles/variables';

    .notification {
        display: inline-block;
        border-radius: 5px;
        padding: 1em;
        box-shadow: 0 14px 28px rgba(#000, 0.25), 0 10px 10px rgba(#000, 0.22);
        cursor: pointer;
        background: $color-dark;
        text-align: left;

        &:hover {
            box-shadow: 0 20px 28px rgba(#000, 0.25), 0 10px 10px rgba(#000, 0.22);
        }

        &-content {
            border-left: 3px solid $notification-color-info;
            padding-left: 1em;
        }

        &-title {
            margin-bottom: .5em;
            color: $notification-color-info;

            &.no-margin {
                margin: 0;
            }
        }

        &.success {
            .notification {
                &-content {
                    border-color: $notification-color-success;
                }

                &-title {
                    color: $notification-color-success;
                }
            }
        }

        &.warning {
            .notification {
                &-content {
                    border-color: $notification-color-warning;
                }

                &-title {
                    color: $notification-color-warning;
                }
            }
        }

        &.error {
            .notification {
                &-content {
                    border-color: $notification-color-error;
                }

                &-title {
                    color: $notification-color-error;
                }
            }
        }
    }
</style>
