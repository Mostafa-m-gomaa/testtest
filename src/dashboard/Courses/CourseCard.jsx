import React from 'react';
import './CourseCard.css'; // تأكد من استيراد ملف CSS

import { Link } from 'react-router-dom';
const CourseCard = ({ course }) => {
  if (!course) {
    return <div>No course data available</div>;
  }

  return (
    <div className="course-card-spec">
      <img src={course.image} alt={course.title} className="course-image" />
      <div className="course-info">
        <h2 className="course-title">{course.title}</h2>
        <p className="course-description">{course.description}</p>
        <div className="course-details">
          <p><strong>Instructor:</strong> {course?.instructor?.username}</p>
          <p><strong>Category:</strong> {course?.category?.title}</p>
          <p><strong>Price:</strong> ${course.priceAfterDiscount} <span className="original-price">${course.price}</span></p>
          <p><strong>Sold:</strong> {course.sold}</p>
          <p><strong>Ratings:</strong> {course.ratingsQuantity}</p>
          <Link to={`/courseDetails/${course._id}`}
          target='_blank'
          >
                <h2 style={{
                  textAlign: "center",
                  
                 
                  width: "fit-content",
                  margin: " auto",
                  padding: "5px 15px",
                  borderRadius: "7px",
                  cursor: "pointer",
                  backgroundColor: "#3846a1",
                  marginBottom: "10px"
                }}>
                  View Course
                </h2>
                </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
