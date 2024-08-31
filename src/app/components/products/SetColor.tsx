 
import { CartProductType, SelectedImgType } from "../../../app/product/productId/ProductDetails";

interface SetColorProps {
    images: SelectedImgType[];
    cartProduct: CartProductType;
    handleColorSelect:(value:SelectedImgType)=> void;
}
const SetColor:React.FC<SetColorProps> = ({
    images, 
    cartProduct, 
    handleColorSelect
}) => {
    return ( 
    <div>
        <div className="flex gap-4 items-center flex-wrap">
            <span className="font-semibold">VARIANTS:</span>
            <div className="flex gap-1  flex-wrap">
                {images.map((image)=>{
                    return <div
                    key={image.color}
                    onClick={()=>handleColorSelect(image)}
                    className={`
                     p-4
                     cursor-pointer   
                    border-[1.5px]
                    flex
                    items-center
                    justify-center
                    ${cartProduct.selectedImg.color === image.color ? 'border-teal-500 text-white bg-teal-500' : 'border-slate-400'}
                    `}>
                        {/* <div style={{background: image.colorCode}} className="
                            h-5
                            w-5
                            rounded-full
                            border-slate-300
                            cursor-pointer
                            border-[1.2px]
                        ">

                        </div> */}
                        <p>{image.color}</p>
                    </div>
                })}
            </div>
        </div>
    </div> 
        );
}
 
export default SetColor;