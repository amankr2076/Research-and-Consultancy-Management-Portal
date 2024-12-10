const fs = require('fs');
const { google } = require('googleapis');

async function uploadFile(authClient, filePath, fileName) {
  return new Promise((resolve, reject) => {
    const drive = google.drive({ version: 'v3', auth: authClient });

    const fileMetaData = {
      name: fileName, // Name of the file on Google Drive
      parents: ['1qnXg3Li4iPW0roSuDjrTb81gmFMDHE01'] // Folder ID on Google Drive
    };

    const media = {
      body: fs.createReadStream(filePath), // Path to the PDF file
      mimeType: 'application/pdf'
    };

    drive.files.create({
      resource: fileMetaData,
      media: media,
      fields: 'id'
    }, async function (error, file) {
      if (error) {
        console.error("Error uploading file:", error);
        return reject(error);
      }

      const fileId = file?.data?.id;
      if (!fileId) {
        console.error("Error: File ID is undefined.");
        return reject(new Error("File ID is undefined."));
      }

      try {
        // Set permissions to make the file viewable by anyone with the link
        await drive.permissions.create({
          fileId: fileId,
          requestBody: {
            role: 'reader',
            type: 'anyone'
          }
        });

        // Generate the link
        const fileLink = `https://drive.google.com/file/d/${fileId}/view?usp=sharing`;
        console.log('File uploaded successfully. Shareable link:', fileLink);
        resolve(fileLink);
      } catch (permissionError) {
        console.error("Error setting file permissions:", permissionError);
        reject(permissionError);
      }
    });
  });
}

module.exports = uploadFile;
