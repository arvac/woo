import { Component ,ViewChild} from '@angular/core';
import { NavController ,Slides,ToastController} from 'ionic-angular';
import {ProductDetailsPage} from '..//product-details/product-details';
import  {SearchPage} from '..//search/search';
import * as WC from 'woocommerce-api';
// import { SearchPage } from "../search/search";
import { WoocommerceProvider } from '../../providers/woocommerce/woocommerce';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  woocommerce:any;
  products:any[];
  moreProducts:any[];
  page:number;
  searchQuery: string = "";
  
  @ViewChild('productSlides')productSlides:Slides;
  constructor(public navCtrl: NavController,public toastCtrl:ToastController, private WP: WoocommerceProvider ) {
  this.page=1;

  this.woocommerce = WP.init();

 this.loadMoreProducts(null);
 
 this.woocommerce.getAsync("products").then( (data) => {
 console.log(JSON.parse(data.body));
  this.products = JSON.parse(data.body).products;
 }, (err) => {
  console.log(err)
 })

  }
  ionViewDidLoad(){
    setInterval(()=> {
      
            if(this.productSlides.getActiveIndex() == this.productSlides.length() -1)
              this.productSlides.slideTo(0);
      
            this.productSlides.slideNext();
          }, 3000)
  }
  loadMoreProducts(event){
   
    console.log(event);
    if(event == null)
    {
      this.page = 1;
      this.moreProducts = [];
    }
    else
      this.page++;

    this.woocommerce.getAsync("products?page=" + this.page).then( (data) => {
      console.log(JSON.parse(data.body));
      this.moreProducts = this.moreProducts.concat(JSON.parse(data.body).products);

      if(event != null)
      {
        event.complete();
      }

      if(JSON.parse(data.body).products.length < 1){
        event.enable(false);

        this.toastCtrl.create({
          message: "no exosten mas productos !",
          duration: 5000
        }).present();

      }


    }, (err) => {
      console.log(err)
    })
  }
  openProductPage(product){
    this.navCtrl.push(ProductDetailsPage, {"product": product} );
  }
  onSearch(event){
    if(this.searchQuery.length > 0){
      this.navCtrl.push(SearchPage, {"searchQuery": this.searchQuery});
    }
  }
}
