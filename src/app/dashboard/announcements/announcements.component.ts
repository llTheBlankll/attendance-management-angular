import {Component, OnInit, ViewChild} from '@angular/core';
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
  MatCardTitleGroup,
} from "@angular/material/card";
import {MatActionList, MatList, MatListItem} from "@angular/material/list";
import {MatLine} from "@angular/material/core";
import {MatDivider} from "@angular/material/divider";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatChip, MatChipAvatar, MatChipSet, MatChipTrailingIcon} from "@angular/material/chips";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef, MatNoDataRow,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {MatPaginator, PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-announcements',
  standalone: true,
  imports: [
    MatGridList,
    MatGridTile,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatList,
    MatListItem,
    MatLine,
    MatCardTitle,
    MatCardSubtitle,
    MatDivider,
    MatActionList,
    MatButton,
    MatCardActions,
    MatCardTitleGroup,
    MatFormField,
    MatInput,
    MatLabel,
    MatIconButton,
    MatIcon,
    MatMenu,
    MatMenuTrigger,
    MatMenuItem,
    MatChip,
    MatChipSet,
    MatChipTrailingIcon,
    MatChipAvatar,
    MatTable,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatHeaderCellDef,
    MatPaginator,
    MatNoDataRow
  ],
  templateUrl: './announcements.component.html',
  styleUrl: './announcements.component.css'
})
export class AnnouncementsComponent implements OnInit {

  announcements = [
    {}
  ]

  // Mat Chips statistics data
  totalPosted: number = 0;
  scheduledPost: number = 0;
  draftPost: number = 0;

  // Mat Table data
  displayedColumns: string[] = ['title', 'status', 'viewers'];
  announcementTableDataSource: MatTableDataSource<any> = new MatTableDataSource(this.announcements);

  // Announcement Pagination
  // Pagination info
  protected announcementPagination = {
    totalElements: 0,
    totalPages: 0,
    currentPage: 0,
    pageSize: 10
  }

  constructor() {
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onAnnouncementPaginationChange(event: PageEvent): void {

  }
}
