import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { CloudData, CloudOptions } from 'angular-tag-cloud-module';
import { IdListService } from '../id-list-service/id-list.service'

@Component({
  selector: 'app-wordcloud',
  templateUrl: './wordcloud.component.html',
  styleUrls: ['./wordcloud.component.less']
})


export class WordcloudComponent implements OnInit {

  constructor(private http:HttpClient, private _idList : IdListService) { }
  private fileDir : string = 'assets//homes_search_result_wordcloud/tfidfData.json';
  private tfIdfData : any;
  // private cData: CloudData[] ;//= new Array<CloudData>();
  private cDatas : any[];
  // private oneID : string;
  private idList_tfidf : string[] = new Array();
  ngOnInit() {
    this.http.get(this.fileDir).subscribe(data => {
      this.tfIdfData = data as [];
      // console.log("get data");
      // console.log(this.tfIdfData[0]);
      for(var i = 0 ; i <= this.tfIdfData.length; i++){
        // console.log(this.tfIdfData[i]["docID"]);
        try{
          //find each matching tf-idf
          //generate wordcloud
          this.idList_tfidf.push(this.tfIdfData[i]["docID"]);
          // this.tfIdfData[i]["docID"]

        }
        catch{
          console.log("index " + i + " does have error!");
          console.log(this.tfIdfData[i]);
        }
      }

      var idList = this._idList.getIdList()
      for(var i = 0 ; i <= idList.length; i++){
        var idx = this.idList_tfidf.indexOf(idList[i]);
        var tfidfValList = this.tfIdfData[idx]["IFIDF"];
        var kwList = [];
        for(var j = 0 ; j <= tfidfValList.length; j++){
          kwList.push(tfidfValList[j][0]);
          if (j > tfidfValList.length / 2){
            break;
          }
        }
        //gen word cloud with kwList
        let cData = new Array<CloudData>();
        for(var k = 0 ; k <= kwList.length; k++){
          cData.push({text: kwList[k], weight: 10, link: 'https://google.com', color: '#ffaaee'});
        }
        this.cDatas.push(cData);
      }
      // let idList = 
      
    });
  }

  cldData:CloudData;
  options: CloudOptions = {
    // if width is between 0 and 1 it will be set to the size of the upper element multiplied by the value 
    width : 1000,
    height : 400,
    overflow: false,
  }
  
  // genWrdCld(cData : CloudData){
  
    // data: Array<CloudData> = [
    //   {text: 'Weight-10-link-color', weight: 10, link: 'https://google.com', color: '#ffaaee'},
    //   {text: 'Weight-10-link', weight: 10, link: 'https://google.com'},
    //   // ...
    // ]
  // }

  // getID(){
  //   let idInfos = this.idList.getIdList()
  //   for (let i  = 0 ; i <= idInfos.length; i++){

  //     this.tfIdfIdList.findIndex(idInfos[i])
  //   }
    // var oneID = doc["id"];
    // oneID
  // }
}