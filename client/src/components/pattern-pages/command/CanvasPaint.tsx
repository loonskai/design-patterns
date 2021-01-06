import React, { useState, useEffect, useRef, MutableRefObject } from 'react';
import PaintController from './PaintController';
import './CanvasPaint.css';

export default function CommandPage(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null) as MutableRefObject<HTMLCanvasElement>;
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [lineWidth, setLineWidth] = useState(1);
  const [strokeStyle, setStrokeStyle] = useState('#000000');
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const canvasContext = canvas.getContext('2d');
    if (canvasContext) {
      canvasContext.lineCap = 'round';
      canvasContext.lineWidth = lineWidth;
      canvasContext.strokeStyle = strokeStyle;
      setContext(canvasContext);
    }
  }, []);

  useEffect(() => {
    if (context) {
      context.strokeStyle = strokeStyle;
      context.lineWidth = lineWidth;
      setContext(context);
    }
  }, [strokeStyle, lineWidth]);

  const startDrawing = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    setIsMouseDown(true);
    const { offsetX, offsetY } = event.nativeEvent;
    setX(offsetX);
    setY(offsetY);
  };

  const stopDrawing = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    setIsMouseDown(false);
  };

  const drawLine = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (!isMouseDown || !context) return;

    const { offsetX: newX, offsetY: newY } = event.nativeEvent;
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(newX, newY);
    context.stroke();
    setX(newX);
    setY(newY);
  };

  const changeColor = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStrokeStyle(event.target.value);
  };

  const changeLineWidth = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLineWidth(Number(event.target.value));
  };

  return <div>
    <PaintController 
      strokeStyle={strokeStyle}
      lineWidth={lineWidth}
      onColorChange={changeColor}
      onLineWidthChange={changeLineWidth}
    />
    <canvas 
      ref={canvasRef} 
      className="canvas-paint"
      onMouseDown={startDrawing}
      onMouseMove={drawLine}
      onMouseUp={stopDrawing}
      onMouseOut={stopDrawing}
    />
  </div>;
}
