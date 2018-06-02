import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  public user_list = [];
  public user_count = 0;
  public user_repos;
  public repo_lang;
  public followers;
  public userName;
  public selectedValue;
  constructor(public http: Http) { }
  public sortby = [
    { 'name': 'Name A->Z', 'value': 'AZ' },
    { 'name': 'Name Z->A', 'value': 'ZA' },
    { 'name': 'Rank Low to High', 'value': 'HL' },
    { 'name': 'Rank High to Low', 'value': 'LH' }
  ]
  ngOnInit() {

    // this.getUserList();

  }

  getUserList(searchValue: string) {
    //console.log(searchValue)
    searchValue = searchValue.trim();
    if (searchValue.length != 0) {
      let thisaap = this;
      this.http.get("https://api.github.com/search/users?q=" + searchValue + "&client_id=" + environment.git_client_id + "&client_secret=" + environment.git_client_api_key).subscribe(function (response) {
        if (response) {
          var body_data = response['_body'];
          var data = JSON.parse(body_data);
          thisaap.user_list = data.items;
          thisaap.user_count = data.total_count;
        }
      });
    }
    else{
      this.user_list = [];
      this.user_count = 0;
      console.log(this.user_list+"-----"+this.user_count)
    }
  }


  getRepos(username) {
    var thisaap = this;
    this.http.get("https://api.github.com/users/" + username + "/repos" + "?client_id=" + environment.git_client_id + "&client_secret=" + environment.git_client_api_key).subscribe(function (response) {
      if (response) {
        var body_data = response['_body'];
        thisaap.user_repos = JSON.parse(body_data);
      }
    });
  }

  sortAtoZ(a, b) {
    a = a.toLowerCase();
    b = b.toLowerCase();
    if (a < b) {
      return -1;
    }
    else if (a > b) {
      return 1;
    }
    else {
      return 0;
    }
  }

  sortZtoA(a, b) {
    a = a.toLowerCase();
    b = b.toLowerCase();
    if (a > b) {
      return -1;
    }
    else if (a < b) {
      return 1;
    }
    else {
      return 0;
    }
  }

  sortHighToLow(a, b) {
    if (a < b) {
      return -1;
    }
    else if (a > b) {
      return 1;
    }
    else {
      return 0;
    }
  }

  sortLowToHigh(a, b) {
    if (a > b) {
      return -1;
    }
    else if (a < b) {
      return 1;
    }
    else {
      return 0;
    }
  }

  sortingList(sortby) {
    var thisaap = this;
    if (this.user_list.length) {
      let data = this.user_list.sort(function (a, b) {
        if (sortby == 'AZ') {
          return thisaap.sortAtoZ(a.login, b.login);
        } else if (sortby == 'ZA') {
          return thisaap.sortZtoA(a.login, b.login);
        } else if (sortby == 'HL') {
          return thisaap.sortHighToLow(a.score, b.score);
        } else if (sortby == 'LH') {
          return thisaap.sortLowToHigh(a.score, b.score);
        }
      });
      this.user_list = data;
      console.log(this.user_list)
    }

  }

}
