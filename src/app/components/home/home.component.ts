import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { IProduct } from 'src/app/shared classes and types/iproduct';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  prdList: IProduct[] = [];
  constructor(private productService:ProductService) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(
      (res)=>{console.log(res);this.prdList=res;},
      (err)=>{console.log(err)}
    ); 
  }

}
