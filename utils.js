const _getExtension = fileName => {
	if (!fileName || typeof fileName !== 'string') return false;

	return fileName.split('.').pop();
}

export const isFileImage = fileName => {
	const extension = _getExtension(fileName);
	return (
		extension &&
      ['jpg', 'png', 'jpeg', 'webp', 'avif'].indexOf(extension.toLowerCase()) > -1
	);
}

export const generateFormData = data => {
	const formData = new FormData()

	for (const [key, value] of Object.entries(data)) {
		if (value !== undefined) {
			if (Array.isArray(value) && value.length) {
				value.forEach(i => {
					formData.append(key, i)
				})
			} else {
				formData.append(key, value)
			}
		}
	}

	return formData
}