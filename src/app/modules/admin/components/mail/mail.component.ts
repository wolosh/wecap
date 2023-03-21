import { Component, OnInit} from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';


@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.css'],
  
})
export class MailComponent implements OnInit {

  public Editor:any = ClassicEditor;

  constructor() { }

  ngOnInit(): void {
  }

  

}
