import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Collectionviewmodel } from '../vendors/collectionviewmodel';
import { DatePipe } from '@angular/common';
import { Collection } from '../vendors/collection';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  collections:any[]=[{
    'date':'2022-08-09',
    'collectionId':1,
    'quantity':20,
    'container':'bags',
    'crop':'potato',
    'rateperkg':20,
  },
  {
    'date':'2022-08-09',
    'collectionId':2,
    'quantity':30,
    'container':'bags',
    'crop':'onion',
    'rateperkg':30,
  },
  {
    'date':'2022-08-09',
    'collectionId':3,
    'quantity':24,
    'container':'bags',
    'crop':'onion',
    'rateperkg':40,
  },
  {
    'date':'2022-08-09',
    'collectionId':4,
    'quantity':25,
    'container':'bags',
    'crop':'onion',
    'rateperkg':50,
  },
  {
    'date':'2022-08-09',
    'collectionId':5,
    'quantity':35,
    'container':'bags',
    'crop':'potato',
    'rateperkg':50,
  },
  {
    'date':'2022-08-09',
    'collectionId':6,
    'quantity':40,
    'container':'bags',
    'crop':'potato',
    'rateperkg':70,
  },
  {
    'date':'2022-08-09',
    'collectionId':7,
    'quantity':20,
    'container':'bags',
    'crop':'potato',
    'rateperkg':60,
  }]
  farmerslist:any[]=[{
    'Id':1,
    'firstname':'Shubham',
    'lastname':'Teli',
    'location':'Bhavadi'
  },
  {
  'Id':2,
  'firstname':'Abhay',
  'lastname':'Navale',
  'location':'Peth'
},
{
  'Id':3,
  'firstname':'Jayesh',
  'lastname':'Erande',
  'location':'Thugaon'
},
{
  'Id':4,
  'firstname':'Sahil',
  'lastname':'Mankar',
  'location':'Pargaon'
}, {
  'Id':5,
  'firstname':'Rohit',
  'lastname':'Gore',
  'location':'Satara'
},
{
  'Id':6,
  'firstname':'Rushikesh',
  'lastname':'Chikane',
  'location':'Satara'
},
{
  'Id':7,
  'firstname':'Akshay',
  'lastname':'Tanpure',
  'location':'Wada'
},
]

  constructor(private http: HttpClient) { }

  getCollections(): Observable<Collectionviewmodel[]> {

    const datePipe = new DatePipe('en-US');
    const currentDate = datePipe.transform(new Date(), 'yyyy-MM-dd');
    console.log(currentDate);

    const date = {
      "date": currentDate
    }
    let url = "http://localhost:5031/api/collections/getall"
    return this.http.post<Collectionviewmodel[]>(url, date);
  }
 
 getFarmers():any
{   
  console.log("service called")
  console.log(this.farmerslist);
  return this.farmerslist; 
 
}

  getCollection(id: number): Observable<any> {
    let url = "http://localhost:5031/api/collections/" + id;
    return this.http.get<Collection>(url);
  }
  // editCollection(updateddata: any): any {
  //   console.log("edit successful")
  //   let olddata = this.collections.find(c => c.collectionId == updateddata.collectionId)
  //   for (var o in olddata) {

  //     if (olddata.hasOwnProperty(o)) {

  //       for (var u in updateddata) {

  //         if (updateddata.hasOwnProperty(u)) {

  //           if (o == u) {

  //             olddata[o] = updateddata[u];
  //           }
  //         }
  //       }
  //     }
  //   }
   }



