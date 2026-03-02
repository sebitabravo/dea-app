export const uploadImage = async ({ image, baseUrl, uuidv4 }) => {
  if (!image || !baseUrl || !uuidv4) return null;

  const formData = new FormData();
  const uniqueId = uuidv4();
  const fileName = `image_${uniqueId}.jpg`;

  formData.append('image', {
    uri: image,
    name: fileName,
    type: 'image/jpeg',
  });

  formData.append(
    'data',
    JSON.stringify({
      timestamp: new Date().toISOString(),
    })
  );

  const response = await fetch(`${baseUrl}/storage`, {
    method: 'POST',
    body: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.json();
};
