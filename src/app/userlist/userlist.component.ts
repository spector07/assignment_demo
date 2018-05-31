import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  public user_list;
  public user_count;
  public user_repos;
  constructor(public http: Http) { }

  ngOnInit() {
    this.getUserList();
  }

  getUserList() {
    var thisaap = this;
    this.http.get('https://api.github.com/users').subscribe(function (response) {
      if (response) {
        var body_data = response['_body'];
        thisaap.user_list = JSON.parse(body_data);
        //console.log(thisaap.user_list.length)
        thisaap.user_count = thisaap.user_list.length;
        thisaap.getRepos();
      }
    });
  }

  getRepos() {
    var thisaap = this;
    this.user_list.forEach(element => {
      this.http.get("https://api.github.com/users/" + element.login + "/repos").subscribe(function (response) {
        if (response) {
          var body_data = response['_body'];
          thisaap.user_repos = JSON.parse(body_data);
          //console.log(thisaap.user_repos)
        }
      });
    });
  }

}
