import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Product } from '../../models/product';


@Injectable()
export class Products {
  products : Product[];

  constructor() { 
    this.products = [
      new Product({
        name:"Harry Potter 兩用袋",
        photoURL:"https://www.fetchawish.com/RESOURCES/FETCH/images/products/2017/2017HKru0000006166qy.png",
        author: "4e1afbc0-2e21-43ed-b2bb-d68ad5aafc0d"
      }),
      new Product({
        name:"鬆弛熊 手提包 Tote Bag 連八達通套",
        photoURL:"https://www.fetchawish.com/RESOURCES/FETCH/images/products/2017/2017HK6i0000006167wo.png",
        author: "4e1afbc0-2e21-43ed-b2bb-d68ad5aafc0d"
      }),
      new Product({
        name:"超夢幻! 月色夜光飾物",
        photoURL:"https://www.fetchawish.com/RESOURCES/FETCH/images/products/2017/2017HKji0000006151dz.png",
        author: "4e1afbc0-2e21-43ed-b2bb-d68ad5aafc0d"
      }),
      new Product({
        name:"Line Friends 陪你訓教攬枕",
        photoURL:"https://www.fetchawish.com/RESOURCES/FETCH/images/products/2017/2017HKdq0000006163wp.png",
        author: "6cc60d83-fd7b-4fd1-9696-dcdcab3e153f"
      }),
      new Product({
        name:"AS 快眠枕 (peter)",
        photoURL:"https://www.fetchawish.com/RESOURCES/FETCH/images/products/2017/2017HK9s00000060874i.png",
        author: "e8c28138-8b9f-4323-855b-fc4d1083ec75"
      })
    ]
  }

  getProducts() { 
    // Demo only: return fixtues
    return new Promise((resolve) => {
      resolve(this.products);
    });
  }
}