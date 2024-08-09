import { CldUploadWidget  } from "next-cloudinary";
import { TbPhotoPlus } from "react-icons/tb";
import { useState } from "react";
import Image from "next/image";
import { Products } from "@prisma/client";
import { getImageUrl } from "@/app/src/utils";

type ImageUploadProps = {
    image?: Products['image']
}

export default function ImageUpload({ image } : ImageUploadProps){
    const [ imageUrl, setImageUrl ] = useState( image ? getImageUrl(image) : '' );

    return (
        <>
            <CldUploadWidget
                uploadPreset="u5to1g7a"
                options={{
                    maxFiles: 1
                }}
                onSuccess={(result, {widget}) => {
                    console.log(result);
                    if( result.event === 'success' && result.info ){
                        //@ts-ignore
                        const urlImage = result.info.secure_url;
                        setImageUrl(urlImage);
                    }
                }}
            >
                {
                    ({open}) => (
                        <div className="space-y-2">
                            <label className="text-slate-800">Imagen Producto:</label>
                            <div 
                                className="cursor-pointer hover:opacity-70 transition p-10 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600 bg-slate-100"
                                onClick={()=> open()} 
                            >
                                <TbPhotoPlus 
                                    size={50}
                                />
                                <p className="text-lg font-semibold">Agregar imagen</p>
                            </div>
                            <div className="flex flex-col items-center gap-5">
                                {
                                    image && imageUrl &&
                                    <p>Imagen actual</p>
                                }
                                { 
                                        imageUrl && 
                                            <div>
                                                <Image 
                                                    width={300}
                                                    height={300}
                                                    style={{objectFit: 'contain'}}
                                                    src={imageUrl}
                                                    alt="Upload Img"
                                                />
                                            </div>
                                }
                            </div>
                            <input 
                                type="hidden" 
                                name="imageUrl"
                                value={imageUrl}
                            />
                        </div>
                    )
                }
            </CldUploadWidget>
        </>
    );
};