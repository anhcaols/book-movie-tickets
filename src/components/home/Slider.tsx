/* eslint-disable @next/next/no-img-element */
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function SimpleSlider() {
  const settings = {
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    dots: false,
    arrows: false,
  };
  return (
    <div className="w-full block">
      <Slider {...settings}>
        <img alt="img" src="/assets/images/banner1.jpg" />
        <img alt="img" src="/assets/images/banner2.jpg" />
        <img alt="img" src="/assets/images/banner3.jpg" />
      </Slider>
    </div>
  );
}

export default SimpleSlider;
