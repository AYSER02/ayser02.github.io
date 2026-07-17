"use client";

import React, { useRef, useEffect, useState } from "react";

export default function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [score, setScore] = useState(0);
  const [running, setRunning] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [localHighScore, setLocalHighScore] = useState<number>(() => {
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
      localStorage.setItem("snake_highscore", String(localHighScore));
    } catch {}
  }, [localHighScore]);

  useEffect(() => {
    if (!gameOver) return;
    if (score > localHighScore) {
      setLocalHighScore(score);
    }
  }, [gameOver, score, localHighScore]);

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
    <div className="flex flex-col gap-6 p-4 lg:flex-row lg:items-start lg:justify-between">
      <div className="relative flex-1 min-w-0 rounded-xl border border-white/20 bg-slate-900/80 p-4 shadow-lg">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-semibold text-white">Snake Game</h1>
            <p className="text-sm text-slate-300">Eat the food, grow longer, and avoid running into yourself.</p>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-sm text-slate-200">
            <span className="inline-flex rounded-full bg-slate-700/90 px-3 py-1">Score: {score}</span>
            <span className="inline-flex rounded-full bg-slate-700/90 px-3 py-1">High Score: {Math.max(localHighScore, score)}</span>
          </div>
        </div>

        <div className="relative mx-auto max-w-[720px] rounded-xl border border-slate-700 bg-slate-950 p-4">
          <canvas ref={canvasRef} width={600} height={600} className="w-full rounded-lg bg-slate-950" />
          {gameOver && (
            <div className="absolute inset-0 flex flex-col items-center justify-center rounded-xl bg-black/70 text-center text-white p-4">
              <h2 className="text-3xl font-bold">Game Over</h2>
              <p className="mt-3 text-lg">Final Score: {score}</p>
              <p className="mt-1 text-sm text-slate-300">High Score: {Math.max(localHighScore, score)}</p>
              <button onClick={resetGame} className="mt-4 rounded-full bg-emerald-500 px-5 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400">Restart</button>
            </div>
          )}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button onClick={() => setRunning(r => !r)} disabled={gameOver} className="rounded-full bg-sky-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-sky-500 disabled:cursor-not-allowed disabled:bg-slate-500">
            {running ? 'Pause' : 'Start'}
          </button>
          <button onClick={resetGame} className="rounded-full bg-slate-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-600">Restart</button>
          <div className="text-sm text-slate-300">Press <span className="font-semibold">Space</span> to pause/resume.</div>
        </div>
      </div>

      <div className="w-full max-w-md rounded-xl border border-white/10 bg-slate-950/95 p-5 shadow-xl backdrop-blur-xl lg:w-[360px] text-white">
        <h2 className="mb-3 text-lg font-semibold text-white">How to Play</h2>
        <ul className="space-y-2 text-sm text-white list-disc list-inside">
          <li>Use <strong>Arrow Keys</strong> or <strong>WASD</strong> to move the snake.</li>
          <li>Eat the red food to grow longer and increase your score.</li>
          <li>Avoid colliding with the snake's own body.</li>
          <li>The snake wraps around the screen edges.</li>
          <li>Press <strong>Space</strong> to pause or resume the game.</li>
        </ul>

        <div className="mt-5 rounded-2xl bg-slate-900/90 p-4 text-sm text-white">
          <p className="font-semibold text-white">Game Rules</p>
          <p className="mt-2 text-white">Every time you eat a food item, your score increases by one and the snake grows. If the head touches any part of your body, it’s game over.</p>
        </div>

        <div className="mt-5 rounded-2xl bg-slate-950/95 p-4 text-sm text-white">
          <p className="font-semibold text-white">Tips</p>
          <ul className="mt-2 space-y-2 text-white list-disc list-inside">
            <li>Plan turns ahead to avoid trapping yourself.</li>
            <li>Use the edges to wrap around and reposition quickly.</li>
            <li>Stay calm and move steadily for the best score.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
