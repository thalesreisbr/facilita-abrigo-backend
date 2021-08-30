const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

const storageTypes = {
    LocalStorage: multer.diskStorage({
        //Determina o destino da imagem
        destination: (request, file, cb) => {
            cb(null, path.resolve(__dirname, '..', 'uploads', 'images'))
        },
        //Atribuindo um nome único para cada arquivo.
        filename: (request, file, cb) => {
            crypto.randomBytes(16, (error, hash) => {
                if (error) cb(error);
                file.key = `${hash.toString('hex')}-${file.originalname}`;
                cb(null, file.key);
            })
        }
    }),
}

exports.UPLOAD = multer({
    //Determina o destino da imagem
    dest: path.resolve(__dirname, '..', 'uploads', 'images'), 
    storage: storageTypes[process.env.STORAGE_TYPE],
    //Determina o limite de tamanho da imagem
    limits: { fileSize: 5 * 1024 * 1024, },
    //Determina os tipos possíveis da imagem
    fileFilter: (request, file, cb) => {
        const allowedMimes = [
            'image/jpeg',
            'image/pjpeg',
            'image/png',
            'image/gif'
        ];
        if(allowedMimes.includes(file.mimetype)){
            cb(null, true);
        } else {
            cb(new Error("Tipo de arquivo inválido!"));
        }
    }
}).any("files");
