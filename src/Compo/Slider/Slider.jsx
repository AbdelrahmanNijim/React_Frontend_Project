import React from 'react'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useParams } from 'react-router-dom'
import Products from '../../Pages/Products/Products';
import axios from 'axios';
function Slider({products}) {
  
 const {id} = useParams();
  const handleSlideClick = {
    
    



  };
  return (
    <>
       <Swiper

    modules={[Navigation, Pagination, Scrollbar, A11y]}
    spaceBetween={50}
    slidesPerView={4}
    navigation
    pagination={{ clickable: true }}
    scrollbar={{ draggable: true }}
    onSwiper={(swiper) => console.log(swiper)}
    onSlideChange={() => console.log('slide change')}
    
    >
        {products.map(product=>
      
    <SwiperSlide key={product._id} >
       
       
            <div onClick={handleSlideClick}>
              <img src={product.image.secure_url} alt={product.name} />
            </div>
      </SwiperSlide>
    
       
      )} 
      
      

   

   </Swiper>

      

   
    
 </>
    

  )
}

export default Slider