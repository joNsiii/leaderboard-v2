import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  doc,
  getDoc,
  getDocs,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  public firestore = inject(Firestore);
  tracksCollRef = collection(this.firestore, 'tracks');

  async getAllTracksFromFirestore() {
    const querySnapshot = await getDocs(this.tracksCollRef);
    const tracks = querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    return tracks;
  }

  async getSingleTrackData(trackId: any)  {
    const docRef = doc(this.tracksCollRef, trackId);
    const docSnap = await getDoc(docRef);
    
    if(docSnap.exists()) {
      return docSnap.data();
    }else {
      return console.error('no document found');
    }
  }
}
