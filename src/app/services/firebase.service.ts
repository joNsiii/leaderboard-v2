import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  updateDoc,
} from '@angular/fire/firestore';
import { Driver } from '../../models/add-driver.model';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  public firestore = inject(Firestore);
  tracksCollRef = collection(this.firestore, 'tracks');

  async getAllTracksFromFirestore() {
    const querySnapshot = await getDocs(this.tracksCollRef);
    const tracks = querySnapshot.docs.map((doc) => {
      const { id } = doc;
      const { name } = doc.data();
      return { id, name };
    });
    return tracks;
  }

  async getSingleTrackData(trackId: string, callback: (data: any) => void) {
    try {
      const unsub = onSnapshot(doc(this.tracksCollRef, trackId), (doc) => {
        if (doc.exists()) {
          callback({id: doc.id, ...doc.data()});
        } else {
          console.error('No document found');
          callback(null);
        }
      });
      return unsub;
    } catch (error) {
      console.error('Error fetching document:', error);
      callback(null);
      return () => {};
    }
  }

  async addNewTime(id: string, driver: Driver) {
    const trackRef = doc(this.firestore, 'tracks', id);
    const trackSnapshot = await getDoc(trackRef);
    const choosenClass = driver.carClass;
    const driverData = {
      driver: driver.driver,
      time: driver.time,
      car: driver.car,
      msec: driver.msec,
    };
    if (trackSnapshot.exists()) {
      const trackData = trackSnapshot.data();
      const existingDriverIndex = trackData[choosenClass].findIndex(
        (d: { car: string; driver: string }) =>
          d.car == driverData.car && d.driver === driverData.driver
      );
      if (existingDriverIndex !== -1) {
        const updatedDrivers = [...trackData[choosenClass]];
        updatedDrivers[existingDriverIndex].time = driverData.time;
        updatedDrivers[existingDriverIndex].msec = driverData.msec;
        await updateDoc(trackRef, { [choosenClass]: updatedDrivers });
      }

      await updateDoc(trackRef, { [choosenClass]: arrayUnion(driverData) });
    }
  }
}
