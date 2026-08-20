import React, { useEffect, useRef } from 'react';

interface FloatingBackgroundProps {
  theme: 'dark' | 'light';
}

export const FloatingBackground: React.FC<FloatingBackgroundProps> = ({ theme }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDark = theme === 'dark';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Mouse coordinates for interactive particle attraction
    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Floating Code & Tech Symbols
    const codeSymbols = ['{ }', '</>', 'TS', 'React', 'Node', 'API', 'SQL', '⚡', 'async', 'git', '01', '=>'];
    const floatingTokens: Array<{
      text: string;
      x: number;
      y: number;
      size: number;
      vx: number;
      vy: number;
      opacity: number;
      targetOpacity: number;
      color: string;
      angle: number;
      va: number;
    }> = [];

    const tokenCount = 18;
    const colors = isDark 
      ? ['rgba(6, 182, 212, ', 'rgba(59, 130, 246, ', 'rgba(139, 92, 246, ', 'rgba(16, 185, 129, ']
      : ['rgba(2, 132, 199, ', 'rgba(37, 99, 235, ', 'rgba(124, 58, 237, ', 'rgba(5, 150, 105, '];

    for (let i = 0; i < tokenCount; i++) {
      floatingTokens.push({
        text: codeSymbols[Math.floor(Math.random() * codeSymbols.length)],
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 8 + 12,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4 - 0.15,
        opacity: Math.random() * 0.25 + 0.1,
        targetOpacity: Math.random() * 0.35 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
        angle: (Math.random() - 0.5) * 0.4,
        va: (Math.random() - 0.5) * 0.005,
      });
    }

    // Interactive Floating Particles & Constellations
    const particleCount = isDark ? 45 : 25;
    const particles: Array<{
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      alpha: number;
      color: string;
    }> = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 1,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        alpha: Math.random() * 0.4 + 0.1,
        color: isDark ? '#38bdf8' : '#2563eb',
      });
    }

    // Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse lerp
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Draw subtle connective constellation lines
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        // Move particles
        p1.x += p1.vx;
        p1.y += p1.vy;

        // Wrap boundaries
        if (p1.x < 0) p1.x = width;
        if (p1.x > width) p1.x = 0;
        if (p1.y < 0) p1.y = height;
        if (p1.y > height) p1.y = 0;

        // Mouse gentle push/pull
        const dx = mouseX - p1.x;
        const dy = mouseY - p1.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          p1.x -= (dx / dist) * 0.6;
          p1.y -= (dy / dist) * 0.6;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = isDark 
          ? `rgba(56, 189, 248, ${p1.alpha})`
          : `rgba(37, 99, 235, ${p1.alpha * 0.8})`;
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const distBetween = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (distBetween < 100) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            const lineAlpha = (1 - distBetween / 100) * (isDark ? 0.12 : 0.07);
            ctx.strokeStyle = isDark
              ? `rgba(96, 165, 250, ${lineAlpha})`
              : `rgba(37, 99, 235, ${lineAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      // Draw floating code tokens
      ctx.font = '600 13px "JetBrains Mono", monospace';
      for (let i = 0; i < floatingTokens.length; i++) {
        const token = floatingTokens[i];

        token.x += token.vx;
        token.y += token.vy;
        token.angle += token.va;

        if (token.y < -30) token.y = height + 20;
        if (token.x < -30) token.x = width + 20;
        if (token.x > width + 30) token.x = -20;

        ctx.save();
        ctx.translate(token.x, token.y);
        ctx.rotate(token.angle);
        ctx.fillStyle = `${token.color}${token.opacity})`;
        ctx.fillText(token.text, 0, 0);
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isDark]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Floating Animated Mesh Aura Orbs */}
      <div className="glow-orb-blue w-[700px] h-[700px] absolute -top-40 -left-40 animate-pulse-scale opacity-60 dark:opacity-40" />
      <div className="glow-orb-purple w-[600px] h-[600px] absolute top-1/3 -right-40 animate-float opacity-50 dark:opacity-35" style={{ animationDuration: '9s' }} />
      <div className="glow-orb-cyan w-[550px] h-[550px] absolute -bottom-32 left-1/4 animate-float opacity-50 dark:opacity-30" style={{ animationDuration: '11s' }} />

      {/* Interactive Particle & Code Symbols Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-80" />

      {/* Cyber Grid Lines Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 dark:opacity-20" />
    </div>
  );
};
