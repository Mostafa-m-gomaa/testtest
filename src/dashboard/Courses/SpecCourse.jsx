import React, { useEffect ,useContext, useState } from 'react'
import { useParams } from 'react-router-dom';
import { AppContext, route } from '../../App';
import CourseCard from './CourseCard';

import './CourseCard.css'



const SpecCourse = () => {
    const {setLoading} = useContext(AppContext)
    const param = useParams()
    const [course,setCourse]=useState({})
    const [recommend,setRecommend]=useState([])
    const token =localStorage.getItem("token")

    
  const buy = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${route}orders/checkout-session/${param.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to initiate checkout session'); // Or you could throw a more specific error based on response.status
      }
  
      const data = await response.json();
      console.log(data);
      if(data.status="success"){
        window.location.href = data.session.url;
      }
    
    } catch (error) {
      console.error("Error:", error);
      // Handle errors here, such as displaying a message to the user
    }
  }
    useEffect(() => {
        
        setLoading(true); 
        fetch(`${route}/courses/${param.id}`)
          .then((res) => res.json())
          .then((data) => {
            setCourse(data.data)
            fetch(`http://localhost:7000/get-recommendations?course_title=${data.data.title}&number_of_recommendation=4`)
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              setRecommend(data)
        
      
            })
    
          })
          .finally(() => setLoading(false));
      }, []);
  
  return (
    <div className='recommendation'>
          <div className="course-card">
      <img src={course.image} alt={course.title} className="course-image" />
      <div className="course-info">
        <h2 className="course-title">{course.title}</h2>
        <p className="course-description">{course.description}</p>
        <div className="course-details">
          {/* <p><strong>Instructor:</strong> {course.instructor.username}</p> */}
          {/* <p><strong>Category:</strong> {course.category.title}</p> */}
          <p><strong>Price:</strong> ${course.priceAfterDiscount} <span className="original-price">${course.price}</span></p>
          <p><strong>Sold:</strong> {course.sold}</p>
          <p><strong>Ratings:</strong> {course.ratingsQuantity}</p>
          <h2 onClick={()=>buy()} style={{
                  textAlign: "center",
                  width: "fit-content",
                  margin: " auto",
                  padding: "5px 15px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  backgroundColor: "#ffb900",
                  }}>
                  Enroll
                </h2>
        </div>
      </div>
    </div>
    <div style={{
      fontSize:"35px"
    }}>Recommended for you</div>
    <div className="recommend-container">
    {recommend.map((course) => (
        <CourseCard key={course._id} course={course} />
      ))}
    </div>
  
    </div>
  )
}

export default SpecCourse