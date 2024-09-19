
type Assignment = {
  name : string,
  stday : string,
  sttime : string,
  dueday : string,
  duetime : string,
  pts : number,
}

function Assignment(prop :Assignment) {
  return (
    <div>
          <a className="wd-assignment-link"
            href="#/Kanbas/Courses/1234/Assignments/123">
          {prop.name} 
          </a>
	  <br />
	  Multiple Modules | <strong> Not available until </strong> {prop.stday} at {prop.sttime} |
	  <br/>
	  <strong> Due </strong> {prop.dueday} at {prop.duetime} | {prop.pts}pts
    </div>
  );
}

export default function Assignments() {
  return (
    <div id="wd-assignments">
      <input id="wd-search-assignment"
             placeholder="Search for Assignments" />
      <button id="wd-add-assignment-group">+ Group</button>
      <button id="wd-add-assignment">+ Assignment</button>
      <h3 id="wd-assignments-title">
        ASSIGNMENTS 40% of Total <button>+</button>
      </h3>
      <ul id="wd-assignment-list">
        <li className="wd-assignment-list-item">
	  <Assignment name="A1 - ENV + HTML" stday="May 6" sttime="12:00am" dueday="May 13" duetime="11:59pm" pts={100} />
        </li>
        <li className="wd-assignment-list-item">
	  <Assignment name="A2 - CSS + BOOTSTRAP" stday="May 13" sttime="12:00am" dueday="May 20" duetime="11:59pm" pts={100} />
        </li>
        <li className="wd-assignment-list-item">
	  <Assignment name="A3 - JAVASCRIPT + REACT" stday="May 20" sttime="12:00am" dueday="May 27" duetime="11:59pm" pts={100} />
        </li>
      </ul>
    </div>
);}
