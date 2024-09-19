

export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name">Assignment Name</label>
      <input id="wd-name" value="A1 - ENV + HTML" /><br /><br />
      <textarea id="wd-description">
        The assignment is available online Submit a link to the landing page of
      </textarea>
      <br /><br/>
      <table>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-points">Points</label>
          </td>
          <td>
            <input id="wd-points" value={100} /><br/><br/>
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-group">Display Grade as </label>
          </td>
          <td>
            <select id="wd-group">
              <option> ASSIGNMENTS </option>
              <option> EXAMS </option>
              <option> PROJECTS </option>
            </select>
            <br/><br/>  
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-display-grade-as">Display Grade as </label>
          </td>
          <td>
            <select id="wd-display-grade-as">
              <option> Percentage </option>
              <option> Points </option>
            </select>
            <br/><br/>
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-submission-type"> Submission Type </label>
          </td>
          <td>
            <select id="wd-submission-type">
              <option> Online </option>
              <option> Offline </option>
            </select>
            <br/><br/>
            Online Entry Options<br/>
            <input type="checkbox" id="wd-text-entry" name="entry-options" value="Text Entry"/>
            <label htmlFor="wd-text-entry"> Text Entry </label><br/>
            <input type="checkbox" id="wd-website-url" name="entry-options" value="Website Url"/>
            <label htmlFor="wd-website-url"> Website Url </label><br/>
            <input type="checkbox" id="wd-media-recordings" name="entry-options" value="Media Recordings"/>
            <label htmlFor="wd-media-recordings"> Media Recordings </label><br/>
            <input type="checkbox" id="wd-student-annotation" name="entry-options" value="Student Annotation"/>
            <label htmlFor="wd-student-annotation"> Student Annotation </label><br/>
            <input type="checkbox" id="wd-file-uploads" name="entry-options" value="File Uploads"/>
            <label htmlFor="wd-file-uploads"> File Uploads </label><br/>
            <br/><br/>
          </td>
        </tr>
        <tr>
          <td>
            Assign 
          </td>
          <td>
            <label htmlFor="wd-assign-to"> Assign to </label><br/>
            <input type="text" id="wd-assign-to" value="Everyone"/>
            <br/><br/>
	    <label htmlFor="wd-due-date"> Due </label><br/>
	    <input type="date" id="wd-due-date"/>
	    <br/><br/>
	    <table>
	      <tr>
	        <td>
		  <label htmlFor="wd-available-from"> Available from </label>
		</td>
		<td>
	          <label htmlFor="wd-available-until"> Until </label>
		</td>
	      </tr>
	      <tr>
	        <td>
		  <input type="date" id="wd-available-from"/>
		</td>
		  <input type="date" id="wd-available-until"/>
		<td>
		</td>
	      </tr>
	    </table>
          </td>
        </tr>
      </table>
    </div>
  );
}
