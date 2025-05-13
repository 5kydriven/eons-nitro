export function sendResponse(
	event: any,
	{
		data,
		message,
		meta,
		statusCode,
	}: {
		data?: any;
		message?: string;
		meta?: any;
		statusCode?: number;
	},
) {
	setResponseStatus(event, statusCode || 200);
	return { data, message, meta };
}
