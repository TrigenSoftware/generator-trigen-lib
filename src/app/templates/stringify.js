
export default function stringify(data, indent = '\t') {
	return `${JSON.stringify(data, null, indent)}\n`;
}
