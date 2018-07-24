import { Injectable } from '@angular/core';
import * as WC from 'woocommerce-api';


@Injectable()
export class WoocommerceProvider {

  Woocommerce: any;
  WoocommerceV2: any;

  constructor() {
    this.Woocommerce = WC({
    url:"http://arvactur.000webhostapp.com/wordpress-4.9.1/wordpress/",
    consumerKey:"ck_524a1b27aa955b9a5b481ce41c454295645c1320",
    consumerSecret:"cs_881e9343fbe3133c8cf50b7c1856f69eb5bbe45b"
    });

    this.WoocommerceV2 = WC({
      url:"http://arvactur.000webhostapp.com/wordpress-4.9.1/wordpress/",
    consumerKey:"ck_524a1b27aa955b9a5b481ce41c454295645c1320",
    consumerSecret:"cs_881e9343fbe3133c8cf50b7c1856f69eb5bbe45b",
      wpAPI: true,
      version: "wc/v2"
    });
  }

  init(v2?: boolean){
    if(v2 == true){
      return this.WoocommerceV2;
    } else {
      return this.Woocommerce;
    }
  }

}
