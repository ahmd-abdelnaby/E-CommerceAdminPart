import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared classes and types/iproduct';
import { ProductService } from 'src/app/services/product.service';
import { ProductDetailsDialogComponent } from '../product-details-dialog/product-details-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ProductUpdateDialogComponent } from '../product-update-dialog/product-update-dialog.component';
import { AddProductComponent } from '../add-product/add-product.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  prdList: IProduct[] = [];
  prd: IProduct;
  constructor(private productService:ProductService,private dialog: MatDialog) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(
      (res)=>{console.log(res);this.prdList=res;},
      (err)=>{console.log(err)}
    ); 
  }

  view(id:number) {

    this.dialog.open(ProductDetailsDialogComponent, {
      width: '530px',
      height: '600px',
      data: {
        dataKey: id,
      },
    });
    
  }

  update(id:number) {

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

  Delete(id)
  {
    
    this.productService.deleteProduct(id).subscribe(
      (res) => {console.log('Deleted'); },
      (err)=>{console.log(err);},
      ()=>{this.ngOnInit()}
    );
     }

  add()
  {
    this.dialog.open(AddProductComponent, {
      width: '530px',
      height: '600px',
    });
    
    this.dialog.afterAllClosed.subscribe(() => {
      this.ngOnInit();
  });
    
  }
  searchChanged(value:string)
  {
    //alert(value);
    if(value=='')
    {
      this.productService.getAllProducts().subscribe(
        (res)=>{console.log(res);this.prdList=res;},
        (err)=>{console.log(err)}
      ); 
    }
    else if(value!='')
    {
    this.productService.getProductsByName(value).subscribe(
      (res)=>{console.log(res);this.prdList=res;},
      (err)=>{console.log(err)}
    );
    }
  }
}

