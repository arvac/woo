import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController ,ModalController} from 'ionic-angular';
import {CartPage} from '../cart/cart';
import { Storage } from '@ionic/storage';
import * as WC from 'woocommerce-api';
@IonicPage()
@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html',
})
export class ProductDetailsPage {
  woocommerce:any;
  products:any[];
  reviews: any[] = [];
  product:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public toastCtrl:ToastController,
  public storage:Storage ,public modalCtrl:ModalController) {
  this.product=this.navParams.get('product');
  console.log(this.product);
  this.woocommerce=WC({
     url:"https://arvactur.000webhostapp.com/wordpress-4.9.1/wordpress/",
    consumerKey:"ck_524a1b27aa955b9a5b481ce41c454295645c1320",
    consumerSecret:"cs_881e9343fbe3133c8cf50b7c1856f69eb5bbe45b"
 });

     this.woocommerce.getAsync('products/' + this.product.id + '/reviews').then((data) => {
 
       this.reviews = JSON.parse(data.body).product_reviews;
       console.log(this.reviews);
 
     }, (err) => {
       console.log(err);
     })

  }
  
  addToCart(product) {
    
        this.storage.get("cart").then((data) => {
    
          if (data == null || data.length == 0) {
            data = [];
    
            data.push({
              "product": product,
              "qty": 1,
              "amount": parseFloat(product.price)
            })
          } else {
    
            let added = 0;
    
            for (let i = 0; i < data.length; i++) {
    
              if (product.id == data[i].product.id) {
                let qty = data[i].qty;
    
                console.log("Product is already in the cart");
    
                data[i].qty = qty + 1;
                data[i].amount = parseFloat(data[i].amount) + parseFloat(data[i].product.price);
                added = 1;
              }
    
            }
    
            if (added == 0) {
              data.push({
                "product": product,
                "qty": 1,
                "amount": parseFloat(product.price)
              })
            }
    
          }
    
          this.storage.set("cart", data).then(() => {
            console.log("Cart Updated");
            console.log(data);
    
            this.toastCtrl.create({
              message: "Cart Updated",
              duration: 3000
            }).present();
    
          })
    
        })
    
      }
      openCart(){
        
            this.modalCtrl.create(CartPage).present();
        
          }

}
