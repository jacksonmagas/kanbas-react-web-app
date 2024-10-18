import { Link } from "react-router-dom";

type CourseInfo = {
  name : string,
  desc : string,
  img: string
}

function DefaultCourse(props : CourseInfo) {
  return (
    <div className="card-rounded-3 overflow-hidden">
      <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                  to="/Kanbas/Courses/1234/Home">
        <img src={"/images/" + props.img} width="100%" height={160} />
        <div className="card-body">
          <h5 className="wd-dashboard-course-title card-title">
            {props.name}
          </h5>
          <p className="wd-dashboard-course-title card-text">
            {props.desc}
          </p>
          <button className="btn btn-primary"> Go </button>
        </div>
      </Link>
    </div>
  );
} 

export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-4">
          <div className="wd-dashboard-course col" style={{width: "270px" }}>
            <DefaultCourse name="CS1234 React JS" desc= "Full Stack software developer" img="react.png"/>
          </div>
          <div className="wd-dashboard-course col" style={{width: "270px" }}>
            <DefaultCourse name="CS5678 Compilers" desc= "Build a new language" img="yacc.jpg"/>
          </div>
          <div className="wd-dashboard-course col" style={{width: "270px" }}>
            <DefaultCourse name="CS1500 Fundies 1" desc= "We love Racket" img="racket.png"/>
          </div>
          <div className="wd-dashboard-course col" style={{width: "270px" }}>
            <DefaultCourse name="CS3650 Computer Systems" desc= "Segfault: the course" img="hexdump.jpg"/>
          </div>
          <div className="w-100 d-none d-xxl-block"/>
          <div className="wd-dashboard-course col" style={{width: "270px" }}>
            <DefaultCourse name="CS2700 Algorithms" desc= "The homeworks take O(n!) effort" img="dag.png"/>
          </div>
          <div className="wd-dashboard-course col" style={{width: "270px" }}>
            <DefaultCourse name="EECE 2322 Digital Design" desc= "RISC it all" img="cpu.png"/>
          </div>
          <div className="wd-dashboard-course col" style={{width: "270px" }}>
            <DefaultCourse name="CS 4530 Software Engineering" desc= "Draw the rest of the owl" img="owl.jpg"/>
          </div>
          <div className="wd-dashboard-course col" style={{width: "270px" }}>
            <DefaultCourse name="THTR 1125 Improv" desc= "Chillest course it the university" img="masks.png"/>
          </div>
        </div>
      </div>
    </div>
  );
}
