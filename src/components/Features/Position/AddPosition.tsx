import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { db } from '../../../shared/firebase';
import { useStore } from '../../../store';
import AvatarFromId from '../../Chat/AvatarFromId';
import { collection, doc, getDoc, getDocs, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import './styles.css';

export default function AddPosition(props: any) {
  const currentUser = useStore((state) => state.currentUser);
  const [jobTitle, setJobTitle] = useState<String>('');
  const [jobLocation, setJobLocation] = useState<String>('');
  const [jobJoingDate, setJobJoiningDate] = useState<String>('');
  const [phoneNumber, setPhoneNumber] = useState<Number>();
  const [conference, setConference] = useState<String>('');
  const [user, setUser] = useState<any>([]);
  const [userId, setUserId] = useState<String>('');
  const [status, setStatus] = useState<String>('');
  const [statusData, setSatusData] = useState<String>('');
  const location = useLocation();

  const handleUserId = (userId: any) => {
    const id = userId.uid;
    return setUserId(id);
  }

  const Users = async (id: any) => {
    const documentRef = collection(db, 'conversations');
    return onSnapshot(documentRef, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        if (doc.data().users.includes(id)) {
          const userRef = collection(db, 'users');
          return onSnapshot(userRef, (snapshot) => {
            snapshot.docs.forEach((document) => {
              if (document.id === id) {
                const user = document.data();
                return setUser(user);
              }
            })
          })
        }
      })
    })
  }




  useEffect(() => {
    handleUserId(location.state);
    Users(userId);
  }, [userId])

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const documentRef = collection(db, 'conversations');
    return onSnapshot(documentRef, (snapshot) => {
      snapshot.docs.forEach((documents) => {
        if (documents.data().users.includes(userId)) {
          const userRef = collection(db, 'users');
          return onSnapshot(userRef, (snapshot) => {
            snapshot.docs.forEach((document) => {
              if (document.id === userId) {
                const user = document.data();
                return updateDoc(doc(db, 'users', userId as string), {
                  "position.jobTitle": jobTitle,
                  "position.jobLocation": jobLocation,
                  "position.jobJoiningDate": jobJoingDate,
                  "position.status": "Active",
                  "asined_by": currentUser
                })
              }
            })
          })
        }
      })
    })

  }


  return (
    <div className="addPositionContainer">
      <div className='card'>
        <div className='card-header'>
          <h3>Add Position</h3>
          <img src={user.photoURL} alt="avatar" className='avatarImg' />
          <h4>{user.displayName}</h4>
        </div>
        <div className='card-body'>
          <form onSubmit={handleSubmit} >
            <div className='form-group'>

              <div className='labelInput'>
                <input type='text' required className='form-control' id='jobTitle' placeholder='Enter Position Title' onChange={(e) => setJobTitle(e.target.value)} />
              </div>

              <div className='labelInput'>
                <input type='text' required className='form-control' id='jobLocation' placeholder='Enter Location' onChange={(e) => setJobLocation(e.target.value)} />
              </div>

              <div className='labelInput'>
                <input type='date' required className='form-control' id='jobJoiningDate' placeholder='Enter Joining Date' onChange={(e) => setJobJoiningDate(e.target.value)} />
              </div>

              <div className='labelInput'>
                <select className='form-control' id='status' onChange={(e) => setStatus(e.target.value)}>
                  <option value='Active'>Active</option>
                  <option value='Inactive'>Inactive</option>
                  <option value='Not Distarb'>Not Distarb</option>
                  <option value='Not Available'>Not Available</option>
                  <option value="Training">Training</option>
                  <option value="Traveling">Traveling</option>
                </select>
              </div>
              <button type='submit' className='btn btn-primary' >
                Add Position
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
