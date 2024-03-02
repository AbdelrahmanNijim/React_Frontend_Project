import React from 'react'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
function Slider({products}) {
  
  
  
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
      
      <SwiperSlide key={product.id} >
        <img src={product.secure_url} alt={product.name}/>
        

      </SwiperSlide>
    
       
      )}
      
      

   

   </Swiper>

      

   
    
 </>
    

  )
}

export default Slider