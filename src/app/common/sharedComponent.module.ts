import { NgModule }       from '@angular/core';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { MenuBlocksComponent } from './menu-blocks/menuBlocks.component';
import { MenuComponent } from './menu/menu.component';
import { PagerComponent } from './pager/pager.component';





@NgModule({
    imports: [
    CommonModule,
    BrowserModule
        
     ],
    declarations: [
         MenuBlocksComponent,
         MenuComponent,
         PagerComponent,


    ],
    exports: [
        MenuBlocksComponent,
        MenuComponent,
        PagerComponent,


    ]
})
  
export class SharedModule {}