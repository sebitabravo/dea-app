// Subir imagen seleccionada o capturada
const uploadImage = async () => {
    if (!image) return; // Verifica que haya una imagen para subir

    const formData = new FormData();
    const uniqueId = uuidv4(); // Genera un UUID
    const fileName = `image_${uniqueId}.jpg`; // Crea un nombre de archivo único

    formData.append('image', {
        uri: image,
        name: fileName, // Usa el nombre de archivo único
        type: 'image/jpeg',
    });

    const additionalData = {
        timestamp: new Date().toISOString(), // Fecha y hora actuales
        // Puedes agregar otros datos EXIF si los tienes
    };

    formData.append('data', JSON.stringify(additionalData)); // Agrega datos adicionales

    try {
        const response = await fetch(`${BASE_URL}/storage`, {
            method: 'POST',
            body: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
};