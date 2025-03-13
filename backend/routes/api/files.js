const express = require('express');
const {
	generateGetPresignedUrl,
	generatePutPresignedUrl,
	deleteFromS3,
	getUniqueFilename,
	validateFileExtension,
} = require('../../utils/s3.js');
const { User, File } = require('../../db/models/index.js');

const router = express.Router();

const extractS3Key = (fileUrl) => {
	try {
		const url = new URL(fileUrl);
		let key = decodeURIComponent(url.pathname).replace(/^\/+/, '');
		return key.split('?')[0]; // Remove query params
	} catch (error) {
		console.error('Invalid S3 URL:', fileUrl);
		return null;
	}
};


router.get('/upload-url', async (req, res) => {
	const { key, contentType, fileSize } = req.query;

	if (!key || !contentType || !fileSize) {
		return res
			.status(400)
			.json({ error: 'Key, contentType, and fileSize are required' });
	}

	const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB limit
	if (parseInt(fileSize, 10) > MAX_FILE_SIZE) {
		return res
			.status(400)
			.json({ error: 'File size exceeds the 10MB limit.' });
	}

	try {
		const uniqueKey = `uploads/${Date.now()}-${key}`;
		const url = await generatePutPresignedUrl(uniqueKey, contentType);
		return res.status(200).json({ url, uniqueKey });
	} catch (err) {
		console.error('Error generating presigned URL:', err);
		return res
			.status(500)
			.json({ error: 'Failed to generate presigned URL' });
	}
});

router.post('/upload', async (req, res) => {
	const { userId, fileUrl, type } = req.body;

	if (!userId || !fileUrl) {
		return res
			.status(400)
			.json({ error: 'User ID and file URL are required' });
	}

	// Extract the S3 key from the file URL
	let key = fileUrl.startsWith('https://') ? extractS3Key(fileUrl) : fileUrl;
	if (!key) {
		return res.status(400).json({ error: 'Invalid file URL format' });
	}

	try {
		const user = await User.findByPk(userId);
		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}

		// Store the file in the Files table
		const newFile = await File.create({
			userId,
			fileUrl: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`,
			fileType: type,
		});

		res.status(200).json({
			message: 'File stored successfully',
			file: newFile,
		});
	} catch (error) {
		console.error('Error saving file:', error);
		res.status(500).json({ error: 'Failed to save file' });
	}
});

router.delete('/delete', async (req, res) => {
	const { key } = req.body;

	if (!key) {
		return res.status(400).json({ error: 'File key is required' });
	}

	try {
		const result = await deleteFromS3(key);

		if (!result.success) {
			return res.status(500).json({ error: result.error });
		}

		return res.status(200).json({ message: 'File deleted successfully' });
	} catch (error) {
		console.error('Error deleting file:', error);
		return res.status(500).json({ error: 'Failed to delete file' });
	}
});

module.exports = router;
