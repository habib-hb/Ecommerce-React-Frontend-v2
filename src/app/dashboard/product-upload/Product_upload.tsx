 
import Container from "../../components/Container";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../../../components/ui/card";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { Button } from "../../../components/ui/button";
import { useState } from "react";

const ProductUpload = () => {

    const [formData, setFormData] = useState({
        product_name: '',
        description: '',
        brand : '',
        price : '',
        instock_amount : '',
        category : '',
        images: [],
      });



      const handleChange = (e: any) => {
         if (e.target.name === 'images[]') {
                // Convert FileList to array for easier handling
                const filesArray:any = Array.from(e.target.files);
            
                setFormData({
                  ...formData,
                  images: filesArray, // Update images with array of File objects
                });
        } else {
          setFormData({
            ...formData,
            [e.target.name]: e.target.value,
          });
        }
      };



      const handleSubmit = async (e:any) => {
        e.preventDefault();
    
        const data = new FormData();

        data.append('admin_email',  typeof window !== 'undefined' ? window?.localStorage.getItem('loggedInEmail') || '' : '');

        
        data.append('product_name', formData.product_name);
        data.append('description', formData.description);
        data.append('brand', formData.brand);
        data.append('price', formData.price);
        data.append('instock_amount', formData.instock_amount);
        data.append('category', formData.category);
        
    
        for (let i = 0; i < formData.images.length; i++) {
          data.append('images[]', formData.images[i]);
        }
    
        try {
          const response = await fetch('https://laravel.valueadderhabib.com/api/dashboard/product-upload', {
            method: 'POST',
            body: data,
            credentials: 'include'
          });
    
          if (response.ok) {
            // Handle successful form submission
            let json_data = await response.json();
            alert(json_data.message);
          } else {
            // Handle errors
            alert('Form submission error - else block');
          }
        } catch (error) {
          console.error('Form submission error', error);
          alert(' Form submission error - catch block');
        }
      };
    return ( 
        <div>
            <Container>

                        <Card className="w-full max-w-md mx-auto mt-4">

                <CardHeader>

                    <CardTitle>Product Upload</CardTitle>

                </CardHeader>

                <CardContent className="grid gap-4">

                    <form method="POST" action="https://laravel.valueadderhabib.com/api/dashboard/product-upload" encType="multipart/form-data" onSubmit={handleSubmit}>

                    <div className="space-y-2">
                    <Label htmlFor="name">Product Name</Label>
                    <Input name="product_name" id="name" placeholder="" className="w-full" onChange={handleChange} />
                    </div>

                    <div className="space-y-2">
                    <Label htmlFor="email">Description</Label>
                    <Textarea name="description" id="email" placeholder="" className="w-full" onChange={handleChange} />
                    </div>

                    <div className="space-y-2">
                    <Label htmlFor="phone">Brand</Label>
                    <Input name="brand" id="phone" placeholder="" className="w-full" onChange={handleChange} />
                    </div>

                    <div className="space-y-2">
                    <Label htmlFor="price">Product Price</Label>
                    <Input name="price" id="price" placeholder="" type="number" className="w-full" onChange={handleChange} />
                    </div>

                    <div className="space-y-2">
                    <Label htmlFor="message">Instock Amount</Label>
                    <Input name="instock_amount" id="message" placeholder="" type="number" className="w-full" onChange={handleChange} />
                    </div>

                    <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Input name="category" id="category" placeholder="" className="w-full" onChange={handleChange} />
                    </div>

                    <div className="space-y-2">
                    <Label htmlFor="images">Product Images</Label>
                    <Input name="images[]" id="images" type="file" multiple className="w-full" onChange={handleChange} />
                    </div>

                    <CardFooter className="flex justify-end mt-4">
                    <Button className="mx-auto w-[200px] px-8 py-2 border border-black bg-black text-white">Submit</Button>
                    </CardFooter>

                    </form>
                </CardContent>

                </Card>
            </Container>
        </div>
     );
}
 
export default ProductUpload;