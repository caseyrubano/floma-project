import {Component, inject, OnInit} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {debounceTime, Observable} from 'rxjs';
import {DocumentService} from '../../core/document.service';
import {DocumentInterface} from '../../core/document.interface';
import {ActivatedRoute} from '@angular/router';
import {MatButton} from '@angular/material/button';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatIcon} from '@angular/material/icon';
import {MatListItemIcon} from '@angular/material/list';

@Component({
  selector: 'app-document',
  standalone: true,
  templateUrl: './document.component.html',
  imports: [
    NgForOf,
    FormsModule,
    NgIf,
    AsyncPipe,
    ReactiveFormsModule,
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    MatIcon,
    MatListItemIcon
  ],
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {
  private documentService = inject(DocumentService);
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);

  id: string = '';
  document!: DocumentInterface;
  displaySaved: boolean = false;
  form: FormGroup = new FormGroup([]);

  document$!: Observable<DocumentInterface>;

  ngOnInit(): void {

    this.form = this.fb.group({
      title: [''],
      body: ['']
    });

    this.id = this.route.snapshot.paramMap.get('id') ?? '';
    this.fetchDocument();

    this.document$
      .subscribe((document: DocumentInterface) => {
      // Set form values. This won't be necessary if we break this into a display component (smart vs dumb components)
      if (document) {
        this.document = document;
        this.form.controls['title'].setValue(document.title);
        this.form.controls['body'].setValue(document.body);
      }
    })

    // When form values change, pause for 1 second and then save
    this.form.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(() => {
        this.updateDocument();
      });
  }

  private fetchDocument() {
    this.document$ = this.documentService.getDocument(this.id);
  }

  private updateDocument() {
    const formData = this.form.getRawValue();

    // Only save the data if it has changed
    if (formData.body == this.document.body && formData.title == this.document.title)
      return;

    this.documentService
      .updateDocument({id: this.id, title: formData.title, body: formData.body})
      .then((response) => {
      });

    this.displaySaved = true;

    setTimeout(() => {
      this.displaySaved = false; // Hide the div after 5 seconds
    }, 1000);
  }
}
