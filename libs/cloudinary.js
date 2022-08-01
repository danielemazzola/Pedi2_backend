import {v2 as cloudinary} from 'cloudinary'

cloudinary.config({
    cloud_name:"dikdpoylq",
    api_key:"188855222562113",
    api_secret:"c7BXP28zVnTQVRAtrPkpc0sSoLc"
})

export const uploadImagen = async filePath =>{
    return await cloudinary.v2.uploader.upload(filePath,{
         folder: `restaurantes`
    })
}