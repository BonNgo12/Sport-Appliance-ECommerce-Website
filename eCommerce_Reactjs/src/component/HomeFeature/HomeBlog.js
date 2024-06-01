import React from 'react';
import HeaderContent from '../Content/HeaderContent';
import HomeBlogItem from './HomeBlogItem';
function HomeBlog(props) {
    return (
        <section className="blog-area section-gap">
            <div className="container">
                <HeaderContent mainContent="New blog post" infoContent="Latest fashion blog posts"></HeaderContent>
                <div className="row">
                    {props.data && props.data.length > 0 &&
                        props.data.map((item,index) =>{
                            return(
                                <HomeBlogItem data={item}/>
                            )
                        })
                    }
                   

                   
                </div>
            </div>
        </section>

    );
}

export default HomeBlog;