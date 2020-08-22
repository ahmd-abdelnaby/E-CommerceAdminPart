import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { IProduct } from 'src/app/shared classes and types/iproduct';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  prd: IProduct;
  fileToUpload: File = null;
  constructor(private productService: ProductService , private fileUploadService:FileUploadService ) {
    
    this.prd = {
      ID: 0,
      Name: '',
      Quantity: 0,
      Price: 0,
      Img: '',
      CategoryID: 0,
    };
  }

  ngOnInit(): void {}
  
  onFileSelected(files: FileList) {
    this.fileToUpload = files.item(0);
    this.prd.Img=this.fileToUpload.name;
    //alert(this.prd.Img);

    this.uploadFileToActivity();
}
uploadFileToActivity() {
  this.fileUploadService.postFile(this.fileToUpload).subscribe(data => {
    // do something, if upload success
    //c(data);
    }, error => {
      console.log(error);
    });
}

  addProduct() {
    console.log(this.prd);
    this.productService.addProduct(this.prd).subscribe(
      (res) => {
        console.log('Added Successfully');
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
