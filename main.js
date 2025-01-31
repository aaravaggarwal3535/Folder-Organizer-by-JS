const fs = require('fs');
const path = require('path');

function getFiles(folderPath){
    const files = [];
    const entries = fs.readdirSync(folderPath, { withFileTypes: true });
    for (const entry of entries){
        const fileExtension = entry.name.split('.')[1];
        if (!files.includes(fileExtension)){
            files.push(fileExtension);
        }
    }
    return files;
}

async function fileCopy(filePath, destination){
    await fs.promises.copyFile(filePath, destination);
    console.log("file copied");
}

const folderPath = './to_be_organized';
let a = getFiles(folderPath);
for (const file_type of a) {
    fs.mkdirSync(path.join(folderPath, file_type), { recursive: true });
}

const entries = fs.readdirSync(folderPath, { withFileTypes: true });
(async () => {
    for (const entry of entries){
        if (entry.isFile()) {
            const fileName = entry.name;
            const fileExtension = entry.name.split('.')[1];
            const filePath = path.join(folderPath, fileName);
            const destination = path.join(folderPath, fileExtension, fileName);
            await fileCopy(filePath, destination);
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error('Error deleting file:', err);
                    return;
                }
                console.log('File deleted successfully');
            });
        }
    }
})();