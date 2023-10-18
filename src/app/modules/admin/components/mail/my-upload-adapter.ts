import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

export class UploadAdapter {
    private loader;
    constructor(loader: any) {
      this.loader = loader;
      console.log(this.readThis(loader.file));
    }
  
    public upload(): Promise<any> {
      //"data:image/png;base64,"+ btoa(binaryString) 
      return this.readThis(this.loader.file);
    }
  
    readThis(file: File): Promise<string> {
        console.log(file)
        let imagePromise: Promise<string> = new Promise((resolve, reject) => {
            var myReader: FileReader = new FileReader();
            myReader.onloadend = (e) => {
                let image = myReader.result;
                console.log(image);
                resolve("data:image/png;base64," + image);
            }
            myReader.readAsDataURL(file);
        });
        return imagePromise;
    }
  
  }