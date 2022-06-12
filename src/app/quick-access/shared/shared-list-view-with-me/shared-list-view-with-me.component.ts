import {LiveAnnouncer} from '@angular/cdk/a11y';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

export interface PeriodicElement {

  position: number;
  img: string;
  name: string;
  shared: string;
  DateModified: string;
  EndDate: string;
  gridListNav: string;
  folderColor: string;
  isFolder: boolean;
  Repository:string;
}


const ELEMENT_DATA: PeriodicElement[] = [
    {position: 1, img: '', name: 'folder 1', shared: "Jone, Adam", Repository:"Repository A",folderColor: "",  DateModified: '01/05/2022 3:30 PM', EndDate: '01/05/2022 3:30 PM', gridListNav:'gg', isFolder:true},
    {position: 2, img: '', name: 'folder 2', shared: "Srikanta, Prakash ",Repository:"Repository B", folderColor: "green", DateModified: '01/05/2022 3:30 PM',  EndDate: '01/05/2022 3:30 PM', gridListNav:'gg', isFolder:true},
    {position: 3, img: '', name: 'folder 3', shared: " Jone, Adam",Repository:"Repository C", folderColor: "", DateModified: '01/05/2022 3:30 PM',  EndDate: '01/05/2022 3:30 PM', gridListNav:'gg', isFolder:true },
    {position: 4, img: 'assets/images/icon-pdf.svg', name: 'file 1',Repository:"Repository E", folderColor: "", shared: "Srikanta, Prakash", DateModified: '01/06/2022 3:30 PM',  EndDate: '01/05/2022 3:30 PM', gridListNav:'gg', isFolder:false},
    {position: 5, img: 'assets/images/icon-doc.svg', name: 'file 2',Repository:"Repository D", folderColor: "", shared: "Jone, Adam", DateModified: '01/06/2022 3:30 PM',  EndDate: '01/05/2022 3:30 PM', gridListNav:'gg', isFolder:false},
    {position: 6, img: 'assets/images/icon-xls.svg', name: 'file 3',Repository:"Repository B", folderColor: "", shared: " Jone, Mathew ", DateModified: '01/04/2022 3:30 PM',  EndDate: '01/05/2022 3:30 PM', gridListNav:'gg', isFolder:false},

];

@Component({
  selector: 'app-shared-list-view-with-me',
  templateUrl: './shared-list-view-with-me.component.html',
  styleUrls: ['./shared-list-view-with-me.component.scss']
})
export class SharedListViewWithMeComponent implements OnInit {

 
  displayedColumns: string[] = ['img', 'name', 'Repository','shared', 'DateModified', 'EndDate','gridListNav'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  clickedRows = new Set<PeriodicElement>();
  selection = new SelectionModel<PeriodicElement>(true, []);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }
  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }


  contextMenuPosition = { x: '0px', y: '0px' };
  isFolder : boolean = false;

  @ViewChild(MatMenuTrigger, { static: true }) contextMenu!: MatMenuTrigger;
  selectedPosition: number = 0;
  onContextMenu(event: MouseEvent, row: any) {
   
    this.selectedPosition=row.position;
    this.isFolder=row.isFolder;
   
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.openMenu();
  }

  selctedMenuPosition(element: any){
    this.selectedPosition=element.position;
  }

  rowIsFolder() {
    return {isFolder:this.isFolder};
  }

  fileFolderDetails() {
    if (this.isFolder) {
      this.router.navigate(['../','repository','folder-details']);
    }
    else {    
      this.router.navigate(['../','repository','file-details']);
    }
  }

  isFolderAndFile(isFolder:boolean) {
    this.isFolder=isFolder;
  }

  fileFolderNavigation(name : string) {
    const folderFileInfo = ELEMENT_DATA.find(f=>f.name===name);
    if (folderFileInfo?.isFolder) {
      this.router.navigate(['../','repository','folder-view']);
    }
    else {
      this.router.navigate(['../','repository','file-details']);
    }
  }
 
   constructor(private _liveAnnouncer: LiveAnnouncer,public dialog: MatDialog, private router: Router,) {}
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
   
    // this.dataSource.sort = this.sort;
  }

 
  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
  
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }


}
