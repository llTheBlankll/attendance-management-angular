import {Component} from '@angular/core';
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {MatActionList, MatList, MatListItem} from "@angular/material/list";
import {MatLine} from "@angular/material/core";
import {MatDivider} from "@angular/material/divider";
import {MatButton} from "@angular/material/button";

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
    MatCardActions
  ],
  templateUrl: './announcements.component.html',
  styleUrl: './announcements.component.css'
})
export class AnnouncementsComponent {

  announcements = [{
    title: 'Announcement 1',
    content: 'This is the first announcement'
  }, {
    title: 'Announcement 2',
    content: 'This is the second announcement'
  }, {
    title: 'Announcement 3',
    content: 'This is the third announcement'
  }];

  upcomingEvents = [{
    title: 'Event 1',
    date: '2021-05-24',
    content: "lorem ipsum"
  }, {
    title: 'Event 2',
    date: '2021-05-25',
    content: "lorem ipsum"
  }, {
    title: 'Event 3',
    date: '2021-05-26',
    content: "lorem ipsum"
  }]
}
