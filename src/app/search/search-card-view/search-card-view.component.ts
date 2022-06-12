import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MoveCopyModalComponent } from 'src/app/shared/move-copy-modal/move-copy-modal.component';

@Component({
  selector: 'app-search-card-view',
  templateUrl: './search-card-view.component.html',
  styleUrls: ['./search-card-view.component.scss']
})
export class SearchCardViewComponent implements OnInit {

  checked = false;
  indeterminate = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;
  constructor(public dialog: MatDialog) {}

  openMoveCopyDialog() {
    const dialogRef = this.dialog.open(MoveCopyModalComponent, {panelClass: 'custon-width-md'});
    

    dialogRef.afterClosed().subscribe(result => {
      
    });
  }


  ngOnInit(): void {
  }

}
