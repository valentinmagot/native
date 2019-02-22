import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  list:any;
  tmp:any;
  name: any = true;
  icon: any = true;
  msg: any = true;

  

  constructor(public toastController: ToastController){
    this.list = [
    {name:'Change Request', icon:'folder'}, 
    {name:'GCdocs 16 - Gold Build Comfiguration',icon:'document'}, 
    {name:'OTDS FAQ',icon:'document'},
    {name:'Product and Features Analysis',icon:'folder'}, 
    {name:'GCdocs Technical FAQ',icon:'document'},
    {name:'Mobility Enhancement',icon:'folder'},
    {name:'Promotional Material',icon:'folder'},
    {name:'Business Case Scenarios', icon:'globe'}
    ];

    this.tmp = this.list;
  }

  async presentToast(msg : string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  async presentToastWithOptions() {
    const toast = await this.toastController.create({
      message: 'Click to Close',
      showCloseButton: true,
      position: 'top',
      closeButtonText: 'Done'
    });
    toast.present();
  }

  download(item: String){
    this.msg = "Downloading : " + item;
    this.presentToast(this.msg);
    return true;
  }
  email(item: String){
    this.msg = "Emailling : " + item;
    this.presentToast(this.msg);
    return true;
  }

  reorder(item: string){
    if(item == 'az'){
      let def = this.list.filter((key, index) => this.list.lastIndexOf(key) === index).sort(this.compareAsc);
      this.tmp = def;
    }else if(item == 'za'){
      let def = this.list.filter((key, index) => this.list.lastIndexOf(key) === index).sort(this.compareAsc);
      this.tmp = def.reverse();
    }else {
      this.tmp = this.list;
    }
  }

  compareAsc(a, b) {
    const genreA = a.name.toUpperCase();
    const genreB = b.name.toUpperCase();
  
    let comparison = 0;
    if (genreA > genreB) {
      comparison = 1;
    } else if (genreA < genreB) {
      comparison = -1;
    }
    return comparison;
  }
}
