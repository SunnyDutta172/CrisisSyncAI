// Replace these with your actual Cloudinary credentials
const CLOUD_NAME = "your_cloud_name";
const UPLOAD_PRESET = "your_unsigned_preset"; // create an unsigned preset in Cloudinary dashboard

/**
 * Uploads a file to Cloudinary and returns the secure URL.
 * @param {File} file - The image file to upload
 * @returns {Promise<string>} - The secure Cloudinary URL
 */
export async function uploadToCloudinary(file) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Cloudinary upload failed");
  }

  const data = await res.json();
  return data.secure_url;
}
