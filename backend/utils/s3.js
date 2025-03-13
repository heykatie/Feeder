const {
	S3Client,
	GetObjectCommand,
	PutObjectCommand,
	DeleteObjectCommand,
} = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { v4: uuidv4 } = require('uuid');

const ALLOWED_EXTENSIONS = ['png', 'jpg', 'jpeg', 'gif'];
const ALLOWED_MIME_TYPES = [
	'image/jpeg',
	'image/png',
	'application/pdf',
	'video/mp4',
];

const VALID_FILE_TYPES = {
	png: 'image/png',
	jpg: 'image/jpeg',
	jpeg: 'image/jpeg',
	gif: 'image/gif',
	pdf: 'application/pdf',
	mp4: 'video/mp4',
};

const validateFile = (filename, contentType) => {
	const ext = filename.split('.').pop().toLowerCase();
	return VALID_FILE_TYPES[ext] && VALID_FILE_TYPES[ext] === contentType;
};
/**
 * Validate if the file extension is allowed.
 * @param {string} filename - The original filename (e.g., "image.png").
 * @returns {boolean} - Returns true if the extension is allowed, false otherwise.
 */
const validateFileExtension = (filename) => {
  const ext = filename.split('.').pop().toLowerCase();
  return ALLOWED_EXTENSIONS.includes(ext);
};

/**
 * Generate a unique filename using uuid.
 * @param {string} originalFilename - The original filename (e.g., "image.png").
 * @returns {string} - A unique filename (e.g., "unique-id-image.png").
 */
const getUniqueFilename = (originalFilename) => {
  const uuid = uuidv4(); // Generate a unique identifier
  const fileExtension = originalFilename.split('.').pop().toLowerCase(); // Get file extension
  return `${uuid}-${Date.now()}.${fileExtension}`; // Combine UUID, timestamp, and extension
};


const s3 = new S3Client({
	region: process.env.AWS_REGION,
	credentials: process.env.AWS_ACCESS
		? {
				accessKeyId: process.env.AWS_ACCESS,
				secretAccessKey: process.env.AWS_SECRET,
		}
		: undefined, // Use default AWS credentials chain if env vars aren't set
});


// const validateFile = (filename, contentType) => {
// 	const ext = filename.split('.').pop().toLowerCase();
// 	return (
// 		ALLOWED_EXTENSIONS.includes(ext) &&
// 		ALLOWED_MIME_TYPES.includes(contentType)
// 	);
// };

const generatePutPresignedUrl = async (key, contentType) => {
	if (!validateFile(key, contentType)) {
		throw new Error('Invalid file type');
	}

	const params = {
		Bucket: process.env.AWS_BUCKET_NAME,
		Key: key,
		ContentType: contentType,
	};
	const command = new PutObjectCommand(params);
	return await getSignedUrl(s3, command, { expiresIn: 3600 });
};

// const generatePutPresignedUrl = async (key, contentType) => {
// 	const params = {
// 		Bucket: process.env.AWS_BUCKET_NAME,
// 		Key: key,
// 		ContentType: contentType,
// 	};
// 	const command = new PutObjectCommand(params);
// 	return await getSignedUrl(s3, command, { expiresIn: 3600 }); // 1-hour expiration
// };

const generateGetPresignedUrl = async (key) => {
	const params = {
		Bucket: process.env.AWS_BUCKET_NAME,
		Key: key, // Use the full key directly
		ACL: 'public-read',
	};
	const command = new GetObjectCommand(params);
	return await getSignedUrl(s3, command, { expiresIn: 3600 });
};

// const generateGetPresignedUrl = async (key) => {
// 	const params = {
// 		Bucket: process.env.AWS_BUCKET_NAME,
// 		Key: `uploads/${key}`,
// 	};

// 	const command = new GetObjectCommand(params);
// 	return await getSignedUrl(s3, command, { expiresIn: 3600 }); // 1-hour expiration
// };

const s3Client = new S3Client({ region: process.env.AWS_REGION });

const deleteFromS3 = async (userId, key) => {
	try {
		const file = await File.findOne({
			where: { userId, fileUrl: { [Op.like]: `%/${key}` } },
		});
		if (!file) {
			return { success: false, error: 'Unauthorized file deletion attempt' };
		}

		const command = new DeleteObjectCommand({
			Bucket: process.env.AWS_BUCKET_NAME,
			Key: key,
		});
		await s3Client.send(command);

		// Remove from DB
		await file.destroy();
		return { success: true };
	} catch (error) {
		console.error(`Failed to delete file: ${key}`, error);
		return { success: false, error: error.message };
	}
};

module.exports = {
	generatePutPresignedUrl,
	generateGetPresignedUrl,
	deleteFromS3,
};