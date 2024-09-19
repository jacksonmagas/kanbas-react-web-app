import { Link } from "react-router-dom";

type CourseInfo = {
  name : string,
  desc : string,
  img: string
}

function DefaultCourse(props :CourseInfo) {
  return (
    <Link className="wd-dashboard-course-link"
                to="/Kanbas/Courses/1234/Home">
      <img src={"/images/" + props.img} width={200} />
      <div>
        <h5>
	  {props.name}
        </h5>
        <p className="wd-dashboard-course-title">
	  {props.desc}
        </p>
        <button> Go </button>
      </div>
    </Link>
  );
} 

export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
	  <DefaultCourse name="CS1234 React JS" desc= "Full Stack software developer" img="react.png"/>
        </div>
	<p/>
        <div className="wd-dashboard-course">
	  <DefaultCourse name="CS5678 Compilers" desc= "Build a new language" img="yacc.jpg"/>
        </div>
	<p/>
        <div className="wd-dashboard-course">
	  <DefaultCourse name="CS1500 Fundies 1" desc= "We love Racket" img="racket.png"/>
        </div>
	<p/>
        <div className="wd-dashboard-course">
	  <DefaultCourse name="CS3650 Computer Systems" desc= "Segfault: the course" img="hexdump.jpg"/>
        </div>
	<p/>
        <div className="wd-dashboard-course">
	  <DefaultCourse name="CS3000 Algorithms" desc= "The homeworks take O(n!) effort" img="dag.png"/>
        </div>
	<p/>
        <div className="wd-dashboard-course">
	  <DefaultCourse name="EECE 2322 Digital Design" desc= "RISC it all" img="cpu.png"/>
        </div>
	<p/>
        <div className="wd-dashboard-course">
	  <DefaultCourse name="CS 4530 Software Engineering" desc= "Draw the rest of the owl" img="owl.jpg"/>
        </div>
	<p/>
        <div className="wd-dashboard-course">
	  <DefaultCourse name="THTR 1125 Improv" desc= "Chillest course it the university" img="masks.png"/>
        </div>
	<p/>
      </div>
    </div>
  );
}
