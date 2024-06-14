import { Component } from '@angular/core';
import { MediaService} from "../../services/media.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})

export class UploadComponent {
  selectedFile: File | null = null;

  constructor(private mediaService: MediaService, private router: Router) { }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadFile(){
    if(this.selectedFile){
      const fileExtension = this.selectedFile.name.split('.').pop();
      if (fileExtension !== 'mp4') {
        alert('Invalid file type. Please upload a .mp4 file.');
        return;
      }
      this.mediaService.uploadFile(this.selectedFile).subscribe(
        (res) => {
          console.log('File uploaded:', res);
          this.router.navigate(['/player']);
        },
        (err) => {
          console.log('Error uploading file:', err);
        }
      );
    }
  }
}
