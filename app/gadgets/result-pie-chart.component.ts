import { Component, Input, OnInit } from '@angular/core';

@Component({
  moduleId:     module.id,
  selector:    'result-pie-chart',
  templateUrl: 'result-pie-chart.component.html',
  styleUrls: []
})
export class ResultPieChartComponent implements OnInit{
  @Input() right: number;
  @Input() wrong: number;

  // Pie
  public pieChartLabels:string[] = ['Richtig', 'Falsch'];
  public pieChartData:number[];
  public pieChartType:string = 'pie';
  public pieChartColors:Array<any> = [
    {
      backgroundColor: ["#3ca03d", "#f26767"],
      hoverBackgroundColor: ["#3c763d", "#a94442"]
  }
  ];

  ngOnInit(){
    this.pieChartData = [this.right,this.wrong];
  }

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }
}
