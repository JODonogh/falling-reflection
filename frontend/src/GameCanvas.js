import React, { useRef, useEffect } from 'react';

const GameCanvas = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        //draw player 
        let player = {x: 50, y: 550, radius: 50, isBouncing: false}

        // draw shapes
        let shapes = [];

        //game loop
        function gameLoop(){
            context.clearRect(0, 0, canvas.width, canvas.height);

            // Draw player
            context.beginPath();
            context.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
            context.fillStyle = 'blue';
            context.fill();
            context.closePath();

            // Draw shapes
            shapes.forEach(shape => {
                context.beginPath();
                context.arc(shape.x, shape.y, shape.radius, 0, Math.PI * 2);
                context.fillStyle = 'red';
                context.fill();
                context.closePath();
            });

            // Update player position if bouncing
            if (player.isBouncing) {
                player.y -= 5;
                if (player.y <= 450) {
                    player.isBouncing = false;
                }
            } else if (player.y < 550) {
                player.y += 5;
            }

            requestAnimationFrame(gameLoop);
        }

        //squash modifies players dimensions when they bounce
        function squash() {
            player.isBouncing = true;
            player.radius = 30; // Squash effect
            //when hits ground decrease height and increase width for few frames
            //as the rebound upwards reverse the effect, increase height and decrease width
            setTimeout(() => {
                player.radius = 50; // Reset to original size
            }, 200);
        }



        gameLoop();
    }, []);

    return <canvas ref={canvasRef} width={800} height={600} />

    };

export default GameCanvas;