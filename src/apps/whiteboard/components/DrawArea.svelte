<script lang="ts">
    import { onMount } from 'svelte';
    import { addNotification } from '../../../layout/utils/notifications';
    import { NotificationType } from '../../../shared/components/notification';
    import type { PointInterface } from '../interfaces/point';

    interface Coordinates {
        x: number;
        y: number;
    }

    let wrapper: HTMLElement;
    let canvas: HTMLCanvasElement;
    let context: CanvasRenderingContext2D;
    let paintFlag: boolean = false;
    let mousePosition: Coordinates = {x: 0, y: 0};
    let drawnPoints: PointInterface[][] = [];
    let lastDrawnPoints: PointInterface[] = [];
    let redoPoints: PointInterface[][] = [];

    onMount(() => {
        canvas.addEventListener('mousedown', startPainting);
        canvas.addEventListener('mouseup', stopPainting);
        canvas.addEventListener('mousemove', paint);

        context = canvas.getContext('2d');
        resizeCanvas();
        clearCanvas();

        context.lineWidth = 2;
        context.lineCap = 'round';
        context.strokeStyle = '#ECDBBA';

        document.addEventListener('resize', resizeCanvas);
        document.addEventListener('keydown', (event) => {
            if (event.ctrlKey && event.key.toLowerCase() === 'z') {
                if (event.shiftKey) {
                    redo();
                } else {
                    undo();
                }
            }
        });
    });

    /**
     * Clears canvas.
     *
     * @param clearHistory
     */
    export function clearCanvas(clearHistory: boolean = true) {
        context.fillStyle = '#272727';
        context.fillRect(0, 0, canvas.width, canvas.height);

        if (clearHistory) {
            drawnPoints = [];
            redoPoints = [];
        }
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

    /**
     * Undo last drawing.
     */
    function undo(): void {
        if (drawnPoints.length) {
            redoPoints.push(drawnPoints.pop());
            clearCanvas(false);
            redraw(drawnPoints);
        }
    }

    /**
     * Redo last undo.
     */
    function redo(): void {
        if (redoPoints.length) {
            drawnPoints.push(redoPoints.pop());
            clearCanvas(false);
            redraw(drawnPoints);
        }
    }

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
        lastDrawnPoints = [];
        redoPoints = [];
    }

    /**
     * Stop painting.
     */
    function stopPainting(): void {
        paintFlag = false;

        if (lastDrawnPoints.length) {
            drawnPoints.push(lastDrawnPoints);
        }
    }

    /**
     * Paint.
     *
     * @param event
     */
    function paint(event: MouseEvent): void {
        if (paintFlag) {
            context.beginPath();

            context.moveTo(mousePosition.x, mousePosition.y);
            mousePosition = getMousePosition(event);
            context.lineTo(mousePosition.x, mousePosition.y);

            lastDrawnPoints.push({
                x: mousePosition.x,
                y: mousePosition.y,
                size: context.lineWidth,
                color: context.strokeStyle.toString(),
                shape: context.lineCap
            });

            context.stroke();
        }
    }

    /**
     * Redraw all points.
     *
     * @param allPoints
     */
    function redraw(allPoints: PointInterface[][]): void {
        for (const points of allPoints) {
            drawFromPoints(points);
        }
    }

    /**
     * Draw on canvas from points.
     *
     * @param points
     */
    function drawFromPoints(points: PointInterface[]): void {
        for (const [index, point] of points?.entries()) {
            if (index < points.length - 1) {
                context.beginPath();
                const nextPoint = points[index + 1];

                context.moveTo(point.x, point.y);
                context.lineTo(nextPoint.x, nextPoint.y);

                context.stroke();
            }
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
