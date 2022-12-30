import React from 'react';
import '../css/App.css';

function EmailCourses() {
  return (
    <div>        
        <section>
        <center>
          <h2>Search Courses</h2>
          <article width="85%">
            <form method="post" action="/adminhgtc/emailcourses.php" name="theform">
              <fieldset><legend>Course Information</legend>
                <table>
                  <tbody><tr>
                      <th><label htmlFor="faculty">Faculty:</label></th>
                      <td><select name="faculty" id="faculty">
                          <option value>Please Select a Faculty Member</option>
                          <option value={86}>a</option><option value={1}>Admin Test</option><option value={80}>asd</option><option value={82}>avmeade99@gmail.com</option><option value={71}>dgffgd</option><option value={83}>ejohns58</option><option value={79}>Faculty123</option><option value={78}>Faculty123</option><option value={91}>gjohns</option><option value={84}>Harrison Smith</option><option value={75}>hello</option><option value={87}>jalen keith</option><option value={88}>jgeral11</option><option value={81}>Joshep</option><option value={76}>mills</option><option value={90}>Rick Lea</option><option value={89}>Rick Lea</option><option value={73}>s</option><option value={19}>Student Test</option><option value={69}>Test 2021</option><option value={70}>Test 2021</option><option value={66}>Test Profressor</option><option value={67}>Test Profressor</option><option value={5}>Test User 1</option><option value={17}>Test User 1</option><option value={72}>Test User 1</option><option value={15}>Test User 10</option><option value={16}>Test User 11</option><option value={18}>Test User 12</option><option value={20}>Test User 13</option><option value={6}>Test User 3</option><option value={7}>Test User 4</option><option value={8}>Test User 5</option><option value={9}>Test User 6</option><option value={12}>Test User 7</option><option value={11}>Test User 7</option><option value={14}>Test User 9</option><option value={85}>Test User Proxy</option><option value={77}>Test User40</option><option value={13}>Test User8</option><option value={74}>Test_User_100</option><option value={68}>test2020</option>						</select>
                      </td>
                    </tr>
                    <tr>
                      <th><label htmlFor="coursesemester">Select a Semester:</label></th>
                      <td><select name="coursesemester" id="coursesemester">
                          <option value>Please Select a Semester</option>
                          <option value="Spring">Spring</option>
                          <option value="Summer">Summer</option>
                          <option value="Fall">Fall</option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <th><label htmlFor="courseyear">Select a Year:</label></th>
                      <td><select name="courseyear" id="courseyear">
                          <option value>Please Select a Year</option>
                          <option value={2019}>2019</option>
                          <option value={2020}>2020</option>
                          <option value={2021}>2021</option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <th>Enter the Course Prefix (Ex: CPT, ENG, SOC)</th>
                      <td><input name="courseprefix" id="courseprefix" defaultValue="" /></td>
                    </tr>
                    <tr>
                      <th>Enter the Course Number (Ex: 101, 205, 121)</th>
                      <td><input name="coursenumber" id="coursenumber" defaultValue="" /></td>
                    </tr>
                    <tr>
                      <th>Enter the Section (Ex: H01, C02, G04, S06, I01)</th>
                      <td><input name="coursesection" id="coursesection" defaultValue="" /></td>
                    </tr>
                  </tbody></table>
                <input type="submit" name="thesubmit" value="Search Faculty Courses" />
              </fieldset>
            </form>
            <br /><br />
            <table width="85%">
              <tbody><tr><th colSpan={4}><h3>Admin Test</h3></th>
                </tr><tr>
                  <th>Course</th>
                  <th>Semester</th>
                  <th>Complete</th>
                </tr><tr><td>CPT 162 H50</td><td> Fall 2019</td><td> YES</td></tr><tr><td>CPT 162 H01</td><td> Fall 2019</td><td> YES</td></tr><tr><td>TEST test TEST</td><td> Summer 2020</td><td> NO</td></tr><tr><td>ENG 203 H04</td><td> Spring 2019</td><td> NO</td></tr><tr><td>ENG 203 H04</td><td> Spring 2019</td><td> NO</td></tr><tr><td>CPT 101 H01</td><td> Spring 2019</td><td> NO</td></tr><tr><td>ENG 555 H01</td><td> Spring 2021</td><td> NO</td></tr><tr><td>CPT 262 H01</td><td> Spring 2021</td><td> NO</td></tr><tr><th colSpan={3}>To send email with all classes to Admin Test please click <a href="mailto:admintest@hgtc.edu?Subject=Epic%20Course%20Submission%20Links&body=%0D%0A%0D%0ACPT%20162%20H50%20For%20Fall%202019%20%20%20http://epic.istwebclass.org/updatecourse.php?cid=2%26cp=CPT%26cn=162%26cs=H50%0D%0A%0D%0ACPT%20162%20H01%20For%20Fall%202019%20%20%20http://epic.istwebclass.org/updatecourse.php?cid=3%26cp=CPT%26cn=162%26cs=H01%0D%0A%0D%0ATEST%20test%20TEST%20For%20Summer%202020%20%20%20http://epic.istwebclass.org/updatecourse.php?cid=60%26cp=TEST%26cn=test%26cs=TEST%0D%0A%0D%0AENG%20203%20H04%20For%20Spring%202019%20%20%20http://epic.istwebclass.org/updatecourse.php?cid=76%26cp=ENG%26cn=203%26cs=H04%0D%0A%0D%0AENG%20203%20H04%20For%20Spring%202019%20%20%20http://epic.istwebclass.org/updatecourse.php?cid=73%26cp=ENG%26cn=203%26cs=H04%0D%0A%0D%0ACPT%20101%20H01%20For%20Spring%202019%20%20%20http://epic.istwebclass.org/updatecourse.php?cid=69%26cp=CPT%26cn=101%26cs=H01%0D%0A%0D%0AENG%20555%20H01%20For%20Spring%202021%20%20%20http://epic.istwebclass.org/updatecourse.php?cid=64%26cp=ENG%26cn=555%26cs=H01%0D%0A%0D%0ACPT%20262%20H01%20For%20Spring%202021%20%20%20http://epic.istwebclass.org/updatecourse.php?cid=62%26cp=CPT%26cn=262%26cs=H01%0D%0A%0D%0A">HERE</a></th></tr></tbody></table>	
          </article>
        </center></section>
    </div>
  );
}

export default EmailCourses;