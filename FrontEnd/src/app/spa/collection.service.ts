import { Injectable } from '@angular/core';

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

  
getCollections():any
{   
  console.log("service called")
  return this.collections; 
}

getCollection(id:number):any{ 
  return this.collections[id];
 }
 editCollection(updateddata:any):any{
  console.log("edit successful")
 let olddata=this.collections.find(c=>c.collectionId==updateddata.collectionId)
 for (var o in olddata){

  if(olddata.hasOwnProperty(o)){

    for (var u in updateddata){

      if(updateddata.hasOwnProperty(u)){

      if(o==u){

        olddata[o]=updateddata[u];
      }
    }
  }
}
 }
 }
}


