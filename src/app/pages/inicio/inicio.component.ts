import { Component, OnInit } from '@angular/core';

declare const $:any;
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styles: []
})
export class InicioComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}


/*
 $(".right-toggle-switch").hammer().on("click touchstart", function(e) {
      e.preventDefault();
      if ($(".rightbar").hasClass("right-aside-toggle")) {
          $(".rightbar").removeClass("right-aside-toggle");
      } else {
          $(".rightbar").addClass("right-aside-toggle");
      }
      $(window).trigger("resize");
    });
    $(".left-toggle-switch").hammer().on("click touchstart", function(e) {
      e.preventDefault();
      if ($("body").hasClass("left-aside-toggle")) {
          $("body").removeClass("left-aside-toggle");
      } else {
          $("body").addClass("left-aside-toggle");
      }
  });
*/