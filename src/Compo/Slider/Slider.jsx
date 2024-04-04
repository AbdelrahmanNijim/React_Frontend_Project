import React from 'react'
import { Navigation, Pagination, Scrollbar, Autoplay, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Link } from 'react-router-dom'

function Slider({ products }) {
  return (
    <>
      <Swiper

        modules={[Autoplay, Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={4}
        navigation
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}

      >
        {products.map(product =>

          <SwiperSlide key={product._id} >

            <Link to={`/category/${product._id}`} >
              <div className='category'>
                <img src={product.image.secure_url} alt={product.name} />
              </div>
            </Link>
          </SwiperSlide>


        )}





      </Swiper>





    </>


  )
}

export default Slider