import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { IProduct } from 'src/app/shared classes and types/iproduct';
import { ProductService } from 'src/app/services/product.service';
import { ProductUpdateDialogComponent } from '../product-update-dialog/product-update-dialog.component';

@Component({
  selector: 'app-product-details-dialog',
  templateUrl: './product-details-dialog.component.html',
  styleUrls: ['./product-details-dialog.component.css'],
})
export class ProductDetailsDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,private productService:ProductService,private dialog: MatDialog,
    private prdService: ProductService
  ) {
    this.prd = {
      CategoryID: 0,
      ID: 0,
      Img: '',
      Name: '',
      Price: 0,
      Quantity: 0,
    };
  }
  prd: IProduct;
  ngOnInit(): void {
    this.prdService.getProductById(this.data.dataKey).subscribe(
      (res) => {
        this.prd = res;
        console.log(this.prd);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  update(id:number) {
    this.dialog.closeAll();
    this.productService.getProductById(id).subscribe(
      (res) => {
        this.prd = res;
        console.log(this.prd);
        this.dialog.open(ProductUpdateDialogComponent, {
          width: '530px',
          height: '600px',
          data: {
            dataKey: this.prd,
          },
        });
      },
      (err) => {
        console.log(err);
      }
    );

  }
}
