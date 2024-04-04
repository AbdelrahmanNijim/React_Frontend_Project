import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { TailSpin } from "react-loader-spinner";
import { Puff } from 'react-loader-spinner';
import styles from './Profile.module.css'
function Profile() {
    const [prof, setProf] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const getProfile = async () => {
        const token = localStorage.getItem("userToken");
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/user/profile`, {
                headers: {
                    Authorization: `Tariq__${token}`
                }
            });
            setLoading(true);
            console.log(response.data.user);
            setProf([response.data.user]);


        } catch (error) {
            console.log(error)

        } finally {
            setLoading(false);
        }




    };
    useEffect(() => {

        getProfile();




    }, []);

    return (
        <>


            <div className='container'>

                <div>Profile</div>
                {isLoading ? (
                    <div className="center">
                        <TailSpin color="red" radius={"20px"} />
                    </div>
                ) : (
                    prof.map((profile) => (
                      <div className={styles.Profile}>
                        <div className={styles.ProfileCard} key={profile._id}>
                           
                           
                            <div className={styles.ProfileHead}>

                                <img className={styles.ProfileImg} src={profile.image.secure_url} />
                                <h2>{profile.userName}</h2>
                            </div>


                            <div className={styles.ProfileDetails}>
                                
                                 <div className={styles.Details}>  
                                 <h4 className={styles.small}  > User Name :</h4>
                                 <div></div>
                                 <h2 className={styles.small}>{profile.userName}</h2>
                                 <div></div>
                                 </div> 
                          
                               <div className={styles.Details2}>  
                              <h4  className={styles.small} > Email :</h4> 
                              <div></div>
                              <h2 className={styles.small}>{profile.email}</h2>
                              <div></div>
                               </div> 
                          
                              <div className={styles.Details}>  
                              <h4 className={styles.small}  >Rol :</h4>
                              <div></div>
                              <h2 className={styles.small}>  {profile.role}</h2>
                              <div></div>
                              </div> 

                              <div className={styles.Details2}>  
                              <h4 className={styles.small}  > Status :</h4>
                              <div></div>
                              <h2 className={styles.small}>  {profile.status}</h2>
                              <div></div>
                              </div> 
                               

                              <div className={styles.Details}>  
                              <h4 className={styles.small} > Profile created :</h4>
                              <div></div>
                              <h2 className={styles.smallS}>  {profile.createdAt}</h2>
                              <div></div>
                              </div> 
                           
                           

                            </div>




                           
                        </div>
                        </div>




                    ))
                )}
            </div>

        </>

    )
}

export default Profile