/** y = e^x and its inverse y = ln x, reflected in y = x. */
export function InverseGraph() {
  const size = 320;
  const min = -3;
  const max = 4;
  const sx = (x: number) => ((x - min) / (max - min)) * size;
  const sy = (y: number) => size - ((y - min) / (max - min)) * size;

  const path = (points: [number, number][]) =>
    points.map(([x, y], i) => `${i ? "L" : "M"}${sx(x).toFixed(1)},${sy(y).toFixed(1)}`).join(" ");

  const exp: [number, number][] = [];
  for (let x = min; x <= Math.log(max) + 0.001; x += 0.05) exp.push([x, Math.exp(x)]);
  const ln = exp.map(([x, y]) => [y, x] as [number, number]);

  return (
    <figure className="card my-5 p-4">
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="mx-auto w-full max-w-xs"
        role="img"
        aria-label="Graphs of y equals e to the x and y equals ln x, which are reflections of each other in the line y equals x"
      >
        <line x1={0} y1={sy(0)} x2={size} y2={sy(0)} stroke="#3a4558" strokeWidth="1" />
        <line x1={sx(0)} y1={0} x2={sx(0)} y2={size} stroke="#3a4558" strokeWidth="1" />
        <line
          x1={sx(min)}
          y1={sy(min)}
          x2={sx(max)}
          y2={sy(max)}
          stroke="#8b98ad"
          strokeWidth="1"
          strokeDasharray="5 5"
        />
        <path d={path(exp)} fill="none" stroke="#22d3ee" strokeWidth="2.25" />
        <path d={path(ln)} fill="none" stroke="#a78bfa" strokeWidth="2.25" />
        <g fontSize="12" fontFamily="var(--font-geist-mono)">
          <text x={sx(1.5)} y={sy(3.6)} fill="#22d3ee">
            y = eˣ
          </text>
          <text x={sx(3.9)} y={sy(0.75)} fill="#a78bfa" textAnchor="end">
            y = ln x
          </text>
          <text x={sx(-1.9)} y={sy(-2.3)} fill="#8b98ad">
            y = x
          </text>
          <text x={size - 10} y={sy(0) + 14} fill="#8b98ad">
            x
          </text>
          <text x={sx(0) - 14} y={12} fill="#8b98ad">
            y
          </text>
        </g>
      </svg>
      <figcaption className="mt-2 text-center text-sm text-mute">
        A function and its inverse are mirror images in the line y = x.
      </figcaption>
    </figure>
  );
}
