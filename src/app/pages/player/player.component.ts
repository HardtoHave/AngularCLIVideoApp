import { Component, OnInit } from "@angular/core";
import { MediaService } from "../../services/media.service";

@Component({
    selector: 'app-player',
    templateUrl: './player.component.html',
    styleUrls: ['./player.component.css']
})

export class PlayerComponent implements OnInit{
  uploadedFiles: any[] = [];

  constructor(private mediaService: MediaService) {}

  ngOnInit() {
    this.getUploadedFiles();
  }

  getUploadedFiles() {
    this.mediaService.getUploadedFiles().subscribe(
      (files) => {
        this.uploadedFiles = files;
      },
      (err) => {
        console.log('Error getting uploaded files:', err);
      }
    );
  }
  deleteAllFiles() {
    this.mediaService.deleteAllFiles().subscribe(
      () => {
        this.uploadedFiles = [];
      },
      (err) => {
        console.log('Error deleting files:', err);
      }
    );
  }
}
