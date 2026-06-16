import { useEffect, useRef, useState } from "react";

export default function CanvasBoard() {
  const canvasRef = useRef(null);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const [camera, setCamera] = useState({
    x: 0,
    y: 0,
    zoom: 1,
  });

  const [shapes, setShapes] = useState([
    {
      id: 1,
      x: 100,
      y: 100,
      width: 120,
      height: 80,
      color: "tomato",
    },
    {
      id: 2,
      x: 350,
      y: 200,
      width: 120,
      height: 80,
      color: "dodgerblue",
    },
  ]);

  const draggingShape = useRef(null);

  useEffect(() => {
    draw();
  }, [shapes, camera]);

  const draw = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();

    ctx.translate(camera.x, camera.y);
    ctx.scale(camera.zoom, camera.zoom);

    drawGrid(ctx);

    shapes.forEach((shape) => {
      ctx.fillStyle = shape.color;
      ctx.fillRect(
        shape.x,
        shape.y,
        shape.width,
        shape.height
      );

      ctx.fillStyle = "white";
      ctx.font = "16px Arial";
      ctx.fillText(
        `#${shape.id}`,
        shape.x + 10,
        shape.y + 25
      );
    });

    ctx.restore();
  };

  const drawGrid = (ctx) => {
    const size = 50;

    ctx.strokeStyle = "#ddd";
    ctx.lineWidth = 1;

    for (let x = -1000; x < 2000; x += size) {
      ctx.beginPath();
      ctx.moveTo(x, -1000);
      ctx.lineTo(x, 2000);
      ctx.stroke();
    }

    for (let y = -1000; y < 2000; y += size) {
      ctx.beginPath();
      ctx.moveTo(-1000, y);
      ctx.lineTo(2000, y);
      ctx.stroke();
    }
  };

  const getCanvasCoordinates = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();

    const x =
      (e.clientX - rect.left - camera.x) /
      camera.zoom;

    const y =
      (e.clientY - rect.top - camera.y) /
      camera.zoom;

    return { x, y };
  };

  const handleMouseMove = (e) => {
    const pos = getCanvasCoordinates(e);

    setMousePos(pos);

    if (!draggingShape.current) return;

    setShapes((prev) =>
      prev.map((shape) =>
        shape.id === draggingShape.current.id
          ? {
              ...shape,
              x: pos.x - draggingShape.current.offsetX,
              y: pos.y - draggingShape.current.offsetY,
            }
          : shape
      )
    );
  };

  const handleMouseDown = (e) => {
    const pos = getCanvasCoordinates(e);

    const clickedShape = shapes.find(
      (shape) =>
        pos.x >= shape.x &&
        pos.x <= shape.x + shape.width &&
        pos.y >= shape.y &&
        pos.y <= shape.y + shape.height
    );

    if (!clickedShape) return;

    draggingShape.current = {
      id: clickedShape.id,
      offsetX: pos.x - clickedShape.x,
      offsetY: pos.y - clickedShape.y,
    };
  };

  const handleMouseUp = () => {
    draggingShape.current = null;
  };

  const handleWheel = (e) => {
    e.preventDefault();

    const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;

    setCamera((prev) => ({
      ...prev,
      zoom: Math.min(
        3,
        Math.max(0.5, prev.zoom * zoomFactor)
      ),
    }));
  };

  return (
    <>
      <div
        style={{
          marginBottom: "10px",
          fontFamily: "monospace",
        }}
      >
        X: {mousePos.x.toFixed(0)} | Y:{" "}
        {mousePos.y.toFixed(0)}
      </div>

      <canvas
        ref={canvasRef}
        width={1000}
        height={600}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onWheel={handleWheel}
        style={{
          border: "2px solid #333",
          cursor: "grab",
          background: "#fafafa",
        }}
      />
    </>
  );
}