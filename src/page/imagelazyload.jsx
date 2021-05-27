import React from 'react';
import one from '../assets/images/1.jpeg'
import two from '../assets/images/2.png'
import three from '../assets/images/3.jpeg'
import four from '../assets/images/4.png'
import five from '../assets/images/5.jpeg'
import six from '../assets/images/6.jpeg'
import seven from '../assets/images/7.jpeg'
import eight from '../assets/images/8.jpg'
import nine from '../assets/images/9.jpg'
import ten from '../assets/images/10.jpeg'
import LazyLoad from 'react-lazyload';
import {MyLoader,MyFacebookLoader,MyListLoader,MyCodeLoader,MyInstagramLoader} from '../component/common/skeleton.jsx'

class ImageLazyLoad extends React.Component{
    constructor(props){
        super(props);
        this.state={
            imgList:[one,two,three,four,five,six,seven,eight,nine,ten]
        }
    }
    componentDidMount(){
        setTimeout(() => {
            var imgs = document.querySelectorAll('img');
            this.lazyLoad(imgs)
            window.onload = window.onscroll =  ()=> {
                this.lazyLoad(imgs);
            }
        }, 100);
    }
    lazyLoad(imgs) {
        var H = document.documentElement.clientHeight;
        var S = document.documentElement.scrollTop || document.body.scrollTop;
        for (var i = 0; i < imgs.length; i++) {
            if (!imgs[i].src && H + S > imgs[i].offsetTop) {
                imgs[i].src = imgs[i].getAttribute('data-src');
            }
        }  
    }

    render(){
        return <>
            {
            this.state.imgList.map((item,index)=>{
                return <img style={{ diaplay:'block', width:'100%',height:'300px'}} data-src={item} key={index}/>
            })
        }
        {/* <MyLoader />
        <MyFacebookLoader />
        <MyListLoader />
        <MyCodeLoader /> */}
        {/* <MyInstagramLoader /> */}
        </>
    }
}

export default ImageLazyLoad;