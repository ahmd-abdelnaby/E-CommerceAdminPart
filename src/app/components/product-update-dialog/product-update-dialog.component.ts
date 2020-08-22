import { Component, OnInit, Inject } from '@angular/core';
import { IProduct } from 'src/app/shared classes and types/iproduct';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-update-dialog',
  templateUrl: './product-update-dialog.component.html',
  styleUrls: ['./product-update-dialog.component.css']
})
export class ProductUpdateDialogComponent implements OnInit {

  prd:IProduct;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private prdService: ProductService) { }

  ngOnInit(): void {
    this.prd=this.data.dataKey;
    console.log(this.data.dataKey);
  }
  Update()
  {
    this.prdService.updateProduct(this.prd,this.prd.ID).subscribe(
      (res) => {alert('Done') },
      (err)=>{console.log(err);},
    );
  }

}
