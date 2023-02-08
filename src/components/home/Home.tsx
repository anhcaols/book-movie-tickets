// import { useEffect, useState } from 'react'

// import SimpleSlider from '~/pages/Home/Slider/Slider'
// import Navbar, { NavbarItem } from '~/components/Navbar'
// import TvSeriesTab from './TvSeriesTab/TvSeriesTab'
// import MovieTab from './MovieTab/MovieTab'
// import NewReleases from './NewReleasesTab/NewReleasesTab'
// import CartoonsTab from './CartoonsTab/CartoonsTab'
// import ExpectedPremiereTab from './ExpectedPremiereTab/ExpectedPremiereTab'
// import * as movieService from '~/services/movieService'
// import * as genresService from '~/services/genresService'

// import styles from './home.module.scss';
// import classNames from 'classnames/bind';

// const cx = classNames.bind(styles);

// function getWindowSize() {
//     const { innerWidth: width, innerHeight: height } = window
//     return {
//         width,
//         height,
//     }
// }

// function Home() {
//     let initState = 1
//     const [windowSize, setWindowSize] = useState(getWindowSize())
//     const [listFilm, setListFilm] = useState([])
//     const [genres, setGenres] = useState([])
//     const [toggleStateTab, setToggleStateTab] = useState(false)
//     if (windowSize.width < 1140) {
//         initState = 2
//     }
//     const [toggleState, setToggleState] = useState(initState)
//     useEffect(() => {
//         window.scrollTo(0, 0)

//         function handleWindowResize() {
//             setWindowSize(getWindowSize())
//         }

//         window.addEventListener('resize', handleWindowResize)

//         return () => {
//             window.removeEventListener('resize', handleWindowResize)
//         }
//     }, [])
//     //Call Api
//     useEffect(() => {
//         //Api Movie
//         const fetchApiMovie = async () => {
//             try {
//                 const result = await movieService.movie()
//                 setListFilm(result)
//             } catch (error) {
//                 console.log(error)

//             }
//         }
//         fetchApiMovie()
//         // Api Genre Movie
//         const fetchApiGenre = async () => {
//             try {
//                 const result = await genresService.genres()
//                 setGenres(result)
//             } catch (error) {
//                 console.log(error)

//             }
//         }
//         fetchApiGenre()
//     }, [])

//     //handle Events
//     const handleToggleTab = () => {
//         setToggleStateTab(!toggleStateTab)
//     }
//     return (
//         <div className='main-movie relative bg-bgd'>
//             {/* Background Image */}
//             <div
//                 className='main-image opacity-[0.07] h-[580px] sm:h-[670.961px] md:h-[690.664px]'
//                 style={{ backgroundImage: `url(${images.homeBg4})` }}
//             ></div>
//             {/* Movie content  */}
//             <div className='movie-content w-full absolute top-[50px] md:top-[70px] z-10'>
//                 {/* Title and button */}
//                 <div
//                     className='movie-title container flex flex-row flex-wrap content-center justify-between items-center
//                     mx-auto px-[15px] '
//                 >
//                     <h1 className='text-[32px] md:text-4xl text-[white] font-medium leading-[48px] md:leading-[54px] mb-[5px]'>
//                         NEW ITEMS <span className='font-light'>OF THIS SEASON</span>
//                     </h1>
//                     <div className='btn-slider flex mb-[17px]'></div>
//                 </div>
//                 {/* Slider */}
//                 <div
//                     className='movie-list-wrapper pb-[25px] container flex flex-row flex-wrap content-center justify-between items-center mx-auto '>
//                     <SimpleSlider data={listFilm} genres={genres} />
//                 </div>
//             </div>

