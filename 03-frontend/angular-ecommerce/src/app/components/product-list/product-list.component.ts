import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../common/product";
import {ActivatedRoute} from "@angular/router";
import {ProductCategory} from "../../common/product-category";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  productCategory: ProductCategory | undefined;
  currentCategoryId: number | undefined;
  hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

  constructor(private productService: ProductService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
      this.getProductCategory();
    });
  }

  listProducts() {
    // check if "id" parameter is available

    if (this.hasCategoryId) {
      // get the "id" param string. convert string to a number
      // @ts-ignore
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
    }
    else {
      // category id not available...default to category id 1
      this.currentCategoryId = 1;
    }

    this.productService.getProductList(this.currentCategoryId).subscribe(
      data => {
        this.products = data;
      }
    )
  }

  getProductCategory() {

    if (this.hasCategoryId) {
      // get the "id" param string. convert string to a number
      // @ts-ignore
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
    }
    else {
      // category id not available...default to category id 1
      this.currentCategoryId = 100;
    }

    this.productService.getProductCategoryById(2).subscribe(
      data => {
        this.productCategory = data;
      }
    )
  }

}
