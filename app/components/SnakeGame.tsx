"use client";

import React, { useRef, useEffect, useState } from "react";

export default function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [score, setScore] = useState(0);
  const [running, setRunning] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [highScore, setHighScore] = useState<number>(() => {
    try {
      if (typeof window === "undefined") return 0;
      const v = localStorage.getItem("snake_highscore");
      return v ? parseInt(v, 10) || 0 : 0;
    } catch {
      return 0;
    }
  });

  // game state refs to avoid stale closures
  const snakeRef = useRef<{ x: number; y: number }[]>([{ x: 10, y: 10 }]);
  const vxRef = useRef(0);
  const vyRef = useRef(0);
  const foodRef = useRef({ x: 5, y: 5 });
  const runningRef = useRef(running);

  useEffect(() => {
    runningRef.current = running;
  }, [running]);

  // tileCount is needed in multiple places
  const tileCount = 20;

  const placeFood = () => {
    // avoid placing food on the snake
    let x: number, y: number;
    do {
      x = Math.floor(Math.random() * tileCount);
      y = Math.floor(Math.random() * tileCount);
    } while (snakeRef.current.some(s => s.x === x && s.y === y));
    foodRef.current = { x, y };
  };

  const resetGame = () => {
    snakeRef.current = [{ x: 10, y: 10 }];
    vxRef.current = 0;
    vyRef.current = 0;
    setScore(0);
    setGameOver(false);
    setRunning(true);
    placeFood();
  };

  useEffect(() => {
    try {
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem("snake_highscore", String(score));
      }
    } catch {}
  }, [score, highScore]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const tileSize = canvas.width / tileCount;

    const keyHandler = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" || e.key === "w") { vxRef.current = 0; vyRef.current = -1; }
      if (e.key === "ArrowDown" || e.key === "s") { vxRef.current = 0; vyRef.current = 1; }
      if (e.key === "ArrowLeft" || e.key === "a") { vxRef.current = -1; vyRef.current = 0; }
      if (e.key === "ArrowRight" || e.key === "d") { vxRef.current = 1; vyRef.current = 0; }
      if (e.key === " ") setRunning(r => !r);
    };

    window.addEventListener("keydown", keyHandler);

    const loop = setInterval(() => {
      if (!runningRef.current) return;

      const snake = snakeRef.current;
      const vx = vxRef.current;
      const vy = vyRef.current;
      const head = { x: snake[0].x + vx, y: snake[0].y + vy };

      // Wrap around
      head.x = (head.x + tileCount) % tileCount;
      head.y = (head.y + tileCount) % tileCount;

      // Check self collision (ignore current head at index 0)
      if (snake.some((s, idx) => idx !== 0 && s.x === head.x && s.y === head.y)) {
        // game over
        setGameOver(true);
        setRunning(false);
        return;
      }

      snakeRef.current = [head, ...snake];

      // Eat food
      if (head.x === foodRef.current.x && head.y === foodRef.current.y) {
        setScore(s => s + 1);
        placeFood();
      } else {
        snakeRef.current.pop();
      }

      // Draw
      ctx.fillStyle = "#0f172a";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // food
      ctx.fillStyle = "#ef4444";
      ctx.fillRect(foodRef.current.x * tileSize, foodRef.current.y * tileSize, tileSize, tileSize);

      // snake
      ctx.fillStyle = "#34d399";
      snakeRef.current.forEach((s) => {
        ctx.fillRect(s.x * tileSize + 1, s.y * tileSize + 1, tileSize - 2, tileSize - 2);
      });
    }, 100);

    // initialize food
    placeFood();

    return () => {
      clearInterval(loop);
      window.removeEventListener("keydown", keyHandler);
    };
  }, []);

  return (
    <div className="flex flex-col items-center p-4">
      <div className="relative">
        <canvas ref={canvasRef} width={400} height={400} className="border rounded" />
          {gameOver && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 text-white">
              <h2 className="text-2xl font-bold">Game Over</h2>
              <p className="mt-2">Final Score: {score}</p>
              <p className="mt-1">High Score: {Math.max(highScore, score)}</p>
              <button onClick={resetGame} className="mt-4 px-4 py-2 bg-green-500 hover:bg-green-600 rounded">Restart</button>
            </div>
          )}
      </div>
      <div className="mt-3 flex items-center gap-3">
        <button onClick={() => setRunning(r => !r)} disabled={gameOver} className="px-3 py-1 bg-blue-600 text-white rounded">{running ? 'Pause' : 'Start'}</button>
        <button onClick={resetGame} className="px-3 py-1 bg-gray-600 text-white rounded">Restart</button>
        <div className="text-sm">Score: {score}</div>
        <div className="text-sm ml-4">High: {Math.max(highScore, score)}</div>
      </div>
      <div className="mt-2 text-xs text-gray-500">Use arrow keys or WASD to move. Space to toggle pause.</div>
    </div>
  );
}
