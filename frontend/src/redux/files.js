import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// **Thunk 1: Fetch Pre-Signed URL**
export const getUploadUrl = createAsyncThunk(
	'files/getUploadUrl',
	async ({ fileName, fileType, fileSize }, { rejectWithValue }) => {
		try {
			const response = await fetch(
				`/api/files/upload-url?key=${encodeURIComponent(
					fileName
				)}&contentType=${fileType}&fileSize=${fileSize}`
			);
			const data = await response.json();
			if (!response.ok)
				throw new Error(data.error || 'Failed to get upload URL');
			return data; // { url, uniqueKey }
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

// **Thunk 2: Upload File to S3**
export const uploadFileToS3 = createAsyncThunk(
	'files/uploadFileToS3',
	async ({ url, file, uniqueKey }, { rejectWithValue }) => {
		try {
			const uploadResponse = await fetch(url, {
				method: 'PUT',
				headers: { 'Content-Type': file.type },
				body: file,
			});

			if (!uploadResponse.ok) throw new Error('Failed to upload file to S3');

			// Construct S3 URL
			const s3ImageUrl = `https://${
				import.meta.env.VITE_AWS_BUCKET_NAME
			}.s3.${import.meta.env.VITE_AWS_REGION}.amazonaws.com/${uniqueKey}`;
			return { s3ImageUrl, uniqueKey };
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

// **Thunk 3: Store File in Database**
export const storeFile = createAsyncThunk(
	'files/storeFile',
	async ({ userId, fileUrl, type }, { rejectWithValue }) => {
		try {
			const response = await fetch('/api/files/upload', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ userId, fileUrl, type }),
			});
			const data = await response.json();
			if (!response.ok)
				throw new Error(data.error || 'Failed to store file');
			return data.file;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

// **Slice**
const filesSlice = createSlice({
	name: 'files',
	initialState: {
		files: [],
		loading: false,
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getUploadUrl.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getUploadUrl.fulfilled, (state) => {
				state.loading = false;
			})
			.addCase(getUploadUrl.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(uploadFileToS3.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(uploadFileToS3.fulfilled, (state) => {
				state.loading = false;
			})
			.addCase(uploadFileToS3.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(storeFile.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(storeFile.fulfilled, (state, action) => {
				state.loading = false;
				state.files.push(action.payload);
			})
			.addCase(storeFile.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});

export default filesSlice.reducer;
