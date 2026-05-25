interface UploadImageParams {
  image: string;
  baseUrl: string;
  uuidv4: () => string;
}

interface UploadImageResult {
  [key: string]: unknown;
}

type ReactNativeUploadFile = {
  uri: string;
  name: string;
  type: string;
};

export const uploadImage = async ({ image, baseUrl, uuidv4 }: UploadImageParams): Promise<UploadImageResult | null> => {
  if (!image || !baseUrl || !uuidv4) return null;

  const formData = new FormData();
  const uniqueId = uuidv4();
  const fileName = `image_${uniqueId}.jpg`;

  const imageFile: ReactNativeUploadFile = {
    uri: image,
    name: fileName,
    type: 'image/jpeg',
  };

  formData.append('image', imageFile as unknown as string);

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

  return response.json() as Promise<UploadImageResult>;
};
