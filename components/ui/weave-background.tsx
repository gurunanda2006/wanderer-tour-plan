"use client"

export const WeaveBackground = () => {
  return (
    <>
      <style>
        {`
          .weave-background {
            position: absolute;
            inset: 0;
            pointer-events: none;
            opacity: 0.5;
            z-index: 1;
          }

          /* Main container for the weave effect */
          .weave-container {
            position: relative;
            width: 100%;
            height: 100%;
            transform-style: preserve-3d;
            perspective: 1200px;
          }

          /* Central glowing nodes */
          .weave-node {
            position: absolute;
            width: 8px;
            height: 8px;
            background: #60a5fa; /* Light blue */
            border-radius: 50%;
            box-shadow:
              0 0 15px #60a5fa,
              0 0 30px rgba(96, 165, 250, 0.4);
            animation: nodeGlow 2s ease-in-out infinite;
          }

          .weave-node:nth-child(1) { top: 20%; left: 20%; animation-delay: 0s; }
          .weave-node:nth-child(2) { top: 20%; right: 20%; animation-delay: 0.5s; }
          .weave-node:nth-child(3) { bottom: 20%; left: 20%; animation-delay: 1s; }
          .weave-node:nth-child(4) { bottom: 20%; right: 20%; animation-delay: 1.5s; }

          /* Base style for all weaving threads */
          .weave-thread {
            position: absolute;
            background: linear-gradient(
              90deg,
              transparent,
              rgba(96, 165, 250, 0.6),
              transparent
            );
            box-shadow: 0 0 8px rgba(96, 165, 250, 0.3);
            transform-origin: center;
          }

          /* Horizontal threads */
          .weave-thread.horizontal {
            width: 100%;
            height: 1px;
          }

          .weave-thread.horizontal:nth-of-type(1) {
            top: 25%;
            animation: weaveHorizontal1 3s ease-in-out infinite;
          }

          .weave-thread.horizontal:nth-of-type(2) {
            top: 50%;
            animation: weaveHorizontal2 3.5s ease-in-out infinite;
          }

          .weave-thread.horizontal:nth-of-type(3) {
            top: 75%;
            animation: weaveHorizontal3 4s ease-in-out infinite;
          }

          /* Vertical threads */
          .weave-thread.vertical {
            width: 1px;
            height: 100%;
          }

          .weave-thread.vertical:nth-of-type(1) {
            left: 25%;
            animation: weaveVertical1 3.2s ease-in-out infinite;
          }

          .weave-thread.vertical:nth-of-type(2) {
            left: 50%;
            animation: weaveVertical2 3.7s ease-in-out infinite;
          }

          .weave-thread.vertical:nth-of-type(3) {
            left: 75%;
            animation: weaveVertical3 4.2s ease-in-out infinite;
          }

          /* Animation for the glowing nodes */
          @keyframes nodeGlow {
            0%, 100% {
              transform: scale(1);
              box-shadow:
                0 0 15px #60a5fa,
                0 0 30px rgba(96, 165, 250, 0.4);
            }
            50% {
              transform: scale(1.2);
              box-shadow:
                0 0 20px #60a5fa,
                0 0 40px rgba(96, 165, 250, 0.6);
            }
          }

          /* Horizontal thread animations */
          @keyframes weaveHorizontal1 {
            0%, 100% {
              transform: translateY(0) rotateX(0deg);
              opacity: 0.6;
            }
            50% {
              transform: translateY(20px) rotateX(15deg);
              opacity: 0.8;
            }
          }

          @keyframes weaveHorizontal2 {
            0%, 100% {
              transform: translateY(0) rotateX(0deg);
              opacity: 0.6;
            }
            50% {
              transform: translateY(-20px) rotateX(-15deg);
              opacity: 0.8;
            }
          }

          @keyframes weaveHorizontal3 {
            0%, 100% {
              transform: translateY(0) rotateX(0deg);
              opacity: 0.6;
            }
            50% {
              transform: translateY(15px) rotateX(10deg);
              opacity: 0.8;
            }
          }

          /* Vertical thread animations */
          @keyframes weaveVertical1 {
            0%, 100% {
              transform: translateX(0) rotateY(0deg);
              opacity: 0.6;
            }
            50% {
              transform: translateX(20px) rotateY(15deg);
              opacity: 0.8;
            }
          }

          @keyframes weaveVertical2 {
            0%, 100% {
              transform: translateX(0) rotateY(0deg);
              opacity: 0.6;
            }
            50% {
              transform: translateX(-20px) rotateY(-15deg);
              opacity: 0.8;
            }
          }

          @keyframes weaveVertical3 {
            0%, 100% {
              transform: translateX(0) rotateY(0deg);
              opacity: 0.6;
            }
            50% {
              transform: translateX(15px) rotateY(10deg);
              opacity: 0.8;
            }
          }
        `}
      </style>
      <div className="weave-background">
        <div className="weave-container">
          {/* Glowing nodes at corners */}
          <div className="weave-node" />
          <div className="weave-node" />
          <div className="weave-node" />
          <div className="weave-node" />

          {/* Horizontal threads */}
          <div className="weave-thread horizontal" />
          <div className="weave-thread horizontal" />
          <div className="weave-thread horizontal" />

          {/* Vertical threads */}
          <div className="weave-thread vertical" />
          <div className="weave-thread vertical" />
          <div className="weave-thread vertical" />
        </div>
      </div>
    </>
  )
}
