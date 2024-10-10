import ReactSpeedometer from "react-d3-speedometer";

// Default color for the text displayed on the gauge
const DEFAULT_TEXT_COLOR = '#2f3b52';
// Default color for the needle of the gauge
const DEFAULT_NEEDLE_COLOR = '#C6352C';
// Default duration for the needle transition animation
const DEFAULT_NEEDLE_TRANSITION_DURATION = 3000;
// Default width of the ring around the gauge
const DEFAULT_RING_WIDTH = 47;

// RangeGaugeComponent is a functional component that renders a speedometer gauge
export const RangeGaugeComponent = ({
    width = 350, // Width of the gauge
    height = 200, // Height of the gauge
    needleHeightRatio = 0.5, // Ratio of the needle height relative to the gauge radius
    value, // Current value to be displayed by the gauge
    minValue, // Minimum value of the gauge
    maxValue, // Maximum value of the gauge
    currentValueText, // Text to display the current value
    customSegmentLabels, // Custom labels for the segments of the gauge
    segments, // Number of segments in the gauge
    segmentColors, // Colors for each segment of the gauge
    ringWidth = DEFAULT_RING_WIDTH, // Width of the ring around the gauge
    needleTransitionDuration = DEFAULT_NEEDLE_TRANSITION_DURATION, // Duration of the needle transition animation
    needleColor = DEFAULT_NEEDLE_COLOR, // Color of the needle
    textColor = DEFAULT_TEXT_COLOR, // Color of the text displayed on the gauge
}) => (
    <div>
        <ReactSpeedometer
            width={width}
            height={height}
            needleHeightRatio={needleHeightRatio}
            value={value}
            minValue={minValue}
            maxValue={maxValue}
            currentValueText={currentValueText}
            customSegmentLabels={customSegmentLabels}
            segments={segments}
            segmentColors={segmentColors}
            ringWidth={ringWidth}
            needleTransitionDuration={needleTransitionDuration}
            needleTransition='easeElastic' // Type of transition for the needle
            needleColor={needleColor}
            textColor={textColor}
        />
    </div>
);