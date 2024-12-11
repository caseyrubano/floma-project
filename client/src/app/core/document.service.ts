import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  docData,
  doc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {DocumentInterface} from './document.interface';
import axios from 'axios';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class DocumentService {
  private firestore = inject(Firestore);
  private documents = collection(this.firestore, 'documents');
  private API_URL = `${environment.apiUrl}/documents`;

  getDocuments(): Observable<DocumentInterface[]> {
    return collectionData<DocumentInterface>(this.documents);
  }

  getDocument(id: string) {
    return docData<DocumentInterface>(doc(this.firestore, `documents/${id}`));
  }

  addDocument(document: {title: string, body: string }) {
    return axios.post<DocumentInterface>(this.API_URL, document);
  }

  updateDocument(document: {id: string, title: string, body: string }) {
    return axios.put<DocumentInterface>(`${this.API_URL}/${document.id}`, document);
  }
}
