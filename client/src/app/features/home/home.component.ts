import {Component, inject, OnInit} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Observable} from 'rxjs';
import {DocumentService} from '../../core/document.service';
import {DocumentInterface} from '../../core/document.interface';
import {Router, RouterLink} from '@angular/router';
import {MatListItem, MatListItemTitle, MatListOption, MatSelectionList} from '@angular/material/list';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  imports: [
    NgForOf,
    FormsModule,
    NgIf,
    AsyncPipe,
    RouterLink,
    ReactiveFormsModule,
    MatListOption,
    MatSelectionList,
    MatListItem,
    MatFormField,
    MatInput,
    MatLabel,
    MatIcon,
    MatButton,
    MatListItemTitle
  ],
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private documentService = inject(DocumentService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  form: FormGroup = new FormGroup([]);

  documents$!: Observable<DocumentInterface[]>;

  ngOnInit(): void {
    this.form = this.fb.group({
      title: [''],
      body: ['']
    });

    this.fetchDocuments();
  }

  createDocument() {
    const formData = this.form.getRawValue();
    this.documentService
      .addDocument({ title: formData.title, body: '' })
      .then((response) => {
        this.router.navigate(['/document', response.data.id]);
      });
  }

  private fetchDocuments() {
    this.documents$ = this.documentService.getDocuments();
  }
}
