import * as d3 from "d3";

export function InvestmentGraph({
  data = [1000, 1250, 1300, 1000, 1350, 1825],
  width = 540,
  height = 340,
  marginTop = 30,
  marginRight = 20,
  marginBottom = 60, // Increased to make room for X-axis labels
  marginLeft = 70    // Increased to make room for Y-axis labels
}) {
  if (!data || data.length === 0) return null;

  const x = d3.scaleLinear([0, data.length - 1], [marginLeft, width - marginRight]);
  const y = d3.scaleLinear(d3.extent(data), [height - marginBottom, marginTop]);
  const line = d3.line((d, i) => x(i), y);

  
  const yTicks = y.ticks(5); 
  const xTicks = data.map((_, i) => i); 

  return (
    <svg width={width} height={height} style={{ overflow: "visible" }}>
      
      {/* Y-AXIS TICKS & GRIDLINES */}
      {yTicks.map((tick) => (
        <g key={tick} transform={`translate(0, ${y(tick)})`}>
          {/* Subtle horizontal gridline */}

          {/* Tick label text */}
          <text
            x={marginLeft - 10}
            textAnchor="end"
            alignmentBaseline="middle"
            fontSize="11"
            fill="#64748b"
          >
            £{tick}
          </text>
        </g>
      ))}

      {/* X-AXIS TICKS */}
      {xTicks.map((tickValue) => (
        <text
          key={tickValue}
          x={x(tickValue)}
          y={height - marginBottom + 20}
          textAnchor="middle"
          fontSize="11"
          fill="#64748b"
        >
          Month {tickValue}
        </text>
      ))}

     
      <path fill="none" stroke="#f54900" strokeWidth="2.5" d={line(data)} />
      <g fill="white" stroke="#f54900" strokeWidth="2">
        {data.map((d, i) => (
          <circle key={i} cx={x(i)} cy={y(d)} r="3" />
        ))}
      </g>

      
      <text
        transform={`translate(${marginLeft - 45}, ${(height - marginTop - marginBottom) / 2 + marginTop}) rotate(-90)`}
        textAnchor="middle"
        fontSize="12"
        fontWeight="600"
        fill="#1e293b"
      >
      </text>

      {/* X-AXIS TITLE */}
      <text
        x={(width - marginLeft - marginRight) / 2 + marginLeft}
        y={height - 15}
        textAnchor="middle"
        fontSize="12"
        fontWeight="600"
        fill="#1e293b"
      >
        Timeline
      </text>
    </svg>)}