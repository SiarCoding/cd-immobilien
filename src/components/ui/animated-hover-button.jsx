// Animated Hover Button Component

import * as React from "react";
import { cn } from "../../lib/utils";

/**
 * HoverButton Component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Button content
 * @param {string} [props.startColor] - Start color for gradient
 * @param {string} [props.endColor] - End color for gradient
 * @param {"low"|"medium"|"high"} [props.animationIntensity] - Animation intensity
 */

const HoverButton = React.forwardRef(
  (
    {
      className,
      children,
      startColor = "#b87333",
      endColor = "#e0ac69",
      animationIntensity = "medium",
      ...props
    },
    ref
  ) => {
    const buttonRef = React.useRef(null);
    const [isListening, setIsListening] = React.useState(false);
    const [circles, setCircles] = React.useState([]);
    const lastAddedRef = React.useRef(0);

    const intensityConfig = {
      low: { throttle: 120, maxSize: 20 },
      medium: { throttle: 80, maxSize: 30 },
      high: { throttle: 50, maxSize: 40 },
    };

    const { throttle, maxSize } = intensityConfig[animationIntensity || "medium"];

    const createCircle = React.useCallback(
      (x, y) => {
        const buttonWidth = buttonRef.current?.offsetWidth || 0;
        const xPos = x / buttonWidth;
        const color = `radial-gradient(circle at 30% 30%, ${startColor}, ${endColor} ${xPos * 100}%)`;

        setCircles((prev) => [
          ...prev,
          {
            id: Date.now(),
            x,
            y,
            color,
            fadeState: null,
            size: Math.random() * (maxSize - 10) + 10,
            rotation: Math.random() * 360,
          },
        ]);
      },
      [startColor, endColor, maxSize]
    );

    const handlePointerMove = React.useCallback(
      (event) => {
        if (!isListening) return;
        const currentTime = Date.now();
        if (currentTime - lastAddedRef.current > throttle) {
          lastAddedRef.current = currentTime;
          const rect = event.currentTarget.getBoundingClientRect();
          const x = event.clientX - rect.left;
          const y = event.clientY - rect.top;
          createCircle(x, y);
        }
      },
      [isListening, createCircle, throttle]
    );

    const handlePointerEnter = React.useCallback(() => {
      setIsListening(true);
    }, []);

    const handlePointerLeave = React.useCallback(() => {
      setIsListening(false);
    }, []);

    React.useEffect(() => {
      circles.forEach((circle) => {
        if (!circle.fadeState) {
          setTimeout(() => {
            setCircles((prev) =>
              prev.map((c) =>
                c.id === circle.id ? { ...c, fadeState: "in" } : c
              )
            );
          }, 0);

          setTimeout(() => {
            setCircles((prev) =>
              prev.map((c) =>
                c.id === circle.id ? { ...c, fadeState: "out" } : c
              )
            );
          }, 800);

          setTimeout(() => {
            setCircles((prev) => prev.filter((c) => c.id !== circle.id));
          }, 2000);
        }
      });
    }, [circles]);

    return (
      <button
        ref={buttonRef}
        className={cn(
          "animated-hover-button",
          className
        )}
        onPointerMove={handlePointerMove}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        {...props}
      >
        {circles.map(({ id, x, y, color, fadeState, size, rotation }) => (
          <div
            key={id}
            className={cn(
              "circle-effect",
              fadeState === "in" && "fade-in",
              fadeState === "out" && "fade-out",
              !fadeState && "initial"
            )}
            style={{
              left: x,
              top: y,
              width: size,
              height: size,
              background: color,
              transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
              boxShadow: `0 0 ${size / 2}px rgba(255, 255, 255, 0.3)`,
            }}
          />
        ))}
        {typeof children === 'string' ? (
          <span className="button-text">{children}</span>
        ) : children}
      </button>
    );
  }
);

HoverButton.displayName = "HoverButton";

export { HoverButton };
