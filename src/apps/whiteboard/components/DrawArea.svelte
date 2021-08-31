<script lang="ts">
    import { onMount } from 'svelte';

    /**
     * Clears canvas.
     */
    export function clearCanvas() {
        context.clearRect(0, 0, canvas.width, canvas.height);
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
        context.fillStyle = 'white';
        context.fillRect(0, 0, canvas.width, canvas.height);

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
            context.strokeStyle = 'grey';

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
        border: 2px solid #ccc;
        border-radius: 5px;
    }
</style>
