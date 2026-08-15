export const normalize = ({ value, from, to }) => {
	const minValue = from[0];
	const maxValue = from[1];

	const min = to[0];
	const max = to[1];
	// Scale the value from minOriginal to maxOriginal to 0 to 1
	var scaledValue = (value - minValue) / (maxValue - minValue);

	// Scale the value from 0 to 1 to minNormalized to maxNormalized
	var normalizedValue = scaledValue * (max - min) + min;

	return normalizedValue;
};
