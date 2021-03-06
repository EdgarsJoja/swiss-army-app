<script lang="ts">
    import { onMount } from 'svelte';
    import { addNotification } from '../../../layout/utils/notifications';
    import { NotificationType } from '../../../shared/components/notification';

    /**
     * Clears canvas.
     */
    export function clearCanvas() {
        context.fillStyle = '#272727';
        context.fillRect(0, 0, canvas.width, canvas.height);
    }

    /**
     * Download current canvas as an image.
     */
    export function downloadImage() {
        const dataUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');

        link.href = dataUrl;
        link.download = 'img_' + Date.now();

        link.click();

        addNotification({
            type: NotificationType.Success,
            title: 'Download success',
            message: 'Your drawing has been downloaded'
        });
    }

    interface Coordinates {
        x: number;
        y: number;
    }

    let wrapper: HTMLElement;
    let canvas: HTMLCanvasElement;
    let context: CanvasRenderingContext2D;
    let paintFlag: boolean = false;
    let mousePosition: Coordinates = {x: 0, y: 0};

    onMount(() => {
        canvas.addEventListener('mousedown', startPainting);
        canvas.addEventListener('mouseup', stopPainting);
        canvas.addEventListener('mousemove', paint);

        context = canvas.getContext('2d');
        resizeCanvas();
        clearCanvas();

        document.addEventListener('resize', resizeCanvas);
    });

    /**
     * Resize canvas to fill parent wrapper element.
     */
    function resizeCanvas() {
        context.canvas.width = wrapper.clientWidth;
        context.canvas.height = wrapper.clientHeight;
    }

    /**
     * Start painting.
     *
     * @param event
     */
    function startPainting(event: MouseEvent): void {
        paintFlag = true;
        mousePosition = getMousePosition(event);
    }

    /**
     * Stop painting.
     */
    function stopPainting(): void {
        paintFlag = false;
    }

    /**
     * Paint.
     *
     * @param event
     */
    function paint(event: MouseEvent): void {
        if (paintFlag) {
            context.beginPath();

            context.lineWidth = 2;
            context.lineCap = 'round';
            context.strokeStyle = '#ECDBBA';

            context.moveTo(mousePosition.x, mousePosition.y);
            mousePosition = getMousePosition(event);
            context.lineTo(mousePosition.x, mousePosition.y);

            context.stroke();
        }
    }

    /**
     * Returns mouse position coordinates.
     *
     * @param event
     */
    function getMousePosition(event: MouseEvent): Coordinates {
        return {
            x: event.clientX - canvas.offsetLeft,
            y: event.clientY - canvas.offsetTop,
        }
    }
</script>

<div class="wrapper" bind:this={wrapper}>
    <canvas id="canvas" bind:this={canvas}></canvas>
</div>

<style lang="scss">
    .wrapper {
        width: 100%;
        flex: 1;
    }

    #canvas {
        width: 100%;
        height: 100%;
        border-radius: 5px;
    }
</style>