//             {/* Content item */}
//             {/* New items - Nav tabs */}
//             <div className='content-item-wrapper'>
//                 <div className='content-header'>
//                     <div
//                         className=' container flex flex-row flex-wrap content-center items-center mx-auto mt-5 px-[15px]'>
//                         <div className='content-head'>
//                             <h2 className='text-[30px] font-light md:text-4xl text-[#fff] leading-[100%] mt-[25px] mb-[10px]'>
//                                 New items
//                             </h2>
//                             <div className='flex items-center'>
//                                 <p
//                                     onClick={handleToggleTab}
//                                     className='title-nav-tab flex items-center md:hidden text-[#fff] h-[50px]'
//                                 >
//                                     {(toggleState === 2 && 'MOVIES') ||
//                                         (toggleState === 3 && 'TV SERIES') ||
//                                         (toggleState === 4 && 'CARTOONS')}
//                                 </p>
//                                 <span
//                                     onClick={handleToggleTab}
//                                     className={`toggle-nav-tabs block w-4 h-4 relative ${
//                                         toggleStateTab ? 'active' : ''
//                                     } `}
//                                 ></span>
//                             </div>
//                             <div className='content-tab-list'>
//                                 <Navbar className={`${toggleStateTab ? 'active' : ''}`}>
//                                     <NavbarItem
//                                         activeNewItem
//                                         onClick={() => {
//                                             setToggleState(1)
//                                             setToggleStateTab(false)
//                                         }}
//                                         fontThin
//                                         className={`hover:text-[#fff] h-10 md:h-[50px] mr-[30px] text-[#ffffff80]
//                                             ${toggleState === 1 && 'active'} hide-on-mobile`}
//                                         title='NEW RELEASES'
//                                     />
//                                     <NavbarItem
//                                         activeNewItem
//                                         onClick={() => {
//                                             setToggleState(2)
//                                             setToggleStateTab(false)
//                                         }}
//                                         fontThin
//                                         className={` hover:text-[#fff] h-10 md:h-[50px] mr-[30px] text-[#ffffff80]
//                                             ${toggleState === 2 && 'active custom-nav'} `}
//                                         title='MOVIES'
//                                     />
//                                     <NavbarItem
//                                         activeNewItem
//                                         onClick={() => {
//                                             setToggleState(3)
//                                             setToggleStateTab(false)
//                                         }}
//                                         fontThin
//                                         className={` hover:text-[#fff] h-10 md:h-[50px] mr-[30px] text-[#ffffff80]
//                                             ${toggleState === 3 && 'active custom-nav'} `}
//                                         title='TV SERIES'
//                                     />
//                                     <NavbarItem
//                                         activeNewItem
//                                         onClick={() => {
//                                             setToggleState(4)
//                                             setToggleStateTab(false)
//                                         }}
//                                         fontThin
//                                         className={` hover:text-[#fff] h-10 md:h-[50px] mr-[30px] text-[#ffffff80]
//                                             ${toggleState === 4 && 'active custom-nav'} `}
//                                         title='CARTOONS'
//                                     />
//                                 </Navbar>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 {/* Tab NEW RELEASES */}
//                 <NewReleases data={listFilm} genres={genres} className={toggleState === 1 ? 'active' : ''} />
//                 {/* Tab MOVIES */}
//                 <MovieTab data={listFilm} genres={genres} className={toggleState === 2 ? 'active' : ''} />
//                 {/*  TV SERIES */}
//                 <TvSeriesTab data={listFilm} genres={genres} className={toggleState === 3 ? 'active' : ''} />
//                 {/*  CARTOONS*/}
//                 <CartoonsTab data={listFilm} genres={genres} className={toggleState === 4 ? 'active' : ''} />
//             </div>

//             {/* Expected premiere */}
//             <div className='content-item-wrapper relative'>
//                 <div className=' container flex flex-row flex-wrap content-center items-center mx-auto px-[15px]'>
//                     <div className='content-head'>
//                         <h2 className='text-4xl text-[#fff] leading-[100%] mt-[70px] mb-[10px]'>Expected premiere</h2>
//                     </div>
//                 </div>
//                 <ExpectedPremiereTab data={listFilm} genres={genres} />
//             </div>
//         </div>
//     )
// }

// export default Home
