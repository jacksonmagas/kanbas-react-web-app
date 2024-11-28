export default function DetailsEditor() {
  return (
    <div id="wd-details-editor">
      <label htmlFor="wd-name">Quiz Name</label>
      <input id="wd-name" value="A1 - ENV + HTML" /><br /><br />
      <textarea id="wd-description">
        The assignment is available online Submit a link to the landing page of
      </textarea>
      <br /><br />
      <table>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-type">Quiz type</label>
          </td>
          <td>
            <select id="wd-group">
              <option> Graded Quiz </option>
              <option> Ungraded Quiz </option>
            </select>
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-group"> Assignment Group </label>
          </td>
          <td>
            <select id="wd-group">
              <option> ASSIGNMENTS </option>
              <option> EXAMS </option>
              <option> PROJECTS </option>
            </select>
            <br /><br />
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
          </td>
          <td>
            <br /><br />
            Options<br />
            <input type="checkbox" id="wd-text-entry" name="entry-options" value="Shuffle Answers" />
            <label htmlFor="wd-text-entry"> Shuffle Answers </label><br />
            <input type="checkbox" id="wd-text-entry" name="entry-options" value="Time Limit" />
            <label htmlFor="wd-text-entry"> Time Limit </label><br />
            <input type="number" id="wd-time-limit-amt" />
            <label htmlFor="wd-time-limit-amt"> Minutes </label>
            <br />
            <input type="checkbox" id="wd-text-entry" name="entry-options" value="Allow Multiple Attempts" />
            <label htmlFor="wd-text-entry"> Allow Multiple Attempts </label><br />
            <br /><br />
          </td>
        </tr>
        <tr>
          <td>
            Assign
          </td>
          <td>
            <label htmlFor="wd-assign-to"> Assign to </label><br />
            <input type="text" id="wd-assign-to" value="Everyone" />
            <br /><br />
          </td>
        </tr>
        <tr>
          <td />
          <td>
            <label htmlFor="wd-due-date"> Due </label><br />
            <input type="date" id="wd-due-date" />
            <br /><br />
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
                  <input type="date" id="wd-available-from" />
                </td>
                <input type="date" id="wd-available-until" />
                <td>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td colSpan={2} style={{ textAlign: 'center' }}>
            <hr />
            <button>Cancel</button>
            <button>Save</button><br /><br />
            <hr />
          </td>
        </tr>
      </table>
    </div>
  );
}
